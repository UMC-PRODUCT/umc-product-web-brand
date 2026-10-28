import { type RefObject, useEffect } from "react"

const BASE_DURATION_MS = 700
const DURATION_PER_PX = 0.18
const MIN_DURATION_MS = 900
const MAX_DURATION_MS = 1600
const CANCEL_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"] as const

export function getAnchorScrollDuration(distance: number) {
  const duration = BASE_DURATION_MS + Math.abs(distance) * DURATION_PER_PX
  return Math.min(Math.max(duration, MIN_DURATION_MS), MAX_DURATION_MS)
}

export function easeInOutCubic(progress: number) {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

function getAnchorScrollTop(target: Element) {
  const rootStyle = getComputedStyle(document.documentElement)
  const scrollPadding = Number.parseFloat(rootStyle.scrollPaddingTop) || 0
  const scrollMargin =
    Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
  const top =
    window.scrollY +
    target.getBoundingClientRect().top -
    scrollPadding -
    scrollMargin
  const maxTop = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(Math.max(top, 0), maxTop)
}

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
    let frame = 0

    const cancel = () => {
      cancelAnimationFrame(frame)
      frame = 0
      for (const type of CANCEL_EVENTS) window.removeEventListener(type, cancel)
    }

    const scrollToAnchor = (event: MouseEvent) => {
      const link = findInPageLink(event)
      const id = link?.hash.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!id || !target || prefersReducedMotion()) return
      event.preventDefault()
      cancel()

      const startTop = window.scrollY
      const distance = getAnchorScrollTop(target) - startTop
      const duration = getAnchorScrollDuration(distance)
      const startTime = performance.now()

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        window.scrollTo({
          top: startTop + distance * easeInOutCubic(progress),
          behavior: "instant",
        })
        if (progress < 1) {
          frame = requestAnimationFrame(step)
          return
        }
        cancel()
        if (window.location.hash !== `#${id}`) window.location.hash = id
      }

      for (const type of CANCEL_EVENTS) {
        window.addEventListener(type, cancel, { passive: true })
      }
      frame = requestAnimationFrame(step)
    }

    container.addEventListener("click", scrollToAnchor)
    return () => {
      cancel()
      container.removeEventListener("click", scrollToAnchor)
    }
  }, [containerRef])
}
