import { LayoutDashboard, AlertTriangle, CheckCircle2 } from "lucide-react";

interface StatsHeaderProps {
  totalActive: number;
  highRisk: number;
  resolvedToday: number;
}

export default function StatsHeader({
  totalActive,
  highRisk,
  resolvedToday,
}: StatsHeaderProps) {
  const stats = [
    {
      label: "Total active cases",
      value: totalActive,
      icon: LayoutDashboard,
      iconWrap: "bg-brand-50 text-brand-700",
      value_cls: "text-text-primary",
    },
    {
      label: "High risk",
      value: highRisk,
      icon: AlertTriangle,
      iconWrap: "bg-risk-highBg text-risk-high",
      value_cls: highRisk > 0 ? "text-risk-high" : "text-text-primary",
    },
    {
      label: "Resolved today",
      value: resolvedToday,
      icon: CheckCircle2,
      iconWrap: "bg-risk-lowBg text-risk-low",
      value_cls: "text-text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon, iconWrap, value_cls }) => (
        <div
          key={label}
          className="rounded-2xl border border-border bg-surface-card p-5 shadow-card"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
              {label}
            </p>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconWrap}`}
            >
              <Icon size={16} strokeWidth={2} />
            </span>
          </div>
          <p
            className={`mt-3 font-display text-4xl font-semibold tabular-nums ${value_cls}`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
