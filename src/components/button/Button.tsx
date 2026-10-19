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
        fill: "bg-fill-primary-inverse-medium-500 text-inverse hover:bg-fill-primary-inverse-medium-hover-pressed",
        // Figma 채우기: teal-400 20% 위에 흰색 20%, Glass 효과의 블러(반경 4)는 배경 블러로 옮긴다
        // 가장자리 명암은 Glass 효과(깊이 20, 빛 각도 -45°, 세기 0.7)를 렌더링 픽셀에 맞춘 안쪽 그림자로 흉내 낸다:
        // 네 변 밝은 1px 선, 위·왼쪽 안쪽 그늘(~12px), 아래·오른쪽 안쪽 반사(~8px)
        glass:
          "bg-[linear-gradient(rgb(255_255_255/0.2),rgb(255_255_255/0.2))] bg-fill-primary-inverse-weak-400/20 text-brand-default-600 shadow-[inset_1px_1px_0_rgb(255_255_255/0.4),inset_-1px_-1px_0_rgb(255_255_255/0.3),inset_3px_3px_12px_-4px_rgb(40_65_65/0.06),inset_-3px_-3px_8px_-4px_rgb(255_255_255/0.35)] backdrop-blur-[4px] hover:text-brand-strong-800",
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
