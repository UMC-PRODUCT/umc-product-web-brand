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
        "flex flex-col items-center gap-5 break-keep text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="font-medium text-[22px] text-brand-default-600 leading-[1.4] tracking-[-0.22px]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-brand-strong-800 text-display-1-bold" id={titleId}>
        {title}
      </h2>
      {description && (
        <p className="text-[24px] text-neutral-weak-500 leading-[1.4] tracking-[-0.48px]">
          {description}
        </p>
      )}
    </hgroup>
  )
}
