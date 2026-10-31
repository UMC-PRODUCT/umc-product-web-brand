import { z } from "zod"

export const PROJECT_PAGE_SIZE = 9

const searchSchema = z.object({
  q: z.string().optional().catch(undefined),
  generation: z.coerce.number().int().optional().catch(undefined),
  award: z
    .array(z.enum(["grand", "excellence", "merit"]))
    .optional()
    .catch(undefined),
  page: z.coerce.number().int().min(1).optional().catch(undefined),
})

export type ProjectSearch = z.infer<typeof searchSchema>
export type ProjectAward = NonNullable<ProjectSearch["award"]>[number]

interface FilterableProject {
  name: string
  award: string
  generation: number
}

const AWARD_LABELS: Record<ProjectAward, string> = {
  grand: "대상",
  excellence: "최우수상",
  merit: "우수상",
}

const detailSearchSchema = z.object({
  tab: z.literal("detail").optional().catch(undefined),
})

export type ProjectDetailTab = "intro" | "detail"

export function parseProjectDetailSearch(search: Record<string, unknown>) {
  return detailSearchSchema.parse(search)
}

export function parseProjectSearch(search: Record<string, unknown>) {
  return searchSchema.parse(search)
}

export function filterProjects<T extends FilterableProject>(
  projects: readonly T[],
  { q, generation, award }: ProjectSearch,
) {
  const keyword = q?.trim().toLowerCase()
  const awards = award?.map((value) => AWARD_LABELS[value])
  return projects.filter(
    (project) =>
      (!keyword || project.name.toLowerCase().includes(keyword)) &&
      (!generation || project.generation === generation) &&
      (!awards || awards.includes(project.award)),
  )
}

export function getProjectPage<T extends FilterableProject>(
  projects: readonly T[],
  search: ProjectSearch,
) {
  const filtered = filterProjects(projects, search)
  const pageCount = Math.max(Math.ceil(filtered.length / PROJECT_PAGE_SIZE), 1)
  const page = Math.min(search.page ?? 1, pageCount)
  const start = (page - 1) * PROJECT_PAGE_SIZE
  return {
    projects: filtered.slice(start, start + PROJECT_PAGE_SIZE),
    page,
    pageCount,
  }
}
