import { type ReactNode } from "react"

import { cn } from "@/utils/cn"

interface SectionHeadingProps {
  titleId: string
  title: ReactNode
  eyebrow?: string
  description?: ReactNode
  className?: string
}

export function SectionHeading({
  titleId,
  title,
  eyebrow,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <hgroup
      className={cn(
        "flex flex-col items-center gap-(--umc-spacing-gap-12) break-keep text-center",
        className,
      )}
    >
      {eyebrow && (
        // 라벨과 제목 사이는 시안 20: 묶음 간격 12에 8을 더한다
        <p className="mb-2 font-medium text-[18px] text-brand-default-600 leading-[1.4] tracking-[-0.01em] md:text-[20px] lg:text-[22px]">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-bold text-brand-strong-800 tracking-[-0.02em]",
          // Figma 뷰포트별 제목 크기: Mobile 24, Pad 28, Small PC 36, PC 40
          "text-[24px] md:text-[28px] lg:text-[36px] xl:text-[40px]",
          "leading-[1.2]",
        )}
        id={titleId}
      >
        {title}
      </h2>
      {description && (
        <p className="text-[16px] text-neutral-medium-600 leading-[1.4] tracking-[-0.02em] md:text-[20px] lg:text-[22px] xl:text-[24px]">
          {description}
        </p>
      )}
    </hgroup>
  )
}
