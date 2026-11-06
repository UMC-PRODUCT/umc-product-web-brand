export interface StatItem {
  id: "members" | "applicants" | "projects"
  label: string
  value: number
  unit: "명" | "개"
}

export const STATS_COPY = {
  title: "새로운 가능성을 UMC에서",
  description:
    "팀원들과 함께 제품 출시를 목표로 완성도 높은 서비스를 만들어요.",
} as const

export const STATS: readonly StatItem[] = [
  { id: "members", label: "누적 활동 회원 수", value: 4000, unit: "명" },
  {
    id: "applicants",
    label: "매 기수 평균 지원자 수",
    value: 1500,
    unit: "명",
  },
  { id: "projects", label: "누적 프로젝트 수", value: 600, unit: "개" },
]
