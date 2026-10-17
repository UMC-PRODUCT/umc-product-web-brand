import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function UniversitiesSection() {
  return (
    <Section
      headerTone="light"
      id="universities"
      labelledBy="universities-title"
    >
      <Container>
        <SectionHeading
          title="UMC와 함께하는 학교"
          titleId="universities-title"
        />
      </Container>
    </Section>
  )
}
