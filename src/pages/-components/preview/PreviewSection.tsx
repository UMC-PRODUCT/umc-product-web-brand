import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function PreviewSection() {
  return (
    <Section headerTone="light" id="preview" labelledBy="preview-title">
      <Container>
        <SectionHeading title="UMC Preview" titleId="preview-title" />
      </Container>
    </Section>
  )
}
