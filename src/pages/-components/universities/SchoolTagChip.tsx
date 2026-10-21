import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"

// Figma 크기 이름 68px/60px/44px를 lg/md/sm으로 옮긴다
const schoolTagChipVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-(--umc-radius-full) font-semibold",
  {
    variants: {
      size: {
        // 칩 배경 4c7272 8%는 토큰에 없는 시안 값 (#22). 글자는 텍스트 스타일·색 토큰을 쓴다
        // 랜딩 인스턴스 값: 글자는 원본(title-1, 22px)이 아니라 24px/1.35/-0.48px, 색은 #999 (토큰에 없는 값)
        lg: "gap-[14px] bg-[rgb(76_114_114/0.08)] py-(--umc-spacing-padding-12) pr-(--umc-spacing-padding-20) pl-(--umc-spacing-padding-16) text-[24px] text-neutral-weak-500 leading-[1.35] tracking-[-0.48px]",
        md: "h-[60px] gap-(--umc-spacing-gap-12) bg-[rgb(76_114_114/0.08)] pr-(--umc-spacing-padding-16) pl-[13px] text-[22px] text-neutral-weak-500 leading-[1.35] tracking-[-0.44px]",
        sm: "h-[44px] gap-(--umc-spacing-gap-10) bg-white/10 pr-(--umc-spacing-padding-12) pl-(--umc-spacing-padding-8) text-heading-4-semibold text-neutral-weak-500",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
)

const logoVariants = cva("shrink-0 rounded-(--umc-radius-10)", {
  variants: {
    size: {
      lg: "size-[40px]",
      md: "size-[32px]",
      sm: "size-[28px]",
    },
    filled: {
      true: "object-cover",
      false: "",
    },
  },
  compoundVariants: [
    { size: "lg", filled: true, className: "rounded-(--umc-radius-full)" },
    { size: "lg", filled: false, className: "bg-icon-inverse" },
    { size: ["md", "sm"], filled: false, className: "bg-teal-900" },
  ],
  defaultVariants: {
    size: "lg",
    filled: false,
  },
})

// 로고 이미지가 40px 원 안에서 차지하는 위치와 크기 (%)
export interface LogoFrame {
  left: number
  top: number
  width: number
  height: number
}

interface SchoolTagChipProps
  extends VariantProps<typeof schoolTagChipVariants> {
  name: string
  logoSrc?: string
  logoFrame?: LogoFrame
  className?: string
}

export function SchoolTagChip({
  name,
  logoSrc,
  logoFrame,
  size,
  className,
}: SchoolTagChipProps) {
  return (
    <div className={cn(schoolTagChipVariants({ size }), className)}>
      {logoSrc && logoFrame ? (
        <span
          aria-hidden
          className={cn(
            logoVariants({ size }),
            "relative overflow-hidden rounded-(--umc-radius-full)",
          )}
        >
          <img
            alt=""
            className="absolute max-w-none select-none"
            decoding="async"
            draggable={false}
            src={logoSrc}
            style={{
              left: `${logoFrame.left}%`,
              top: `${logoFrame.top}%`,
              width: `${logoFrame.width}%`,
              height: `${logoFrame.height}%`,
            }}
          />
        </span>
      ) : logoSrc ? (
        // 로고를 누른 채 움직이면 브라우저 기본 이미지 끌기가 일어나지 않게 막는다
        <img
          alt=""
          className={cn(logoVariants({ size, filled: true }), "select-none")}
          draggable={false}
          src={logoSrc}
        />
      ) : (
        <span aria-hidden className={logoVariants({ size })} />
      )}
      <span>{name}</span>
    </div>
  )
}
