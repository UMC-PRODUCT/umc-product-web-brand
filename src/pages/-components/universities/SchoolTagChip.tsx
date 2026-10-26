import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"

// Figma 크기 이름 68px/60px/44px를 lg/md/sm으로 옮긴다. responsive는 시안 뷰포트별 크기(Mobile·Pad sm, Small PC md, PC 이상 lg)
// Tailwind가 클래스를 찾을 수 있게 responsive 값도 글자 그대로 적는다
const schoolTagChipVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-(--umc-radius-full)",
  {
    variants: {
      size: {
        // 칩 배경 4c7272 8%는 토큰에 없는 시안 값 (#22). 글자 24/140%/-1% Medium은 텍스트 스타일에 없는 값
        lg: "h-[64px] gap-[14px] bg-[rgb(76_114_114/0.08)] pr-(--umc-spacing-padding-20) pl-(--umc-spacing-padding-16) font-medium text-[24px] text-neutral-medium-600 leading-[1.4] tracking-[-0.24px]",
        md: "h-[60px] gap-(--umc-spacing-gap-12) bg-[rgb(76_114_114/0.08)] pr-(--umc-spacing-padding-16) pl-[13px] text-neutral-medium-600 text-title-2-medium",
        // 배경은 흰색 10% 위에 4c7272 8%. 글자 18/140%/-1% SemiBold #999는 토큰에 없어 가장 가까운 neutral-weak-500(7e7f7f)을 쓴다
        sm: "h-[44px] gap-(--umc-spacing-gap-10) bg-[linear-gradient(rgb(76_114_114/0.08),rgb(76_114_114/0.08))] bg-white/10 pr-(--umc-spacing-padding-12) pl-(--umc-spacing-padding-8) font-semibold text-[18px] text-neutral-weak-500 leading-[1.4] tracking-[-0.18px]",
        responsive: [
          "h-[44px] gap-(--umc-spacing-gap-10) bg-[linear-gradient(rgb(76_114_114/0.08),rgb(76_114_114/0.08))] bg-white/10 pr-(--umc-spacing-padding-12) pl-(--umc-spacing-padding-8) font-semibold text-[18px] text-neutral-weak-500 leading-[1.4] tracking-[-0.18px]",
          "lg:h-[60px] lg:gap-(--umc-spacing-gap-12) lg:bg-[rgb(76_114_114/0.08)] lg:bg-none lg:pr-(--umc-spacing-padding-16) lg:pl-[13px] lg:text-neutral-medium-600 lg:text-title-2-medium",
          "xl:h-[64px] xl:gap-[14px] xl:pr-(--umc-spacing-padding-20) xl:pl-(--umc-spacing-padding-16) xl:font-medium xl:text-[24px] xl:leading-[1.4] xl:tracking-[-0.24px]",
        ],
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
      responsive: "size-[28px] lg:size-[32px] xl:size-[40px]",
    },
    filled: {
      true: "object-cover",
      false: "",
    },
  },
  compoundVariants: [
    { size: "lg", filled: true, className: "rounded-(--umc-radius-full)" },
    {
      size: "responsive",
      filled: true,
      className: "xl:rounded-(--umc-radius-full)",
    },
    { size: "lg", filled: false, className: "bg-icon-inverse" },
    { size: ["md", "sm"], filled: false, className: "bg-teal-900" },
    {
      size: "responsive",
      filled: false,
      className: "bg-teal-900 xl:bg-icon-inverse",
    },
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
