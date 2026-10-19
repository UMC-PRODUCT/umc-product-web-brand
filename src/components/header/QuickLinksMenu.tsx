import { DropdownMenu } from "radix-ui"

import { type QuickLink } from "./constants"

interface QuickLinksMenuProps {
  title: string
  links: readonly QuickLink[]
}

const TRIGGER_HEIGHT_PX = 40
const MENU_PADDING_PX = 4

export function QuickLinksMenu({ title, links }: QuickLinksMenuProps) {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="site-header-quick flex h-10 min-w-16 cursor-pointer items-center justify-center rounded-xl px-4 text-label-3-medium">
        {title}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        className="site-header-menu rounded-xl p-1"
        sideOffset={-(TRIGGER_HEIGHT_PX + MENU_PADDING_PX)}
      >
        <DropdownMenu.Label className="site-header-menu-title px-3 py-[7px] text-label-5-medium">
          {title}
        </DropdownMenu.Label>
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
