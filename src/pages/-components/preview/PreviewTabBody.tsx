import { cn } from "@/utils/cn"

import { type PreviewTab } from "./constants"
import { PreviewTabImage } from "./PreviewTabImage"

interface PreviewTabBodyProps {
  tab: PreviewTab
  className?: string
}

// 탭 패널과 슬라이드가 함께 쓰는 사진·설명
export function PreviewTabBody({ tab, className }: PreviewTabBodyProps) {
  return (
    // Figma 사진과 설명 간격 20
    <div className={cn("flex flex-col gap-(--umc-spacing-gap-20)", className)}>
      {tab.image && (
        // 사진 모서리: 1440 미만 16, 이상 0
        <PreviewTabImage
          alt={tab.image.alt}
          className="rounded-(--umc-radius-16) xl:rounded-none"
          src={tab.image.src}
        />
      )}
      {tab.description && (
        // Figma 설명: Mobile 14/150% Regular, Pad·Small PC 16/140% Medium, PC 18/140% Medium
        <p className="text-body-3-regular text-neutral-medium-600 md:text-title-4-medium xl:text-title-3-medium">
          {tab.description}
        </p>
      )}
    </div>
  )
}
