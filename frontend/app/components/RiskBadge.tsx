import { AlertTriangle } from "lucide-react";
import { RiskLevel } from "@/lib/types";

const RISK_STYLES: Record<
  RiskLevel,
  { cls: string; label: string; icon: boolean }
> = {
  MEDIUM: {
    cls: "bg-risk-mediumBg text-risk-mediumText border border-risk-mediumBorder",
    label: "Medium risk",
    icon: true,
  },
  LOW: {
    cls: "bg-risk-lowBg text-risk-lowText border border-risk-lowBorder",
    label: "Low risk",
    icon: false,
  },
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const s = RISK_STYLES[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${s.cls}`}
    >
      {s.icon && <AlertTriangle size={13} strokeWidth={2.25} />}
      {s.label}
    </span>
  );
}
