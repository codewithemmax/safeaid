import { Home, Utensils, Scale, Stethoscope, Briefcase } from "lucide-react";
import { ResourceType } from "@/lib/types";

const RESOURCE_CONFIG: Record<
  ResourceType,
  { label: string; icon: typeof Home }
> = {
  shelter: { label: "Shelter", icon: Home },
  food: { label: "Food", icon: Utensils },
  legal: { label: "Legal", icon: Scale },
  medical: { label: "Medical", icon: Stethoscope },
  jobs: { label: "Jobs", icon: Briefcase },
};

export default function ResourceBadge({ type }: { type: ResourceType }) {
  const { label, icon: Icon } = RESOURCE_CONFIG[type];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-secondary">
      <Icon size={13} strokeWidth={1.75} className="text-brand-700" />
      {label}
    </span>
  );
}
