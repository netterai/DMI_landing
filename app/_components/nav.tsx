"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, List, X } from "@phosphor-icons/react/dist/ssr";

const links = [
  { label: "Use Cases", href: "#use-cases" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

const CALENDLY =
  "https://calendly.com/samuel-netterai/30min?month=2026-03";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <a
            href="#top"
            className="flex items-center gap-2 shrink-0"
            aria-label="Netter — home"
          >
            <Image
              src="/Netter-Logo-Text.png"
              alt="Netter"
              width={3181}
              height={720}
              priority
              className="h-7 md:h-8 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-secondary hover:text-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            {/* YC chip — desktop */}
            <a
              href="https://www.ycombinator.com/companies"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-border bg-bg-raised hover:border-border-strong transition-colors duration-200 group"
              aria-label="Backed by Y Combinator, Spring 2026"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-yc text-white text-[10px] font-bold leading-none yc-pulse">
                Y
              </span>
              <span className="text-[11px] tracking-wide text-secondary group-hover:text-text transition-colors">
                Backed by{" "}
                <span className="text-yc font-medium">Y Combinator</span>{" "}
                · Spring 2026
              </span>
            </a>

            {/* CTA */}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-text text-bg text-sm font-medium hover:bg-text/90 active:translate-y-[1px] transition-all duration-200"
            >
              Book a Demo
              <ArrowRight weight="bold" size={14} />
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-bg-raised hover:border-border-strong active:translate-y-[1px] transition-all duration-200"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="lg:hidden border-t border-border bg-bg">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-text border-b border-border last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-text text-bg text-sm font-medium active:translate-y-[1px] transition-all"
            >
              Book a Demo
              <ArrowRight weight="bold" size={14} />
            </a>
            <a
              href="https://www.ycombinator.com/companies"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs text-secondary"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-yc text-white text-[10px] font-bold leading-none">
                Y
              </span>
              Backed by <span className="text-yc font-medium">Y Combinator</span> · Spring 2026
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
