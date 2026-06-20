// Shared types used across pages and components.
// Keeping these centralized makes the Phase 4 swap to real API
// responses a type-compatible, low-risk change.

export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export type ResourceType = "shelter" | "food" | "legal" | "medical" | "jobs";

export interface RoutingInfo {
  resourceType: ResourceType;
  centerName: string;
  distanceKm: number;
}

export interface CaseSummary {
  id: string;
  riskLevel: RiskLevel;
  anonymizedContact: string; // never a raw phone number — see Rule 2
  aiSummary: string;
  routing: RoutingInfo;
  resolved: boolean;
  createdAt: string; // ISO timestamp
  messageCount: number;
}

export type MessageDirection = "inbound" | "outbound";

export interface Message {
  id: string;
  direction: MessageDirection;
  body: string;
  timestamp: string; // ISO timestamp
  isAiGenerated?: boolean; // true for AI-drafted outbound replies
}

export interface CaseDetail extends CaseSummary {
  messages: Message[];
}

export type CenterType = "shelter" | "ngo" | "emergency_contact";

export interface HelpCenter {
  id: string;
  name: string;
  type: CenterType;
  resourceTypes: ResourceType[];
  state: string;
  phone: string;
  mapsUrl: string;
}

export interface VoiceTranscriptLine {
  speaker: "caller" | "ai_agent";
  text: string;
  timestamp: string;
}
