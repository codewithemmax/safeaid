# Code standards

## Language

Both backend and frontend are written in **TypeScript with strict mode enabled**.

```json
// tsconfig.json — both packages
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true
  }
}
```

Never use `any`. Use `unknown` when the type is genuinely unknown and narrow it before use.

---

## File naming

| Thing | Convention | Example |
|---|---|---|
| Backend service files | `kebab-case.service.ts` | `gemini.service.ts` |
| Backend controller files | `kebab-case.controller.ts` | `cases.controller.ts` |
| Backend route files | `kebab-case.ts` | `webhook.ts` |
| Frontend page files | `page.tsx` (Next.js convention) | `app/cases/[id]/page.tsx` |
| Frontend components | `PascalCase.tsx` | `CaseCard.tsx` |
| Frontend utility files | `kebab-case.ts` | `format-date.ts` |
| Environment files | `.env` (backend), `.env.local` (frontend) | — |

---

## TypeScript types

All shared types live in `backend/src/types/index.ts`.

```typescript
export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW'
export type CaseStatus = 'active' | 'resolved'
export type MessageDirection = 'inbound' | 'outbound'

export interface Case {
  id: string
  phone_hash: string
  risk_level: RiskLevel
  status: CaseStatus
  summary: string
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

export interface GeminiAnalysis {
  risk_level: RiskLevel
  reply: string
  summary: string
}
```

Frontend duplicates only the types it needs — do not import from the backend package directly.

---

## Backend patterns

### Controller pattern

```typescript
// controllers/cases.controller.ts
import { Request, Response } from 'express'
import { getCases } from '../services/cases.service'

export async function listCases(req: Request, res: Response): Promise<void> {
  try {
    const cases = await getCases()
    res.json(cases)
  } catch (error) {
    console.error('listCases error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
```

Always wrap controller bodies in try/catch. Always log errors to console.error. Never expose raw error messages to the client.

### Service pattern

```typescript
// services/cases.service.ts
import { supabase } from '../lib/supabase'
import type { Case } from '../types'

export async function getCases(): Promise<Case[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('status', 'active')
    .order('risk_level', { ascending: true }) // HIGH sorts before LOW alphabetically — use custom sort in controller
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}
```

Risk level sort order must be: HIGH → MEDIUM → LOW. Implement this in the controller after fetching, not in the SQL query (alphabetical sort won't work).

### Route pattern

```typescript
// routes/cases.ts
import { Router } from 'express'
import { listCases, resolveCase } from '../controllers/cases.controller'

const router = Router()

router.get('/', listCases)
router.post('/:id/resolve', resolveCase)

export default router
```

---

## Async / await

Always use `async/await`. Never use `.then()` chains. Always `await` promises — never fire-and-forget inside a request handler.

---

## Error handling

- Backend: every async function that touches an external service (Supabase, Gemini, AT) must be wrapped in try/catch
- Frontend: every `fetch` call must handle the error case — show an error state to the caseworker, never a blank screen
- Never `console.log` in production paths — use `console.error` for errors, remove debug logs before demo

---

## Frontend patterns

### Data fetching in pages

```typescript
// app/page.tsx
async function getCases() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch cases')
  return res.json()
}

export default async function DashboardPage() {
  const cases = await getCases()
  return <CasesList cases={cases} />
}
```

For the polling behaviour (5-second refresh), use a Client Component with `useEffect` and `setInterval`. Mark polling components with `'use client'` at the top.

### Component props

Every component must have an explicit props interface.

```typescript
interface CaseCardProps {
  id: string
  riskLevel: RiskLevel
  summary: string
  createdAt: string
  messageCount: number
}

export function CaseCard({ id, riskLevel, summary, createdAt, messageCount }: CaseCardProps) {
  // ...
}
```

### Environment variable access

- Server components: `process.env.NEXT_PUBLIC_API_URL`
- Client components: only `NEXT_PUBLIC_` prefixed variables are accessible — never expose service keys

---

## Import order

1. Node built-ins (if applicable)
2. Third-party packages
3. Internal modules (using relative paths)

Separate each group with a blank line.

```typescript
import crypto from 'crypto'

import { GoogleGenerativeAI } from '@google/generative-ai'

import type { GeminiAnalysis } from '../types'
```

---

## Comments

Write comments only when the **why** is not obvious from the code. The **what** is obvious from reading the code.

```typescript
// Good — explains why, not what
// Africa's Talking retries the webhook if we don't respond within 5s
// so we send the reply async and return 200 immediately
res.status(200).send()
sendReply(phoneHash, geminiResult.reply).catch(console.error)

// Bad — restates what the code already says
// Hash the phone number
const hash = hashPhone(from)
```

---

## No magic numbers

Define constants for values used more than once.

```typescript
const POLL_INTERVAL_MS = 5000
const RISK_ORDER: RiskLevel[] = ['HIGH', 'MEDIUM', 'LOW']
const SMS_MAX_LENGTH = 160
```
