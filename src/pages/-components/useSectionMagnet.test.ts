import { renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { findMagnetTarget, useSectionMagnet } from "./useSectionMagnet"

describe("findMagnetTarget", () => {
  it("120px 안에서 가장 가까운 섹션 위치를 고른다", () => {
    expect(findMagnetTarget(1000, [0, 890, 1060, 1900])).toBe(1060)
    expect(findMagnetTarget(1000, [0, 880, 1200])).toBe(880)
  })

  it("가장 가까운 섹션이 120px보다 멀면 움직이지 않는다", () => {
    expect(findMagnetTarget(1000, [0, 1121])).toBeNull()
  })

  it("이미 섹션 위치에 있으면 움직이지 않는다", () => {
    expect(findMagnetTarget(1060, [1060, 1150])).toBeNull()
  })
})

describe("useSectionMagnet", () => {
  const CURRENT_TOP = 1000
  const STATS_TOP = 1060
  let frames: FrameRequestCallback[] = []
  let scrollTo = vi.fn()

  function renderOnPage({ magnetAllowed = true } = {}) {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: magnetAllowed })),
    )
    vi.stubGlobal("scrollY", CURRENT_TOP)
    document.body.innerHTML =
      '<main><section id="hero"></section><section id="stats"></section></main>'
    const hero = document.getElementById("hero") as HTMLElement
    const stats = document.getElementById("stats") as HTMLElement
    hero.getBoundingClientRect = () => ({ top: -CURRENT_TOP }) as DOMRect
    stats.getBoundingClientRect = () =>
      ({ top: STATS_TOP - CURRENT_TOP }) as DOMRect
    const main = document.querySelector("main")
    renderHook(() => useSectionMagnet({ current: main }))
  }

  function stopScrollingAfter(input: Event) {
    window.dispatchEvent(input)
    window.dispatchEvent(new Event("scroll"))
    vi.advanceTimersByTime(200)
    for (const frame of frames.splice(0)) frame(performance.now() + 10_000)
  }

  beforeEach(() => {
    vi.useFakeTimers()
    frames = []
    scrollTo = vi.fn()
    vi.stubGlobal("scrollTo", scrollTo)
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
    )
    vi.stubGlobal("cancelAnimationFrame", vi.fn())
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: 5000,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    document.body.innerHTML = ""
  })

  it("휠로 섹션 시작 근처에 멈추면 그 섹션 시작으로 옮긴다", () => {
    renderOnPage()

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))

    expect(scrollTo).toHaveBeenLastCalledWith({
      top: STATS_TOP,
      behavior: "instant",
    })
  })

  it("PageDown으로 멈춰도 섹션 시작으로 옮긴다", () => {
    renderOnPage()

    stopScrollingAfter(new KeyboardEvent("keydown", { key: "PageDown" }))

    expect(scrollTo).toHaveBeenLastCalledWith({
      top: STATS_TOP,
      behavior: "instant",
    })
  })

  it("입력 없이 코드로 바뀐 스크롤에는 다시 끌어당기지 않는다", () => {
    renderOnPage()
    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))
    scrollTo.mockClear()

    window.dispatchEvent(new Event("scroll"))
    vi.advanceTimersByTime(200)
    for (const frame of frames.splice(0)) frame(performance.now() + 10_000)

    expect(scrollTo).not.toHaveBeenCalled()
  })

  it("방향키로 멈추면 그 자리에 둔다", () => {
    renderOnPage()

    stopScrollingAfter(new KeyboardEvent("keydown", { key: "ArrowDown" }))

    expect(scrollTo).not.toHaveBeenCalled()
  })

  it("동작 줄이기나 좁은 화면에서는 그 자리에 둔다", () => {
    renderOnPage({ magnetAllowed: false })

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
