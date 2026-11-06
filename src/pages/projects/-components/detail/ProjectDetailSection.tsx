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
      {/* Figma: Bold 18·20·24. 줄 높이·자간 Mobile·Pad 140%·-2%, Small PC 이상 135%·-1% */}
      <h2
        className="font-bold text-[18px] text-brand-default-600 leading-[1.4] tracking-[-0.02em] md:text-[20px] lg:text-[24px] lg:leading-[1.35] lg:tracking-[-0.01em]"
        lang={/^[A-Za-z ]+$/.test(title) ? "en" : undefined}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
