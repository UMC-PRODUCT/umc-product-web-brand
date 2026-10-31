import { Tabs } from "radix-ui"
import { type ReactNode } from "react"

import { PROJECT_LIST_COPY } from "./constants"
import { type ProjectDetailTab } from "./projectSearch"

interface ProjectDetailTabsProps {
  value: ProjectDetailTab
  onValueChange: (value: ProjectDetailTab) => void
  intro: ReactNode
  detail: ReactNode
}

const TABS: readonly { value: ProjectDetailTab; label: string }[] = [
  { value: "intro", label: PROJECT_LIST_COPY.detailIntro },
  { value: "detail", label: PROJECT_LIST_COPY.detailInfo },
]

export function ProjectDetailTabs({
  value,
  onValueChange,
  intro,
  detail,
}: ProjectDetailTabsProps) {
  return (
    <Tabs.Root
      className="mt-8 px-3"
      onValueChange={(next) => onValueChange(next as ProjectDetailTab)}
      value={value}
    >
      <Tabs.List
        aria-label="프로젝트 정보"
        className="flex h-[46px] gap-(--umc-spacing-gap-8) rounded-(--umc-radius-14) bg-teal-grey-75 p-(--umc-spacing-padding-4) shadow-[inset_-1px_2.5px_4px_rgb(228_228_228/0.2)]"
      >
        {TABS.map((tab) => (
          <Tabs.Trigger
            className="h-[38px] min-w-0 flex-1 cursor-pointer rounded-(--umc-radius-12) px-(--umc-spacing-padding-12) text-brand-default-600 text-label-3-semibold outline-teal-500 outline-offset-2 focus-visible:outline-2 data-[state=active]:bg-white data-[state=active]:text-teal-grey-800 data-[state=active]:shadow-[0_1px_2px_rgb(99_196_184/0.2),0_0_10px_rgb(156_163_163/0.3)] motion-safe:transition-[background-color,box-shadow,color]"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {/* Figma: 소개 이미지는 탭 아래 16, 상세정보 패널은 탭에 바로 붙는다 */}
      <Tabs.Content className="mt-4 outline-none" value="intro">
        {intro}
      </Tabs.Content>
      <Tabs.Content className="outline-none" value="detail">
        {detail}
      </Tabs.Content>
    </Tabs.Root>
  )
}
