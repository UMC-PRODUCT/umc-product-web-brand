import { cva, type VariantProps } from "class-variance-authority"
import { ChevronRight } from "lucide-react"
import { Slot } from "radix-ui"
import { type ComponentPropsWithRef } from "react"

import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-(--umc-spacing-gap-4) whitespace-nowrap rounded-(--umc-radius-18) font-medium outline-teal-500 outline-offset-2 focus-visible:outline-2 motion-safe:transition-[color,background-color,box-shadow]",
  {
    variants: {
      variant: {
        fill: "text-inverse",
        // Figma Glass 효과는 블러(반경 4)만 옮긴다. Hover에서는 Glass 대신 안쪽 그림자가 들어가고 글자가 SemiBold가 된다
        weak: "backdrop-blur-[4px] hover:font-semibold",
      },
      color: {
        brand: "",
        neutral: "",
      },
      // Figma 텍스트: Pretendard Medium, 줄 높이 135%, 자간 -1%. 같은 크기의 Medium 텍스트 스타일 토큰이 없어 임의 값을 쓴다
      size: {
        xl: "h-[68px] px-(--umc-spacing-padding-32) text-[24px] leading-[1.35] tracking-[-0.24px]",
        lg: "h-[62px] px-(--umc-spacing-padding-28) text-[22px] leading-[1.35] tracking-[-0.22px]",
      },
      arrow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "fill",
        color: "brand",
        class:
          "bg-fill-primary-inverse-medium-500 hover:bg-fill-primary-inverse-medium-hover-pressed",
      },
      {
        variant: "fill",
        color: "neutral",
        class:
          "bg-fill-neutral-inverse-medium-500 hover:bg-fill-neutral-inverse-strong-600",
      },
      // Figma 변수 이름은 Fill/Brand/Medium-100이지만 같은 값(#ddf4f1)의 코드 토큰은 fill-primary-medium-100이다
      {
        variant: "weak",
        color: "brand",
        class:
          "bg-fill-primary-medium-100 text-brand-default-600 hover:text-brand-strong-800 hover:shadow-inner-neutral-1",
      },
      // 글자색은 시맨틱 변수 없이 TealGrey-700 원색에 연결되어 있다
      {
        variant: "weak",
        color: "neutral",
        class:
          "bg-fill-neutral-medium-100 text-teal-grey-700 hover:shadow-inner-neutral-2",
      },
      // 아이콘 영역(32px)이 글자보다 높아 Lg는 아이콘이 있으면 64px가 된다
      { size: "lg", arrow: true, class: "h-[64px]" },
      { size: "xl", arrow: true, class: "pr-(--umc-spacing-padding-20)" },
      { size: "lg", arrow: true, class: "pr-(--umc-spacing-padding-16)" },
    ],
    defaultVariants: {
      variant: "fill",
      color: "brand",
      size: "xl",
      arrow: false,
    },
  },
)

// Figma 아이콘 선 색. 글자색과 따로 연결되어 있다
const arrowVariants = cva("flex p-(--umc-spacing-padding-4)", {
  variants: {
    variant: { fill: "", weak: "" },
    color: { brand: "", neutral: "" },
  },
  compoundVariants: [
    {
      variant: "fill",
      color: "brand",
      class: "text-teal-grey-50 group-hover:text-teal-grey-75",
    },
    { variant: "fill", color: "neutral", class: "text-teal-grey-75" },
    {
      variant: "weak",
      color: "brand",
      class: "text-icon-brand-medium-500 group-hover:text-teal-700",
    },
    {
      variant: "weak",
      color: "neutral",
      class: "text-icon-neutral-strong-600",
    },
  ],
  defaultVariants: {
    variant: "fill",
    color: "brand",
  },
})

interface ButtonProps
  extends Omit<ComponentPropsWithRef<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({
  variant,
  color,
  size,
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
      className={cn(buttonVariants({ variant, color, size, arrow }), className)}
      type={asChild ? type : (type ?? "button")}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {arrow && (
        <span aria-hidden className={arrowVariants({ variant, color })}>
          <ChevronRight className="size-[24px]" />
        </span>
      )}
    </Component>
  )
}
