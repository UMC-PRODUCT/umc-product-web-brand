import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function RecruitmentSection() {
  return (
    <Section headerTone="light" id="recruit" labelledBy="recruit-title">
      <Container>
        <SectionHeading title="UMC 11기 모집 분야" titleId="recruit-title" />
      </Container>
    </Section>
  )
}
