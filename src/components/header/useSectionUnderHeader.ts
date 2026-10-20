import { type RefObject, useEffect, useState } from "react"

import { type HeaderTone } from "@/components/layout/Section"

interface SectionUnderHeader {
  id: string
  tone: HeaderTone
}

const INITIAL_SECTION: SectionUnderHeader = { id: "hero", tone: "dark" }
const SCROLL_SNAP_TOLERANCE_PX = 1
const SECTION_SELECTOR = "[data-header-tone][id]"
const DARK_SELECTOR = '[data-header-tone="dark"]'

function findSectionPastLine(line: number) {
  const sections = [...document.querySelectorAll(SECTION_SELECTOR)]
  return sections.findLast((element) => {
    const { top, width, height } = element.getBoundingClientRect()
    const rendered = width > 0 || height > 0
    return rendered && top <= line
  })
}

function isHeaderOverDark(headerHeight: number) {
  return [...document.querySelectorAll(DARK_SELECTOR)].some((element) => {
    const { top, bottom } = element.getBoundingClientRect()
    const coversHeaderTop = top <= SCROLL_SNAP_TOLERANCE_PX
    const coversHeaderBottom = bottom >= headerHeight - SCROLL_SNAP_TOLERANCE_PX
    return coversHeaderTop && coversHeaderBottom
  })
}

function readAnchorOffset() {
  const { scrollPaddingTop } = getComputedStyle(document.documentElement)
  return Number.parseFloat(scrollPaddingTop) || 0
}

export function useSectionUnderHeader(
  headerRef: RefObject<HTMLElement | null>,
) {
  const [section, setSection] = useState(INITIAL_SECTION)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      const anchorLine = readAnchorOffset() + SCROLL_SNAP_TOLERANCE_PX
      const active = findSectionPastLine(anchorLine)
      if (!active) return
      const id = active.id
      const tone: HeaderTone = isHeaderOverDark(headerHeight) ? "dark" : "light"
      setSection((previous) =>
        previous.id === id && previous.tone === tone ? previous : { id, tone },
      )
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const toneChanges = new MutationObserver(scheduleUpdate)

    update()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    toneChanges.observe(document.body, {
      subtree: true,
      childList: true,
      attributeFilter: ["data-header-tone"],
    })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      toneChanges.disconnect()
    }
  }, [headerRef])

  return section
}
