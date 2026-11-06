import { type RefObject, useEffect, useState } from "react"

const COUNT_UP_DURATION_MS = 1500
const START_VISIBLE_RATIO = 0.5
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const prefersReducedMotion = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches

export function getCountUpValue(
  target: number,
  elapsedMs: number,
  durationMs: number,
) {
  const progress = Math.min(Math.max(elapsedMs / durationMs, 0), 1)
  const eased = 1 - (1 - progress) ** 3
  return Math.round(target * eased)
}

export function useStartWhenVisible(ref: RefObject<Element | null>) {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setStarted(true)
        observer.disconnect()
      },
      { threshold: START_VISIBLE_RATIO },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref])

  return started
}

export function useCountUp(target: number, started: boolean) {
  const [value, setValue] = useState(() =>
    prefersReducedMotion() ? target : 0,
  )

  useEffect(() => {
    if (!started || prefersReducedMotion()) return
    let frame = 0
    const startedAt = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startedAt
      setValue(getCountUpValue(target, elapsed, COUNT_UP_DURATION_MS))
      if (elapsed < COUNT_UP_DURATION_MS) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])

  return value
}
