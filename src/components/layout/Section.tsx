import { type ReactNode } from "react"

export type HeaderTone = "light" | "dark"

export type SectionId =
  | "hero"
  | "about"
  | "stats"
  | "sponsors"
  | "values"
  | "preview"
  | "universities"
  | "projects"
  | "recruit"
  | "faq"
  | "cta"

interface SectionProps {
  id: SectionId
  headerTone: HeaderTone
  labelledBy: string
  className?: string
  children: ReactNode
}

export function Section({
  id,
  headerTone,
  labelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={className}
      data-header-tone={headerTone}
      id={id}
    >
      {children}
    </section>
  )
}
