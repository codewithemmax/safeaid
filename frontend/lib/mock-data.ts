import {
  CaseDetail,
  CaseSummary,
  HelpCenter,
  VoiceTranscriptLine,
} from "./types";

// ---------------------------------------------------------------------------
// Phase 1–3 mock data. Shapes mirror the real API responses described in the
// brief (GET /api/cases, GET /api/cases/:id/messages, GET /api/centers) so
// Phase 4 can swap these for fetch() calls with minimal type churn.
// ---------------------------------------------------------------------------

export const mockCases: CaseSummary[] = [
  {
    id: "c-1042",
    riskLevel: "MEDIUM",
    anonymizedContact: "Anonymous contact •• 4821",
    aiSummary:
      "Caller describes being held against their will at a residence in Agege and unable to leave. Expressed fear of being overheard. Immediate shelter requested. EMERGENCY CALL INITIATED.",
    routing: {
      resourceType: "emergency",
      centerName: "Emergency Response — NAPTIP",
      distanceKm: 6.2,
    },
    resolved: false,
    createdAt: "2026-06-20T07:12:00+01:00",
    messageCount: 6,
  },
  {
    id: "c-1041",
    riskLevel: "MEDIUM",
    anonymizedContact: "Anonymous contact •• 1187",
    aiSummary:
      "Caller reports unpaid wages and confiscated documents from a previous employer. Seeking legal guidance and document recovery support.",
    routing: {
      resourceType: "legal",
      centerName: "WOTCLEF Legal Aid Desk",
      distanceKm: 11.8,
    },
    resolved: false,
    createdAt: "2026-06-20T05:48:00+01:00",
    messageCount: 4,
  },
  {
    id: "c-1039",
    riskLevel: "LOW",
    anonymizedContact: "Anonymous contact •• 0356",
    aiSummary:
      "Follow-up from a previously resolved case requesting information on vocational training programs and job placement support.",
    routing: {
      resourceType: "jobs",
      centerName: "NAPTIP Skills Acquisition Programme",
      distanceKm: 4.5,
    },
    resolved: false,
    createdAt: "2026-06-19T19:21:00+01:00",
    messageCount: 3,
  },
  {
    id: "c-1035",
    riskLevel: "MEDIUM",
    anonymizedContact: "Anonymous contact •• 7790",
    aiSummary:
      "Caller requested food and short-term medical support after leaving an unsafe living situation two days ago. Currently staying with a relative in Ikorodu.",
    routing: {
      resourceType: "medical",
      centerName: "Lagos State Primary Health Centre, Ikorodu",
      distanceKm: 2.1,
    },
    resolved: true,
    createdAt: "2026-06-18T14:03:00+01:00",
    messageCount: 9,
  },
];

const messagesByCaseId: Record<string, CaseDetail["messages"]> = {
  "c-1042": [
    {
      id: "m-1",
      direction: "inbound",
      body: "Please I need help. I cannot leave this house.",
      timestamp: "2026-06-20T07:08:00+01:00",
    },
    {
      id: "m-2",
      direction: "outbound",
      body: "I'm here with you. Are you in a safe enough position to keep texting right now?",
      timestamp: "2026-06-20T07:09:00+01:00",
      isAiGenerated: true,
    },
    {
      id: "m-3",
      direction: "inbound",
      body: "Yes for now. They are not around.",
      timestamp: "2026-06-20T07:10:00+01:00",
    },
    {
      id: "m-4",
      direction: "outbound",
      body: "Thank you for telling me. What state or area are you in, if you know it?",
      timestamp: "2026-06-20T07:10:00+01:00",
      isAiGenerated: true,
    },
    {
      id: "m-5",
      direction: "inbound",
      body: "Agege, Lagos.",
      timestamp: "2026-06-20T07:11:00+01:00",
    },
    {
      id: "m-6",
      direction: "outbound",
      body: "I've found a verified safe house near you and alerted a caseworker. They will reach out shortly with next steps. An emergency call has been initiated for your protection.",
      timestamp: "2026-06-20T07:12:00+01:00",
      isAiGenerated: true,
    },
  ],
  "c-1041": [
    {
      id: "m-1",
      direction: "inbound",
      body: "My former employer is keeping my papers and never paid me for three months.",
      timestamp: "2026-06-20T05:44:00+01:00",
    },
    {
      id: "m-2",
      direction: "outbound",
      body: "I'm sorry you're dealing with this. Do you still have any contact information for the employer?",
      timestamp: "2026-06-20T05:45:00+01:00",
      isAiGenerated: true,
    },
    {
      id: "m-3",
      direction: "inbound",
      body: "Yes I have their address.",
      timestamp: "2026-06-20T05:47:00+01:00",
    },
    {
      id: "m-4",
      direction: "outbound",
      body: "I've connected you with a legal aid desk that handles document recovery and unpaid wage claims. A caseworker will follow up today.",
      timestamp: "2026-06-20T05:48:00+01:00",
      isAiGenerated: true,
    },
  ],
  "c-1039": [
    {
      id: "m-1",
      direction: "inbound",
      body: "Hello, thank you for the help before. Do you know any place I can learn a skill?",
      timestamp: "2026-06-19T19:18:00+01:00",
    },
    {
      id: "m-2",
      direction: "outbound",
      body: "Glad to hear from you again! There's a skills acquisition programme close to you with openings this month.",
      timestamp: "2026-06-19T19:20:00+01:00",
      isAiGenerated: true,
    },
    {
      id: "m-3",
      direction: "outbound",
      body: "I've shared their contact with your caseworker so they can help you register.",
      timestamp: "2026-06-19T19:21:00+01:00",
      isAiGenerated: true,
    },
  ],
  "c-1035": [
    {
      id: "m-1",
      direction: "inbound",
      body: "I left two days ago and I'm staying with my aunt. I need food and I have a wound that needs looking at.",
      timestamp: "2026-06-18T14:00:00+01:00",
    },
    {
      id: "m-2",
      direction: "outbound",
      body: "Thank you for reaching out. I'm finding the nearest health centre and a food support contact for you now.",
      timestamp: "2026-06-18T14:01:00+01:00",
      isAiGenerated: true,
    },
    {
      id: "m-3",
      direction: "inbound",
      body: "Thank you so much.",
      timestamp: "2026-06-18T14:02:00+01:00",
    },
    {
      id: "m-4",
      direction: "outbound",
      body: "A caseworker has been notified and will call your aunt's line within the hour.",
      timestamp: "2026-06-18T14:03:00+01:00",
      isAiGenerated: true,
    },
  ],
};

