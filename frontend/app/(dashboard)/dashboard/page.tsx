import StatsHeader from "@/app/components/StatsHeader";
import CaseCard from "@/app/components/CaseCard";
import VoiceTranscriptPanel from "@/app/components/VoiceTranscriptPanel";
import RiskMixBar from "@/app/components/RiskMixBar";
import { mockCases, mockVoiceTranscript } from "@/lib/mock-data";
import type { RiskLevel } from "@/lib/types";

// HIGH must sort above MEDIUM above LOW — alphabetical won't do this.
const RISK_ORDER: Record<RiskLevel, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };

// --- Phase 1–3: mock data. Swapped for GET /api/cases in U6.1 ---
export default function DashboardPage() {
  const cases = mockCases;
  const active = cases
    .filter((c) => !c.resolved)
    .sort((a, b) => RISK_ORDER[a.riskLevel] - RISK_ORDER[b.riskLevel]);
  const resolved = cases.filter((c) => c.resolved);

  const highRiskCount = active.filter((c) => c.riskLevel === "HIGH").length;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
          Caseworker dashboard
        </p>
        <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-text-primary">
          Live alerts
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          Incoming contacts, triaged by SafeAid. High-risk cases are surfaced
          first — act on them before anything else.
        </p>
      </header>

      <StatsHeader
        totalActive={active.length}
        highRisk={highRiskCount}
        resolvedToday={resolved.length}
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cases — the spine of the screen */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-primary">
              Active cases
            </h2>
            <span className="text-xs text-text-muted">
              {active.length} open · sorted by risk
            </span>
          </div>

          <div className="space-y-3">
            {active.map((c) => (
              <CaseCard key={c.id} caseSummary={c} />
            ))}
          </div>

          {resolved.length > 0 && (
            <div className="pt-2">
              <h2 className="mb-3 text-sm font-semibold text-text-secondary">
                Resolved today
              </h2>
              <div className="space-y-3">
                {resolved.map((c) => (
                  <CaseCard key={c.id} caseSummary={c} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right rail */}
        <div className="space-y-6">
          <RiskMixBar cases={active} />
          <VoiceTranscriptPanel lines={mockVoiceTranscript} />
        </div>
      </div>
    </div>
  );
}
