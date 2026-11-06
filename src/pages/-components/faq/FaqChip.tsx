import { cva, type VariantProps } from "class-variance-authority"
import { Tabs } from "radix-ui"
import { type ComponentPropsWithRef } from "react"

import { cn } from "@/utils/cn"

const faqChipVariants = cva(
  // Figma Chip (Brand, Fill). 선택 상태는 radix Tabs의 data-state=active로 표현한다
  "inline-flex items-center justify-center whitespace-nowrap rounded-(--umc-radius-full) bg-fill-neutral-medium-100 text-neutral-medium-600 outline-teal-500 outline-offset-2 hover:bg-fill-neutral-medium-hover-pressed focus-visible:outline-2 data-[state=active]:bg-fill-primary-inverse-medium-500 data-[state=active]:text-inverse data-[state=active]:hover:bg-fill-primary-inverse-medium-hover-pressed motion-safe:transition-colors",
  {
    variants: {
      size: {
        lg: "h-[42px] px-(--umc-spacing-padding-16) text-title-2-medium",
        md: "h-[38px] px-(--umc-spacing-padding-12) text-label-3-medium",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

interface FaqChipProps
  extends ComponentPropsWithRef<typeof Tabs.Trigger>,
    VariantProps<typeof faqChipVariants> {}

export function FaqChip({ size, className, ...props }: FaqChipProps) {
  return (
    <Tabs.Trigger
      className={cn(faqChipVariants({ size }), className)}
      {...props}
    />
  )
}
