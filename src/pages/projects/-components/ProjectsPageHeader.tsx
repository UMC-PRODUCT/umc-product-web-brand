import { Link } from "@tanstack/react-router"
import { ChevronRightIcon } from "@umc-product/icons"

import { PROJECT_LIST_COPY } from "./constants"

const CHEVRON_SIZE = 16

export function ProjectsPageHeader() {
  return (
    <header className="pl-3">
      <nav aria-label="현재 위치">
        <ol className="flex h-[22px] items-center gap-(--umc-spacing-gap-2) text-body-3-medium text-teal-grey-400">
          <li>
            <Link className="hover:text-teal-grey-600" to="/">
              홈
            </Link>
          </li>
          <li
            aria-current="page"
            className="flex items-center gap-(--umc-spacing-gap-2)"
          >
            <ChevronRightIcon
              aria-hidden
              className="text-teal-grey-300"
              size={CHEVRON_SIZE}
            />
            {PROJECT_LIST_COPY.title}
          </li>
        </ol>
      </nav>
      <h1 className="mt-[26px] text-heading-2-semibold text-teal-grey-900">
        {PROJECT_LIST_COPY.title}
      </h1>
      <p className="mt-3 text-body-3-regular text-teal-grey-600">
        {PROJECT_LIST_COPY.description}
      </p>
    </header>
  )
}
