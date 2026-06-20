# Progress tracker

Update this file after every meaningful implementation change.
If you are resuming from a previous session, read this file first before touching any code.

---

## Current phase

Phase 3 — Backend: REST API & Data

## Current goal

All REST endpoints live. Seed script ready. Deploy to Railway and share URL with frontend teammate.

---

## Completed

- [x] U00 — Monorepo created, CLAUDE.md written, all six context files filled
  - Repo: `safeaid/` with `/backend`, `/frontend`, `/context` folders
  - Both team members branched off `main` — Emmanuel on `emmanuel`, teammate on her branch
- [x] U01 — Supabase schema + client
  - `backend/src/lib/supabase.ts` — singleton client using SUPABASE_URL + SUPABASE_SERVICE_KEY
  - `backend/src/types/index.ts` — all types including ResourceType, SmsStep, HelpCenter, SmsSession
- [x] U02 — Express server scaffold
  - `backend/src/index.ts` — cors, express.json, express.urlencoded, GET /api/health
- [x] U03 — Phone hash service
  - `backend/src/services/hash.service.ts` — SHA-256 via Node crypto
- [x] U04 — AT webhook receiver
  - `backend/src/services/sms.service.ts` — sendSms via AT sandbox
  - `backend/src/routes/webhook.ts` — POST /webhook/sms
  - `backend/src/controllers/sms.controller.ts` — returns 200 immediately, async state machine
- [x] U05 — SMS session service
  - `backend/src/services/session.service.ts` — getSession, upsertSession, clearSession, MENU_MESSAGE
- [x] U06 — Help center routing service
  - `backend/src/services/routing.service.ts` — findNearestCenter, formatCenterReply, NO_CENTER_REPLY
- [x] U07 — Gemini risk analysis service
  - `backend/src/services/gemini.service.ts` — analyseMessage, FALLBACK, risk+summary only
- [x] U08 — Full SMS state machine
  - `backend/src/services/cases.service.ts` — createCase, addMessage
  - State machine: menu → awaiting_type → awaiting_state → complete
- [x] U09 — Cases API
  - `cases.service.ts` extended — getCases (with center join, HIGH→MEDIUM→LOW sort), resolveCase
  - `backend/src/controllers/cases.controller.ts` — listCases, resolveCaseHandler
  - `backend/src/routes/cases.ts` — GET /api/cases, POST /api/cases/:id/resolve
- [x] U10 — Messages API
  - `cases.service.ts` extended — getMessages (sorted by created_at asc)
  - `backend/src/controllers/messages.controller.ts` — listMessages
  - `backend/src/routes/messages.ts` — GET /api/cases/:id/messages
- [x] U11 — Help Centers API
  - `backend/src/services/centers.service.ts` — getCenters (filter by state/type), getCentersNearby (Haversine sort)
  - `backend/src/controllers/centers.controller.ts` — listCenters, nearbyCenters
  - `backend/src/routes/centers.ts` — GET /api/centers, GET /api/centers/nearby
- [x] U12 — Seed script
  - `backend/src/scripts/seed.ts` — 15 real Nigerian orgs across 5 states + 5 demo cases with full message threads

---

## In progress

- [ ] Phase 3 deployment — run seed script, deploy to Railway, share URL with frontend

---

## Next up

Backend (Emmanuel — in order):
- U02 — Express server scaffold
- U03 — Africa's Talking SMS webhook (receive + parse only, no Gemini yet)
- U04 — Gemini risk analysis (isolated service, tested with curl)
- U05 — Wire webhook → Gemini → Supabase → AT reply (full flow)
- U06 — Cases + Messages API endpoints
- U07 — Seed demo data + deploy to Railway

Frontend (Teammate — in order, can start today):
- U09 — Cases list + alert cards with mock data
- U10 — SMS conversation view with mock messages
- U11 — Voice transcript panel (static, simulated)

Integration (both — Day 2 morning):
- U12 — Connect cases list to real API
- U13 — Connect conversation to real API + wire resolve button

Wrap-up (both — Day 2 afternoon):
- U14 — Demo script + Loom recording
- U15 — Devpost submission writeup

---

## Open questions

- [ ] Africa's Talking sandbox number — Emmanuel to register and confirm the sandbox number in the AT dashboard before U03
- [ ] Railway deployment URL — needed before teammate can swap mock data for real API in U12. Emmanuel to share the Railway URL after U07.
- [ ] Decide: does the demo show the SMS arriving live (send from a real phone to the AT simulator), or do we trigger it programmatically? Settle this before U14.

---

## Architecture decisions

| Decision | Reason | Date |
|---|---|---|
| Africa's Talking over Termii | AT has a free sandbox, better documentation, and works without carrier approval | June 19 2026 |
| Gemini 1.5 Flash over GPT-4o | Emmanuel's existing Gemini API key, free tier sufficient for hackathon, lower latency | June 19 2026 |
| Polling (5s) over WebSocket | Simpler, no additional infra, sufficient for demo purposes | June 19 2026 |
| No auth in MVP | Out of scope per project-overview.md, will be noted in Devpost as known gap | June 19 2026 |
| Voice hotline simulated | Twilio Voice setup would take 4–6 hours — not worth it for one demo screen | June 19 2026 |
| SHA-256 for phone hashing | Node built-in, no additional dependency, one-way, sufficient for demo-level privacy | June 19 2026 |
| Brand moved orange → **teal** (`#0D9488`) + amber accent | Orange competed with the risk signal (the brief's #1 rule). Teal frees the warm spectrum for risk alone and matches crisis/anti-trafficking colour language (Polaris, UN Blue Heart). User-authorised redesign. | June 20 2026 |
| Typography: **Fraunces** (display) + **Plus Jakarta Sans** (UI) | Deliberate, humane pairing — replaces default Inter to read as crafted, not generic. | June 20 2026 |
| Added public **landing page** at `/`; dashboard moved to `/dashboard` via a `(dashboard)` route group | User requested a marketing/landing surface. Dashboard pages share a sidebar layout under the route group; the root layout is now shell-free. | June 20 2026 |

---

## Session notes

**June 19 2026 — Session 1 (both)**
- Context files written and committed to main
- Emmanuel branching to start U01 (Supabase schema)
- Teammate branching to start U08 (Next.js shell)
- Target: U01–U07 and U08–U11 complete by end of Day 1
- Emmanuel to deploy backend to Railway by end of Day 1 so teammate can start integration tomorrow morning

**June 20 2026 — Frontend design overhaul (Emmanuel, on `main`)**
- Frontend Phases 1–3 (U4.x/U5.x) were already complete with mock data and spec-faithful — but read as "AI-generated" (literal execution of the brief).
- Reworked the whole frontend design system + added a landing page (see Architecture Decisions above for the teal/typography/landing calls).
- `npm install` was missing → installed deps. Dev server runs via `node node_modules/next/dist/bin/next dev` (`next` not on PATH; SWC falls back after a slow native download — harmless).
- Verified: `tsc --noEmit` clean; `/`, `/dashboard`, `/help-centers`, `/cases/[id]` all compile and return 200.
- **Still mock data** — Phase 4 integration (U6.x) against `https://safeaid.onrender.com` not yet wired. `lib/api.ts` remains the scaffold to swap in.
- Note for teammate: the documented orange palette / "no landing page" intent has changed — `context/ui-context.md` and `frontend/PROGRESS.md` updated to match.

---

_Update this file after every unit. Do not let it go stale._
