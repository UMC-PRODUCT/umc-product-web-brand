import { type NavId, type NavItem } from "./constants"

interface HeaderNavProps {
  items: readonly NavItem[]
  activeId: NavId | null
}

export function HeaderNav({ items, activeId }: HeaderNavProps) {
  return (
    <nav aria-label="주요 섹션" className="col-start-2 hidden lg:block">
      <ul className="site-header-nav-list flex items-center gap-1.5 rounded-full p-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              aria-current={item.id === activeId ? "location" : undefined}
              className="site-header-nav-link flex h-9 min-w-18 items-center justify-center whitespace-nowrap rounded-full px-[18px] text-body-1-medium"
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
