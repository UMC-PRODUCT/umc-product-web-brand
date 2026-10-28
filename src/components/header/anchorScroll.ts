import { type RefObject, useEffect } from "react"

import { animateWindowScroll, getAnchorScrollTop } from "@/utils/windowScroll"

const BASE_DURATION_MS = 700
const DURATION_PER_PX = 0.18
const MIN_DURATION_MS = 900
const MAX_DURATION_MS = 1600

export function getAnchorScrollDuration(distance: number) {
  const duration = BASE_DURATION_MS + Math.abs(distance) * DURATION_PER_PX
  return Math.min(Math.max(duration, MIN_DURATION_MS), MAX_DURATION_MS)
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

function findInPageLink(event: MouseEvent) {
  const isPlainClick =
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  if (!isPlainClick || !(event.target instanceof Element)) return null
  return event.target.closest<HTMLAnchorElement>('a[href^="#"]')
}

export function useSmoothAnchorScroll(
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let cancelScroll = () => {}

    const scrollToAnchor = (event: MouseEvent) => {
      const link = findInPageLink(event)
      const id = link?.hash.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!id || !target || prefersReducedMotion()) return
      event.preventDefault()
      cancelScroll()

      const top = getAnchorScrollTop(target)
      const duration = getAnchorScrollDuration(top - window.scrollY)
      cancelScroll = animateWindowScroll(top, duration, () => {
        if (window.location.hash !== `#${id}`) window.location.hash = id
      })
    }

    container.addEventListener("click", scrollToAnchor)
    return () => {
      cancelScroll()
      container.removeEventListener("click", scrollToAnchor)
    }
  }, [containerRef])
}
