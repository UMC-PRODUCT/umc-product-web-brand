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
              {/* Figma 요약: 14/150%·16/140%·18/140%. 18은 label-1-medium과 자간(-2%)이 달라 임의 값 */}
              {features.summary && (
                <p className="text-body-3-medium text-teal-grey-800 md:font-medium md:text-[16px] md:leading-[1.4] lg:text-[18px]">
                  {features.summary}
                </p>
              )}
              {/* Figma 설명: Mobile Medium 12/130%, Pad Regular 13/150%, Small PC 이상 Regular 14/150% */}
              {features.note && (
                <p className="whitespace-pre-line font-medium text-[12px] text-neutral-weak-500 leading-[1.3] md:font-normal md:text-[13px] md:leading-[1.5] lg:text-[14px]">
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
          {/* Figma 기술 스택: Mobile 1열, Pad 이상 3열. 간격 Pad까지 12, Small PC 이상 16 */}
          <ul className="mt-8 grid gap-(--umc-spacing-gap-12) md:grid-cols-3 lg:gap-(--umc-spacing-gap-16)">
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
