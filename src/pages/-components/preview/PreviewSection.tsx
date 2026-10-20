import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { PREVIEW_COPY } from "./constants"
import { PreviewPanel } from "./PreviewPanel"

export function PreviewSection() {
  return (
    <Section headerTone="light" id="preview" labelledBy="preview-title">
      <Container className="flex flex-col gap-[50px]">
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
