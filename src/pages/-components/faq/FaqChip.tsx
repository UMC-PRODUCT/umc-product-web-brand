import { cva, type VariantProps } from "class-variance-authority"
import { type ComponentPropsWithRef } from "react"

import { cn } from "@/utils/cn"

const faqChipVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-(--umc-radius-full) bg-fill-neutral-medium-100 text-placeholder outline-teal-500 outline-offset-2 hover:bg-fill-neutral-medium-hover-pressed focus-visible:outline-2 aria-pressed:bg-fill-primary-inverse-medium-500 aria-pressed:text-white motion-safe:transition-colors",
  {
    variants: {
      size: {
        md: "h-[42px] px-[18px] text-[20px] leading-[1.4] tracking-[-0.4px]",
        sm: "h-[35px] px-(--umc-spacing-padding-12) text-body-1-regular",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

interface FaqChipProps
  extends Omit<ComponentPropsWithRef<"button">, "aria-pressed">,
    VariantProps<typeof faqChipVariants> {
  selected?: boolean
}

export function FaqChip({
  size,
  selected = false,
  type = "button",
  className,
  ...props
}: FaqChipProps) {
  return (
    <button
      aria-pressed={selected}
      className={cn(faqChipVariants({ size }), className)}
      type={type}
      {...props}
    />
  )
}
