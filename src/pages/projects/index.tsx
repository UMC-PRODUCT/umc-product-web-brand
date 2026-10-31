import { createFileRoute } from "@tanstack/react-router"

import { Footer } from "@/components/footer/Footer"
import { SiteHeader } from "@/components/header/SiteHeader"
import { Container } from "@/components/layout/Container"
import { cn } from "@/utils/cn"

import { ProjectCard } from "../-components/projects/ProjectCard"
import {
  PROJECT_AWARD_OPTIONS,
  PROJECT_GENERATION_OPTIONS,
  PROJECT_LIST,
  PROJECT_LIST_COPY,
} from "./-components/constants"
import { ProjectFilterDropdown } from "./-components/ProjectFilterDropdown"
import { ProjectPagination } from "./-components/ProjectPagination"
import { ProjectSearchField } from "./-components/ProjectSearchField"
import { ProjectsHero } from "./-components/ProjectsHero"
import { ProjectsPageHeader } from "./-components/ProjectsPageHeader"
import {
  getProjectPage,
  type ProjectAward,
  type ProjectSearch,
  parseProjectSearch,
} from "./-components/projectSearch"

export const Route = createFileRoute("/projects/")({
  validateSearch: parseProjectSearch,
  head: () => ({ meta: [{ title: "프로젝트 | UMC" }] }),
  component: ProjectsPage,
})

function ProjectsPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const { projects, page, pageCount } = getProjectPage(PROJECT_LIST, search)

  const changeSearch = (next: ProjectSearch) =>
    navigate({ search: next, replace: true, resetScroll: false })
  // 조건이 바뀌면 결과가 달라지므로 첫 페이지로 돌아간다
  const changeFilter = (next: Partial<ProjectSearch>) =>
    changeSearch({ ...search, ...next, page: undefined })

  return (
    <div className="min-h-dvh overflow-x-clip bg-teal-grey-50">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:bg-white focus:px-4 focus:py-2"
        href="#main"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <ProjectsHero />
        {/* Figma Contents Area: 위 48, 아래 80, 좌우 Mobile 24·Pad 이상 64, 최대 폭 1440 */}
        <Container className="max-w-[1440px] px-6 pt-12 pb-20 md:px-16 lg:px-16">
          <ProjectsPageHeader />
          <div className="mt-5 flex flex-col gap-(--umc-spacing-gap-12) md:flex-row md:items-center md:justify-between md:gap-(--umc-spacing-gap-32) md:px-3">
            {/* Figma 검색창 폭은 Pad 이상에서 카드 영역의 66%다 */}
            <ProjectSearchField
              className="md:w-[66%]"
              label={PROJECT_LIST_COPY.searchLabel}
              onValueChange={(value) => changeFilter({ q: value || undefined })}
              placeholder={PROJECT_LIST_COPY.searchPlaceholder}
              value={search.q ?? ""}
            />
            <div className="flex justify-end gap-(--umc-spacing-gap-8)">
              <ProjectFilterDropdown
                label="기수"
                onValueChange={([generation]) =>
                  changeFilter({
                    generation: generation ? Number(generation) : undefined,
                  })
                }
                options={PROJECT_GENERATION_OPTIONS}
                value={search.generation ? [String(search.generation)] : []}
              />
              <ProjectFilterDropdown
                label="수상내역"
                multiple
                onValueChange={(award) =>
                  changeFilter({
                    award: award.length ? (award as ProjectAward[]) : undefined,
                  })
                }
                options={PROJECT_AWARD_OPTIONS}
                placeholder="전체"
                value={search.award ?? []}
              />
            </div>
          </div>
          {projects.length > 0 ? (
            <ul className="mt-8 grid gap-(--umc-spacing-gap-24) px-3 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project.name}>
                  <ProjectCard
                    award={project.award}
                    className={cn(
                      "rounded-(--umc-radius-12) motion-safe:transition-transform",
                      // Figma Hover: 위로 4 이동, 안쪽 테두리 1.5 #b3e5e1. 썸네일 위에도 보이도록 덮개로 그린다
                      "relative after:pointer-events-none after:absolute after:inset-0 after:rounded-(--umc-radius-12) after:border-[1.5px] after:border-transparent hover:-translate-y-1 hover:after:border-teal-200",
                    )}
                    description={project.description}
                    name={project.name}
                    parts={project.parts}
                    thumbnailSrc={project.thumbnail}
                    titleAs="h2"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 px-3 text-body-3-medium text-teal-grey-500 md:text-title-3-medium">
              {PROJECT_LIST_COPY.empty}
            </p>
          )}
          <ProjectPagination
            className="mt-8"
            onPageChange={(next) =>
              changeSearch({ ...search, page: next > 1 ? next : undefined })
            }
            page={page}
            pageCount={pageCount}
          />
        </Container>
      </main>
      <Footer tone="light" />
    </div>
  )
}
