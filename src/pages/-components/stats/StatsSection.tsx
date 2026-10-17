import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function StatsSection() {
  return (
    <Section headerTone="light" id="stats" labelledBy="stats-title">
      <Container>
        <SectionHeading title="새로운 가능성을 UMC에서" titleId="stats-title" />
      </Container>
    </Section>
  )
}
