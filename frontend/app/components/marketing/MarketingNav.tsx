"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#responsible", label: "Responsible AI" },
  { href: "#network", label: "The network" },
];

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-ink">
            SA
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-ink" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            SafeAid
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-onDarkMuted transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-100"
        >
          Open dashboard
          <ArrowRight size={15} strokeWidth={2.25} />
        </Link>
      </div>
    </header>
  );
}
