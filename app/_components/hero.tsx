import Image from "next/image";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { MagneticButton } from "./magnetic-button";
import { Reveal } from "./reveal";

const CALENDLY =
  "https://calendly.com/samuel-netterai/30min?month=2026-03";

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden min-h-[100dvh] flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative w-full flex-1 flex flex-col">
        <div className="relative grid grid-cols-12 gap-x-6 md:gap-x-10 pt-20 md:pt-24 lg:pt-44 pb-12 md:pb-16 flex-1 overflow-hidden">
          {/* Big brand symbol watermark on the right */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[2%] right-[-12%] md:right-[-6%] h-[92%] aspect-square max-h-[820px] opacity-[0.06]"
          >
            <Image
              src="/Netter-Symbol-Transparent.png"
              alt=""
              fill
              className="object-contain object-right"
              priority={false}
            />
          </div>

          {/* Headline + CTAs */}
          <div className="relative z-10 col-span-12 lg:col-span-9 xl:col-span-8">
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-7 md:mb-9">
                <span className="block w-8 h-px bg-border-strong" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                  Data · AI · Operations
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display font-bold text-text text-[44px] sm:text-5xl md:text-6xl lg:text-[78px] leading-[0.95] tracking-tighter">
                Switch on{" "}
                <span className="text-secondary">your data.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-7 md:mt-9 max-w-[55ch] text-base md:text-lg text-secondary leading-relaxed">
                Most of your data sits in silos. Netter turns it into
                dashboards, workflows, apps, and AI agents — live in 2
                weeks, no engineering team.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-9 md:mt-11 flex flex-wrap items-center gap-4 md:gap-6">
                <MagneticButton
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-text text-bg text-sm md:text-base font-medium hover:bg-text/90 active:translate-y-[1px] transition-all duration-200 will-change-transform"
                >
                  Book a Demo
                  <ArrowRight weight="bold" size={16} />
                </MagneticButton>

                <a
                  href="#outputs"
                  className="group inline-flex items-center gap-2 text-sm md:text-base font-medium text-text hover:text-secondary transition-colors duration-200"
                >
                  See what it builds
                  <ArrowDown
                    weight="bold"
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-y-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Hairline meta strip */}
        <Reveal delay={0.35} className="mb-16 md:mb-24">
          <div className="border-t border-border py-6 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                Time to live
              </div>
              <div className="mt-1 text-sm text-text font-medium">
                2 weeks
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                Engineering
              </div>
              <div className="mt-1 text-sm text-text font-medium">
                None required
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                Sources
              </div>
              <div className="mt-1 text-sm text-text font-medium">
                CRM · ERP · Files
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
