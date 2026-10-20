import { Tabs } from "radix-ui"
import { useState } from "react"

import { cn } from "@/utils/cn"

import { PREVIEW_COPY, PREVIEW_TABS } from "./constants"
import { PreviewTabButton } from "./PreviewTabButton"

interface PreviewPanelProps {
  className?: string
}

export function PreviewPanel({ className }: PreviewPanelProps) {
  const [selectedId, setSelectedId] = useState(PREVIEW_TABS[0]?.id ?? "")

  return (
    <Tabs.Root
      className={cn(
        // Figma Web/Panel: 테두리는 안쪽에 그려져 여백에서 1px씩 뺀다 (32→31, 24→23). 테두리 #179d93은 토큰에 없는 시안 값 (Dev Mode, 그라데이션이지만 단색으로 구현)
        "rounded-(--umc-radius-16) border border-[#179d93] px-[31px] pt-[31px] pb-[23px]",
        // 배경: teal-100 24% 위에 d3e3e2 30%(토큰 없음), 청록 그라데이션 2겹(4.2%, 8%). Glass 효과는 블러만 옮긴다
        "bg-[linear-gradient(225.98deg,rgb(143_194_181/0.08)_11.84%,rgb(143_194_181/0)_87.72%),linear-gradient(49.29deg,rgb(143_194_181/0.042)_0.78%,rgb(143_194_181/0)_45.17%),linear-gradient(rgb(211_227_226/0.3),rgb(211_227_226/0.3))] bg-teal-100/24 backdrop-blur-[4px]",
        // 그림자 반경 16px, efefef 50%는 그림자 토큰에 없는 시안 값
        "shadow-[0_4px_16px_rgb(239_240_240/0.5)]",
        className,
      )}
      onValueChange={setSelectedId}
      orientation="vertical"
      value={selectedId}
    >
      <div className="flex">
        {/* 시안 탭 목록: 폭 179px, 안쪽 여백 위 16 · 오른쪽 16 · 아래 20 · 왼쪽 8, 간격 6 */}
        <Tabs.List
          aria-label={PREVIEW_COPY.tabListLabel}
          className="flex w-[179px] shrink-0 flex-col gap-1.5 pt-4 pr-4 pb-5 pl-2"
        >
          {PREVIEW_TABS.map((tab) => (
            <PreviewTabButton key={tab.id} label={tab.label} value={tab.id} />
          ))}
        </Tabs.List>
        {PREVIEW_TABS.map((tab) => (
          <Tabs.Content
            className="flex min-w-0 flex-1 flex-col gap-6 px-(--umc-spacing-padding-28) py-4 outline-none"
            key={tab.id}
            value={tab.id}
          >
            {tab.image && (
              <img
                alt={tab.image.alt}
                className="aspect-[1021/600] w-full select-none object-cover"
                decoding="async"
                draggable={false}
                height={600}
                src={tab.image.src}
                width={1021}
              />
            )}
            {tab.description && (
              <p className="text-neutral-medium-600 text-title-3-medium">
                {tab.description}
              </p>
            )}
          </Tabs.Content>
        ))}
      </div>
    </Tabs.Root>
  )
}
