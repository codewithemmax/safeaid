# SafeAid — Implementation Units

This document breaks down the SafeAid architecture into isolated, verifiable implementation units. Only one unit should be worked on at a time. Complete one unit fully before starting the next.

Commit format: `feat(U#.#): short description`

---

## Phase 0: Project Setup

- [ ] **Unit 0.1: Monorepo Scaffold**
  - Create `/backend`, `/frontend`, `/context` folders in the repo root.
  - Add `.gitignore` covering `node_modules`, `.env`, `.env.local`, `.next`, `dist`.
  - Add `README.md` with project name, one-paragraph description, stack, and repo structure.
  - Create `emmanuel` branch from `main`. Teammate (Ibrahim) creates her own branch from `main`.

---

## Phase 1: Backend — Storage & Server Foundation

- [ ] **Unit 1.1: Supabase Schema & Client**
  - Create a Supabase project and run the following SQL:

    ```sql
    -- Anonymous case records (no survivor PII)
    create table cases (
      id            uuid        primary key default gen_random_uuid(),
      phone_hash    text        not null,
      risk_level    text        not null check (risk_level in ('HIGH', 'MEDIUM', 'LOW')),
      resource_type text        not null check (resource_type in ('shelter', 'food', 'legal', 'medical', 'emergency', 'jobs')),
      status        text        not null default 'active' check (status in ('active', 'resolved')),
      summary       text        not null,
      center_id     uuid        references help_centers(id),
      created_at    timestamptz not null default now(),
      resolved_at   timestamptz null
    );

    -- SMS conversation thread per case
    create table messages (
      id         uuid        primary key default gen_random_uuid(),
      case_id    uuid        not null references cases(id) on delete cascade,
      direction  text        not null check (direction in ('inbound', 'outbound')),
      body       text        not null,
      created_at timestamptz not null default now()
    );

    -- SMS session state machine (tracks menu step per phone)
    create table sms_sessions (
      id            uuid        primary key default gen_random_uuid(),
      phone_hash    text        not null unique,
      step          text        not null default 'menu',
      -- 'menu' | 'awaiting_type' | 'awaiting_state' | 'complete'
      resource_type text        null,
      -- 'shelter' | 'food' | 'legal' | 'medical' | 'emergency' | 'jobs'
      updated_at    timestamptz not null default now()
    );

    -- Verified help centers and NGOs
    create table help_centers (
      id        uuid    primary key default gen_random_uuid(),
      name      text    not null,
      type      text    not null check (type in ('shelter', 'food', 'legal', 'medical', 'emergency', 'jobs')),
      state     text    not null,
      lga       text,
      address   text,
      phone     text    not null,
      lat       numeric null,
      lng       numeric null,
      is_active boolean not null default true
    );
    ```

  - Install `@supabase/supabase-js`.
  - Create `backend/src/lib/supabase.ts` — singleton Supabase client using `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`.
  - Create `backend/src/types/index.ts`:
    ```typescript
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
    ```
  - Verify: test insert and select on all four tables runs without error.

- [ ] **Unit 1.2: Express Server Scaffold**
  - Install `express`, `cors`, `dotenv`, `tsx`.
  - Create `backend/src/index.ts` — Express app with `cors()`, `express.json()` middleware.
  - Register `GET /api/health` returning `{ status: 'ok' }`.
  - Add `dev` script: `tsx watch src/index.ts`.
  - Verify: `curl http://localhost:3001/api/health` returns `{"status":"ok"}`.

- [ ] **Unit 1.3: Phone Hash Service**
  - Create `backend/src/services/hash.service.ts`.
  - Export `hashPhone(phone: string): string` using Node built-in `crypto` SHA-256.
  - Verify: `hashPhone('+2348012345678')` returns a consistent 64-character hex string.

---

## Phase 2: Backend — SMS State Machine & AI Gateway

