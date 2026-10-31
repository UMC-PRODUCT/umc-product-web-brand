import { PROJECT_LIST_COPY } from "../constants"
import { ProjectBreadcrumbs } from "../ProjectBreadcrumbs"

interface ProjectDetailHeaderProps {
  name: string
  description: string
  award: string
  generation: number
  parts: readonly string[]
  tabLabel: string
}

export function ProjectDetailHeader({
  name,
  description,
  award,
  generation,
  parts,
  tabLabel,
}: ProjectDetailHeaderProps) {
  return (
    <header className="pl-3">
      <ProjectBreadcrumbs
        items={[
          { label: "홈", to: "/" },
          { label: PROJECT_LIST_COPY.title, to: "/projects" },
          { label: name },
          { label: tabLabel },
        ]}
      />
      <h1
        className="mt-[26px] font-semibold text-[20px] text-teal-grey-900 leading-[1.4] tracking-[-0.2px] md:text-heading-2-semibold"
        id="project-title"
      >
        {name}
      </h1>
      <p className="mt-3 text-body-3-regular text-neutral-medium-600 md:text-body-1-regular">
        {description}
      </p>
      <div className="mt-[10px] flex flex-wrap items-center gap-(--umc-spacing-gap-6) text-body-1-medium text-neutral-medium-600">
        {/* Figma Tag/Basic Weak·Md·Brand: 프로젝트 카드의 태그와 같은 값 */}
        <span className="flex h-[26px] shrink-0 items-center rounded-(--umc-radius-6) bg-fill-primary-medium-100 px-[7px] font-medium text-[14px] text-brand-default-600 leading-[1.45] shadow-drop-neutral-3">
          {award}
        </span>
        <span>{generation}기</span>
        <span lang="en">{parts.join(" · ")}</span>
      </div>
    </header>
  )
}
