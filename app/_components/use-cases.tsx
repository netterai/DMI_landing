import {
  Factory,
  Receipt,
  TrendUp,
  Truck,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";

type UseCase = {
  industry: string;
  title: string;
  bullets: string[];
  outcome: string;
  Icon: ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
};

const cases: UseCase[] = [
  {
    industry: "Healthcare",
    title: "Cash Collection",
    bullets: [
      "Centralize invoices and payments in real time",
      "Structure receivables into a single control layer",
      "Automate reminders, task routing, and recovery",
    ],
    outcome: "Aging invoices trigger automatic outreach. No manual chasing.",
    Icon: Receipt,
  },
  {
    industry: "Logistics",
    title: "Route & Load Optimization",
    bullets: [
      "Unify your transport, ERP, and fleet systems into one model",
      "Optimize routes, loads, and costs automatically",
      "Eliminate manual planning",
    ],
    outcome: "Routes recompute in real time as constraints change.",
    Icon: Truck,
  },
  {
    industry: "Retail & FMCG",
    title: "Market Intelligence",
    bullets: [
      "Consolidate channel sales data from every source",
      "Forecast demand by SKU, region, and channel",
      "Alert on stockouts and market-share shifts",
    ],
    outcome: "Stockouts surface within the hour, not at week's end.",
    Icon: TrendUp,
  },
  {
    industry: "Manufacturing",
    title: "Scheduling Optimization",
    bullets: [
      "Ingest supply, capacity, and deadline constraints",
      "Generate optimized schedules automatically",
      "Push directly into your existing planning tools",
    ],
    outcome: "Schedules regenerate the moment supply or capacity shifts.",
    Icon: Factory,
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-12 md:pb-16">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-10 md:mb-14">
          <Reveal className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-border-strong" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                Use Cases
              </span>
            </div>
            <h2 className="font-display font-bold text-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tighter">
              Real operations.{" "}
              <span className="text-secondary">Real impact.</span>
            </h2>
          </Reveal>
        </div>

        {/* Editorial divider rows — industry + title on the left,
            capabilities and outcome on the right. */}
        <StaggerContainer
          stagger={0.08}
          className="border-t border-border"
        >
          {cases.map(({ industry, title, bullets, outcome, Icon }) => (
            <StaggerItem
              key={title}
              className="grid grid-cols-12 items-start gap-x-6 md:gap-x-10 gap-y-5 py-8 md:py-10 border-b border-border last:border-b-0"
            >
              {/* Industry + Icon + Title */}
              <div className="col-span-12 md:col-span-4">
                <div className="text-[11px] uppercase tracking-[0.18em] text-tertiary mb-3">
                  {industry}
                </div>
                <div className="flex items-start gap-3">
                  <Icon size={22} weight="regular" />
                  <h3 className="font-display font-bold text-text text-xl md:text-2xl tracking-tight leading-[1.15]">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Capabilities + Outcome */}
              <div className="col-span-12 md:col-span-8">
                <ul className="space-y-2.5 max-w-[62ch]">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-[15px] md:text-base text-secondary leading-relaxed"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 block h-px w-3 shrink-0 bg-border-strong"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 pt-4 border-t border-border text-text font-medium leading-snug max-w-[62ch]">
                  <span aria-hidden className="text-tertiary mr-2">
                    →
                  </span>
                  {outcome}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
