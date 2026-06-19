export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW'
export type CaseStatus = 'active' | 'resolved'
export type MessageDirection = 'inbound' | 'outbound'
export type ResourceType = 'shelter' | 'food' | 'legal' | 'medical' | 'emergency' | 'jobs'
export type SmsStep = 'menu' | 'awaiting_type' | 'awaiting_state' | 'complete'

export interface HelpCenter {
  id: string
  name: string
  type: ResourceType
  state: string
  lga: string | null
  address: string | null
  phone: string
  lat: number | null
  lng: number | null
  is_active: boolean
}

export interface Case {
  id: string
  phone_hash: string
  risk_level: RiskLevel
  resource_type: ResourceType
  status: CaseStatus
  summary: string
  center_id: string | null
  center?: HelpCenter
  created_at: string
  resolved_at: string | null
}

export interface Message {
  id: string
  case_id: string
  direction: MessageDirection
  body: string
  created_at: string
}

export interface SmsSession {
  phone_hash: string
  step: SmsStep
  resource_type: ResourceType | null
}

export interface GeminiAnalysis {
  risk_level: RiskLevel
  summary: string
}
