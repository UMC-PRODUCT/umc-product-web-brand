import { type RefObject, useEffect, useState } from "react"

import { type HeaderTone } from "@/components/layout/Section"

interface SectionUnderHeader {
  id: string
  tone: HeaderTone
}

const INITIAL_SECTION: SectionUnderHeader = { id: "hero", tone: "dark" }
const SCROLL_SNAP_TOLERANCE_PX = 1

function findSectionPastLine(line: number) {
  const sections = [...document.querySelectorAll("[data-header-tone]")]
  return sections.findLast((element) => {
    const { top, width, height } = element.getBoundingClientRect()
    const rendered = width > 0 || height > 0
    return rendered && top <= line
  })
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
      const current = findSectionPastLine(
        headerHeight + SCROLL_SNAP_TOLERANCE_PX,
      )
      if (!current) return
      const id = current.id
      const tone: HeaderTone =
        current.getAttribute("data-header-tone") === "light" ? "light" : "dark"
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
