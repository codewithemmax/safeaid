import { Request, Response } from 'express'

import { addMessage, createCase } from '../services/cases.service'
import { analyseMessage } from '../services/gemini.service'
import { hashPhone } from '../services/hash.service'
import { findNearestCenter, formatCenterReply, NO_CENTER_REPLY } from '../services/routing.service'
import { clearSession, getSession, MENU_MESSAGE, upsertSession } from '../services/session.service'
import { sendSms } from '../services/sms.service'
import type { ResourceType } from '../types'

const DIGIT_TO_RESOURCE: Record<string, ResourceType> = {
  '0': 'emergency',
  '1': 'shelter',
  '2': 'food',
  '3': 'legal',
  '4': 'medical',
  '5': 'jobs',
}

async function handleIncomingSms(from: string, text: string): Promise<void> {
  const phoneHash = hashPhone(from)
  const input = text.trim()
  const session = await getSession(phoneHash)
  const step = session?.step ?? 'menu'

  // STEP 1 — No session, or reset keywords
  if (!session || step === 'menu' || /^(help|sos|hi|hello|start)$/i.test(input)) {
    await sendSms(from, MENU_MESSAGE)
    await upsertSession(phoneHash, { step: 'awaiting_type' })
    return
  }

  // STEP 2 — Awaiting resource type selection (0-5)
  if (step === 'awaiting_type') {
    const resource = DIGIT_TO_RESOURCE[input]
    if (!resource) {
      await sendSms(from, MENU_MESSAGE)
      await upsertSession(phoneHash, { step: 'awaiting_type' })
      return
    }
    await upsertSession(phoneHash, { step: 'awaiting_state', resource_type: resource })
    await sendSms(from, 'Which state are you in? E.g. reply LAGOS or EDO')
    return
  }

  // STEP 3 — Awaiting state name
  if (step === 'awaiting_state') {
    const resourceType = session.resource_type
    if (!resourceType) {
      await clearSession(phoneHash)
      await sendSms(from, MENU_MESSAGE)
      return
    }

    const state = input.toLowerCase()
    const center = await findNearestCenter(state, resourceType)
    const reply = center ? formatCenterReply(center) : NO_CENTER_REPLY
    const analysis = await analyseMessage(text)

    const newCase = await createCase({
      phone_hash: phoneHash,
      risk_level: analysis.risk_level,
      resource_type: resourceType,
      summary: analysis.summary,
      center_id: center?.id ?? null,
    })

    await addMessage({ case_id: newCase.id, direction: 'inbound', body: text })
    await addMessage({ case_id: newCase.id, direction: 'outbound', body: reply })
    await sendSms(from, reply)
    await upsertSession(phoneHash, { step: 'complete' })
    return
  }

  // FALLBACK — complete or unrecognised state
  await sendSms(from, MENU_MESSAGE)
  await upsertSession(phoneHash, { step: 'awaiting_type' })
}

export function receiveSms(req: Request, res: Response): void {
  const { from, text } = req.body as { from: string; text: string }

  // AT retries if we don't respond within 5s — return immediately
  res.status(200).send()

  handleIncomingSms(from, text).catch(console.error)
}
