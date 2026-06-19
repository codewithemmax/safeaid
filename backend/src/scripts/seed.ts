import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'

import { hashPhone } from '../services/hash.service'
import type { ResourceType, RiskLevel } from '../types'

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_KEY ?? ''
)

const helpCenters = [
  { name: 'Pathfinders Justice Initiative', type: 'shelter', state: 'Edo', lga: 'Oredo', address: '4 Ihama Road, Benin City', phone: '08035023232', lat: 6.3536, lng: 5.6145 },
  { name: 'WOTCLEF Nigeria', type: 'shelter', state: 'FCT', lga: 'Maitama', address: 'Plot 1269 Cadastral Zone, Abuja', phone: '08033000000', lat: 9.0785, lng: 7.4951 },
  { name: 'Gender Mobile Initiative', type: 'shelter', state: 'Rivers', lga: 'Port Harcourt', address: '23 Ada George Road, Port Harcourt', phone: '08140000000', lat: 4.8156, lng: 7.0498 },
  { name: 'NAPTIP Edo Zonal Command', type: 'emergency', state: 'Edo', lga: 'Oredo', address: 'Government House Road, Benin City', phone: '08007287847', lat: 6.3350, lng: 5.6264 },
  { name: 'NAPTIP Lagos Zonal Command', type: 'emergency', state: 'Lagos', lga: 'Lagos Island', address: '3 Moloney Street, Lagos Island', phone: '08007287847', lat: 6.4541, lng: 3.3947 },
  { name: 'NAPTIP Abuja HQ', type: 'emergency', state: 'FCT', lga: 'Garki', address: 'Plot 270 Cadastral Zone, Garki, Abuja', phone: '08007287847', lat: 9.0579, lng: 7.4951 },
  { name: 'FIDA Nigeria Abuja', type: 'legal', state: 'FCT', lga: 'Maitama', address: '12 Amazon Street, Maitama, Abuja', phone: '08033333333', lat: 9.0800, lng: 7.4900 },
  { name: 'FIDA Nigeria Lagos', type: 'legal', state: 'Lagos', lga: 'Victoria Island', address: '2 Kofo Abayomi Street, Victoria Island', phone: '012616710', lat: 6.4280, lng: 3.4219 },
  { name: 'Lagos Food Bank Initiative', type: 'food', state: 'Lagos', lga: 'Ogba', address: '9 Ogba Industrial Estate, Lagos', phone: '08099999999', lat: 6.6018, lng: 3.3515 },
  { name: 'Welfareville Foundation', type: 'food', state: 'FCT', lga: 'Kubwa', address: 'Phase 4, Kubwa, Abuja', phone: '08122222222', lat: 9.1469, lng: 7.3553 },
  { name: 'University of Benin Teaching Hospital', type: 'medical', state: 'Edo', lga: 'Ugbowo', address: 'PMB 1111, Ugbowo, Benin City', phone: '052600597', lat: 6.3720, lng: 5.6314 },
  { name: 'Lagos University Teaching Hospital', type: 'medical', state: 'Lagos', lga: 'Idi-Araba', address: 'Ishaga Road, Idi-Araba, Lagos', phone: '012802439', lat: 6.5158, lng: 3.3608 },
  { name: 'LSETF Skills Centre Yaba', type: 'jobs', state: 'Lagos', lga: 'Yaba', address: '5 Commercial Avenue, Yaba, Lagos', phone: '07000572538', lat: 6.5095, lng: 3.3711 },
  { name: 'NDE Lagos State Office', type: 'jobs', state: 'Lagos', lga: 'Ikeja', address: '4 Obafemi Awolowo Way, Ikeja', phone: '017640095', lat: 6.5833, lng: 3.3333 },
  { name: 'NDE Edo State Office', type: 'jobs', state: 'Edo', lga: 'Oredo', address: 'Sakponba Road, Benin City', phone: '052253400', lat: 6.3413, lng: 5.6281 },
]

