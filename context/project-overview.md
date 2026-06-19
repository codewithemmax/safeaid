# Project overview

## What SafeAid is

SafeAid is an AI-powered triage and case-management tool for survivor support organisations in Nigeria.
It gives caseworkers a real-time dashboard showing incoming survivor contacts, AI-generated risk assessments, and conversation threads — without ever storing personally identifiable information about survivors.

A survivor sends an SMS (e.g. "SOS" or "I need help") to the SafeAid number. The system analyses the message with Gemini, assigns a risk level, creates an anonymous case, auto-replies with a compassionate follow-up question, and surfaces the case on the caseworker dashboard instantly. The caseworker reviews the AI-generated summary and risk score, reads the conversation, and decides what action to take.

SafeAid is a **decision-support tool**. It never makes decisions for the caseworker or the survivor.

---

## Goals

1. Cut caseworker triage time from hours to minutes by surfacing incoming contacts with AI risk context instantly.
2. Enable caseworkers at organisations like Pathfinders Justice Initiative and WOTCLEF to manage more cases without missing high-risk contacts.
3. Demonstrate responsible AI design: zero PII storage, human in the loop at every decision point, AI as assistant not decision-maker.
4. Deliver a working, demoable MVP within the USAII Global AI Hackathon 2026 build window (June 14–21).

---

## Primary users

| User | Description |
|---|---|
| Caseworker | Staff at an NGO (e.g. Pathfinders, WOTCLEF) or NAPTIP task force. Uses the dashboard to monitor incoming cases, review AI summaries, and take action. |
| Survivor (indirect) | Sends SMS to the SafeAid number from any basic phone. Never directly uses the dashboard. |

The caseworker is the only person who interacts with the SafeAid web application.
The survivor only interacts via SMS.

---

## Core user flows

### Flow 1 — Survivor sends SOS SMS

1. Survivor texts any message (e.g. "SOS", "I need help", free text) to the SafeAid Africa's Talking sandbox number.
2. Africa's Talking forwards the raw SMS to `POST /webhook/sms` on the backend.
3. Backend hashes the phone number (never stores raw phone), calls Gemini with the message text.
4. Gemini returns: `risk_level` (HIGH / MEDIUM / LOW), a `reply` (≤160 chars, compassionate), and a `summary` (1–2 sentences for the caseworker).
5. Backend inserts a new row into `cases` and the inbound message into `messages`.
6. Backend sends the Gemini-generated reply back to the survivor via Africa's Talking.
7. Case appears on the dashboard within the next 5-second poll cycle.

### Flow 2 — Caseworker reviews a case

1. Caseworker opens the SafeAid dashboard.
2. Dashboard shows the cases list sorted by risk level (HIGH first), polling every 5 seconds.
3. Caseworker clicks a case card to open the detail view.
4. Detail view shows: risk badge, AI summary, full SMS conversation thread.
5. Caseworker reads the thread, decides on action, and clicks "Mark resolved".
6. Case status changes to `resolved` and moves out of the active list.

### Flow 3 — Demo voice transcript (simulated)

1. Dashboard shows a "Voice Hotline" panel with a pre-seeded transcript.
2. A pulsing indicator makes it appear live.
3. No real Twilio Voice integration in the MVP — this is explicitly simulated for the demo.

---

## Features

### Core (must ship)
- SMS webhook receiving and processing (Africa's Talking sandbox)
- Gemini risk analysis: risk level + auto-reply + case summary
- Anonymous case creation in Supabase (phone hashed, no raw PII)
- Caseworker dashboard: cases list with risk badges
- Case detail view: AI summary + SMS conversation thread
- Mark case as resolved
- Polling every 5 seconds (no WebSocket needed for MVP)

### Demo-only (seeded / simulated)
- Voice hotline transcript panel — static, pre-seeded, styled to look live
- Stats header on dashboard (total cases, HIGH count, resolved today) — derived from seeded data

### Explicitly out of scope
- Real Twilio Voice integration
- Caseworker authentication (no login for MVP demo)
- Multi-organisation support or tenant separation
- Survivor-facing mobile app or WhatsApp integration
- Production security hardening (rate limiting, IP allow-listing)
- NDPA compliance audit
- Email notifications to caseworkers
- Case assignment between caseworkers
- File or photo attachments

---

## Success criteria

The MVP is complete when all of the following are true:

- [ ] Sending an SMS to the Africa's Talking sandbox number creates a case visible on the dashboard within 10 seconds
- [ ] Cases are displayed sorted by risk level — HIGH cases appear at the top
- [ ] Clicking a case opens the correct conversation thread
- [ ] The Gemini-generated reply is visible as an outbound message in the thread
- [ ] Marking a case resolved removes it from the active list
- [ ] The dashboard shows seeded HIGH, MEDIUM, LOW, and resolved cases on first load
- [ ] The voice transcript panel renders with a pulsing live indicator
- [ ] No raw phone numbers appear anywhere in the UI or database
- [ ] The Devpost submission includes a Loom video showing the full SMS → dashboard flow

---

## Responsible AI statement (include in Devpost writeup)

SafeAid is built around three non-negotiable AI guardrails:

1. **Zero PII storage.** Phone numbers are hashed with SHA-256 before storage. The raw number never touches the database.
2. **Human in the loop.** The AI generates a risk score and a suggested reply, but the caseworker reviews every case. SafeAid makes no automated decisions about a survivor's situation.
3. **Transparency.** Every AI-generated output is labelled as such in the UI. Caseworkers are never shown AI output without the label "AI suggestion".

The voice hotline transcript in the demo is explicitly simulated and is labelled as such in the Devpost submission.
