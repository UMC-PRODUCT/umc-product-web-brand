import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function ValuesSection() {
  return (
    <Section headerTone="light" id="values" labelledBy="values-title">
      <Container>
        <SectionHeading
          title="함께한 경험이 새로운 가능성이 되도록, UMC는 다릅니다."
          titleId="values-title"
        />
      </Container>
    </Section>
  )
}
