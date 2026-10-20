import { type RefObject, useEffect } from "react"

// 자동으로 흐르는 속도 (px/s)
const AUTO_SPEED = 60
// 탭이 가려졌다 돌아올 때 한 번에 튀지 않도록 프레임 간격을 제한한다 (ms)
const MAX_FRAME_GAP = 100

// 같은 목록을 두 벌 이어 붙였으므로 한 벌 너비(period) 안에서 위치를 돌린다
export function wrapOffset(offset: number, period: number) {
  if (period <= 0) return 0
  return ((offset % period) + period) % period
}

interface UseMarqueeOptions {
  reverse?: boolean
}

export function useMarquee(
  trackRef: RefObject<HTMLElement | null>,
  { reverse = false }: UseMarqueeOptions = {},
) {
  useEffect(() => {
    const track = trackRef.current
    const viewport = track?.parentElement
    if (!track || !viewport) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    let offset = 0
    let hovering = false
    let dragging = false
    let lastX = 0
    let lastTime: number | null = null
    let frame = 0

    const move = (delta: number) => {
      offset = wrapOffset(offset + delta, track.scrollWidth / 2)
      track.style.transform = `translate3d(${-offset}px, 0, 0)`
    }

    const tick = (time: number) => {
      if (lastTime !== null && !hovering && !dragging && !reduceMotion) {
        const gap = Math.min(time - lastTime, MAX_FRAME_GAP)
        move((gap / 1000) * AUTO_SPEED * (reverse ? -1 : 1))
      }
      lastTime = time
      frame = requestAnimationFrame(tick)
    }

    // 세로 스크롤은 페이지가 쓰도록 두고, 가로 입력일 때만 가로챈다
    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      const delta = horizontal
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0
      if (delta === 0) return
      event.preventDefault()
      move(delta)
    }

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = true
    }
    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovering = false
    }
    const onPointerDown = (event: PointerEvent) => {
      dragging = true
      lastX = event.clientX
      viewport.setPointerCapture(event.pointerId)
    }
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return
      move(lastX - event.clientX)
      lastX = event.clientX
    }
    const onPointerEnd = (event: PointerEvent) => {
      dragging = false
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId)
      }
    }

    // wheel은 passive가 기본이라 preventDefault가 먹도록 직접 등록한다
    viewport.addEventListener("wheel", onWheel, { passive: false })
    viewport.addEventListener("pointerenter", onPointerEnter)
    viewport.addEventListener("pointerleave", onPointerLeave)
    viewport.addEventListener("pointerdown", onPointerDown)
    viewport.addEventListener("pointermove", onPointerMove)
    viewport.addEventListener("pointerup", onPointerEnd)
    viewport.addEventListener("pointercancel", onPointerEnd)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      viewport.removeEventListener("wheel", onWheel)
      viewport.removeEventListener("pointerenter", onPointerEnter)
      viewport.removeEventListener("pointerleave", onPointerLeave)
      viewport.removeEventListener("pointerdown", onPointerDown)
      viewport.removeEventListener("pointermove", onPointerMove)
      viewport.removeEventListener("pointerup", onPointerEnd)
      viewport.removeEventListener("pointercancel", onPointerEnd)
    }
  }, [trackRef, reverse])
}
