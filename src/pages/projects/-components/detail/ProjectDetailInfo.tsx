import { ProjectDetailSection } from "./ProjectDetailSection"
import { ProjectFlowList } from "./ProjectFlowList"
import { ProjectImageStack } from "./ProjectImageStack"
import { ProjectSummaryCard } from "./ProjectSummaryCard"
import { type ProjectDetail } from "./projectDetails"
import {
  getProjectDetailImages,
  type ProjectDetailImageGroup,
} from "./projectImageData"

interface ProjectDetailInfoProps {
  projectId: string
  name: string
  detail?: ProjectDetail
}

const IMAGE_SECTIONS: readonly {
  group: ProjectDetailImageGroup
  title: string
}[] = [
  { group: "ia", title: "IA" },
  { group: "design-system", title: "Design System" },
  { group: "ui", title: "UI" },
]

export function ProjectDetailInfo({
  projectId,
  name,
  detail,
}: ProjectDetailInfoProps) {
  const { flow, features, stack } = detail ?? {}

  return (
    // Figma 패널 위 60, 좌우 Pad 32·Small PC 이상 68, 섹션 간격 76·80·84
    <div className="flex flex-col gap-[76px] bg-teal-grey-50 pt-[60px] md:gap-20 md:px-8 lg:gap-[84px] lg:px-[68px]">
      {flow && flow.length > 0 && (
        <ProjectDetailSection title="서비스 이용 흐름">
          <ProjectFlowList steps={flow} />
        </ProjectDetailSection>
      )}
      {features && features.items.length > 0 && (
        <ProjectDetailSection title="핵심 기능">
          {(features.summary || features.note) && (
            <div className="mt-6 flex flex-col gap-(--umc-spacing-gap-6)">
              {features.summary && (
                <p className="font-medium text-[18px] text-teal-grey-800 leading-[1.4]">
                  {features.summary}
                </p>
              )}
              {features.note && (
                <p className="whitespace-pre-line text-[14px] text-neutral-weak-500 leading-[1.5]">
                  {features.note}
                </p>
              )}
            </div>
          )}
          <ul className="mt-8 grid gap-(--umc-spacing-gap-12) md:grid-cols-2 md:gap-(--umc-spacing-gap-16)">
            {features.items.map((item) => (
              <ProjectSummaryCard key={item.title} {...item} size="lg" />
            ))}
          </ul>
        </ProjectDetailSection>
      )}
      {stack && stack.length > 0 && (
        <ProjectDetailSection title="기술 스택">
          <ul className="mt-8 grid gap-(--umc-spacing-gap-12) md:grid-cols-2 md:gap-(--umc-spacing-gap-16) lg:grid-cols-3">
            {stack.map((item) => (
              <ProjectSummaryCard key={item.title} {...item} size="md" />
            ))}
          </ul>
        </ProjectDetailSection>
      )}
      {IMAGE_SECTIONS.map(({ group, title }) => {
        const images = getProjectDetailImages(projectId, group)
        if (images.length === 0) return null
        return (
          <ProjectDetailSection key={group} title={title}>
            <ProjectImageStack
              className="mt-8"
              images={images}
              label={`${name} ${title}`}
            />
          </ProjectDetailSection>
        )
      })}
    </div>
  )
}
