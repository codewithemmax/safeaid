import { LayoutDashboard, AlertTriangle, CheckCircle2 } from "lucide-react";

interface StatsHeaderProps {
  totalActive: number;
  mediumRisk: number;
  resolvedToday: number;
}

export default function StatsHeader({
  totalActive,
  mediumRisk,
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
      label: "Medium-risk cases",
      value: mediumRisk,
      icon: AlertTriangle,
      iconWrap: "bg-risk-mediumBg text-risk-medium",
      value_cls: mediumRisk > 0 ? "text-risk-medium" : "text-text-primary",
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
