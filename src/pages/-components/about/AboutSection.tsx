import { useRef } from "react"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { cn } from "@/utils/cn"

import { AboutCarousel } from "./AboutCarousel"
import { ABOUT_COPY, ABOUT_SLIDES, ABOUT_START_INDEX } from "./constants"
import { useAboutMode } from "./useAboutMode"
import { useKeepNextSectionInView } from "./useKeepNextSectionInView"
import { useScrollZoom } from "./useScrollZoom"

export function AboutSection() {
  const mode = useAboutMode()
  useKeepNextSectionInView(mode, "about")
  return mode === "zoom" ? <AboutZoomSection /> : <AboutStaticSection />
}

function AboutStaticSection() {
  return (
    <Section headerTone="light" id="about" labelledBy="about-title">
      <AboutContent zooming={false} />
    </Section>
  )
}

function AboutZoomSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const settled = useScrollZoom(sectionRef, stageRef)

  return (
    <Section
      className={cn("about-zoom", settled && "about-zoom-settled")}
      headerTone="light"
      id="about"
      labelledBy="about-title"
      ref={sectionRef}
    >
      <div className="about-zoom-stage" ref={stageRef}>
        <AboutContent zooming={!settled} />
      </div>
    </Section>
  )
}

function AboutContent({ zooming }: { zooming: boolean }) {
  const [firstTitleLine, secondTitleLine] = ABOUT_COPY.titleLines

  return (
    <>
      <Container className="about-heading">
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
        zooming={zooming}
      />
    </>
  )
}
