import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { PREVIEW_COPY } from "./constants"
import { PreviewPanel } from "./PreviewPanel"

export function PreviewSection() {
  return (
    <Section headerTone="light" id="preview" labelledBy="preview-title">
      {/* Figma 제목 묶음과 본문 간격: Mobile 24, Pad 20, Small PC 24. PC는 본문 여백 32가 간격을 대신한다 */}
      <Container className="flex flex-col gap-(--umc-spacing-gap-24) md:gap-(--umc-spacing-gap-20) lg:gap-(--umc-spacing-gap-24) xl:gap-0">
        <SectionHeading
          description={PREVIEW_COPY.description}
          title={PREVIEW_COPY.title}
          titleId="preview-title"
        />
        <PreviewPanel />
      </Container>
    </Section>
  )
}
