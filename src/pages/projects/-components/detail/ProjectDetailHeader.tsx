import { cn } from "@/utils/cn"

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
        className="mt-[26px] text-heading-2-semibold text-teal-grey-900"
        id="project-title"
      >
        {name}
      </h1>
      <p className="mt-3 text-body-3-regular text-neutral-medium-600 md:text-body-1-regular">
        {description}
      </p>
      <div className="mt-[10px] flex flex-wrap items-center gap-(--umc-spacing-gap-6) text-body-3-medium text-neutral-medium-600 md:text-body-1-medium">
        {/* Figma 수상 태그: Mobile 높이 22·좌우 6·12/130%, Pad 이상은 프로젝트 카드 태그와 같은 높이 26·좌우 7·14/145% */}
        <span
          className={cn(
            "flex shrink-0 items-center rounded-(--umc-radius-6) bg-fill-primary-medium-100 font-medium text-brand-default-600 tracking-normal shadow-drop-neutral-3",
            "h-[22px] px-[6px] text-[12px] leading-[1.3]",
            "md:h-[26px] md:px-[7px] md:text-[14px] md:leading-[1.45]",
          )}
        >
          {award}
        </span>
        <span>{generation}기</span>
        <span lang="en">{parts.join(" · ")}</span>
      </div>
    </header>
  )
}
