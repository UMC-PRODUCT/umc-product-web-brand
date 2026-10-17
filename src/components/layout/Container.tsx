import { type ReactNode } from "react"

import { cn } from "@/utils/cn"

interface ContainerProps {
  className?: string
  children: ReactNode
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-16", className)}>
      {children}
    </div>
  )
}
