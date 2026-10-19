import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { AboutCarousel } from "./AboutCarousel"
import { ABOUT_COPY, ABOUT_SLIDES, ABOUT_START_INDEX } from "./constants"

export function AboutSection() {
  const [firstTitleLine, secondTitleLine] = ABOUT_COPY.titleLines

  return (
    <Section headerTone="light" id="about" labelledBy="about-title">
      <Container>
        <SectionHeading
          description={ABOUT_COPY.description}
          eyebrow={ABOUT_COPY.eyebrow}
          title={
            <>
              {firstTitleLine}
              <br />
              {secondTitleLine}
            </>
          }
          titleId="about-title"
        />
      </Container>
      <AboutCarousel
        className="mt-[50px]"
        label={ABOUT_COPY.carouselLabel}
        slides={ABOUT_SLIDES}
        startIndex={ABOUT_START_INDEX}
      />
    </Section>
  )
}
