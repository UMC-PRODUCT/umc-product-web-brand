import { type NavId, type NavItem } from "./constants"
import { LandingSectionLink } from "./LandingSectionLink"

interface HeaderNavProps {
  items: readonly NavItem[]
  activeId: NavId | null
}

export function HeaderNav({ items, activeId }: HeaderNavProps) {
  return (
    <nav aria-label="주요 섹션" className="col-start-2 hidden lg:block">
      <ul className="site-header-nav-list relative flex items-center gap-1.5 rounded-full p-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <LandingSectionLink
              aria-current={item.id === activeId ? "location" : undefined}
              className="site-header-nav-link relative flex h-9 min-w-18 items-center justify-center whitespace-nowrap rounded-full px-[18px] text-body-1-medium"
              sectionId={item.id}
            >
              {item.label}
            </LandingSectionLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
