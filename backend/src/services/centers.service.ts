import { supabase } from '../lib/supabase'

import type { HelpCenter, ResourceType } from '../types'

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function getCenters(state?: string, type?: ResourceType): Promise<HelpCenter[]> {
  let query = supabase.from('help_centers').select('*').eq('is_active', true)

  if (state) query = query.ilike('state', state)
  if (type) query = query.eq('type', type)

  const { data, error } = await query.order('name', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as HelpCenter[]
}

export async function getCentersNearby(
  lat: number,
  lng: number,
  type?: ResourceType
): Promise<Array<HelpCenter & { distance_km: number }>> {
  let query = supabase
    .from('help_centers')
    .select('*')
    .eq('is_active', true)
    .not('lat', 'is', null)
    .not('lng', 'is', null)

  if (type) query = query.eq('type', type)

  const { data, error } = await query
  if (error) throw new Error(error.message)

  return ((data ?? []) as HelpCenter[])
    .map((c) => ({
      ...c,
      distance_km: haversineKm(lat, lng, c.lat as number, c.lng as number),
    }))
    .sort((a, b) => a.distance_km - b.distance_km)
}
