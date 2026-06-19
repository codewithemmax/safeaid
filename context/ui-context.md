# UI context

## Design intent

SafeAid's dashboard must feel calm, clinical, and trustworthy — the same feeling as a well-designed hospital management system. Caseworkers are dealing with high-stakes decisions under pressure. The UI must reduce cognitive load, not add to it.

- No decorative elements, gradients, or animations (except the live-indicator pulse)
- High information density with generous whitespace
- Risk levels are the loudest visual signal — everything else is subordinate to them
- Dark sidebar, white main content area
- Every piece of AI-generated content is visually distinguished from confirmed data

---

## Colour tokens

### Base palette

| Token | Light mode | Dark mode | Usage |
|---|---|---|---|
| `surface-sidebar` | `#0F172A` | `#0F172A` | Sidebar background (same in both modes) |
| `surface-primary` | `#FFFFFF` | `#1E293B` | Main content area, cards |
| `surface-secondary` | `#F8FAFC` | `#0F172A` | Page background, table stripes |
| `surface-tertiary` | `#F1F5F9` | `#1E293B` | Hover states, input backgrounds |
| `text-primary` | `#0F172A` | `#F8FAFC` | Body text, headings |
| `text-secondary` | `#64748B` | `#94A3B8` | Labels, timestamps, muted info |
| `text-inverse` | `#F8FAFC` | `#F8FAFC` | Text on dark backgrounds (sidebar) |
| `border` | `#E2E8F0` | `#334155` | Card borders, dividers |
| `brand` | `#0EA5E9` | `#38BDF8` | Active nav items, links, primary buttons |

### Risk level colours

These are the most important tokens in the system. Use them consistently and only for risk level.

| Risk level | Background | Text | Border | Usage |
|---|---|---|---|---|
| HIGH | `#FEF2F2` | `#991B1B` | `#FECACA` | Case card left border accent, badge |
| MEDIUM | `#FFFBEB` | `#92400E` | `#FDE68A` | Case card left border accent, badge |
| LOW | `#F0FDF4` | `#166534` | `#BBF7D0` | Case card left border accent, badge |
| RESOLVED | `#F8FAFC` | `#64748B` | `#E2E8F0` | Resolved case badge |

In dark mode, use these alternatives:

| Risk level | Background | Text | Border |
|---|---|---|---|
| HIGH | `#450A0A` | `#FCA5A5` | `#7F1D1D` |
| MEDIUM | `#451A03` | `#FCD34D` | `#78350F` |
| LOW | `#052E16` | `#86EFAC` | `#14532D` |

### AI suggestion colour

| Token | Value | Usage |
|---|---|---|
| `ai-bg` | `#EFF6FF` (light) / `#1E3A5F` (dark) | Background of any AI-generated text block |
| `ai-border` | `#BFDBFE` (light) / `#1D4ED8` (dark) | Left border on AI suggestion blocks |
| `ai-text` | `#1E40AF` (light) / `#93C5FD` (dark) | "AI suggestion" label text |

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
