import BestProject from "@/assets/projects/best-project.svg?react"
import BestProjectStacked from "@/assets/projects/best-project-stacked.svg?react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

import { PROJECT_LIST_COPY } from "../constants"
import { ProjectsHeroSlides } from "./ProjectsHeroSlides"

const HERO_GRADIENT_ID = "projects-hero-gradient"

export function ProjectsHero() {
  return (
    <Section
      // Figma Hero BG Section(1306:30912) 맨 아래 채우기. 토큰에 없는 색이다
      className="relative isolate min-h-[801px] overflow-hidden bg-[#020A09]"
      headerTone="dark"
      id="projects"
      labelledBy="projects-hero-title"
    >
      {/* Figma 채우기 순서(아래→위): 단색 → 검정 20% → 청록 그라데이션 → 사진 24% */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/20" />
        {/* 그라데이션은 프레임 비율을 따라 늘어난다(Figma gradientTransform).
            CSS 각도는 폭마다 달라져서, 상자 비율대로 늘어나는 SVG로 그린다.
            시작점(0.088, 0.075)에서 Figma 그라데이션 축 (1.585, 0.897)/|축|² 만큼 간 곳이 끝점이다 */}
        <svg
          aria-hidden
          className="absolute inset-0 size-full"
          preserveAspectRatio="none"
          viewBox="0 0 1 1"
        >
          <defs>
            <linearGradient
              id={HERO_GRADIENT_ID}
              x1="0.088"
              x2="0.566"
              y1="0.075"
              y2="0.346"
            >
              {/* 정지점 #2ED1BE 알파 40% → 0. 토큰에 없는 색이다 */}
              <stop offset="0" stopColor="#2ED1BE" stopOpacity="0.4" />
              <stop offset="1" stopColor="#2ED1BE" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* 칠 투명도 40% */}
          <rect
            fill={`url(#${HERO_GRADIENT_ID})`}
            height="1"
            opacity="0.4"
            width="1"
          />
        </svg>
        {/* 사진 칠 투명도 24% */}
        <ProjectsHeroSlides className="absolute inset-0 opacity-24" />
      </div>
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
