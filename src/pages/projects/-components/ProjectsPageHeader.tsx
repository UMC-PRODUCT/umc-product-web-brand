import { PROJECT_LIST_COPY } from "./constants"
import { ProjectBreadcrumbs } from "./ProjectBreadcrumbs"

export function ProjectsPageHeader() {
  return (
    <header className="pl-3">
      <ProjectBreadcrumbs
        items={[{ label: "홈", to: "/" }, { label: PROJECT_LIST_COPY.title }]}
      />
      <h1 className="mt-[26px] text-heading-2-semibold text-teal-grey-900">
        {PROJECT_LIST_COPY.title}
      </h1>
      <p className="mt-3 text-body-3-regular text-teal-grey-600">
        {PROJECT_LIST_COPY.description}
      </p>
    </header>
  )
}
