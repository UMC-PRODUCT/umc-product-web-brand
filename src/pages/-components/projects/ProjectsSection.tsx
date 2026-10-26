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
      <Container>
        <SectionHeading
          description={PROJECTS_COPY.description}
          title={PROJECTS_COPY.title}
          titleId="projects-title"
        />
      </Container>
      {/* Figma 제목·캐러셀·버튼 사이 간격: Mobile 50, Pad 48, Small PC 이상 80 */}
      <ProjectCarousel
        className="mt-[50px] md:mt-12 lg:mt-20"
        label="데모데이 수상 프로젝트"
        projects={PROJECTS}
      />
      <div className="mt-[50px] flex justify-center md:mt-12 lg:mt-20">
        {/* TODO: 이동할 주소가 정해지면 asChild로 <a>를 씌운다 */}
        <Button
          arrow
          className={cn(
            // Figma 버튼 크기: PC 이상은 Xl, 그 아래는 Lg. Size 변형은 반응형을 받지 않아 Xl 값을 덮는다
            "xl:h-[68px] xl:pr-(--umc-spacing-padding-20) xl:pl-(--umc-spacing-padding-32)",
            "xl:text-[24px] xl:tracking-[-0.24px]",
          )}
          color="brand"
          size="lg"
          variant="weak"
        >
          {PROJECTS_COPY.cta}
        </Button>
      </div>
    </Section>
  )
}
