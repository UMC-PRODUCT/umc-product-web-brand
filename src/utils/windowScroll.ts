const CANCEL_EVENTS = ["wheel", "touchstart", "keydown", "mousedown"] as const

export function easeInOutCubic(progress: number) {
  return progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
}

export function getAnchorScrollTop(target: Element) {
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

export function animateWindowScroll(
  top: number,
  duration: number,
  onFinish?: () => void,
) {
  const startTop = window.scrollY
  const distance = top - startTop
  const startTime = performance.now()
  let frame = 0

  const cancel = () => {
    cancelAnimationFrame(frame)
    for (const type of CANCEL_EVENTS) window.removeEventListener(type, cancel)
  }

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
    onFinish?.()
  }

  for (const type of CANCEL_EVENTS) {
    window.addEventListener(type, cancel, { passive: true })
  }
  frame = requestAnimationFrame(step)
  return cancel
}
