import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { MagneticButton } from "./magnetic-button";
import { Reveal } from "./reveal";

const CALENDLY =
  "https://calendly.com/samuel-netterai/30min?month=2026-03";

export function Contact() {
  return (
    <section id="contact" className="relative w-full border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="block w-8 h-px bg-border-strong" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                  Book a Demo
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display font-bold text-text text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[0.98] tracking-tighter">
                Two weeks from now,{" "}
                <span className="text-secondary">
                  your first workflow is live.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[55ch] text-base md:text-lg text-secondary leading-relaxed">
                Tell us about your operation. We&apos;ll show you exactly how.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-10 md:mt-12">
                <MagneticButton
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-text text-bg text-sm md:text-base font-medium hover:bg-text/90 active:translate-y-[1px] transition-all duration-200 will-change-transform"
                >
                  Book a Demo
                  <ArrowRight weight="bold" size={16} />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
