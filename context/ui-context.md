# UI context

> **2026-06-20 — design system revised.** The brand moved from sky-blue/orange to a
> **teal** trust palette with a **warm amber** accent, and a public **landing page** was
> added at `/` (dashboard moved to `/dashboard`). Rationale below in *Design intent*.
> The colour tables here now reflect the shipped Tailwind config
> (`frontend/tailwind.config.ts`), which is the source of truth.

## Design intent

SafeAid now has **two surfaces with one identity**:

1. **The dashboard** (`/dashboard`, `/cases/[id]`, `/help-centers`) stays calm, clinical, and
   trustworthy — the feeling of a well-designed hospital management system. Caseworkers work
   under pressure; the UI reduces cognitive load, not adds to it. Dark sidebar, light main area,
   high density, generous whitespace.
2. **The landing page** (`/`) is the one place we are expressive — an editorial, humane marketing
   page (dark hero + light sections) that explains the product and earns trust. It is allowed
   gradients, depth, and entrance animations; the dashboard is not.

Shared rules across both surfaces:

- **Risk levels are the loudest visual signal** — everything else is subordinate.
- **Brand is teal, never warm.** This is deliberate: the warm end of the spectrum (red / amber /
  green) belongs to *risk* alone, so risk reads loudest. The original orange brand competed with
  the risk signal — teal removes that conflict and matches the colour language of crisis /
  anti-trafficking support (Polaris, the UN Blue Heart campaign).
- The amber **accent** is for hope / "human in the loop" notes only, and is never placed beside a
  risk indicator.
- Every piece of AI-generated content is visually distinguished and labelled (light-blue block).
- Dashboard animations are limited to the live-indicator pulse and subtle hover transitions.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display (`font-display`) | **Fraunces** (variable serif) | Wordmark, page titles, landing headlines. Warm, humane, editorial. |
| UI / body (`font-sans`) | **Plus Jakarta Sans** | Everything functional. Loaded via `next/font/google`. |

---

## Colour tokens

The shipped palette is light-only (no dark mode — see "What to never do"). Source of truth:
`frontend/tailwind.config.ts`.

### Base palette

| Token | Value | Usage |
|---|---|---|
| `ink` | `#0B1A20` | Sidebar, landing hero/footer ground (teal-tinted charcoal) |
| `surface-card` | `#FFFFFF` | Cards, panels |
| `surface` | `#F6F8F9` | Page background |
| `surface-sunken` | `#EEF2F4` | Hover wells, input backgrounds, inbound bubbles |
| `text-primary` | `#0B1A20` | Body text, headings |
| `text-secondary` | `#5A6B72` | Labels, supporting copy |
| `text-muted` | `#8A9AA1` | Timestamps, faint metadata |
| `text-onDark` / `text-onDarkMuted` | `#EAF2F4` / `#9DB2BA` | Text on ink backgrounds |
| `border` / `border-strong` | `#E3E9EC` / `#CBD5DC` | Card borders, dividers |
| `brand` (600) | `#0D9488` | Links, primary buttons, active nav, focus. Scale 50–900 available. |
| `accent` | `#F59E0B` | Warm hope accent (wordmark dot, sparingly). Never beside risk. |

### Risk level colours

The most important tokens. Use only for risk level.

| Risk level | Solid | Background | Text | Border |
|---|---|---|---|---|
| HIGH | `#DC2626` | `#FEF2F2` | `#991B1B` | `#FECACA` |
| MEDIUM | `#D97706` | `#FFFBEB` | `#92400E` | `#FDE68A` |
| LOW | `#16A34A` | `#F0FDF4` | `#166534` | `#BBF7D0` |
| RESOLVED | — | `#F0FDF4` | `#5A6B72` | `#E3E9EC` |

### AI suggestion colour

| Token | Value | Usage |
|---|---|---|
| `ai-bg` | `#EFF6FF` | Background of any AI-generated text block |
| `ai-border` | `#BFDBFE` | Left border on AI suggestion blocks |
| `ai-text` | `#1D4ED8` | "AI suggestion" label text |

---

## Typography

| Role | Font | Size | Weight | Colour |
|---|---|---|---|---|
| Page heading | System sans-serif | 20px | 600 | `text-primary` |
| Section label | System sans-serif | 11px | 500 | `text-secondary`, uppercase, 0.05em tracking |
| Card heading (case summary) | System sans-serif | 14px | 500 | `text-primary` |
| Body / message text | System sans-serif | 14px | 400 | `text-primary` |
| Timestamp / metadata | System sans-serif | 12px | 400 | `text-secondary` |
| Badge label | System sans-serif | 11px | 600 | Risk level text colour (see above) |

