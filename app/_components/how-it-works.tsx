import {
  Gauge,
  Plug,
  SquaresFour,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";

type Step = {
  num: string;
  title: string;
  description: string;
  Icon: ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Connect",
    description:
      "Plug any source (CRM, ERP, data lake) or simply upload raw files.",
    Icon: Plug,
  },
  {
    num: "02",
    title: "Structure",
    description:
      "Netter cleans, normalizes, and organizes everything into a unified data model — automatically.",
    Icon: TreeStructure,
  },
  {
    num: "03",
    title: "Build",
    description:
      "Create dashboards, workflows, apps, and AI agents. No code.",
    Icon: SquaresFour,
  },
  {
    num: "04",
    title: "Operate",
    description:
      "Netter runs, monitors, and optimizes. Your team stays focused on the business.",
    Icon: Gauge,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative w-full bg-bg-sunken border-y border-border"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-10 md:mb-14">
          <Reveal className="col-span-12 lg:col-span-9">
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-border-strong" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
                How It Works
              </span>
            </div>
            <h2 className="font-display font-bold text-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tighter">
              From raw data to{" "}
              <span className="text-secondary">
                autonomous operations.
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Editorial row layout — each step is a full-width row.
            Numeral / icon+title / description split across the row. */}
        <StaggerContainer
          stagger={0.08}
          className="border-t border-border-strong"
        >
          {steps.map(({ num, title, description, Icon }) => (
            <StaggerItem
              key={num}
              className="group grid grid-cols-12 items-start gap-x-6 md:gap-x-10 gap-y-3 py-7 md:py-8 border-b border-border-strong"
            >
              {/* Numeral */}
              <div className="col-span-2 md:col-span-1 font-display font-bold text-text text-xl md:text-3xl tabular-nums tracking-tight leading-none pt-1">
                {num}
              </div>

              {/* Icon + Title */}
              <div className="col-span-10 md:col-span-3 flex items-center gap-3">
                <Icon size={22} weight="regular" />
                <h3 className="font-display font-bold text-text text-xl md:text-2xl tracking-tight leading-[1.15]">
                  {title}
                </h3>
              </div>

              {/* Description */}
              <div className="col-span-12 md:col-span-8">
                <p className="text-[15px] md:text-base text-secondary leading-relaxed max-w-[62ch]">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Closing line */}
        <Reveal delay={0.2}>
          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
            <p className="font-display font-bold text-text text-2xl md:text-3xl tracking-tight">
              Live in 2 weeks.
            </p>
            <p className="text-base text-secondary">
              No consulting. No engineering dependency.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
