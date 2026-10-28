import { renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import {
  easeInOutCubic,
  getAnchorScrollDuration,
  useSmoothAnchorScroll,
} from "./anchorScroll"

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

describe("useSmoothAnchorScroll", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ""
    document.documentElement.removeAttribute("data-anchor-scrolling")
  })

  function clickAnchorLink() {
    const frames: FrameRequestCallback[] = []
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    )
    vi.stubGlobal("scrollTo", vi.fn())
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
    )
    vi.stubGlobal("cancelAnimationFrame", vi.fn())
    document.body.innerHTML =
      '<nav><a href="#stats">통계</a></nav><section id="stats"></section>'
    const nav = document.querySelector("nav")
    renderHook(() => useSmoothAnchorScroll({ current: nav }))
    document.querySelector("a")?.click()
    return {
      finish: () => frames.shift()?.(performance.now() + 10_000),
    }
  }

  const isAnchorScrolling = () =>
    document.documentElement.hasAttribute("data-anchor-scrolling")

  it("앵커 이동이 끝날 때까지만 html에 data-anchor-scrolling을 단다", () => {
    const { finish } = clickAnchorLink()
    expect(isAnchorScrolling()).toBe(true)

    finish()

    expect(isAnchorScrolling()).toBe(false)
  })

  it("사용자가 휠로 이동을 끊어도 data-anchor-scrolling을 뗀다", () => {
    clickAnchorLink()
    expect(isAnchorScrolling()).toBe(true)

    window.dispatchEvent(new Event("wheel"))

    expect(isAnchorScrolling()).toBe(false)
  })
})
