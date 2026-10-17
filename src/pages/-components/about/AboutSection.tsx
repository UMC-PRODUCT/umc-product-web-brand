import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

export function AboutSection() {
  return (
    <Section headerTone="light" id="about" labelledBy="about-title">
      <Container>
        <SectionHeading
          title="기획자, 디자이너, 개발자가 함께 아이디어를 현실로 만드는 대학생 IT 연합 동아리입니다"
          titleId="about-title"
        />
      </Container>
    </Section>
  )
}
