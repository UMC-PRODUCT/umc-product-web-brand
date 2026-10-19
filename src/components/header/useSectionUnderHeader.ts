import { type RefObject, useEffect, useState } from "react"

import { type HeaderTone } from "@/components/layout/Section"

interface SectionUnderHeader {
  id: string
  tone: HeaderTone
}

const INITIAL_SECTION: SectionUnderHeader = { id: "hero", tone: "dark" }
const PAGE_BACKGROUND_TONE: HeaderTone = "light"
const SCROLL_SNAP_TOLERANCE_PX = 1

function readTone(element: Element): HeaderTone {
  return element.getAttribute("data-header-tone") === "light" ? "light" : "dark"
}

function findSectionPastLine(line: number) {
  const sections = [...document.querySelectorAll("[data-header-tone]")]
  return sections.findLast((element) => {
    const { top, width, height } = element.getBoundingClientRect()
    const rendered = width > 0 || height > 0
    return rendered && top <= line
  })
}

function readToneAtLine(line: number): HeaderTone {
  const section = findSectionPastLine(line)
  const coversLine =
    section !== undefined && section.getBoundingClientRect().bottom > line
  return section && coversLine ? readTone(section) : PAGE_BACKGROUND_TONE
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
      const headerLine = headerHeight + SCROLL_SNAP_TOLERANCE_PX
      const anchorLine = readAnchorOffset() + SCROLL_SNAP_TOLERANCE_PX
      const active = findSectionPastLine(anchorLine)
      if (!active) return
      const id = active.id
      const tone = readToneAtLine(headerLine)
      setSection((previous) =>
        previous.id === id && previous.tone === tone ? previous : { id, tone },
      )
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
    }
  }, [headerRef])

  return section
}
