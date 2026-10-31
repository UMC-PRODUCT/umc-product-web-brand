import { createFileRoute } from "@tanstack/react-router"

import { Container } from "@/components/layout/Container"

import {
  PROJECT_AWARD_OPTIONS,
  PROJECT_CONTAINER_CLASS,
  PROJECT_GENERATION_OPTIONS,
  PROJECT_LIST,
  PROJECT_LIST_COPY,
} from "./-components/constants"
import { ProjectFilterDropdown } from "./-components/list/ProjectFilterDropdown"
import { ProjectList } from "./-components/list/ProjectList"
import { ProjectPagination } from "./-components/list/ProjectPagination"
import { ProjectSearchField } from "./-components/list/ProjectSearchField"
import { ProjectsHero } from "./-components/list/ProjectsHero"
import { ProjectsPageHeader } from "./-components/list/ProjectsPageHeader"
import { ProjectPageShell } from "./-components/ProjectPageShell"
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
    <ProjectPageShell>
      <ProjectsHero />
      {/* Figma Contents Area: 위 48, 아래 80 */}
      <Container className={`${PROJECT_CONTAINER_CLASS} pt-12 pb-20`}>
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
        <ProjectList projects={projects} />
        {projects.length > 0 && (
          <ProjectPagination
            className="mt-8"
            onPageChange={(next) =>
              changeSearch({ ...search, page: next > 1 ? next : undefined })
            }
            page={page}
            pageCount={pageCount}
          />
        )}
      </Container>
    </ProjectPageShell>
  )
}
