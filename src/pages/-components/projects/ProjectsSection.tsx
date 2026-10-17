import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function ProjectsSection() {
  return (
    <Section headerTone="light" id="projects" labelledBy="projects-title">
      <Container>
        <SectionHeading
          title="UMC 챌린저 프로젝트 목록 둘러보기"
          titleId="projects-title"
        />
      </Container>
    </Section>
  )
}
