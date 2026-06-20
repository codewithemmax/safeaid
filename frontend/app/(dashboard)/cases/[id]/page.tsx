"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  MessageSquare,
  Navigation,
} from "lucide-react";
import { getMockCaseDetail } from "@/lib/mock-data";
import RiskBadge from "@/app/components/RiskBadge";
import ResourceBadge from "@/app/components/ResourceBadge";
import MessageBubble from "@/app/components/MessageBubble";

const RISK_ACCENT: Record<string, string> = {
  HIGH: "before:bg-risk-high",
  MEDIUM: "before:bg-risk-medium",
  LOW: "before:bg-risk-low",
};

export default function CaseDetailPage() {
  const params = useParams<{ id: string }>();
  const caseDetail = getMockCaseDetail(params.id);

  // Local-only state for the mock phase. U6.2 wires this to the resolve API.
  const [resolved, setResolved] = useState(caseDetail?.resolved ?? false);

  if (!caseDetail) {
    notFound();
  }

  const { riskLevel, anonymizedContact, aiSummary, routing, messages } =
    caseDetail;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to alerts
      </Link>

      {/* Case header */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-border bg-surface-card p-6 shadow-card before:absolute before:inset-y-0 before:left-0 before:w-1.5 ${RISK_ACCENT[riskLevel]}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge level={riskLevel} />
              <ResourceBadge type={routing.resourceType} />
              {resolved && (
                <span className="inline-flex items-center gap-1 rounded-full bg-risk-lowBg px-2.5 py-1 text-xs font-semibold text-risk-lowText">
                  <CheckCircle2 size={14} strokeWidth={2} />
                  Resolved
                </span>
              )}
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-text-primary">
                {anonymizedContact}
              </p>
              <p className="mt-0.5 text-xs text-text-muted">
                Case {params.id} · {messages.length} messages
              </p>
            </div>
          </div>

          <button
            onClick={() => setResolved(true)}
            disabled={resolved}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-text-muted disabled:shadow-none"
          >
            <CheckCircle2 size={16} strokeWidth={2} />
            {resolved ? "Marked resolved" : "Mark resolved"}
          </button>
        </div>

        {/* AI summary */}
        <div className="mt-5 rounded-xl border-l-2 border-ai-border bg-ai-bg px-4 py-3.5">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ai-text">
            <span className="flex h-1.5 w-1.5 rounded-full bg-ai-text" />
            AI suggestion
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-text-primary">
            {aiSummary}
          </p>
        </div>

        {/* Routing */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-sunken px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <MapPin size={16} strokeWidth={1.75} className="shrink-0 text-brand" />
            Routed to{" "}
            <span className="font-medium text-text-primary">
              {routing.centerName}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-text-secondary">
            <Navigation size={13} strokeWidth={2} />
            {routing.distanceKm} km away
          </span>
        </div>
      </div>

      {/* Conversation */}
      <div className="rounded-2xl border border-border bg-surface-card p-6 shadow-card">
        <div className="mb-5 flex items-center gap-2">
          <MessageSquare
            size={16}
            strokeWidth={1.75}
            className="text-text-secondary"
          />
          <h2 className="text-sm font-semibold text-text-primary">
            SMS conversation
          </h2>
          <span className="ml-auto text-xs text-text-muted">
            Anonymous thread · no phone number stored
          </span>
        </div>

        <div className="max-h-[30rem] space-y-4 overflow-y-auto scrollbar-thin pr-2">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
        </div>
      </div>
    </div>
  );
}
