import { Link } from "@tanstack/react-router"

import { Button } from "@/components/button/Button"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { cn } from "@/utils/cn"

import { PROJECTS, PROJECTS_COPY } from "./constants"
import { ProjectCarousel } from "./ProjectCarousel"

export function ProjectsSection() {
  return (
    <Section headerTone="light" id="projects" labelledBy="projects-title">
      <Container className="px-4">
        <SectionHeading
          className="mx-auto max-w-[326px] md:max-w-none [&>h2]:whitespace-pre-line [&>h2]:tracking-[-0.03em] md:[&>h2]:whitespace-normal"
          description={PROJECTS_COPY.description}
          title={PROJECTS_COPY.title}
          titleId="projects-title"
        />
      </Container>
      <ProjectCarousel
        className="mt-8 md:mt-12 lg:mt-[60px] xl:mt-[70px]"
        label="데모데이 수상 프로젝트"
        projects={PROJECTS}
      />
      <div className="mt-8 flex justify-center md:mt-12 lg:mt-[60px] xl:mt-[70px]">
        <Button
          arrow
          asChild
          className={cn(
            "h-12 rounded-(--umc-radius-14) pr-[14px] pl-(--umc-spacing-padding-16) text-[17px] leading-[1.4] tracking-[-0.34px] backdrop-blur-none [&>span]:p-0 [&_svg]:size-4",
            "md:h-[64px] md:rounded-(--umc-radius-18) md:pr-(--umc-spacing-padding-16) md:pl-(--umc-spacing-padding-28) md:text-[22px] md:leading-[1.35] md:tracking-[-0.22px] md:backdrop-blur-[4px] md:[&>span]:p-(--umc-spacing-padding-4) md:[&_svg]:size-6",
            "xl:h-[68px] xl:pr-(--umc-spacing-padding-20) xl:pl-(--umc-spacing-padding-32)",
            "xl:text-[24px] xl:tracking-[-0.24px]",
          )}
          color="brand"
          size="lg"
          variant="weak"
        >
          <Link to="/projects">{PROJECTS_COPY.cta}</Link>
        </Button>
      </div>
    </Section>
  )
}
