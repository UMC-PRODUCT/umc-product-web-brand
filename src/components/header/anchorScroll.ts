import { type RefObject, useEffect } from "react"

import {
  animateWindowScroll,
  getAnchorScrollDuration,
  getAnchorScrollTop,
} from "@/utils/windowScroll"

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

function findSameOriginHashLink(event: MouseEvent) {
  const isPlainClick =
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  if (!isPlainClick || !(event.target instanceof Element)) return null
  const link = event.target.closest<HTMLAnchorElement>("a[href]")
  if (!link?.hash || link.origin !== window.location.origin) return null
  return link
}

export function useSmoothAnchorScroll(
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    let cancelScroll = () => {}

    const scrollToAnchor = (event: MouseEvent) => {
      const link = findSameOriginHashLink(event)
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
