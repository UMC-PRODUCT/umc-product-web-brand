import { type RefObject, useLayoutEffect, useState } from "react"

import {
  getZoomFrame,
  getZoomStart,
  type ZoomFrame,
  type ZoomGeometry,
} from "./zoomFrame"

const SETTLED_PROGRESS = 0.999

const readStickyTop = (stage: HTMLElement) =>
  Number.parseFloat(getComputedStyle(stage).top) || 0

function measureGeometry(
  section: HTMLElement,
  stage: HTMLElement,
): ZoomGeometry {
  const sectionTop = section.getBoundingClientRect().top
  const heroBottom =
    document.getElementById("hero")?.getBoundingClientRect().bottom ??
    sectionTop
  const carousel = stage.querySelector<HTMLElement>(".about-carousel-viewport")
  const slide = stage.querySelector<HTMLElement>(".about-slide")
  const carouselPadding = carousel
    ? Number.parseFloat(getComputedStyle(carousel).paddingTop) || 0
    : 0
  return {
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: window.innerHeight,
    stickyTop: readStickyTop(stage),
    gapAboveSection: sectionTop - heroBottom,
    slideTop: (carousel?.offsetTop ?? 0) + carouselPadding,
    slideWidth: slide?.offsetWidth || 1,
    slideHeight: slide?.offsetHeight || 1,
  }
}

function writeZoomFrame(element: HTMLElement, frame: ZoomFrame) {
  element.style.setProperty("--about-zoom-scale", `${frame.scale}`)
  element.style.setProperty("--about-zoom-offset", `${frame.offset}px`)
  element.style.setProperty("--about-edge-feather", `${frame.edgeFeather}px`)
  element.style.setProperty(
    "--about-active-image-opacity",
    `${frame.activeImageOpacity}`,
  )
  element.style.setProperty(
    "--about-inactive-image-opacity",
    `${frame.inactiveImageOpacity}`,
  )
  element.style.setProperty("--about-dim-opacity", `${frame.dimOpacity}`)
  element.style.setProperty(
    "--about-heading-opacity",
    `${frame.headingOpacity}`,
  )
  element.style.setProperty("--about-finish-opacity", `${frame.finishOpacity}`)
}

export function useScrollZoom(
  sectionRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
) {
  const [settled, setSettled] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return
    let frame = 0
    let progress = 0

    const measureRunway = () =>
      section.getBoundingClientRect().height - stage.offsetHeight

    const update = () => {
      frame = 0
      const runway = measureRunway()
      const travelled =
        stage.getBoundingClientRect().top - section.getBoundingClientRect().top
      progress = runway > 0 ? Math.min(Math.max(travelled / runway, 0), 1) : 1
      const start = getZoomStart(measureGeometry(section, stage))
      writeZoomFrame(section, getZoomFrame(progress, start))
      setSettled(progress >= SETTLED_PROGRESS)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const settleOnFocus = () => {
      if (progress >= SETTLED_PROGRESS) return
      const remaining =
        section.getBoundingClientRect().top - readStickyTop(stage)
      window.scrollTo({
        top: window.scrollY + remaining + measureRunway(),
        behavior: "instant",
      })
    }

    update()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    stage.addEventListener("focusin", settleOnFocus)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      stage.removeEventListener("focusin", settleOnFocus)
    }
  }, [sectionRef, stageRef])

  return settled
}
