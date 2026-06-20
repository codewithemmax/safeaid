"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RefreshCw } from "lucide-react";

const TITLES: Record<string, string> = {
  "/dashboard": "Live alerts",
  "/help-centers": "Help centers",
};

export default function Topbar() {
  const pathname = usePathname();
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-NG", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const title = pathname.startsWith("/cases")
    ? "Case detail"
    : TITLES[pathname] ?? "SafeAid";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface/85 px-6 backdrop-blur-md lg:px-10">
      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          className="font-display text-base font-semibold text-text-primary md:hidden"
        >
          SafeAid
        </Link>
        <span className="hidden text-sm font-semibold text-text-primary md:inline">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-card px-3 py-1.5 text-xs font-medium text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <RefreshCw size={13} strokeWidth={2} className="text-text-muted" />
          Auto-refresh · 5s
        </span>
        {time && (
          <span className="hidden text-sm tabular-nums text-text-secondary sm:inline">
            {time}
          </span>
        )}
      </div>
    </header>
  );
}
