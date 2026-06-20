"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/help-centers", label: "Help centers", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/5 bg-ink text-text-onDark md:flex">
      {/* Wordmark */}
      <Link
        href="/"
        className="flex items-center gap-2.5 px-6 py-6 transition-opacity hover:opacity-90"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-sm font-bold text-ink shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
          SA
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-ink" />
        </span>
        <span className="font-display text-xl font-semibold tracking-tight text-white">
          SafeAid
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-2">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-onDarkMuted">
          Monitor
        </p>
        <ul className="space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand/15 text-brand-200 shadow-[inset_2px_0_0_0] shadow-brand-400"
                      : "text-text-onDarkMuted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.75} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Responsible-AI note */}
      <div className="px-4 pb-3">
        <div className="flex items-start gap-2.5 rounded-xl bg-white/[0.04] p-3.5 ring-1 ring-white/5">
          <ShieldCheck
            size={16}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-brand-300"
          />
          <p className="text-xs leading-relaxed text-text-onDarkMuted">
            AI summaries{" "}
            <span className="text-text-onDark">assist</span> caseworker
            judgment — they never replace it. Verify before acting.
          </p>
        </div>
      </div>

      {/* Caseworker identity (no PII) */}
      <div className="border-t border-white/5 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/20 text-xs font-semibold text-brand-200">
              CW
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-text-onDark">Caseworker</p>
              <p className="text-[11px] text-text-onDarkMuted">Lagos desk</p>
            </div>
          </div>
          <Link
            href="/"
            title="Back to site"
            className="rounded-md p-1.5 text-text-onDarkMuted transition-colors hover:bg-white/5 hover:text-white"
          >
            <ArrowUpRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
