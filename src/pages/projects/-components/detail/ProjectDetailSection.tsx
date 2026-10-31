import { type ReactNode } from "react"

interface ProjectDetailSectionProps {
  title: string
  children: ReactNode
}

export function ProjectDetailSection({
  title,
  children,
}: ProjectDetailSectionProps) {
  return (
    <section>
      {/* Figma: Bold, 줄 높이 135%, 자간 -1%. 폭별 18·20·24 */}
      <h2
        className="font-bold text-[18px] text-brand-default-600 leading-[1.35] tracking-[-0.01em] md:text-[20px] lg:text-[24px]"
        lang={/^[A-Za-z ]+$/.test(title) ? "en" : undefined}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