- [ ] **Unit 2.1: Africa's Talking Webhook Receiver**
  - Create Africa's Talking account, get sandbox API key.
  - Install `africastalking`.
  - Create `backend/src/services/sms.service.ts` — export `sendSms(to: string, message: string)`.
  - Create `backend/src/routes/webhook.ts` — `POST /webhook/sms`.
  - Create `backend/src/controllers/sms.controller.ts` — parse AT body (`from`, `text`), log values, return 200 immediately.
  - Wire route into `index.ts`.
  - Verify: test SMS in AT sandbox simulator hits the webhook and logs `from` and `text`.

- [ ] **Unit 2.2: SMS Session Service**
  - Create `backend/src/services/session.service.ts`.
  - Export the following functions:
    - `getSession(phoneHash): Promise<SmsSession | null>` — fetch current step for this phone
    - `upsertSession(phoneHash, update: Partial<SmsSession>): Promise<void>` — create or update session row
    - `clearSession(phoneHash): Promise<void>` — reset to 'menu' step
  - Export `MENU_MESSAGE` constant:
    ```
    "SafeAid Emergency Support.
    What do you need? Reply:
    1 - Shelter & Safety
    2 - Food Support
    3 - Legal Aid
    4 - Medical Help
    5 - Jobs & Training
    0 - EMERGENCY (Police/NAPTIP)"
    ```
  - Verify: upsert creates a session row in Supabase. Get retrieves the correct step.

- [ ] **Unit 2.3: Help Center Routing Service**
  - Create `backend/src/services/routing.service.ts`.
  - Export `findNearestCenter(state: string, type: ResourceType): Promise<HelpCenter | null>`.
  - Query `help_centers` filtered by `state` (case-insensitive) and `type`, return first active result.
  - Export `formatCenterReply(center: HelpCenter): string` — formats a ≤160 char SMS reply:
    ```
    "Nearest [type]: [name]
    [lga], [state]
    Call: [phone]
    Tell them SafeAid sent you."
    ```
  - If no center found: return `"No center found in your state yet. Call NAPTIP: 0800-NAPTIP (0800-627847)"`.
  - Verify: `findNearestCenter('edo', 'shelter')` returns Pathfinders from seeded data.

- [ ] **Unit 2.4: Gemini Risk Analysis Service**
  - Install `@google/generative-ai`.
  - Create `backend/src/services/gemini.service.ts`.
  - Export `analyseMessage(text: string): Promise<GeminiAnalysis>`.
  - Note: Gemini only handles risk level and summary for the caseworker dashboard.
    Routing is handled by the session state machine, NOT by Gemini.
  - Prompt:
    ```
    You are a trauma-informed analyst for a survivor support organisation.
    A person sent this SMS: "${text}"
    Return a JSON object with:
    - risk_level: "HIGH" (immediate danger/coercion), "MEDIUM" (distress/vulnerability), or "LOW" (general enquiry)
    - summary: 1-2 sentences for a caseworker describing the situation.
    Return only valid JSON. No markdown, no backticks, no explanation.
    ```
  - Hardcoded fallback:
    ```typescript
    const FALLBACK: GeminiAnalysis = {
      risk_level: 'MEDIUM',
      summary: 'Automated analysis unavailable — manual review required.'
    }
    ```
  - Verify: `analyseMessage('I am being held against my will')` returns `risk_level: 'HIGH'`.

- [ ] **Unit 2.5: Full SMS State Machine Flow**
  - Create `backend/src/services/cases.service.ts` — export `createCase()` and `addMessage()`.
  - Update `sms.controller.ts` to implement the full state machine:

    ```
    STEP 1 — Any first message or keyword SOS/HELP:
      → Send MENU_MESSAGE
      → Upsert session: step = 'awaiting_type'

    STEP 2 — User replies 0-5 (resource type selection):
      → Map digit to ResourceType
        0 → 'emergency', 1 → 'shelter', 2 → 'food',
        3 → 'legal', 4 → 'medical', 5 → 'jobs'
      → Update session: resource_type = selected, step = 'awaiting_state'
      → Reply: "Which state are you in? E.g. reply LAGOS or EDO"

    STEP 3 — User replies with a state name:
      → Find nearest center via findNearestCenter(state, resource_type)
      → Call analyseMessage(all messages joined) for risk level + summary
      → Create case row (phone_hash, risk_level, resource_type, summary, center_id)
      → Add inbound message to messages table
      → Add outbound reply to messages table
      → Send formatted center reply via AT
      → Update session: step = 'complete'

    FALLBACK — Unrecognised input at any step:
      → Resend MENU_MESSAGE, reset session to 'awaiting_type'
    ```

  - Critical: return 200 immediately, run all async work after:
    ```typescript
    res.status(200).send()
    handleIncomingSms(from, text).catch(console.error)
    ```
  - Verify: full flow — send "HELP" → receive menu → reply "1" → receive state prompt → reply "EDO" → receive center info. Case and messages appear in Supabase.

