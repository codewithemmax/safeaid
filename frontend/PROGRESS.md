# SafeAid Frontend — Progress Tracker

## Phase 1 — Layout Shell
- [x] U4.1 — Next.js setup + layout.tsx (dark sidebar + white main area), Sidebar.tsx (wordmark, nav, Responsible AI note)

## Phase 2 — Component Library (mock data)
- [x] U4.2 — RiskBadge.tsx, ResourceBadge.tsx
- [x] U4.3 — StatsHeader.tsx (Total Active, High Risk, Resolved Today)
- [x] U4.4 — CaseCard.tsx (coloured left border, badges, AI summary, routing block, timestamp, links to detail page)
- [x] U4.5 — app/page.tsx (StatsHeader + 4 mock case cards)
- [x] U4.6 — app/help-centers/page.tsx (center cards: name, type badge, state, phone, Get Directions)

## Phase 3 — Case Detail
- [x] U5.1 — MessageBubble.tsx (inbound left/grey, outbound right/orange, AI label)
- [x] U5.2 — app/cases/[id]/page.tsx (back button, badges, AI summary, routing panel, scrollable thread, Mark Resolved)
- [x] U5.3 — VoiceTranscriptPanel.tsx (pulsing live dot, "Simulated for demo" label, 4-line transcript, added to dashboard)

## Phase 3.5 — Design overhaul + landing page (2026-06-20)
- [x] New design system: teal brand (`#0D9488`) + amber accent, replacing orange. Risk colours kept as the only warm signal. (`tailwind.config.ts`, `globals.css`)
- [x] Typography: **Fraunces** (display/wordmark) + **Plus Jakarta Sans** (UI) via `next/font/google`.
- [x] Routes restructured: landing page now at `/`; dashboard, cases, and help-centers live under a `(dashboard)` route group with a shared Sidebar + Topbar layout. Dashboard is `/dashboard`.
- [x] New: `Topbar.tsx` (auto-refresh pill + clock), `RiskMixBar.tsx` (active-case distribution), `marketing/MarketingNav.tsx`, `marketing/SmsFlowMockup.tsx`.
- [x] Elevated: Sidebar, StatsHeader, CaseCard, RiskBadge, ResourceBadge, MessageBubble, VoiceTranscriptPanel, case detail.
- [x] Landing sections: hero (SMS→safety mockup), how-it-works, responsible-AI guardrails, caseworker/network + dashboard glance, CTA band, footer. Copy is truthful (hackathon MVP; orgs framed as targets, not endorsements).
- Verified `tsc --noEmit` clean; all routes return 200 on the dev server.

## Phase 4 — Integration (not started)
- [ ] U6.1 — Replace mock cases on page.tsx with GET /api/cases
- [ ] U6.2 — Replace mock messages on case detail with GET /api/cases/:id/messages; wire resolve button
- [ ] U6.3 — Replace mock centers with GET /api/centers; add filters

`lib/api.ts` has typed fetch helpers scaffolded and ready for the U6 swap.
Set `NEXT_PUBLIC_API_URL=https://safeaid.onrender.com` in `.env.local`
(see `.env.local.example`) before wiring Phase 4.

## Rules followed
1. Fetch calls live only in `lib/api.ts`, to be called from pages — never from components.
2. No raw phone numbers anywhere; all contacts shown as "Anonymous contact •• ####".
3. Every AI-generated string (summaries, drafted replies) carries a light-blue "AI suggestion" label.
4. VoiceTranscriptPanel is explicitly labeled "Simulated for demo".
