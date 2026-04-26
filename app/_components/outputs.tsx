import {
  ChartLineUp,
  CirclesThreePlus,
  Cube,
  Robot,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "./reveal";

type Output = {
  title: string;
  description: string;
  Icon: ComponentType<{ size?: number; weight?: "regular" | "bold" }>;
};

const outputs: Output[] = [
  {
    title: "Dashboards",
    description:
      "Real-time KPIs and operational metrics, built without engineering.",
    Icon: ChartLineUp,
  },
  {
    title: "Workflows",
    description: "Automate cross-system operations end to end.",
    Icon: CirclesThreePlus,
  },
  {
    title: "Apps",
    description: "Internal tools your teams actually want to use.",
    Icon: Cube,
  },
  {
    title: "AI Agents",
    description: "Autonomous operators that act on your data.",
    Icon: Robot,
  },
];

export function Outputs() {
  return (
    <section id="outputs" className="relative w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16">
        {/* Header — single column, subhead under H2 */}
        <Reveal className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-8 h-px bg-border-strong" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Outputs
            </span>
          </div>
          <h2 className="font-display font-bold text-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-tighter">
            Four shapes for{" "}
            <span className="text-secondary">your data.</span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-base md:text-lg text-secondary leading-relaxed">
            One platform, four delivery surfaces. Most teams use all four
            within their first month.
          </p>
        </Reveal>

        {/* List — divide-y, no cards */}
        <StaggerContainer className="border-t border-border">
          {outputs.map(({ title, description, Icon }, i) => (
            <StaggerItem
              key={title}
              className="border-b border-border"
            >
              <div className="grid grid-cols-12 items-start gap-x-6 md:gap-x-10 py-7 md:py-8 group">
                <div className="col-span-1 md:col-span-1 pt-1 text-tertiary text-xs tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-11 md:col-span-4 flex items-center gap-3">
                  <Icon
                    size={20}
                    weight="regular"
                  />
                  <h3 className="font-display font-bold text-text text-2xl md:text-3xl tracking-tight leading-tight">
                    {title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-7 mt-3 md:mt-1">
                  <p className="text-base md:text-lg text-secondary leading-relaxed max-w-[55ch]">
                    {description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
