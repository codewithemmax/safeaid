import { AlertTriangle, Home, ShieldCheck } from "lucide-react";

/**
 * The story of SafeAid in one visual: an anonymous SMS comes in, the AI
 * replies with compassion + triage, and the survivor is routed to a verified
 * safe house. Pure presentation — no data, no PII.
 */
export default function SmsFlowMockup() {
  return (
    <div className="relative">
      {/* Phone frame */}
      <div className="mx-auto w-full max-w-[340px] rounded-[2rem] border border-white/10 bg-ink-800 p-3 shadow-lift ring-1 ring-white/5">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#0E2026]">
          {/* Status strip */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-[10px] font-bold text-ink">
                SA
              </span>
              <span className="text-xs font-medium text-text-onDark">
                SafeAid · SMS
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wide text-text-onDarkMuted">
              Anonymous
            </span>
          </div>

          {/* Thread */}
          <div className="space-y-3 px-4 py-5">
            <Bubble side="in">SOS. I need help, I can&apos;t leave.</Bubble>

            <div className="flex flex-col items-end gap-1">
              <span className="rounded-md bg-ai-text/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ai-border">
                AI-drafted reply
              </span>
              <Bubble side="out">
                I&apos;m here with you. Are you safe enough to keep texting? What
                area are you in?
              </Bubble>
            </div>

            <Bubble side="in">Agege, Lagos.</Bubble>

            <Bubble side="out">
              A verified safe house near you has been alerted. Help is on the
              way.
            </Bubble>
          </div>
        </div>
      </div>

      {/* Floating routed-case card */}
      <div className="absolute -bottom-6 -left-3 w-60 rounded-2xl border border-border bg-surface-card p-4 shadow-lift sm:-left-8">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full border border-risk-highBorder bg-risk-highBg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-risk-highText">
            <AlertTriangle size={11} strokeWidth={2.5} />
            High risk
          </span>
          <span className="text-[10px] text-text-muted">just now</span>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <Home size={15} strokeWidth={1.75} />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-text-primary">
              Lagos Safe House
            </p>
            <p className="text-[11px] text-text-secondary">6.2 km · Shelter</p>
          </div>
        </div>
      </div>

      {/* Floating PII badge */}
      <div className="absolute -right-2 top-6 flex items-center gap-1.5 rounded-full border border-brand-200 bg-surface-card px-3 py-1.5 text-[11px] font-semibold text-brand-700 shadow-lift sm:-right-6">
        <ShieldCheck size={13} strokeWidth={2.25} />
        No PII stored
      </div>
    </div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "in" | "out";
  children: React.ReactNode;
}) {
  const isOut = side === "out";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
          isOut
            ? "rounded-br-sm bg-brand text-white"
            : "rounded-bl-sm bg-white/10 text-text-onDark"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
