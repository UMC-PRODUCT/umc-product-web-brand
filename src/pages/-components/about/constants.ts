import coreDay800 from "@/assets/landing/about/core-day-800.webp"
import coreDay1200 from "@/assets/landing/about/core-day-1200.webp"
import coreDay1800 from "@/assets/landing/about/core-day-1800.webp"
import demoDay800 from "@/assets/landing/about/demo-day-800.webp"
import demoDay1200 from "@/assets/landing/about/demo-day-1200.webp"
import demoDay1800 from "@/assets/landing/about/demo-day-1800.webp"
import networkingDay800 from "@/assets/landing/about/networking-day-800.webp"
import networkingDay1200 from "@/assets/landing/about/networking-day-1200.webp"
import networkingDay1800 from "@/assets/landing/about/networking-day-1800.webp"
import schoolOt800 from "@/assets/landing/about/school-ot-800.webp"
import schoolOt1200 from "@/assets/landing/about/school-ot-1200.webp"
import schoolOt1800 from "@/assets/landing/about/school-ot-1800.webp"
import teamworkHall800 from "@/assets/landing/about/teamwork-hall-800.webp"
import teamworkHall1200 from "@/assets/landing/about/teamwork-hall-1200.webp"
import teamworkHall1800 from "@/assets/landing/about/teamwork-hall-1800.webp"

export interface AboutSlide {
  id: string
  src: string
  srcSet: string
  alt: string
}

const photoSources = (w800: string, w1200: string, w1800: string) => ({
  src: w1800,
  srcSet: `${w800} 800w, ${w1200} 1200w, ${w1800} 1800w`,
})

export const ABOUT_COPY = {
  eyebrow: "ABOUT UMC",
  titleLines: [
    "기획자, 디자이너, 개발자가",
    "함께 아이디어를 현실로 만드는 대학생 IT 연합 동아리입니다",
  ],
  description:
    "다양한 사람들과 만나고, 새로운 도전을 시작해요. 우리가 함께 만들어 온 순간들을 만나보세요.",
  carouselLabel: "UMC 활동 사진",
} as const

export const ABOUT_SLIDES: readonly AboutSlide[] = [
  {
    id: "demo-day",
    ...photoSources(demoDay800, demoDay1200, demoDay1800),
    alt: "DEMO Day에 모인 챌린저들",
  },
  {
    id: "networking-day",
    ...photoSources(networkingDay800, networkingDay1200, networkingDay1800),
    alt: "연합 네트워킹 데이 단체 사진",
  },
  {
    id: "core-day",
    ...photoSources(coreDay800, coreDay1200, coreDay1800),
    alt: "Core Day 행사장에서 테이블마다 모여 이야기하는 운영진",
  },
  {
    id: "teamwork-hall",
    ...photoSources(teamworkHall800, teamworkHall1200, teamworkHall1800),
    alt: "행사장에서 팀별로 모여 노트북으로 작업하는 챌린저들",
  },
  {
    id: "school-ot",
    ...photoSources(schoolOt800, schoolOt1200, schoolOt1800),
    alt: "학교 OT에서 발표를 듣는 챌린저들",
  },
]

export const ABOUT_START_INDEX = 2
