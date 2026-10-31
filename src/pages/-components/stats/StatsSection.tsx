import { useRef } from "react"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { SponsorsBand } from "../sponsors/SponsorsBand"
import { STATS, STATS_COPY } from "./constants"
import { StatCard } from "./StatCard"
import { useStartWhenVisible } from "./useCountUp"

export function StatsSection() {
  const listRef = useRef<HTMLDListElement>(null)
  const countStarted = useStartWhenVisible(listRef)

  return (
    <Section
      className="relative"
      headerTone="light"
      id="stats"
      labelledBy="stats-title"
    >
      <Container className="flex flex-col items-center gap-10 md:gap-8 xl:gap-[60px]">
        <SectionHeading
          description={STATS_COPY.description}
          title={STATS_COPY.title}
          titleId="stats-title"
        />
        <div className="relative flex w-full justify-center">
          <div
            aria-hidden
            className="stats-glow pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[348px] w-[977px] -translate-x-1/2 translate-y-[calc(-50%+15px)] lg:translate-y-[calc(-50%+9px)] xl:translate-y-[calc(-50%-14px)]"
          />
          <dl
            className="flex w-full flex-col items-center gap-2.5 md:flex-row md:justify-center md:gap-4"
            ref={listRef}
          >
            {STATS.map((stat) => (
              <StatCard
                countStarted={countStarted}
                key={stat.id}
                label={stat.label}
                unit={stat.unit}
                value={stat.value}
              />
            ))}
          </dl>
        </div>
      </Container>
      <SponsorsBand />
    </Section>
  )
}
