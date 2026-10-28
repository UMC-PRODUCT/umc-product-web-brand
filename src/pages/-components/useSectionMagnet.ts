import { type RefObject, useEffect } from "react"

import {
  animateWindowScroll,
  getAnchorScrollDuration,
  getAnchorScrollTop,
  isWindowScrollAnimating,
} from "@/utils/windowScroll"

const MAGNET_QUERY =
  "(prefers-reduced-motion: no-preference) and (width >= 64rem)"
const COMMIT_RATIO = 0.2
const SHORT_MOVE_DURATION_MS = 500
const SCROLL_IDLE_MS = 150
const MIN_MOVE_PX = 1
const INPUT_EVENTS = ["wheel", "keydown", "mousedown", "touchstart"] as const

type ScrollDirection = 1 | -1

export interface SnapPoint {
  top: number
  afterRunway: boolean
}

function findTargetBetween(
  top: number,
  direction: ScrollDirection,
  previous: SnapPoint,
  next: SnapPoint,
  pageHeight: number,
) {
  const commitDistance = pageHeight * COMMIT_RATIO
  const fitsOnePage = next.afterRunway || next.top - previous.top <= pageHeight
  if (fitsOnePage) {
    const travelled = direction > 0 ? top - previous.top : next.top - top
    const committed = travelled >= commitDistance
    const ahead = direction > 0 ? next.top : previous.top
    const behind = direction > 0 ? previous.top : next.top
    return committed ? ahead : behind
  }
  if (direction > 0) {
    return next.top - top <= pageHeight - commitDistance ? next.top : null
  }
  return top - previous.top <= commitDistance ? previous.top : null
}

export function findSnapTarget(
  top: number,
  direction: ScrollDirection,
  points: readonly SnapPoint[],
  pageHeight: number,
) {
  if (points.some((point) => Math.abs(point.top - top) < MIN_MOVE_PX))
    return null
  const previous = points.findLast((point) => point.top < top)
  const next = points.find((point) => point.top > top)
  if (!previous || !next) return null
  return findTargetBetween(top, direction, previous, next, pageHeight)
}

function getWheelDirection(event: Event): ScrollDirection | null {
  if (!(event instanceof WheelEvent) || event.deltaY === 0) return null
  return event.deltaY > 0 ? 1 : -1
}

function collectSnapPoints(container: HTMLElement) {
  const sections = Array.from(
    container.querySelectorAll(":scope > section[id]"),
    (section) => ({
      top: getAnchorScrollTop(section),
      afterRunway:
        Number.parseFloat(getComputedStyle(section).scrollMarginTop) < 0,
    }),
  )
  const pageEnd = {
    top: document.documentElement.scrollHeight - window.innerHeight,
    afterRunway: false,
  }
  return [...sections, pageEnd].sort((a, b) => a.top - b.top)
}

const visiblePageHeight = () =>
  window.innerHeight -
  (Number.parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop,
  ) || 0)

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
      const pageHeight = visiblePageHeight()
      const target = findSnapTarget(
        window.scrollY,
        direction,
        collectSnapPoints(container),
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