Use the browser's default system font stack: `font-family: ui-sans-serif, system-ui, -apple-system, sans-serif`

---

## Spacing scale

Use Tailwind spacing. The base unit is 4px.

| Token | Value | Common usage |
|---|---|---|
| `p-3` | 12px | Card internal padding (compact) |
| `p-4` | 16px | Card internal padding (standard) |
| `p-6` | 24px | Section padding |
| `gap-3` | 12px | Gap between related elements |
| `gap-4` | 16px | Gap between cards |
| `gap-6` | 24px | Gap between sections |

---

## Border radius

| Context | Value |
|---|---|
| Cards | `rounded-lg` (8px) |
| Badges | `rounded-full` |
| Buttons | `rounded-md` (6px) |
| Input fields | `rounded-md` (6px) |

---

## Component patterns

### Case card

A case card has:
- A 3px left border in the risk level colour
- Risk badge (top right)
- AI summary text (in an `ai-bg` block with "AI suggestion" label)
- Timestamp (bottom left, `text-secondary`, 12px)
- Message count (bottom right, `text-secondary`, 12px)

```
┌─[HIGH border]──────────────────────────────────────────┐
│                                              [HIGH]     │
│  Survivor reported being held against their will...     │
│  ┌─────────────────────────────────────────────────┐   │
│  │ 🤖 AI suggestion                                │   │
│  │ High-risk contact — possible active trafficking  │   │
│  └─────────────────────────────────────────────────┘   │
│  2 mins ago                               3 messages    │
└─────────────────────────────────────────────────────────┘
```

### Message bubble

Inbound messages (from survivor) align left, outbound (from SafeAid AI) align right.

- Inbound: `bg-surface-tertiary`, `text-primary`, left-aligned
- Outbound: `bg-brand` with white text, right-aligned
- Every outbound bubble carries a small "AI-generated reply" label below it in `text-secondary` at 11px

### Sidebar nav item

- Inactive: `text-slate-400`, no background
- Active: `text-white`, `bg-slate-700` rounded

### Risk badge

```tsx
const riskStyles = {
  HIGH: 'bg-red-50 text-red-800 border border-red-200',
  MEDIUM: 'bg-amber-50 text-amber-800 border border-amber-200',
  LOW: 'bg-green-50 text-green-800 border border-green-200',
}

<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${riskStyles[riskLevel]}`}>
  {riskLevel}
</span>
```

### Live indicator (voice panel)

A pulsing dot to suggest a live feed. Use CSS animation — no JavaScript required.

```tsx
<span className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
  </span>
  Live
</span>
```

The voice transcript panel must always display `"Simulated for demo"` in a muted label directly beneath the "Live" indicator.

### Stats header cards

Three metric cards at the top of the dashboard:

| Label | Value source |
|---|---|
| Total active cases | Count of cases with status = 'active' |
| High risk | Count of active cases with risk_level = 'HIGH' |
| Resolved today | Count of cases resolved in the last 24h |

Each card: white background, 1px `border` border, `rounded-lg`, `p-4`.
Label: 11px, `text-secondary`, uppercase.
Value: 24px, weight 600, `text-primary`.

---

## Icon library

Use **Lucide React** (`lucide-react`). Outline icons only. Size: 16px inline, 20px for nav items.

Common icons used in SafeAid:

| Usage | Icon name |
|---|---|
| Cases / dashboard | `LayoutDashboard` |
| High risk alert | `AlertTriangle` |
| Resolved | `CheckCircle2` |
| SMS / message | `MessageSquare` |
| Voice call | `Phone` |
| Time / timestamp | `Clock` |
| Refresh / polling | `RefreshCw` |

---

## Tailwind config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: '#0F172A',
        brand: '#0EA5E9',
      }
    }
  }
}

export default config
```

---

## What to never do in the UI

- Never show a raw phone number, even hashed — show "Anonymous" or "Contact #3" instead
- Never label a simulated feature as real
- Never show Gemini output without the "AI suggestion" label
- Never use red for anything other than HIGH risk level — it will dilute the signal
- Never add loading skeletons for a hackathon MVP — a simple "Loading..." text is fine
- Never add dark mode toggle — the dashboard uses a fixed dark sidebar, the main area follows the system preference through Tailwind's `dark:` classes
