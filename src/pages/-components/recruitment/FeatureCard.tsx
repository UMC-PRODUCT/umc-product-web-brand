import { cva, type VariantProps } from "class-variance-authority"
import { type ReactNode } from "react"

import { cn } from "@/utils/cn"

import "./recruitment.css"

const featureCardVariants = cva(
  // Figma 테두리는 안쪽에 그려지므로 위 여백은 36px에서 테두리 4px를 뺀 32px. Glass 효과는 블러(반경 4)만 옮긴다
  "feature-card flex flex-col rounded-[30px] border-t-4 border-t-primary-strong-500 px-(--umc-spacing-padding-28) pt-(--umc-spacing-padding-32) backdrop-blur-[4px]",
  {
    variants: {
      // Figma Property 1 (PM, Design, web, Mobile). 배경은 recruitment.css
      field: {
        pm: "feature-card-pm pb-10",
        design: "feature-card-design pb-10",
        web: "feature-card-web pb-10",
        // Mobile만 아래 여백이 36이다
        mobile: "feature-card-mobile pb-9",
      },
    },
  },
)

export type FeatureCardField = NonNullable<
  VariantProps<typeof featureCardVariants>["field"]
>

interface FeatureCardProps
  extends Required<VariantProps<typeof featureCardVariants>> {
  title: ReactNode
  description: ReactNode
  className?: string
}

export function FeatureCard({
  field,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article className={cn(featureCardVariants({ field }), className)}>
      <div className="flex flex-1 flex-col justify-between">
        {/* web·Mobile 제목은 두 줄이다 ("Web⏎Product Engineer") */}
        <h3 className="whitespace-pre-line text-brand-strong-800 text-heading-2-semibold">
          {title}
        </h3>
        <p className="text-body-1-regular text-neutral-strong-800">
          {description}
        </p>
      </div>
    </article>
  )
}
