import { type RefObject, useEffect } from "react"

import {
  animateWindowScroll,
  getAnchorScrollTop,
  isWindowScrollAnimating,
} from "@/utils/windowScroll"

const MAGNET_QUERY =
  "(prefers-reduced-motion: no-preference) and (width >= 64rem)"
const MAGNET_DISTANCE_PX = 120
const MAGNET_DURATION_MS = 500
const SCROLL_IDLE_MS = 150
const MIN_MOVE_PX = 1
const MAGNET_KEYS = new Set(["PageDown", "PageUp", " "])
const INPUT_EVENTS = ["wheel", "keydown", "mousedown", "touchstart"] as const

export function findMagnetTarget(
  currentTop: number,
  sectionTops: readonly number[],
) {
  let nearest: number | null = null
  for (const top of sectionTops) {
    if (
      nearest === null ||
      Math.abs(top - currentTop) < Math.abs(nearest - currentTop)
    )
      nearest = top
  }
  if (nearest === null) return null
  const distance = Math.abs(nearest - currentTop)
  return distance >= MIN_MOVE_PX && distance <= MAGNET_DISTANCE_PX
    ? nearest
    : null
}

const isMagnetInput = (event: Event) =>
  event.type === "wheel" ||
  (event instanceof KeyboardEvent && MAGNET_KEYS.has(event.key))

export function useSectionMagnet(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let idleTimer = 0
    let lastInputPullsToSection = false

    const rememberInput = (event: Event) => {
      lastInputPullsToSection = isMagnetInput(event)
    }

    const pullToNearestSection = () => {
      const stoppedByMagnetInput = lastInputPullsToSection
      lastInputPullsToSection = false
      if (
        !stoppedByMagnetInput ||
        isWindowScrollAnimating() ||
        !window.matchMedia(MAGNET_QUERY).matches
      )
        return
      const sections = container.querySelectorAll(":scope > section[id]")
      const target = findMagnetTarget(
        window.scrollY,
        Array.from(sections, (section) => getAnchorScrollTop(section)),
      )
      if (target !== null) animateWindowScroll(target, MAGNET_DURATION_MS)
    }

    const waitForScrollToStop = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(pullToNearestSection, SCROLL_IDLE_MS)
    }

    for (const type of INPUT_EVENTS) {
      window.addEventListener(type, rememberInput, {
        capture: true,
        passive: true,
      })
    }
    window.addEventListener("scroll", waitForScrollToStop, { passive: true })
    return () => {
      window.clearTimeout(idleTimer)
      for (const type of INPUT_EVENTS) {
        window.removeEventListener(type, rememberInput, { capture: true })
      }
      window.removeEventListener("scroll", waitForScrollToStop)
    }
  }, [containerRef])
}
