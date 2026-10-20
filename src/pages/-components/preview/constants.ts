import coreDay from "@/assets/landing/about/core-day.webp"
import demoDay from "@/assets/landing/about/demo-day.webp"
import networkingDay from "@/assets/landing/about/networking-day.webp"
import schoolOt from "@/assets/landing/about/school-ot.webp"

export interface PreviewTab {
  id: string
  label: string
  image?: { src: string; alt: string }
  description?: string
}

export const PREVIEW_COPY = {
  title: "UMC Preview",
  description: "다양한 IT 네트워킹을, 여기 UMC에서 경험하세요.",
  tabListLabel: "UMC 활동",
} as const

// 이미지와 설명은 시안에 첫 번째 탭만 있다. 나머지는 디자이너 확인 전까지 비워 둔다 (#14)
export const PREVIEW_TABS: readonly PreviewTab[] = [
  {
    id: "school-ot",
    label: "학교 OT · 연합 OT",
    image: { src: schoolOt, alt: "학교 OT에서 발표를 듣는 챌린저들" },
    description:
      "UMC의 첫걸음을 내딛는 챌린저들을 위해 각 학교 및 중앙운영사무국이 주최하는 자리로 UMC의 전반적인 소개는 물론, 우리만의 독특한 문화, 앞으로 도전해야 할 목표와 커리큘럼, 그리고 스터디가 어떻게 진행될지에 대한 모든 것을 공유",
  },
  {
    id: "core-day",
    label: "Core Day",
    image: {
      src: coreDay,
      alt: "Core Day 행사장에서 테이블마다 모여 이야기하는 운영진",
    },
  },
  {
    id: "networking-day",
    label: "연합 네트워킹 데이",
    image: { src: networkingDay, alt: "연합 네트워킹 데이 단체 사진" },
  },
  { id: "nerdinary-hackathon", label: "너디너리 해커톤" },
  { id: "umc-hackathon", label: "UMC 해커톤" },
  {
    id: "demo-day",
    label: "DEMO Day",
    image: { src: demoDay, alt: "DEMO Day에 모인 챌린저들" },
  },
  { id: "fs-day", label: "FS Day" },
  { id: "central-mt", label: "중앙 MT" },
]
