import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRight } from "lucide-react"
import { Slot } from "radix-ui"
import { type ComponentPropsWithRef } from "react"

import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "inline-flex h-[68px] items-center justify-center gap-(--umc-spacing-gap-4) whitespace-nowrap rounded-(--umc-radius-button-16) pl-[40px] text-heading-2-semibold outline-teal-500 outline-offset-2 focus-visible:outline-2 motion-safe:transition-colors",
  {
    variants: {
      variant: {
        fill: "bg-teal-500 text-white hover:bg-teal-700",
        // Glass 배경은 디자이너 확인 전까지 가장 가까운 토큰을 쓴다 (#22)
        glass: "bg-teal-100 text-teal-600 hover:text-teal-800",
      },
      arrow: {
        true: "pr-[30px]",
        false: "pr-[40px]",
      },
    },
    defaultVariants: {
      variant: "fill",
      arrow: false,
    },
  },
)

interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({
  variant,
  arrow,
  asChild = false,
  type,
  className,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : "button"

  return (
    <Component
      className={cn(buttonVariants({ variant, arrow }), className)}
      type={asChild ? type : (type ?? "button")}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {arrow && (
        <span aria-hidden className="flex p-(--umc-spacing-padding-4)">
          <ChevronRight className="size-[24px]" />
        </span>
      )}
    </Component>
  )
}