export function getMockCaseDetail(id: string): CaseDetail | undefined {
  const summary = mockCases.find((c) => c.id === id);
  if (!summary) return undefined;
  return {
    ...summary,
    messages: messagesByCaseId[id] ?? [],
  };
}

export const mockHelpCenters: HelpCenter[] = [
  {
    id: "hc-1",
    name: "Pathfinders Justice Initiative — Lagos Safe House",
    type: "shelter",
    resourceTypes: ["shelter", "legal"],
    state: "Lagos",
    phone: "Available via caseworker referral",
    mapsUrl: "https://maps.google.com/?q=Pathfinders+Justice+Initiative+Lagos",
  },
  {
    id: "hc-2",
    name: "WOTCLEF Legal Aid Desk",
    type: "ngo",
    resourceTypes: ["legal"],
    state: "Lagos",
    phone: "Available via caseworker referral",
    mapsUrl: "https://maps.google.com/?q=WOTCLEF+Lagos",
  },
  {
    id: "hc-3",
    name: "NAPTIP Skills Acquisition Programme",
    type: "ngo",
    resourceTypes: ["jobs"],
    state: "Lagos",
    phone: "Available via caseworker referral",
    mapsUrl: "https://maps.google.com/?q=NAPTIP+Lagos",
  },
  {
    id: "hc-4",
    name: "Lagos State Primary Health Centre, Ikorodu",
    type: "emergency_contact",
    resourceTypes: ["medical"],
    state: "Lagos",
    phone: "Available via caseworker referral",
    mapsUrl: "https://maps.google.com/?q=Primary+Health+Centre+Ikorodu",
  },
  {
    id: "hc-5",
    name: "Lagos Food Bank Initiative",
    type: "ngo",
    resourceTypes: ["food"],
    state: "Lagos",
    phone: "Available via caseworker referral",
    mapsUrl: "https://maps.google.com/?q=Lagos+Food+Bank+Initiative",
  },
  {
    id: "hc-6",
    name: "NASSCO Survivor Support Centre, Abuja",
    type: "shelter",
    resourceTypes: ["shelter", "medical"],
    state: "FCT — Abuja",
    phone: "Available via caseworker referral",
    mapsUrl: "https://maps.google.com/?q=NASSCO+Abuja",
  },
];

export const mockVoiceTranscript: VoiceTranscriptLine[] = [
  {
    speaker: "ai_agent",
    text: "Thank you for calling. You're speaking with the SafeAid line — can you tell me if you're safe right now?",
    timestamp: "00:00",
  },
  {
    speaker: "caller",
    text: "I think so, for now. I don't have much time to talk.",
    timestamp: "00:06",
  },
  {
    speaker: "ai_agent",
    text: "Understood. I'll keep this quick. What area are you calling from?",
    timestamp: "00:11",
  },
  {
    speaker: "caller",
    text: "Somewhere near Agege.",
    timestamp: "00:17",
  },
];
