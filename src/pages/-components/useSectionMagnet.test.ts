import { renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  findSnapTarget,
  type SnapPoint,
  useSectionMagnet,
} from "./useSectionMagnet"

const PAGE_HEIGHT = 800
const point = (top: number, afterRunway = false): SnapPoint => ({
  top,
  afterRunway,
})

describe("findSnapTarget", () => {
  describe("한 화면 이하 구간", () => {
    const points = [point(1000), point(1600)]

    it("아래로 화면의 10% 넘게 왔으면 다음 섹션, 덜 왔으면 원래 섹션 시작으로 간다", () => {
      expect(findSnapTarget(1100, 1, points, PAGE_HEIGHT)).toBe(1600)
      expect(findSnapTarget(1050, 1, points, PAGE_HEIGHT)).toBe(1000)
    })

    it("위로 화면의 10% 넘게 왔으면 이전 섹션, 덜 왔으면 원래 섹션 시작으로 간다", () => {
      expect(findSnapTarget(1500, -1, points, PAGE_HEIGHT)).toBe(1000)
      expect(findSnapTarget(1550, -1, points, PAGE_HEIGHT)).toBe(1600)
    })
  })

  describe("한 화면보다 긴 구간", () => {
    const points = [point(1000), point(2400)]

    it("아래로 가다 다음 섹션이 화면 아래 10% 선을 넘어 올라오면 다음 섹션으로 간다", () => {
      expect(findSnapTarget(1600, 1, points, PAGE_HEIGHT)).toBeNull()
      expect(findSnapTarget(1700, 1, points, PAGE_HEIGHT)).toBe(2400)
    })

    it("아래로 조금 내려 읽는 중에는 섹션 시작으로 되돌리지 않는다", () => {
      expect(findSnapTarget(1100, 1, points, PAGE_HEIGHT)).toBeNull()
    })

    it("위로 가다 섹션 시작에서 화면의 10% 안쪽이면 섹션 시작으로 간다", () => {
      expect(findSnapTarget(1050, -1, points, PAGE_HEIGHT)).toBe(1000)
      expect(findSnapTarget(1100, -1, points, PAGE_HEIGHT)).toBeNull()
    })
  })

  it("런웨이 끝에 붙는 섹션(소개)까지는 길이와 상관없이 한 구간으로 넘긴다", () => {
    const points = [point(0), point(1900, true)]

    expect(findSnapTarget(100, 1, points, PAGE_HEIGHT)).toBe(1900)
    expect(findSnapTarget(50, 1, points, PAGE_HEIGHT)).toBe(0)
    expect(findSnapTarget(1800, -1, points, PAGE_HEIGHT)).toBe(0)
    expect(findSnapTarget(1850, -1, points, PAGE_HEIGHT)).toBe(1900)
  })

  it("이미 섹션 시작에 있으면 움직이지 않는다", () => {
    expect(
      findSnapTarget(1000, 1, [point(1000), point(1600)], PAGE_HEIGHT),
    ).toBeNull()
  })
})

describe("useSectionMagnet", () => {
  const CURRENT_TOP = 1000
  const STATS_TOP = 700
  const SPONSORS_TOP = 1300
  let frames: FrameRequestCallback[] = []
  let scrollTo = vi.fn()

  function placeSection(id: string, top: number) {
    const section = document.getElementById(id) as HTMLElement
    section.getBoundingClientRect = () =>
      ({ top: top - CURRENT_TOP }) as DOMRect
  }

  function renderOnPage({ magnetAllowed = true } = {}) {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: magnetAllowed })),
    )
    vi.stubGlobal("scrollY", CURRENT_TOP)
    document.body.innerHTML =
      '<main><section id="stats"></section><section id="sponsors"></section></main>'
    placeSection("stats", STATS_TOP)
    placeSection("sponsors", SPONSORS_TOP)
    const main = document.querySelector("main")
    renderHook(() => useSectionMagnet({ current: main }))
  }

  function runFrames() {
    for (const frame of frames.splice(0)) frame(performance.now() + 10_000)
  }

  function stopScrollingAfter(input: Event) {
    window.dispatchEvent(input)
    window.dispatchEvent(new Event("scroll"))
    vi.advanceTimersByTime(200)
    runFrames()
  }

  const lastScrollTop = () => scrollTo.mock.lastCall?.[0]?.top

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

  it("휠을 아래로 굴려 멈추면 아래 섹션, 위로 굴려 멈추면 위 섹션 시작으로 옮긴다", () => {
    renderOnPage()

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))
    expect(lastScrollTop()).toBe(SPONSORS_TOP)

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: -100 }))
    expect(lastScrollTop()).toBe(STATS_TOP)
  })

  it("입력 없이 코드로 바뀐 스크롤에는 다시 끌어당기지 않는다", () => {
    renderOnPage()
    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))
    scrollTo.mockClear()

    window.dispatchEvent(new Event("scroll"))
    vi.advanceTimersByTime(200)
    runFrames()

    expect(scrollTo).not.toHaveBeenCalled()
  })

  it.each(["ArrowDown", "PageDown", " ", "End"])(
    "키보드(%s)로 멈추면 브라우저 기본 이동 그대로 둔다",
    (key) => {
      renderOnPage()

      stopScrollingAfter(new KeyboardEvent("keydown", { key }))

      expect(scrollTo).not.toHaveBeenCalled()
    },
  )

  it("동작 줄이기나 좁은 화면에서는 그 자리에 둔다", () => {
    renderOnPage({ magnetAllowed: false })

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))

    expect(scrollTo).not.toHaveBeenCalled()
  })
})
