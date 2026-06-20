import type { CaseSummary, RiskLevel } from "@/lib/types";

const SEGMENTS: { level: RiskLevel; label: string; bar: string; dot: string }[] =
  [
    { level: "HIGH", label: "High", bar: "bg-risk-high", dot: "bg-risk-high" },
    {
      level: "MEDIUM",
      label: "Medium",
      bar: "bg-risk-medium",
      dot: "bg-risk-medium",
    },
    { level: "LOW", label: "Low", bar: "bg-risk-low", dot: "bg-risk-low" },
  ];

export default function RiskMixBar({ cases }: { cases: CaseSummary[] }) {
  const total = cases.length || 1;
  const counts = SEGMENTS.map((s) => ({
    ...s,
    count: cases.filter((c) => c.riskLevel === s.level).length,
  }));

  return (
    <div className="rounded-2xl border border-border bg-surface-card p-5 shadow-card">
      <h2 className="text-sm font-semibold text-text-primary">Risk mix</h2>
      <p className="mt-0.5 text-xs text-text-secondary">
        Distribution across {cases.length} active{" "}
        {cases.length === 1 ? "case" : "cases"}
      </p>

      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-surface-sunken">
        {counts.map(
          (s) =>
            s.count > 0 && (
              <div
                key={s.level}
                className={s.bar}
                style={{ width: `${(s.count / total) * 100}%` }}
              />
            )
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {counts.map((s) => (
          <li
            key={s.level}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2 text-text-secondary">
              <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
              {s.label}
            </span>
            <span className="font-semibold tabular-nums text-text-primary">
              {s.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
