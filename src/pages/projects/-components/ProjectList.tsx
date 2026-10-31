import { Link } from "@tanstack/react-router"

import { cn } from "@/utils/cn"

import { type Project } from "../../-components/projects/constants"
import { ProjectCard } from "../../-components/projects/ProjectCard"
import { PROJECT_LIST_COPY } from "./constants"
import { ProjectCardSkeleton } from "./ProjectCardSkeleton"
import { PROJECT_PAGE_SIZE } from "./projectSearch"

interface ProjectListProps {
  projects: readonly Project[]
  isLoading?: boolean
}

const GRID_CLASS =
  "mt-8 grid gap-(--umc-spacing-gap-24) px-3 md:grid-cols-2 lg:grid-cols-3"
const SKELETON_KEYS = Array.from(
  { length: PROJECT_PAGE_SIZE },
  (_, index) => index,
)

export function ProjectList({ projects, isLoading = false }: ProjectListProps) {
  if (isLoading) {
    return (
      <div aria-busy className={GRID_CLASS} role="status">
        <span className="sr-only">{PROJECT_LIST_COPY.loading}</span>
        {SKELETON_KEYS.map((key) => (
          <ProjectCardSkeleton key={key} />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <p className="mt-8 px-3 text-body-3-medium text-teal-grey-500 md:text-title-3-medium">
        {PROJECT_LIST_COPY.empty}
      </p>
    )
  }

  return (
    <ul className={GRID_CLASS}>
      {projects.map((project) => (
        <li key={project.id}>
          <Link
            className="block rounded-(--umc-radius-12) outline-teal-500 outline-offset-2 focus-visible:outline-2"
            params={{ projectId: project.id }}
            to="/projects/$projectId"
          >
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
          </Link>
        </li>
      ))}
    </ul>
  )
}
