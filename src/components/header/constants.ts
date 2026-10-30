import { type SectionId } from "@/components/layout/Section"

export type NavId = Extract<SectionId, "about" | "projects" | "recruit" | "faq">

export interface NavItem {
  id: NavId
  label: string
}

export interface QuickLink {
  label: string
  href: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "소개" },
  { id: "projects", label: "프로젝트" },
  { id: "recruit", label: "모집안내" },
  { id: "faq", label: "자주 묻는 질문" },
]

const NAV_ID_BY_SECTION = {
  hero: null,
  about: "about",
  stats: "about",
  values: "about",
  preview: "about",
  universities: "about",
  projects: "projects",
  recruit: "recruit",
  faq: "faq",
  cta: null,
} satisfies Record<SectionId, NavId | null>

const navIdBySection = new Map<string, NavId | null>(
  Object.entries(NAV_ID_BY_SECTION),
)

export function navIdForSection(sectionId: string): NavId | null {
  return navIdBySection.get(sectionId) ?? null
}

export const QUICK_LINKS_TITLE = "UMC 바로가기"

export const QUICK_LINKS: readonly QuickLink[] = [
  {
    label: "지원하기",
    href: "https://university.neordinary.com/projects/apply-guide",
  },
  { label: "UPMS", href: "https://university.neordinary.com" },
  { label: "UMC 테크블로그", href: "https://tech.university.neordinary.com" },
]
