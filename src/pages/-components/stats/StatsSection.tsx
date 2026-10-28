import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { STATS, STATS_COPY } from "./constants"
import { StatCard } from "./StatCard"

export function StatsSection() {
  return (
    <Section
      className="relative isolate overflow-clip"
      headerTone="light"
      id="stats"
      labelledBy="stats-title"
    >
      <Container className="flex flex-col items-center gap-10 md:gap-[60px]">
        <SectionHeading
          description={STATS_COPY.description}
          title={STATS_COPY.title}
          titleId="stats-title"
        />
        <div className="relative flex w-full justify-center">
          <div
            aria-hidden
            className="stats-glow pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[1750px] w-[2400px] -translate-x-1/2 translate-y-[calc(-50%+30px)]"
          />
          <dl className="flex w-full flex-col items-center gap-4 md:flex-row md:justify-center">
            {STATS.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                unit={stat.unit}
                value={stat.value}
              />
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  )
}
