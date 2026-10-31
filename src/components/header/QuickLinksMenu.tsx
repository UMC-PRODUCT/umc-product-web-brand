import { ExpandMoreIcon } from "@umc-product/icons"
import { DropdownMenu } from "radix-ui"

import { type QuickLink } from "./constants"

interface QuickLinksMenuProps {
  title: string
  links: readonly QuickLink[]
}

export function QuickLinksMenu({ title, links }: QuickLinksMenuProps) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="site-header-quick relative flex h-10 cursor-pointer items-center gap-1 rounded-xl pr-2.5 pl-4 text-label-3-medium">
        {title}
        <ExpandMoreIcon
          className="site-header-quick-icon -mx-px"
          size={16}
          weight="fill"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        className="site-header-menu relative min-w-(--radix-dropdown-menu-trigger-width) rounded-xl p-1"
        sideOffset={0}
      >
        {links.map((link) => (
          <DropdownMenu.Item asChild key={link.href}>
            <a
              className="site-header-menu-item flex h-[38px] items-center whitespace-nowrap rounded-lg px-3 text-body-2-regular"
              href={link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
              <span className="sr-only"> (새 창)</span>
            </a>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
