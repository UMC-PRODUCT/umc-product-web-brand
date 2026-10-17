import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function FaqSection() {
  return (
    <Section headerTone="light" id="faq" labelledBy="faq-title">
      <Container>
        <SectionHeading title="자주 묻는 질문" titleId="faq-title" />
      </Container>
    </Section>
  )
}
