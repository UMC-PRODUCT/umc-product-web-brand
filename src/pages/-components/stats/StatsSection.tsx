import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { STATS, STATS_COPY } from "./constants"
import { StatCard } from "./StatCard"

export function StatsSection() {
  return (
    <Section headerTone="light" id="stats" labelledBy="stats-title">
      <Container className="flex flex-col items-center gap-[60px]">
        <SectionHeading
          description={STATS_COPY.description}
          title={STATS_COPY.title}
          titleId="stats-title"
        />
        <dl className="flex w-full gap-8">
          {STATS.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              unit={stat.unit}
              value={stat.value}
            />
          ))}
        </dl>
      </Container>
    </Section>
  )
}
