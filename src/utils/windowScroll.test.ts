import { afterEach, describe, expect, it, vi } from "vitest"

import {
  animateWindowScroll,
  easeInOutCubic,
  getAnchorScrollDuration,
  isWindowScrollAnimating,
} from "./windowScroll"

describe("getAnchorScrollDuration", () => {
  it("가까운 거리도 0.9초보다 빨리 끝내지 않는다", () => {
    expect(getAnchorScrollDuration(100)).toBe(900)
  })

  it("거리가 멀수록 길어지되 1.6초를 넘지 않는다", () => {
    expect(getAnchorScrollDuration(2000)).toBe(1060)
    expect(getAnchorScrollDuration(4000)).toBe(1420)
    expect(getAnchorScrollDuration(20000)).toBe(1600)
  })

  it("위로 가는 거리도 같은 시간을 쓴다", () => {
    expect(getAnchorScrollDuration(-4000)).toBe(1420)
  })
})

describe("easeInOutCubic", () => {
  it("천천히 출발해 가운데를 지나 천천히 멈춘다", () => {
    expect(easeInOutCubic(0)).toBe(0)
    expect(easeInOutCubic(0.1)).toBeLessThan(0.1)
    expect(easeInOutCubic(0.5)).toBe(0.5)
    expect(easeInOutCubic(0.9)).toBeGreaterThan(0.9)
    expect(easeInOutCubic(1)).toBe(1)
  })
})

describe("animateWindowScroll", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("이동이 끝나거나 휠로 끊기기 전까지만 진행 중으로 본다", () => {
    const frames: FrameRequestCallback[] = []
    vi.stubGlobal("scrollTo", vi.fn())
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
    )
    vi.stubGlobal("cancelAnimationFrame", vi.fn())

    animateWindowScroll(500, 500)
    expect(isWindowScrollAnimating()).toBe(true)
    frames.shift()?.(performance.now() + 10_000)
    expect(isWindowScrollAnimating()).toBe(false)

    animateWindowScroll(500, 500)
    expect(isWindowScrollAnimating()).toBe(true)
    window.dispatchEvent(new Event("wheel"))
    expect(isWindowScrollAnimating()).toBe(false)
  })
})
