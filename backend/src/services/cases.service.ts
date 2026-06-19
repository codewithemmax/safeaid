import { supabase } from '../lib/supabase'

import type { Case, Message, MessageDirection, ResourceType, RiskLevel } from '../types'

export async function createCase(params: {
  phone_hash: string
  risk_level: RiskLevel
  resource_type: ResourceType
  summary: string
  center_id: string | null
}): Promise<Case> {
  const { data, error } = await supabase
    .from('cases')
    .insert(params)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Case
}

export async function addMessage(params: {
  case_id: string
  direction: MessageDirection
  body: string
}): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .insert(params)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Message
}
