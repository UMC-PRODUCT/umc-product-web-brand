import coreDay from "@/assets/landing/about/core-day.webp"
import demoDay from "@/assets/landing/about/demo-day.webp"
import networkingDay from "@/assets/landing/about/networking-day.webp"
import schoolOt from "@/assets/landing/about/school-ot.webp"
import teamworkHall from "@/assets/landing/about/teamwork-hall.webp"

export interface AboutSlide {
  id: string
  src: string
  alt: string
}

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
  { id: "demo-day", src: demoDay, alt: "DEMO Day에 모인 챌린저들" },
  {
    id: "networking-day",
    src: networkingDay,
    alt: "연합 네트워킹 데이 단체 사진",
  },
  {
    id: "core-day",
    src: coreDay,
    alt: "Core Day 행사장에서 테이블마다 모여 이야기하는 운영진",
  },
  {
    id: "teamwork-hall",
    src: teamworkHall,
    alt: "행사장에서 팀별로 모여 노트북으로 작업하는 챌린저들",
  },
  { id: "school-ot", src: schoolOt, alt: "학교 OT에서 발표를 듣는 챌린저들" },
]

export const ABOUT_START_INDEX = 2
