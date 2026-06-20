import Link from "next/link";
import { Clock, MapPin, ChevronRight, MessageSquare } from "lucide-react";
import { CaseSummary } from "@/lib/types";
import RiskBadge from "./RiskBadge";
import ResourceBadge from "./ResourceBadge";

const RISK_ACCENT: Record<CaseSummary["riskLevel"], string> = {
  MEDIUM: "before:bg-risk-medium",
  LOW: "before:bg-risk-low",
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function CaseCard({ caseSummary }: { caseSummary: CaseSummary }) {
  const {
    id,
    riskLevel,
    anonymizedContact,
    aiSummary,
    routing,
    createdAt,
    resolved,
    messageCount,
  } = caseSummary;

  return (
    <Link
      href={`/cases/${id}`}
      className={`group relative block overflow-hidden rounded-2xl border border-border bg-surface-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card-hover before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${RISK_ACCENT[riskLevel]} ${resolved ? "opacity-70" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <RiskBadge level={riskLevel} />
          <ResourceBadge type={routing.resourceType} />
        </div>
        <span className="flex shrink-0 items-center gap-1 text-xs text-text-muted">
          <Clock size={13} strokeWidth={1.75} />
          {timeAgo(createdAt)}
        </span>
      </div>

      <p className="mt-3 text-[15px] font-semibold text-text-primary">
        {anonymizedContact}
      </p>

      {/* AI-generated content carries a visible "AI suggestion" label */}
      <div className="mt-2.5 rounded-xl border-l-2 border-ai-border bg-ai-bg px-3.5 py-2.5">
        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-ai-text">
          <span className="flex h-1.5 w-1.5 rounded-full bg-ai-text" />
          AI suggestion
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-primary">
          {aiSummary}
        </p>
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-border/70 pt-3 text-xs">
        <span className="flex min-w-0 items-center gap-1.5 text-text-secondary">
          <MapPin size={13} strokeWidth={1.75} className="shrink-0 text-brand-700" />
          <span className="truncate">{routing.centerName}</span>
          <span className="shrink-0 text-text-muted">· {routing.distanceKm} km</span>
        </span>
        <span className="flex shrink-0 items-center gap-3 text-text-muted">
          <span className="flex items-center gap-1">
            <MessageSquare size={13} strokeWidth={1.75} />
            {messageCount}
          </span>
          <ChevronRight
            size={16}
            strokeWidth={2}
            className="text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-700"
          />
        </span>
      </div>
    </Link>
  );
}
