import { Link } from "@tanstack/react-router"
import { ChevronRightIcon } from "@umc-product/icons"

interface ProjectBreadcrumb {
  label: string
  to?: "/" | "/projects"
}

interface ProjectBreadcrumbsProps {
  items: readonly ProjectBreadcrumb[]
}

const CHEVRON_SIZE = 16

export function ProjectBreadcrumbs({ items }: ProjectBreadcrumbsProps) {
  return (
    <nav aria-label="현재 위치">
      <ol className="flex min-h-[22px] flex-wrap items-center gap-(--umc-spacing-gap-2) text-body-3-medium text-teal-grey-400">
        {items.map(({ label, to }, index) => (
          <li
            aria-current={index === items.length - 1 ? "page" : undefined}
            className="flex items-center gap-(--umc-spacing-gap-2)"
            key={label}
          >
            {index > 0 && (
              <ChevronRightIcon
                aria-hidden
                className="text-teal-grey-300"
                size={CHEVRON_SIZE}
              />
            )}
            {to ? (
              <Link className="hover:text-teal-grey-600" to={to}>
                {label}
              </Link>
            ) : (
              label
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
