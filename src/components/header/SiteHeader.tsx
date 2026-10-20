import { UmcLogo } from "@umc-product/icons"
import { useRef } from "react"

import { useSmoothAnchorScroll } from "./anchorScroll"
import {
  LOGIN_URL,
  NAV_ITEMS,
  navIdForSection,
  QUICK_LINKS,
  QUICK_LINKS_TITLE,
} from "./constants"
import { HeaderNav } from "./HeaderNav"
import { QuickLinksMenu } from "./QuickLinksMenu"
import { useSectionUnderHeader } from "./useSectionUnderHeader"

import "./header.css"

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null)
  const section = useSectionUnderHeader(headerRef)
  useSmoothAnchorScroll(headerRef)

  return (
    <header
      className="site-header fixed inset-x-0 top-0 z-50 grid h-header grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center"
      data-tone={section.tone}
      ref={headerRef}
    >
      <a
        aria-label="UMC 홈"
        className="site-header-logo ml-[60px] justify-self-start rounded-lg p-4"
        href="#hero"
      >
        <UmcLogo className="block" />
      </a>
      <HeaderNav activeId={navIdForSection(section.id)} items={NAV_ITEMS} />
      <div className="col-start-3 flex items-center justify-end gap-4 pr-[34px] pl-4">
        <QuickLinksMenu links={QUICK_LINKS} title={QUICK_LINKS_TITLE} />
        <a
          className="site-header-login flex h-10 min-w-16 items-center justify-center rounded-xl px-4 text-label-3-medium"
          href={LOGIN_URL}
        >
          로그인
        </a>
      </div>
    </header>
  )
}
