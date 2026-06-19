import { supabase } from '../lib/supabase'

import type { ResourceType, SmsSession, SmsStep } from '../types'

export const MENU_MESSAGE =
  'SafeAid Emergency Support.\nWhat do you need? Reply:\n1 - Shelter & Safety\n2 - Food Support\n3 - Legal Aid\n4 - Medical Help\n5 - Jobs & Training\n0 - EMERGENCY (Police/NAPTIP)'

export async function getSession(phoneHash: string): Promise<SmsSession | null> {
  const { data, error } = await supabase
    .from('sms_sessions')
    .select('phone_hash, step, resource_type')
    .eq('phone_hash', phoneHash)
    .single()

  if (error || !data) return null
  return data as SmsSession
}

export async function upsertSession(
  phoneHash: string,
  update: Partial<Pick<SmsSession, 'step' | 'resource_type'>>
): Promise<void> {
  const { error } = await supabase.from('sms_sessions').upsert(
    { phone_hash: phoneHash, ...update, updated_at: new Date().toISOString() },
    { onConflict: 'phone_hash' }
  )
  if (error) throw new Error(error.message)
}

export async function clearSession(phoneHash: string): Promise<void> {
  await upsertSession(phoneHash, { step: 'menu' as SmsStep, resource_type: null as unknown as ResourceType })
}
