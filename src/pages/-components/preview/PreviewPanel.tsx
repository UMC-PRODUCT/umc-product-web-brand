import { Tabs } from "radix-ui"
import { useState } from "react"

import { cn } from "@/utils/cn"

import { PREVIEW_COPY, PREVIEW_TABS } from "./constants"
import { PreviewTabButton } from "./PreviewTabButton"
import { PreviewTabImage } from "./PreviewTabImage"
import { PreviewTabStepper } from "./PreviewTabStepper"

interface PreviewPanelProps {
  className?: string
}

export function PreviewPanel({ className }: PreviewPanelProps) {
  const [selectedId, setSelectedId] = useState(PREVIEW_TABS[0]?.id ?? "")
  const selectedIndex = PREVIEW_TABS.findIndex((tab) => tab.id === selectedId)
  // 첫 사진이 lazy로 내려오면(= Preview 근처에 오면) 숨긴 탭의 사진도 eager로 바꿔 미리 받는다
  const [preloadAll, setPreloadAll] = useState(false)

  return (
    <Tabs.Root
      className={cn(
        // Figma 1440 미만: 스테퍼 아래 사진·설명. 간격 Mobile·Pad 12, Small PC 20. Pad 이상은 좌우 안쪽 32
        "flex w-full flex-col gap-(--umc-spacing-gap-12) md:px-(--umc-spacing-padding-32) lg:gap-(--umc-spacing-gap-20)",
        // Figma 1440 이상 Frame 2087331771: 배경·테두리 없는 1280 폭, 여백 32. 1920 이상에서도 1280으로 가운데 둔다
        "xl:mx-auto xl:max-w-[1280px] xl:gap-0 xl:p-(--umc-spacing-padding-32)",
        className,
      )}
      onValueChange={setSelectedId}
      orientation="vertical"
      value={selectedId}
    >
      <PreviewTabStepper
        className="xl:hidden"
        index={Math.max(selectedIndex, 0)}
        labels={PREVIEW_TABS.map((tab) => tab.label)}
        onIndexChange={(index) => {
          const tab = PREVIEW_TABS[index]
          if (tab) setSelectedId(tab.id)
        }}
      />
      <div className="flex">
        {/* 1440 이상 탭 목록: 폭 204, 안쪽 여백 위 16 · 오른쪽 16 · 아래 20 · 왼쪽 8, 간격 6. 그보다 좁으면 스테퍼로 바꾼다 */}
        <Tabs.List
          aria-label={PREVIEW_COPY.tabListLabel}
          className="hidden w-[204px] shrink-0 flex-col gap-1.5 pt-4 pr-4 pb-5 pl-2 xl:flex"
        >
          {PREVIEW_TABS.map((tab) => (
            <PreviewTabButton key={tab.id} label={tab.label} value={tab.id} />
          ))}
        </Tabs.List>
        {PREVIEW_TABS.map((tab) => (
          // 패널을 DOM에 남겨 탭을 바꿔도 사진을 다시 마운트하지 않는다 (재방문 때 깜빡임 방지). 사진은 미리 받아 두어 처음 여는 탭도 깜빡이지 않는다. forceMount는 hidden 속성을 붙이지 않아 비활성 패널은 직접 숨긴다
          <Tabs.Content
            // Figma 사진과 설명 간격 20. 1440 이상 안쪽 여백 위 16 · 오른쪽 16 · 아래 16 · 왼쪽 28
            className="flex min-w-0 flex-1 flex-col gap-(--umc-spacing-gap-20) outline-none data-[state=inactive]:hidden xl:pt-4 xl:pr-4 xl:pb-4 xl:pl-7"
            forceMount
            key={tab.id}
            value={tab.id}
          >
            {tab.image && (
              // 사진 모서리: 1024 미만 16, 이상 0
              <PreviewTabImage
                alt={tab.image.alt}
                className="rounded-(--umc-radius-16) lg:rounded-none"
                loading={preloadAll ? "eager" : "lazy"}
                onLoad={() => setPreloadAll(true)}
                src={tab.image.src}
              />
            )}
            {tab.description && (
              // Figma 설명: Mobile 14/150% Regular, Pad·Small PC 16/140% Medium, PC 18/140% Medium
              <p className="text-body-3-regular text-neutral-medium-600 md:text-title-4-medium xl:text-title-3-medium">
                {tab.description}
              </p>
            )}
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  )
}