---

## Phase 3: Backend — REST API & Data

- [ ] **Unit 3.1: Cases API**
  - Add `getCases()`, `resolveCase(id)` to `cases.service.ts`.
  - Create `backend/src/routes/cases.ts` and `backend/src/controllers/cases.controller.ts`.
  - `GET /api/cases` — returns active cases with `center` joined, sorted HIGH → MEDIUM → LOW:
    ```typescript
    const RISK_ORDER: RiskLevel[] = ['HIGH', 'MEDIUM', 'LOW']
    cases.sort((a, b) => RISK_ORDER.indexOf(a.risk_level) - RISK_ORDER.indexOf(b.risk_level))
    ```
  - `POST /api/cases/:id/resolve` — sets `status = 'resolved'`, `resolved_at = now()`.
  - Verify: `GET /api/cases` returns cases with nested center object. HIGH cases first.

- [ ] **Unit 3.2: Messages API**
  - Add `getMessages(caseId)` to `cases.service.ts`.
  - Create `backend/src/routes/messages.ts` and `backend/src/controllers/messages.controller.ts`.
  - `GET /api/cases/:id/messages` — returns messages sorted by `created_at` asc.
  - Verify: returns correct chronological message thread.

- [ ] **Unit 3.3: Help Centers API**
  - Create `backend/src/services/centers.service.ts`.
  - Create `backend/src/routes/centers.ts` and `backend/src/controllers/centers.controller.ts`.
  - `GET /api/centers?state=&type=` — returns filtered active help centers.
  - `GET /api/centers/nearby?lat=&lng=&type=` — returns centers sorted by distance from coordinates using Haversine formula:
    ```typescript
    function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
      const R = 6371
      const dLat = ((lat2 - lat1) * Math.PI) / 180
      const dLng = ((lng2 - lng1) * Math.PI) / 180
      const a = Math.sin(dLat / 2) ** 2 +
                Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLng / 2) ** 2
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    }
    ```
  - Verify: `GET /api/centers?state=edo&type=shelter` returns Pathfinders. `GET /api/centers/nearby?lat=6.3&lng=5.6&type=shelter` returns closest center by distance.

- [ ] **Unit 3.4: Seed Script & Deployment**
  - Create `backend/src/scripts/seed.ts`.
  - Seed `help_centers` with at least 15 real verified organisations across 5+ states:

    | Name | Type | State | LGA | Phone |
    |---|---|---|---|---|
    | Pathfinders Justice Initiative | shelter | Edo | Oredo | 08035023232 |
    | WOTCLEF Nigeria | shelter | FCT | Maitama | 08033000000 |
    | NAPTIP Edo Zonal Command | emergency | Edo | Oredo | 08007287847 |
    | NAPTIP Lagos Zonal Command | emergency | Lagos | Lagos Island | 08007287847 |
    | NAPTIP Abuja HQ | emergency | FCT | Garki | 08007287847 |
    | LSETF Skills Centre Yaba | jobs | Lagos | Yaba | 07000572538 |
    | NDE Lagos State Office | jobs | Lagos | Ikeja | 017640095 |
    | NDE Edo State Office | jobs | Edo | Oredo | 052253400 |
    | FIDA Nigeria Abuja | legal | FCT | Maitama | 08033333333 |
    | FIDA Nigeria Lagos | legal | Lagos | Victoria Island | 012616710 |
    | Lagos Food Bank Initiative | food | Lagos | Ogba | 08099999999 |
    | Welfareville Foundation | food | FCT | Kubwa | 08122222222 |
    | University of Benin Teaching Hospital | medical | Edo | Ugbowo | 052600597 |
    | Lagos University Teaching Hospital | medical | Lagos | Idi-Araba | 012802439 |
    | Gender Mobile Initiative | shelter | Rivers | Port Harcourt | 08140000000 |

  - Seed 5 demo cases (with messages) as before, each referencing a real `center_id`.
  - Deploy backend to Railway, confirm health check passes.
  - Verify: 15+ centers in Supabase. SMS flow routes to a real center name and phone.

