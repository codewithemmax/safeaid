import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  MapPin,
  ShieldCheck,
  UserCheck,
  EyeOff,
  AlertTriangle,
  Home,
  Scale,
  CheckCircle2,
} from "lucide-react";
import MarketingNav from "@/app/components/marketing/MarketingNav";
import SmsFlowMockup from "@/app/components/marketing/SmsFlowMockup";

const STEPS = [
  {
    icon: MessageSquare,
    title: "A survivor texts for help",
    body: "From any basic phone — no app, no data plan, no name required. One SMS to the SafeAid number is enough to start.",
  },
  {
    icon: Sparkles,
    title: "AI triages and routes",
    body: "SafeAid reads the message, gauges the risk level, replies with a calm follow-up, and finds the nearest verified shelter, legal aid, or clinic.",
  },
  {
    icon: MapPin,
    title: "A caseworker takes over",
    body: "The case surfaces on the dashboard in seconds — risk first. A human reviews every summary and decides the next step. Always.",
  },
];

const GUARDRAILS = [
  {
    icon: EyeOff,
    title: "Zero personal data stored",
    body: "Phone numbers are hashed before they ever touch the database. No names, no locations, no raw numbers — anywhere.",
  },
  {
    icon: UserCheck,
    title: "A human in every loop",
    body: "The AI suggests a risk level and a reply. It never decides. A caseworker reviews and acts on every single case.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent by default",
    body: "Every AI-generated line is labelled “AI suggestion” in the dashboard. Caseworkers always know what came from a model.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-surface">
      <MarketingNav />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-text-onDark">
        <div className="absolute inset-0 bg-dot-grid opacity-60" />
        <div className="absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-28 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-32 lg:pt-36">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-text-onDarkMuted">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-400" />
              AI-assisted emergency routing · Nigeria
            </span>

            <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Help that reaches the people who need it{" "}
              <span className="text-brand-300">most.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-onDarkMuted">
              Survivors of trafficking and abuse send a single text. SafeAid
              triages it with AI, routes them to a verified shelter or NGO, and
              hands caseworkers a live dashboard to act — without ever storing
              who they are.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition-colors hover:bg-brand-500"
              >
                Open the dashboard
                <ArrowRight size={17} strokeWidth={2.25} />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-text-onDarkMuted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} strokeWidth={2} className="text-brand-300" />
                No PII stored
              </span>
              <span className="flex items-center gap-1.5">
                <UserCheck size={14} strokeWidth={2} className="text-brand-300" />
                Human in the loop
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare size={14} strokeWidth={2} className="text-brand-300" />
                Works on any phone
              </span>
            </div>
          </div>

          <div className="animate-fade-up reveal-2">
            <SmsFlowMockup />
          </div>
        </div>
      </section>

      {/* ──────────────────────── How it works ──────────────────────── */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            From a text message to a safe place — in minutes.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Caseworkers used to triage contacts by hand, one at a time. SafeAid
            does the first pass instantly, so no high-risk case waits in a queue.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-border bg-surface-card p-6 shadow-card"
            >
              <span className="font-display text-sm font-semibold text-brand-700">
                0{i + 1}
              </span>
              <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <step.icon size={20} strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────── Responsible AI ──────────────────────── */}
      <section
        id="responsible"
        className="relative overflow-hidden bg-ink text-text-onDark"
      >
        <div className="absolute inset-0 bg-dot-grid opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
              Responsible by design
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AI that assists. People who decide.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-onDarkMuted">
              SafeAid handles the most sensitive situations imaginable. Three
              rules are non-negotiable — they are built into the product, not
              bolted on.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {GUARDRAILS.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 ring-1 ring-white/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand-300">
                  <g.icon size={20} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-onDarkMuted">
                  {g.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────── For caseworkers / network ──────────────────────── */}
      <section id="network" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              Built for the people doing the work
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              One calm screen, risk-first, always current.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              The dashboard is designed for caseworkers at organisations like
              Pathfinders Justice Initiative, WOTCLEF, and NAPTIP task forces —
              high-stakes work under pressure. High-risk cases rise to the top,
              every AI line is labelled, and resolving a case is one click.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "HIGH-risk contacts surfaced above everything else",
                "Full anonymous SMS thread for every case",
                "Routed to the nearest verified shelter or NGO",
                "Mark resolved when a caseworker has acted",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-text-primary"
                >
                  <CheckCircle2
                    size={18}
                    strokeWidth={2}
                    className="mt-px shrink-0 text-brand-600"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-700"
            >
              Open the dashboard
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>

          {/* Dashboard glance */}
          <DashboardGlance />
        </div>
      </section>

      {/* ──────────────────────── CTA band ──────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand px-8 py-14 text-center shadow-lift sm:px-16">
          <div className="absolute inset-0 bg-dot-grid opacity-40" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Every minute matters. SafeAid gives them back.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-50">
              Step into the caseworker dashboard and see the full flow — from an
              incoming SMS to a survivor routed to safety.
            </p>
            <Link
              href="/dashboard"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Open the dashboard
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────────────── Footer ──────────────────────── */}
      <footer className="border-t border-border bg-surface-card">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-ink">
                  SA
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-surface-card" />
                </span>
                <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
                  SafeAid
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                AI-assisted emergency routing for vulnerable people in Nigeria.
                A decision-support tool — it never decides for a caseworker or a
                survivor.
              </p>
            </div>

            <div className="text-sm text-text-secondary">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                Explore
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#how" className="hover:text-text-primary">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#responsible" className="hover:text-text-primary">
                    Responsible AI
                  </a>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-text-primary">
                    Caseworker dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/help-centers" className="hover:text-text-primary">
                    Help centers
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
            <p>
              Built for the USAII Global AI Hackathon 2026. The voice hotline is
              simulated for demonstration.
            </p>
            <p>© {new Date().getFullYear()} SafeAid</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* A small, honest static glance at the dashboard for the landing page. */
function DashboardGlance() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-3 shadow-lift">
      <div className="rounded-2xl border border-border bg-surface-card p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-primary">Live alerts</p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[10px] font-medium text-text-secondary">
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand" />
            Auto-refresh · 5s
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { label: "Active", value: "3" },
            { label: "High risk", value: "1", accent: "text-risk-high" },
            { label: "Resolved", value: "1" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-surface px-3 py-2.5"
            >
              <p className="text-[10px] uppercase tracking-wide text-text-muted">
                {s.label}
              </p>
              <p
                className={`mt-0.5 font-display text-xl font-semibold ${s.accent ?? "text-text-primary"}`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2.5">
          <GlanceCase
            icon={Home}
            risk="high"
            label="High risk"
            title="Anonymous contact •• 4821"
            meta="Lagos Safe House · 6.2 km"
          />
          <GlanceCase
            icon={Scale}
            risk="medium"
            label="Medium risk"
            title="Anonymous contact •• 1187"
            meta="WOTCLEF Legal Aid · 11.8 km"
          />
        </div>
      </div>
    </div>
  );
}

function GlanceCase({
  icon: Icon,
  risk,
  label,
  title,
  meta,
}: {
  icon: typeof Home;
  risk: "high" | "medium";
  label: string;
  title: string;
  meta: string;
}) {
  const accent =
    risk === "high"
      ? "border-l-risk-high"
      : "border-l-risk-medium";
  const badge =
    risk === "high"
      ? "bg-risk-highBg text-risk-highText border-risk-highBorder"
      : "bg-risk-mediumBg text-risk-mediumText border-risk-mediumBorder";
  return (
    <div
      className={`rounded-xl border border-border border-l-[3px] bg-surface-card px-3.5 py-3 ${accent}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${badge}`}
        >
          {risk === "high" && <AlertTriangle size={10} strokeWidth={2.5} />}
          {label}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-text-muted">
          <Icon size={12} strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-1.5 text-xs font-semibold text-text-primary">{title}</p>
      <p className="text-[11px] text-text-secondary">{meta}</p>
    </div>
  );
}
