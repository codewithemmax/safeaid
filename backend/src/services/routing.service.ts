import { supabase } from '../lib/supabase'

import type { HelpCenter, ResourceType } from '../types'

export async function findNearestCenter(
  state: string,
  type: ResourceType
): Promise<HelpCenter | null> {
  const { data, error } = await supabase
    .from('help_centers')
    .select('*')
    .ilike('state', state)
    .eq('type', type)
    .eq('is_active', true)
    .limit(1)
    .single()

  if (error || !data) return null
  return data as HelpCenter
}

export function formatCenterReply(center: HelpCenter): string {
  const label = center.type.charAt(0).toUpperCase() + center.type.slice(1)
  const lga = center.lga ? `${center.lga}, ` : ''
  return `Nearest ${label}: ${center.name}\n${lga}${center.state}\nCall: ${center.phone}\nTell them SafeAid sent you.`
}

export const NO_CENTER_REPLY =
  'No center found in your state yet. Call NAPTIP: 0800-NAPTIP (0800-627847)'
