import { CheckCircleIcon, ExpandMoreIcon } from "@umc-product/icons"
import { DropdownMenu } from "radix-ui"

import { useTopToast } from "@/components/toast/TopToastProvider"
import { useRecruitingNoticeToast } from "@/hooks/useRecruitingNoticeToast"
import { cn } from "@/utils/cn"

import {
  PREPARING_SERVICE_MESSAGE,
  type QuickLink,
  type QuickLinkNotice,
} from "./constants"

const MENU_ITEM_CLASS =
  "site-header-menu-item flex h-[38px] items-center whitespace-nowrap rounded-lg px-3 text-body-2-regular"

interface QuickLinksMenuProps {
  title: string
  links: readonly QuickLink[]
}

export function QuickLinksMenu({ title, links }: QuickLinksMenuProps) {
  const topToast = useTopToast()
  const showRecruitingNotice = useRecruitingNoticeToast()
  const showPreparingNotice = () =>
    topToast.show({
      message: PREPARING_SERVICE_MESSAGE,
      color: "error",
      icon: <CheckCircleIcon weight="fill" />,
    })
  const showNotice: Record<QuickLinkNotice, () => void> = {
    recruiting: showRecruitingNotice,
    preparing: showPreparingNotice,
  }

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
          "href" in link ? (
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
              onSelect={showNotice[link.notice]}
            >
              {link.label}
            </DropdownMenu.Item>
          ),
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
