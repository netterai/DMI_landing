import { Reveal } from "./reveal";

export function YCTrustRow() {
  return (
    <section
      id="yc"
      aria-label="Backed by Y Combinator"
      className="relative w-full"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <Reveal>
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 items-center">
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="block w-8 h-px bg-border-strong" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                  Backed by
                </span>
              </div>
              {/* CSS-rendered YC logo — no white halo possible */}
              <a
                href="https://www.ycombinator.com/companies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Y Combinator — companies directory"
                className="inline-flex items-baseline gap-2.5 group"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-yc rounded-[3px] shrink-0">
                  <span className="text-white font-bold text-2xl md:text-[26px] leading-none translate-y-px">
                    Y
                  </span>
                </span>
                <span className="font-display font-medium text-yc text-2xl md:text-[28px] tracking-tight leading-none group-hover:opacity-90 transition-opacity">
                  Combinator
                </span>
              </a>
            </div>
            <div className="col-span-12 md:col-span-8 mt-6 md:mt-0">
              <p className="font-display text-text text-xl md:text-2xl lg:text-3xl leading-snug tracking-tight max-w-[40ch]">
                From the same accelerator that backed{" "}
                <span className="text-secondary">
                  Flexport, Brex, and Gusto.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
