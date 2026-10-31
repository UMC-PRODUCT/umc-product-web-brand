import { cva, type VariantProps } from "class-variance-authority"

import { type ProjectSummaryItem } from "./projectDetails"

interface ProjectSummaryCardProps
  extends ProjectSummaryItem,
    VariantProps<typeof cardVariants> {}

// Figma Web/Project Summary/Detail Card. 그림자 #eff0f0 50%는 같은 값의 토큰이 없다
const cardVariants = cva(
  "flex flex-col gap-(--umc-spacing-gap-8) rounded-(--umc-radius-16) bg-white px-(--umc-spacing-padding-32) shadow-[0_4px_16px_rgb(239_240_240/0.5)]",
  {
    variants: {
      size: {
        lg: "min-h-[144px] py-[22px]",
        md: "min-h-[114px] py-(--umc-spacing-padding-20)",
      },
    },
    defaultVariants: { size: "lg" },
  },
)

const titleVariants = cva(
  "font-semibold text-neutral-default-900 leading-[1.4]",
  {
    variants: {
      size: {
        lg: "text-[18px]",
        md: "text-[16px]",
      },
    },
    defaultVariants: { size: "lg" },
  },
)

const descriptionVariants = cva(
  "line-clamp-2 font-medium text-neutral-medium-600",
  {
    variants: {
      size: {
        lg: "text-[14px] leading-[1.5]",
        md: "text-[13px] leading-[22px]",
      },
    },
    defaultVariants: { size: "lg" },
  },
)

export function ProjectSummaryCard({
  title,
  description,
  apiCount,
  size,
}: ProjectSummaryCardProps) {
  return (
    <li className={cardVariants({ size })}>
      <h3 className={titleVariants({ size })}>{title}</h3>
      <div className="flex flex-col gap-(--umc-spacing-gap-4)">
        <p className={descriptionVariants({ size })} title={description}>
          {description}
        </p>
        {apiCount !== undefined && (
          <p className="font-medium text-[14px] text-neutral-medium-600 leading-[1.5]">
            API 수 : {apiCount}
          </p>
        )}
      </div>
    </li>
  )
}
