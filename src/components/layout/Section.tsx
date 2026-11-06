import { type ReactNode, type Ref } from "react"

export type HeaderTone = "light" | "dark"

export type SectionId =
  | "hero"
  | "about"
  | "stats"
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
  ref?: Ref<HTMLElement>
  children: ReactNode
}

export function Section({
  id,
  headerTone,
  labelledBy,
  className,
  ref,
  children,
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={className}
      data-header-tone={headerTone}
      id={id}
      ref={ref}
    >
      {children}
    </section>
  )
}
