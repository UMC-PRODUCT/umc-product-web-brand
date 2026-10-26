import { Tabs } from "radix-ui"
import { useState } from "react"

import { cn } from "@/utils/cn"

import { PREVIEW_COPY, PREVIEW_TABS } from "./constants"
import { PreviewCarousel } from "./PreviewCarousel"
import { PreviewTabBody } from "./PreviewTabBody"
import { PreviewTabButton } from "./PreviewTabButton"
import { usePreviewLayout } from "./usePreviewLayout"

interface PreviewPanelProps {
  className?: string
}

// 선택 번호를 여기서 들고 있어 1440을 넘나들며 화면이 바뀌어도 보던 활동이 유지된다. 사진을 두 번 받지 않도록 한쪽만 그린다
export function PreviewPanel({ className }: PreviewPanelProps) {
  const layout = usePreviewLayout()
  const [selectedIndex, setSelectedIndex] = useState(0)

  return layout === "tabs" ? (
    <PreviewTabs
      className={className}
      index={selectedIndex}
      onIndexChange={setSelectedIndex}
    />
  ) : (
    <PreviewCarousel
      className={className}
      index={selectedIndex}
      onIndexChange={setSelectedIndex}
    />
  )
}

interface PreviewTabsProps {
  index: number
  onIndexChange: (index: number) => void
  className?: string
}

function PreviewTabs({ index, onIndexChange, className }: PreviewTabsProps) {
  return (
    <Tabs.Root
      className={cn(
        // Figma 1440 이상 Frame 2087331771: 배경·테두리 없는 1280 폭, 여백 32. 1920 이상에서도 1280으로 가운데 둔다
        "mx-auto flex w-full max-w-[1280px] p-(--umc-spacing-padding-32)",
        className,
      )}
      onValueChange={(value) =>
        onIndexChange(PREVIEW_TABS.findIndex((tab) => tab.id === value))
      }
      orientation="vertical"
      value={PREVIEW_TABS[index]?.id}
    >
      {/* 탭 목록: 폭 204, 안쪽 여백 위 16 · 오른쪽 16 · 아래 20 · 왼쪽 8, 간격 6 */}
      <Tabs.List
        aria-label={PREVIEW_COPY.tabListLabel}
        className="flex w-[204px] shrink-0 flex-col gap-1.5 pt-4 pr-4 pb-5 pl-2"
      >
        {PREVIEW_TABS.map((tab) => (
          <PreviewTabButton key={tab.id} label={tab.label} value={tab.id} />
        ))}
      </Tabs.List>
      {PREVIEW_TABS.map((tab) => (
        // 패널을 DOM에 남겨 탭을 바꿔도 사진을 다시 마운트하지 않는다 (재방문 때 깜빡임 방지). forceMount는 hidden 속성을 붙이지 않아 비활성 패널은 직접 숨긴다
        <Tabs.Content
          // 안쪽 여백 위 16 · 오른쪽 16 · 아래 16 · 왼쪽 28
          className="min-w-0 flex-1 pt-4 pr-4 pb-4 pl-7 outline-none data-[state=inactive]:hidden"
          forceMount
          key={tab.id}
          value={tab.id}
        >
          <PreviewTabBody tab={tab} />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
