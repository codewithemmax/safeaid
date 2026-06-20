import { Building2, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { mockHelpCenters } from "@/lib/mock-data";
import ResourceBadge from "@/app/components/ResourceBadge";
import { CenterType } from "@/lib/types";

const TYPE_LABEL: Record<CenterType, string> = {
  shelter: "Shelter",
  ngo: "NGO",
  emergency_contact: "Emergency contact",
};

export default function HelpCentersPage() {
  const centers = mockHelpCenters;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
          Verified network
        </p>
        <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight text-text-primary">
          Help centers
        </h1>
        <p className="mt-1.5 text-sm text-text-secondary">
          The shelters, NGOs, and emergency contacts SafeAid routes survivors
          to. Every listing is verified before it can receive a referral.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {centers.map((center) => (
          <div
            key={center.id}
            className="group flex flex-col rounded-2xl border border-border bg-surface-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Building2 size={18} strokeWidth={1.75} />
                </span>
                <h2 className="pt-0.5 text-sm font-semibold leading-snug text-text-primary">
                  {center.name}
                </h2>
              </div>
              <span className="shrink-0 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-secondary">
                {TYPE_LABEL[center.type]}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {center.resourceTypes.map((rt) => (
                <ResourceBadge key={rt} type={rt} />
              ))}
            </div>

            <div className="mt-4 space-y-1.5 text-sm text-text-secondary">
              <p className="flex items-center gap-1.5">
                <MapPin size={14} strokeWidth={1.75} className="text-text-muted" />
                {center.state}
              </p>
              <p className="flex items-center gap-1.5">
                <Phone size={14} strokeWidth={1.75} className="text-text-muted" />
                {center.phone}
              </p>
            </div>

            <a
              href={center.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-1 border-b border-transparent text-sm font-semibold text-brand-700 transition-colors hover:border-brand-700 hover:text-brand-800"
            >
              Get directions
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
