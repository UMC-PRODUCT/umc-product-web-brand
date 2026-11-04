import { ExpandMoreIcon } from "@umc-product/icons"
import { useToast } from "@umc-product/react"
import { DropdownMenu } from "radix-ui"

import { cn } from "@/utils/cn"

import { PREPARING_SERVICE_MESSAGE, type QuickLink } from "./constants"

const MENU_ITEM_CLASS =
  "site-header-menu-item flex h-[38px] items-center whitespace-nowrap rounded-lg px-3 text-body-2-regular"

interface QuickLinksMenuProps {
  title: string
  links: readonly QuickLink[]
}

export function QuickLinksMenu({ title, links }: QuickLinksMenuProps) {
  const toast = useToast()

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
        {links.map((link) =>
          link.href ? (
            <DropdownMenu.Item asChild key={link.label}>
              <a
                className={MENU_ITEM_CLASS}
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
                <span className="sr-only"> (새 창)</span>
              </a>
            </DropdownMenu.Item>
          ) : (
            <DropdownMenu.Item
              className={cn(MENU_ITEM_CLASS, "cursor-pointer")}
              key={link.label}
              onSelect={() =>
                toast.show({ message: PREPARING_SERVICE_MESSAGE })
              }
            >
              {link.label}
            </DropdownMenu.Item>
          ),
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
