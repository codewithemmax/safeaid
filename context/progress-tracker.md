# Progress tracker

Update this file after every meaningful implementation change.
If you are resuming from a previous session, read this file first before touching any code.

---

## Current phase

Phase 0 — Shared setup

## Current goal

Create monorepo structure, initialise both packages, and fill context files so both team members can start building in parallel.

---

## Completed

- [x] U00 — Monorepo created, CLAUDE.md written, all six context files filled
  - Repo: `safeaid/` with `/backend`, `/frontend`, `/context` folders
  - Both team members branched off `main` — Emmanuel on `emmanuel`, teammate on her branch

---

## In progress

- [ ] U01 — Supabase schema + client (Emmanuel)
- [ ] U08 — Next.js setup + layout shell (Teammate, parallel)

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

---

## Session notes

**June 19 2026 — Session 1 (both)**
- Context files written and committed to main
- Emmanuel branching to start U01 (Supabase schema)
- Teammate branching to start U08 (Next.js shell)
- Target: U01–U07 and U08–U11 complete by end of Day 1
- Emmanuel to deploy backend to Railway by end of Day 1 so teammate can start integration tomorrow morning

---

_Update this file after every unit. Do not let it go stale._
