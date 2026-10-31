import BestProject from "@/assets/projects/best-project.svg?react"
import BestProjectStacked from "@/assets/projects/best-project-stacked.svg?react"
import heroGlow from "@/assets/projects/hero-glow.webp"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

import { PROJECT_LIST_COPY } from "../constants"

export function ProjectsHero() {
  return (
    <Section
      className="relative isolate min-h-[801px] overflow-hidden bg-[#020807]"
      headerTone="dark"
      id="projects"
      labelledBy="projects-hero-title"
    >
      {/* Figma 프레임의 채우기와 그래픽을 합친 이미지. 글자 영역은 위아래 색으로 메웠다 */}
      <img
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover"
        decoding="async"
        height={800}
        src={heroGlow}
        width={1440}
      />
      {/* Figma 글자 시작 위치: Mobile·Pad 321, Small PC 이상 341. Mobile은 312 폭을 가운데에 둔다 */}
      <Container className="max-w-[1440px] px-6 pt-[321px] md:px-16 lg:px-16 lg:pt-[341px]">
        <div className="mx-auto max-w-[312px] md:mx-0 md:max-w-none md:pl-4 lg:pl-5">
          {/* Figma: Medium, 줄 높이 140%, 자간 2px. 같은 텍스트 스타일 토큰이 없다 */}
          <p
            className="font-medium text-[15px] text-teal-300 leading-[1.4] tracking-[2px] md:text-[20px] xl:text-[22px]"
            lang="en"
          >
            {PROJECT_LIST_COPY.eyebrow}
          </p>
          {/* 시안 글꼴(KIMM_Bold)이 없어 글자를 SVG로 뽑았다. 줄 높이 여백을 제외한 글자 영역만 들어 있다 */}
          <p
            className="mt-[23px] text-white md:mt-[29px] lg:mt-[23px] xl:mt-[25px]"
            id="projects-hero-title"
            lang="en"
          >
            <span className="sr-only">{PROJECT_LIST_COPY.heroTitle}</span>
            <BestProjectStacked
              aria-hidden
              className="h-[100px] w-auto md:h-[161px] lg:hidden"
            />
            <BestProject
              aria-hidden
              className="hidden h-[61px] w-auto lg:block xl:h-[69px]"
            />
          </p>
          <p className="mt-[23px] text-[16px] text-teal-grey-300 leading-[1.4] tracking-[-0.02em] md:mt-9 md:text-[20px] lg:mt-11 xl:mt-[31px] xl:text-[24px]">
            {PROJECT_LIST_COPY.description}
          </p>
        </div>
      </Container>
    </Section>
  )
}
