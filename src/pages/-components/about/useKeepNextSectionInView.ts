import { useLayoutEffect, useRef } from "react"

import { ABOUT_ZOOM_QUERY, type AboutMode } from "./useAboutMode"

const nextSectionTop = (sectionId: string) =>
  document
    .getElementById(sectionId)
    ?.nextElementSibling?.getBoundingClientRect().top ?? null

const suspendBrowserScrollAnchoring = () => {
  document.documentElement.style.overflowAnchor = "none"
}

const restoreBrowserScrollAnchoring = () => {
  document.documentElement.style.overflowAnchor = ""
}

export function useKeepNextSectionInView(mode: AboutMode, sectionId: string) {
  const topBeforeSwitch = useRef<number | null>(null)
  const appliedMode = useRef(mode)

  useLayoutEffect(() => {
    const query = window.matchMedia(ABOUT_ZOOM_QUERY)
    const capture = () => {
      topBeforeSwitch.current = nextSectionTop(sectionId)
      suspendBrowserScrollAnchoring()
    }
    query.addEventListener("change", capture)
    return () => query.removeEventListener("change", capture)
  }, [sectionId])

  useLayoutEffect(() => {
    const before = topBeforeSwitch.current
    topBeforeSwitch.current = null
    if (appliedMode.current === mode) return
    appliedMode.current = mode
    const after = nextSectionTop(sectionId)
    if (before !== null && after !== null) window.scrollBy(0, after - before)
    requestAnimationFrame(restoreBrowserScrollAnchoring)
  }, [mode, sectionId])
}