---

## Phase 4: Frontend — Layout & Dashboard UI

- [ ] **Unit 4.1: Next.js Setup & Layout Shell**
  - `cd frontend && npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"`.
  - Clear default page and styles.
  - Build main layout: dark sidebar (`bg-slate-900`, 240px) + white main area.
  - Sidebar: SafeAid logo, nav links (Dashboard, Help Centers, Resolved), "Responsible AI" footnote.
  - Verify: `npm run dev` starts. Sidebar renders correctly.

- [ ] **Unit 4.2: Risk Badge & Resource Type Badge Components**
  - Create `app/components/RiskBadge.tsx` — `HIGH` / `MEDIUM` / `LOW` / `RESOLVED` pill:
    ```tsx
    const riskStyles = {
      HIGH:     'bg-red-50 text-red-800 border border-red-200',
      MEDIUM:   'bg-amber-50 text-amber-800 border border-amber-200',
      LOW:      'bg-green-50 text-green-800 border border-green-200',
      RESOLVED: 'bg-slate-100 text-slate-500 border border-slate-200',
    }
    ```
  - Create `app/components/ResourceBadge.tsx` — `shelter` / `food` / `legal` / `medical` / `emergency` / `jobs` pill with icon:
    ```tsx
    const resourceStyles = {
      shelter:   { label: 'Shelter',   classes: 'bg-purple-50 text-purple-800 border border-purple-200' },
      food:      { label: 'Food',      classes: 'bg-orange-50 text-orange-800 border border-orange-200' },
      legal:     { label: 'Legal Aid', classes: 'bg-blue-50 text-blue-800 border border-blue-200' },
      medical:   { label: 'Medical',   classes: 'bg-pink-50 text-pink-800 border border-pink-200' },
      emergency: { label: 'Emergency', classes: 'bg-red-50 text-red-800 border border-red-200' },
      jobs:      { label: 'Jobs',      classes: 'bg-teal-50 text-teal-800 border border-teal-200' },
    }
    ```
  - Verify: all variants render with correct colours.

- [ ] **Unit 4.3: Stats Header Component**
  - Create `app/components/StatsHeader.tsx`.
  - Accept `total: number`, `highRisk: number`, `resolvedToday: number` props.
  - Render three metric cards: Total Active, High Risk, Resolved Today.
  - Verify: three cards render with passed-in numbers.

- [ ] **Unit 4.4: Case Card Component**
  - Create `app/components/CaseCard.tsx`.
  - Accept `id`, `riskLevel`, `resourceType`, `summary`, `createdAt`, `messageCount`, `center` props.
  - Structure:
    - 3px left border in risk colour
    - `RiskBadge` + `ResourceBadge` top-right (both visible)
    - AI summary block with "AI suggestion" label
    - Routing block showing the recommended center:
      ```tsx
      {center && (
        <div className="mt-2 flex items-start gap-2 rounded-md bg-slate-50 border border-slate-200 px-3 py-2">
          <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-slate-700">{center.name}</p>
            <p className="text-xs text-slate-500">{center.lga}, {center.state} · {center.phone}</p>
          </div>
        </div>
      )}
      ```
    - Timestamp bottom-left, message count bottom-right
  - Clicking card navigates to `/cases/[id]`.
  - Verify: routing block appears with real center name and phone. Both badges visible.

- [ ] **Unit 4.5: Dashboard Page (Mock Data)**
  - Update `app/page.tsx` with `'use client'`.
  - Render `StatsHeader` + list of hardcoded mock cases (2 HIGH, 1 MEDIUM, 1 LOW) using `CaseCard`.
  - Include realistic mock `center` objects in the hardcoded data.
  - Verify: all 4 cards render with risk badge, resource badge, AI summary, and routing block.

