import { Phone } from "lucide-react";
import { VoiceTranscriptLine } from "@/lib/types";

export default function VoiceTranscriptPanel({
  lines,
}: {
  lines: VoiceTranscriptLine[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface-card shadow-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-sunken text-text-secondary">
            <Phone size={16} strokeWidth={1.75} />
          </span>
          <div className="leading-tight">
            <h2 className="text-sm font-semibold text-text-primary">
              Voice hotline
            </h2>
            {/* Honesty: this panel is never presented as a real live feed */}
            <p className="text-[11px] font-medium uppercase tracking-wide text-text-muted">
              Simulated for demo
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-risk-high">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-risk-high" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-risk-high" />
          </span>
          Live
        </span>
      </div>

      <div className="space-y-4 px-5 py-4">
        {lines.map((line, i) => {
          const isAgent = line.speaker === "ai_agent";
          return (
            <div key={i} className="flex gap-3">
              <span className="w-9 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-muted">
                {line.timestamp}
              </span>
              <div className="min-w-0">
                <p
                  className={`text-[11px] font-semibold uppercase tracking-wide ${
                    isAgent ? "text-brand-700" : "text-text-secondary"
                  }`}
                >
                  {isAgent ? "SafeAid AI" : "Caller"}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-text-primary">
                  {line.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
