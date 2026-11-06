import { type ReactNode } from "react"

import { cn } from "@/utils/cn"

interface ContainerProps {
  className?: string
  children: ReactNode
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        // Figma 섹션 좌우 여백: Mobile 32, Pad 60, Small PC 이상 80. 1920 이상에서도 최대 폭 없이 넓어진다
        "mx-auto w-full px-8 md:px-[60px] lg:px-20",
        className,
      )}
    >
      {children}
    </div>
  )
}
