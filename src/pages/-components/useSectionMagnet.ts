import { type RefObject, useEffect } from "react"

import {
  animateWindowScroll,
  getAnchorScrollDuration,
  getAnchorScrollTop,
  isWindowScrollAnimating,
} from "@/utils/windowScroll"

const MAGNET_QUERY =
  "(prefers-reduced-motion: no-preference) and (width >= 64rem)"
const COMMIT_RATIO = 0.1
const SHORT_MOVE_DURATION_MS = 500
const SCROLL_IDLE_MS = 150
const MIN_MOVE_PX = 1
const VIEWPORT_TOP_SECTION_ID = "cta"
const HEADING_SELECTOR = "hgroup, h2"
const INPUT_EVENTS = ["wheel", "keydown", "mousedown", "touchstart"] as const

type ScrollDirection = 1 | -1

export interface SectionRange {
  start: number
  end: number
}

export function findSnapTarget(
  top: number,
  direction: ScrollDirection,
  sections: readonly SectionRange[],
  pageHeight: number,
) {
  const isInsideSection = sections.some(
    (section) =>
      top > section.start - MIN_MOVE_PX && top < section.end + MIN_MOVE_PX,
  )
  if (isInsideSection) return null
  const previous = sections.findLast((section) => section.end < top)
  const next = sections.find((section) => section.start > top)
  if (!previous || !next) return null
  const travelled = direction > 0 ? top - previous.end : next.start - top
  const committed = travelled >= pageHeight * COMMIT_RATIO
  if (direction > 0) return committed ? next.start : previous.end
  return committed ? previous.start : next.start
}

export function getCenteredScrollTop(
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
) {
  return sectionTop - (viewportHeight - sectionHeight) / 2
}

function getWheelDirection(event: Event): ScrollDirection | null {
  if (!(event instanceof WheelEvent) || event.deltaY === 0) return null
  return event.deltaY > 0 ? 1 : -1
}

function getHeadingBelowHeaderScrollTop(
  section: Element,
  headerHeight: number,
) {
  const heading = section.querySelector(HEADING_SELECTOR)
  if (!heading) return Number.POSITIVE_INFINITY
  return window.scrollY + heading.getBoundingClientRect().top - headerHeight
}

function measureSection(
  section: Element,
  headerHeight: number,
  pageEnd: number,
): SectionRange {
  const rect = section.getBoundingClientRect()
  const top = window.scrollY + rect.top
  const clampToPage = (scrollTop: number) =>
    Math.min(Math.max(scrollTop, 0), pageEnd)
  const stopAt = (scrollTop: number) => {
    const stop = clampToPage(scrollTop)
    return { start: stop, end: stop }
  }
  if (section.id === VIEWPORT_TOP_SECTION_ID) return stopAt(top)
  const anchorTop = getAnchorScrollTop(section)
  const hasAnchorInsideSection = anchorTop > top
  if (hasAnchorInsideSection) return stopAt(anchorTop)
  const fitsViewport = rect.height <= window.innerHeight + MIN_MOVE_PX
  const preferredTop = fitsViewport
    ? getCenteredScrollTop(top, rect.height, window.innerHeight)
    : top
  const start = clampToPage(
    Math.min(
      preferredTop,
      getHeadingBelowHeaderScrollTop(section, headerHeight),
    ),
  )
  return { start, end: Math.max(start, top + rect.height - window.innerHeight) }
}

function measureSections(container: HTMLElement): SectionRange[] {
  const pageEnd = document.documentElement.scrollHeight - window.innerHeight
  const headerHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 0
  const sections = Array.from(
    container.querySelectorAll(":scope > section[id]"),
    (section) => measureSection(section, headerHeight, pageEnd),
  )
  return [...sections, { start: pageEnd, end: pageEnd }].sort(
    (a, b) => a.start - b.start,
  )
}

export function useSectionMagnet(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let idleTimer = 0
    let pendingDirection: ScrollDirection | null = null

    const rememberInput = (event: Event) => {
      pendingDirection = getWheelDirection(event)
    }

    const snapToSection = () => {
      const direction = pendingDirection
      pendingDirection = null
      if (
        direction === null ||
        isWindowScrollAnimating() ||
        !window.matchMedia(MAGNET_QUERY).matches
      )
        return
      const pageHeight = window.innerHeight
      const target = findSnapTarget(
        window.scrollY,
        direction,
        measureSections(container),
        pageHeight,
      )
      if (target === null) return
      const distance = Math.abs(target - window.scrollY)
      const duration =
        distance > pageHeight
          ? getAnchorScrollDuration(distance)
          : SHORT_MOVE_DURATION_MS
      animateWindowScroll(target, duration)
    }

    const waitForScrollToStop = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(snapToSection, SCROLL_IDLE_MS)
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
