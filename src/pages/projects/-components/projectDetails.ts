export interface ProjectFlowStep {
  text: string
  note?: string
}

export interface ProjectSummaryItem {
  title: string
  description: string
  apiCount?: number
}

export interface ProjectDetail {
  flow?: readonly ProjectFlowStep[]
  features?: {
    summary?: string
    note?: string
    items: readonly ProjectSummaryItem[]
  }
  stack?: readonly ProjectSummaryItem[]
}

// 글 내용은 노션 정리본을 받아 프로젝트 id별로 채운다
export const PROJECT_DETAILS: Readonly<Record<string, ProjectDetail>> = {}
