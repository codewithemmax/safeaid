import { supabase } from '../lib/supabase'

import type { Case, Message, MessageDirection, ResourceType, RiskLevel } from '../types'

const RISK_ORDER: RiskLevel[] = ['HIGH', 'MEDIUM', 'LOW']

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

export async function getCases(): Promise<Case[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('*, center:help_centers(*)')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  const cases = (data ?? []) as Case[]
  cases.sort((a, b) => RISK_ORDER.indexOf(a.risk_level) - RISK_ORDER.indexOf(b.risk_level))
  return cases
}

export async function resolveCase(id: string): Promise<void> {
  const { error } = await supabase
    .from('cases')
    .update({ status: 'resolved', resolved_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function getMessages(caseId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at', { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? []) as Message[]
}