- [ ] **Unit 4.6: Help Centers Map Page**
  - Install `mapbox-gl` or use a simple embed. For hackathon speed, use a Google Maps embed iframe with center pins.
  - Create `app/help-centers/page.tsx`.
  - Fetch centers from `GET /api/centers` (hardcoded in mock first).
  - Render a list of center cards (no map library needed — list is sufficient for demo):
    - Center name, type badge, state/LGA, phone number, "Get Directions" link → `https://www.google.com/maps/search/${encodeURIComponent(center.address + ' ' + center.state)}`
  - Verify: center cards render with all fields. "Get Directions" link opens Google Maps.

---

## Phase 5: Frontend — Case Detail & Conversation View

- [ ] **Unit 5.1: Message Bubble Component**
  - Create `app/components/MessageBubble.tsx`.
  - Accept `direction: 'inbound' | 'outbound'` and `body: string` props.
  - Inbound: left-aligned, `bg-slate-100 text-slate-800 rounded-lg`.
  - Outbound: right-aligned, `bg-sky-500 text-white rounded-lg` + `"SafeAid automated reply"` label below in `text-xs text-slate-400`.
  - Verify: both variants render. Label visible on outbound only.

- [ ] **Unit 5.2: Case Detail Page (Mock Data)**
  - Create `app/cases/[id]/page.tsx`.
  - Build the detail view:
    - Back button → dashboard
    - Header: "Case #[id truncated]" + `RiskBadge` + `ResourceBadge`
    - AI summary block (labelled "AI suggestion")
    - Routing panel — full center card with name, address, phone, and Google Maps directions link:
      ```tsx
      <a
        href={`https://www.google.com/maps/search/${encodeURIComponent(center.name + ' ' + center.state)}`}
        target="_blank"
        className="text-xs text-sky-600 underline"
      >
        Get directions →
      </a>
      ```
    - Scrollable message thread using `MessageBubble` (3–4 hardcoded messages)
    - "Mark Resolved" button — visible, wired in Unit 6.2
  - Verify: routing panel shows center info and directions link. Thread shows alternating bubbles.

- [ ] **Unit 5.3: Voice Transcript Panel (Simulated)**
  - Create `app/components/VoiceTranscriptPanel.tsx`.
  - Pulsing red live dot + `"Simulated for demo"` label (always visible).
  - Pre-written 4-line transcript (alternating `AI:` / `Caller:` lines).
  - Add panel to dashboard below cases list.
  - Verify: pulse animates. "Simulated for demo" label renders and is clearly readable.

---

## Phase 6: Integration

- [ ] **Unit 6.1: Connect Dashboard to Real API**
  - Add `NEXT_PUBLIC_API_URL` to `frontend/.env.local`.
  - Update `app/page.tsx` to fetch from `GET /api/cases` every 5 seconds:
    ```tsx
    useEffect(() => {
      const load = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases`)
        if (res.ok) setCases(await res.json())
      }
      load()
      const interval = setInterval(load, 5000)
      return () => clearInterval(interval)
    }, [])
    ```
  - Update `StatsHeader` to derive counts from real cases array.
  - Verify: real seeded cases appear on dashboard. New cases appear within 10 seconds of SMS being sent. No CORS errors.

- [ ] **Unit 6.2: Connect Case Detail & Resolve Button**
  - Update `app/cases/[id]/page.tsx` to fetch real data from `GET /api/cases/:id/messages`.
  - Wire "Mark Resolved" to `POST /api/cases/:id/resolve`.
  - After resolve: navigate back to dashboard.
  - Add loading and error states.
  - Verify: real messages render in order. Resolve removes the case from dashboard on next poll.

- [ ] **Unit 6.3: Connect Help Centers Page to Real API**
  - Update `app/help-centers/page.tsx` to fetch from `GET /api/centers`.
  - Add `?state=` and `?type=` filter controls (dropdown selects).
  - Verify: filtering by state and type returns correct centers. "Get Directions" links open correctly.