const demoCases: Array<{
  phone: string
  risk_level: RiskLevel
  resource_type: ResourceType
  summary: string
  status: 'active' | 'resolved'
  centerName: string
  messages: Array<{ direction: 'inbound' | 'outbound'; body: string }>
}> = [
  {
    phone: '+2348011111001',
    risk_level: 'HIGH',
    resource_type: 'shelter',
    status: 'active',
    summary: 'Survivor reports documents confiscated and is unable to leave the compound. Immediate shelter placement required.',
    centerName: 'Pathfinders Justice Initiative',
    messages: [
      { direction: 'inbound', body: 'HELP' },
      { direction: 'outbound', body: 'SafeAid Emergency Support.\nWhat do you need? Reply:\n1 - Shelter & Safety\n2 - Food Support\n3 - Legal Aid\n4 - Medical Help\n5 - Jobs & Training\n0 - EMERGENCY (Police/NAPTIP)' },
      { direction: 'inbound', body: '1' },
      { direction: 'outbound', body: 'Which state are you in? E.g. reply LAGOS or EDO' },
      { direction: 'inbound', body: 'EDO' },
      { direction: 'outbound', body: 'Nearest Shelter: Pathfinders Justice Initiative\nOredo, Edo\nCall: 08035023232\nTell them SafeAid sent you.' },
    ],
  },
  {
    phone: '+2348011111002',
    risk_level: 'HIGH',
    resource_type: 'emergency',
    status: 'active',
    summary: 'Individual states she is unpaid and cannot leave her employer\'s house. Signs of labour trafficking — high urgency.',
    centerName: 'NAPTIP Lagos Zonal Command',
    messages: [
      { direction: 'inbound', body: 'SOS' },
      { direction: 'outbound', body: 'SafeAid Emergency Support.\nWhat do you need? Reply:\n1 - Shelter & Safety\n2 - Food Support\n3 - Legal Aid\n4 - Medical Help\n5 - Jobs & Training\n0 - EMERGENCY (Police/NAPTIP)' },
      { direction: 'inbound', body: '0' },
      { direction: 'outbound', body: 'Which state are you in? E.g. reply LAGOS or EDO' },
      { direction: 'inbound', body: 'LAGOS' },
      { direction: 'outbound', body: 'Nearest Emergency: NAPTIP Lagos Zonal Command\nLagos Island, Lagos\nCall: 08007287847\nTell them SafeAid sent you.' },
    ],
  },
  {
    phone: '+2348011111003',
    risk_level: 'MEDIUM',
    resource_type: 'legal',
    status: 'active',
    summary: 'Person seeking help escaping a difficult home situation and requesting legal advice on their rights.',
    centerName: 'FIDA Nigeria Lagos',
    messages: [
      { direction: 'inbound', body: 'I need help' },
      { direction: 'outbound', body: 'SafeAid Emergency Support.\nWhat do you need? Reply:\n1 - Shelter & Safety\n2 - Food Support\n3 - Legal Aid\n4 - Medical Help\n5 - Jobs & Training\n0 - EMERGENCY (Police/NAPTIP)' },
      { direction: 'inbound', body: '3' },
      { direction: 'outbound', body: 'Which state are you in? E.g. reply LAGOS or EDO' },
      { direction: 'inbound', body: 'LAGOS' },
      { direction: 'outbound', body: 'Nearest Legal Aid: FIDA Nigeria Lagos\nVictoria Island, Lagos\nCall: 012616710\nTell them SafeAid sent you.' },
    ],
  },
  {
    phone: '+2348011111004',
    risk_level: 'LOW',
    resource_type: 'jobs',
    status: 'active',
    summary: 'Enquiry about vocational training and employment support options available in Lagos.',
    centerName: 'LSETF Skills Centre Yaba',
    messages: [
      { direction: 'inbound', body: 'Hello' },
      { direction: 'outbound', body: 'SafeAid Emergency Support.\nWhat do you need? Reply:\n1 - Shelter & Safety\n2 - Food Support\n3 - Legal Aid\n4 - Medical Help\n5 - Jobs & Training\n0 - EMERGENCY (Police/NAPTIP)' },
      { direction: 'inbound', body: '5' },
      { direction: 'outbound', body: 'Which state are you in? E.g. reply LAGOS or EDO' },
      { direction: 'inbound', body: 'LAGOS' },
      { direction: 'outbound', body: 'Nearest Jobs: LSETF Skills Centre Yaba\nYaba, Lagos\nCall: 07000572538\nTell them SafeAid sent you.' },
    ],
  },
  {
    phone: '+2348011111005',
    risk_level: 'HIGH',
    resource_type: 'shelter',
    status: 'resolved',
    summary: 'Previous referral to Pathfinders Benin City. Survivor confirmed safe and received shelter placement.',
    centerName: 'Pathfinders Justice Initiative',
    messages: [
      { direction: 'inbound', body: 'HELP' },
      { direction: 'outbound', body: 'SafeAid Emergency Support.\nWhat do you need? Reply:\n1 - Shelter & Safety\n2 - Food Support\n3 - Legal Aid\n4 - Medical Help\n5 - Jobs & Training\n0 - EMERGENCY (Police/NAPTIP)' },
      { direction: 'inbound', body: '1' },
      { direction: 'outbound', body: 'Which state are you in? E.g. reply LAGOS or EDO' },
      { direction: 'inbound', body: 'EDO' },
      { direction: 'outbound', body: 'Nearest Shelter: Pathfinders Justice Initiative\nOredo, Edo\nCall: 08035023232\nTell them SafeAid sent you.' },
    ],
  },
]

async function seed() {
  console.error('Seeding help_centers...')

  await supabase.from('help_centers').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const { data: insertedCenters, error: centersError } = await supabase
    .from('help_centers')
    .insert(helpCenters.map((c) => ({ ...c, is_active: true })))
    .select()

  if (centersError) {
    console.error('help_centers seed failed:', centersError.message)
    process.exit(1)
  }

  console.error(`Seeded ${insertedCenters?.length ?? 0} help centers.`)

  const centerMap = new Map<string, string>(
    (insertedCenters ?? []).map((c: { name: string; id: string }) => [c.name, c.id])
  )

  console.error('Seeding demo cases...')

  for (const demo of demoCases) {
    const phoneHash = hashPhone(demo.phone)
    const centerId = centerMap.get(demo.centerName) ?? null

    const { data: caseRow, error: caseError } = await supabase
      .from('cases')
      .insert({
        phone_hash: phoneHash,
        risk_level: demo.risk_level,
        resource_type: demo.resource_type,
        status: demo.status,
        summary: demo.summary,
        center_id: centerId,
        resolved_at: demo.status === 'resolved' ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (caseError) {
      console.error(`Case seed failed for ${demo.centerName}:`, caseError.message)
      continue
    }

    const messages = demo.messages.map((m) => ({ ...m, case_id: caseRow.id }))
    const { error: msgError } = await supabase.from('messages').insert(messages)

    if (msgError) {
      console.error(`Messages seed failed for case ${caseRow.id}:`, msgError.message)
    }
  }

  console.error('Done. 15 help centers + 5 demo cases seeded.')
}

seed()
