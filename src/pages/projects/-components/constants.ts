import { PROJECTS } from "../../-components/projects/constants"

export const PROJECT_LIST_COPY = {
  eyebrow: "UNIVERSITY MAKEUS CHALLENGE",
  heroTitle: "UMC BEST PROJECT",
  title: "프로젝트 목록",
  description: "역대 데모데이 수상 프로젝트를 한자리에서 만나보세요",
  searchLabel: "프로젝트 이름 검색",
  searchPlaceholder: "프로젝트 명으로 검색하세요",
  detailIntro: "프로젝트 소개",
  empty: "조건에 맞는 프로젝트가 없어요.",
  loading: "프로젝트를 불러오는 중이에요.",
} as const

// Figma Contents Area 좌우: Mobile 24, Pad 이상 64, 최대 폭 1440
export const PROJECT_CONTAINER_CLASS = "max-w-[1440px] px-6 md:px-16 lg:px-16"

// Figma 기수 드롭다운 값 (517:14100)
export const PROJECT_GENERATION_OPTIONS = [10, 9, 8, 7, 6, 5].map((n) => ({
  value: String(n),
  label: `${n}기`,
}))

export const PROJECT_AWARD_OPTIONS = [
  { value: "grand", label: "대상" },
  { value: "excellence", label: "최우수상" },
  { value: "merit", label: "우수상" },
] as const

// 랜딩에 있는 수상작은 모두 10기다
export const PROJECT_LIST = PROJECTS.map((project) => ({
  ...project,
  generation: 10,
}))

export function findProject(id: string) {
  return PROJECT_LIST.find((project) => project.id === id)
}
