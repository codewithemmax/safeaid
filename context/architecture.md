# Architecture

## Stack

| Layer | Technology | Role |
|---|---|---|
| Frontend | Next.js 15 (App Router), TypeScript | Caseworker dashboard — cases list, conversation view, stats |
| Styling | Tailwind CSS v3 | Utility-first styling scoped to design tokens in ui-context.md |
| Backend | Node.js 20, Express 4, TypeScript | REST API, SMS webhook handler, Gemini orchestration |
| Database | Supabase (PostgreSQL) | Persistent storage for cases and messages |
| SMS provider | Africa's Talking (sandbox) | Receives inbound SMS, sends outbound replies |
| AI | Google Gemini 1.5 Flash | Risk analysis, auto-reply generation, case summary |
| Deployment — backend | Railway (free tier) | Hosts the Express server, exposes public webhook URL |
| Deployment — frontend | Vercel (free tier) | Hosts the Next.js app |
| Crypto | Node.js built-in `crypto` | SHA-256 hashing of phone numbers before storage |

---

## Repository structure

```
safeaid/
├── CLAUDE.md
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── code-standards.md
│   ├── ai-workflow-rules.md
│   ├── ui-context.md
│   └── progress-tracker.md
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── index.ts              ← Express app entry point
│       ├── routes/
│       │   ├── webhook.ts        ← POST /webhook/sms
│       │   ├── cases.ts          ← GET/POST /api/cases
│       │   └── messages.ts       ← GET /api/cases/:id/messages
│       ├── controllers/
│       │   ├── sms.controller.ts
│       │   ├── cases.controller.ts
│       │   └── messages.controller.ts
│       ├── services/
│       │   ├── gemini.service.ts ← All Gemini API calls live here
│       │   ├── sms.service.ts    ← Africa's Talking send logic
│       │   └── hash.service.ts   ← Phone number hashing
│       ├── lib/
│       │   └── supabase.ts       ← Supabase client singleton
│       └── types/
│           └── index.ts          ← Shared TypeScript types
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── .env.local.example
    └── app/
        ├── layout.tsx
        ├── page.tsx              ← Dashboard root (cases list)
        ├── cases/
        │   └── [id]/
        │       └── page.tsx      ← Case detail + conversation thread
        └── components/
            ├── CaseCard.tsx
            ├── RiskBadge.tsx
            ├── MessageBubble.tsx
            ├── StatsHeader.tsx
            └── VoiceTranscriptPanel.tsx
```

---

## System boundaries

| Boundary | Rule |
|---|---|
| `/backend/src/routes` | Route definitions only — no business logic. Delegate immediately to the matching controller. |
| `/backend/src/controllers` | Orchestration only — call services, assemble response. No direct Supabase queries, no direct Gemini calls. |
| `/backend/src/services` | All external integrations live here. Supabase queries, Gemini calls, Africa's Talking sends, phone hashing. |
| `/backend/src/lib` | Singleton clients only (Supabase). No logic. |
| `/frontend/app` | Page components and routing only. No business logic in page files. |
| `/frontend/app/components` | All reusable UI components. No fetch calls inside components — data is passed as props from the page. |

---

## Storage model

### Supabase tables

#### `cases`
```sql
id            uuid          PRIMARY KEY DEFAULT gen_random_uuid()
phone_hash    text          NOT NULL        -- SHA-256 of raw phone, never the raw number
risk_level    text          NOT NULL        -- 'HIGH' | 'MEDIUM' | 'LOW'
status        text          NOT NULL DEFAULT 'active'  -- 'active' | 'resolved'
summary       text          NOT NULL        -- Gemini-generated 1-2 sentence summary
created_at    timestamptz   NOT NULL DEFAULT now()
resolved_at   timestamptz   NULL
```

#### `messages`
```sql
id            uuid          PRIMARY KEY DEFAULT gen_random_uuid()
case_id       uuid          NOT NULL REFERENCES cases(id) ON DELETE CASCADE
direction     text          NOT NULL  -- 'inbound' | 'outbound'
body          text          NOT NULL
created_at    timestamptz   NOT NULL DEFAULT now()
```

**What is never stored:** raw phone numbers, names, locations, or any other identifying information.

### Environment variables

#### Backend `.env`
```
PORT=3001
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
GEMINI_API_KEY=
AT_API_KEY=
AT_USERNAME=sandbox
```

#### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app
```

---

## API routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Returns `{ status: 'ok' }` — used to verify deployment |
| `POST` | `/webhook/sms` | Africa's Talking webhook — processes inbound SMS |
| `GET` | `/api/cases` | Returns all cases sorted by risk (HIGH first), then by created_at desc |
| `POST` | `/api/cases/:id/resolve` | Sets status to 'resolved', sets resolved_at to now() |
| `GET` | `/api/cases/:id/messages` | Returns all messages for a case, sorted by created_at asc |

---

## Auth model

There is **no authentication** in the MVP. The dashboard is open access. This is explicitly out of scope and must be documented in the Devpost submission as a known gap for production deployment.

Do not add auth middleware, login pages, or session handling. Do not suggest adding it mid-build.

---

## Gemini integration

- Model: `gemini-1.5-flash` (fast, free tier available)
- The prompt instructs Gemini to return **only JSON**, no markdown, no preamble
- Always wrap the Gemini call in a try/catch with a hardcoded fallback response
- The fallback: `{ risk_level: "MEDIUM", reply: "Thank you for reaching out. A caseworker will be with you shortly.", summary: "Unable to analyse — manual review required." }`
- Parse the response with `JSON.parse()`, strip any ` ```json ``` ` fences before parsing

---

## Africa's Talking integration

- Use the **sandbox** environment for the hackathon (`username: 'sandbox'`)
- The sandbox does not send real SMS — it simulates in the AT dashboard
- `AT_USERNAME` must be `'sandbox'` in `.env`
- The webhook payload from AT contains: `from`, `to`, `text`, `date`
- The backend must return HTTP 200 to AT within 5 seconds or AT will retry

---

## Invariants — rules this codebase must never violate

1. **No raw phone numbers are ever stored.** Every phone number must pass through `hash.service.ts` before it touches Supabase. If you see a raw phone number in a database insert, it is a bug.
2. **No business logic in route files.** Routes call controllers. Controllers call services. Nothing else.
3. **No Supabase queries outside of services.** Controllers and routes do not import the Supabase client directly.
4. **No Gemini calls outside `gemini.service.ts`.** All prompts, response parsing, and fallback logic live in that one file.
5. **The Gemini prompt always ends with the instruction to return only JSON.** Never let the model return free text — it will break the JSON.parse.
6. **Frontend components do not fetch data.** Pages fetch, components render. Pass data as props.
7. **The AI summary label in the UI is mandatory.** Any Gemini-generated text shown to the caseworker must be accompanied by the label "AI suggestion". Do not remove this label.
8. **The voice transcript panel is always labelled as simulated.** It must carry a visible "Simulated for demo" tag. Do not style it to look like real-time data without that label.
