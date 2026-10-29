import { CloseIcon, MenuIcon } from "@umc-product/icons"
import { useEffect, useId, useRef } from "react"

import { LOGIN_URL, type NavId, type NavItem } from "./constants"
import { LandingSectionLink } from "./LandingSectionLink"

interface MobileMenuProps {
  items: readonly NavItem[]
  activeId: NavId | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ICON_SIZE = 34

export function MobileMenu({
  items,
  activeId,
  open,
  onOpenChange,
}: MobileMenuProps) {
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const Icon = open ? CloseIcon : MenuIcon
  const close = () => onOpenChange(false)

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      onOpenChange(false)
      buttonRef.current?.focus()
    }
    const closeOnOutsidePress = (event: Event) => {
      if (
        event.target instanceof Node &&
        rootRef.current?.contains(event.target)
      )
        return
      onOpenChange(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    document.addEventListener("pointerdown", closeOnOutsidePress)
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.removeEventListener("pointerdown", closeOnOutsidePress)
    }
  }, [open, onOpenChange])

  return (
    <div className="col-start-3 justify-self-end lg:hidden" ref={rootRef}>
      <button
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        className="mr-[26px] flex size-[46px] cursor-pointer items-center justify-center rounded-lg text-(--header-logo) motion-safe:transition-colors"
        onClick={() => onOpenChange(!open)}
        ref={buttonRef}
        type="button"
      >
        <Icon size={ICON_SIZE} />
      </button>
      {open && (
        <div
          className="absolute inset-x-0 top-full flex max-h-[calc(100dvh_-_var(--umc-layout-header-height))] flex-col items-start gap-4 overflow-y-auto bg-[#0d1a19] px-6 pt-4 pb-6"
          id={panelId}
        >
          <nav aria-label="주요 섹션">
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item.id}>
                  <LandingSectionLink
                    aria-current={item.id === activeId ? "location" : undefined}
                    className="block rounded-lg px-2.5 py-2 text-teal-grey-400 text-title-2-medium aria-[current=location]:text-teal-300 aria-[current=location]:text-title-2-semibold"
                    onClick={close}
                    sectionId={item.id}
                  >
                    {item.label}
                  </LandingSectionLink>
                </li>
              ))}
            </ul>
          </nav>
          <a
            className="flex h-10 min-w-16 items-center justify-center rounded-xl bg-[rgb(251_252_252/0.3)] px-4 text-label-3-medium text-white shadow-[inset_0_0_0_1px_white]"
            href={LOGIN_URL}
            onClick={close}
          >
            로그인
          </a>
        </div>
      )}
    </div>
  )
}
