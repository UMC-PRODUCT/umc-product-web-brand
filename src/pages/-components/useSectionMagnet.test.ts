import { renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  findSnapTarget,
  getCenteredScrollTop,
  type SectionRange,
  useSectionMagnet,
} from "./useSectionMagnet"

const PAGE_HEIGHT = 800
const section = (start: number, end = start): SectionRange => ({ start, end })

describe("findSnapTarget", () => {
  const sections = [
    section(0),
    section(600),
    section(1600),
    section(2400, 2700),
    section(3400),
  ]

  it("섹션 사이가 한 화면보다 길어도 아래로 화면의 10% 넘게 굴리면 다음 섹션, 덜 굴리면 원래 섹션 시작으로 간다", () => {
    expect(findSnapTarget(700, 1, sections, PAGE_HEIGHT)).toBe(1600)
    expect(findSnapTarget(650, 1, sections, PAGE_HEIGHT)).toBe(600)
  })

  it("위로 화면의 10% 넘게 굴리면 이전 섹션, 덜 굴리면 원래 섹션 시작으로 간다", () => {
    expect(findSnapTarget(1500, -1, sections, PAGE_HEIGHT)).toBe(600)
    expect(findSnapTarget(1550, -1, sections, PAGE_HEIGHT)).toBe(1600)
  })

  it("한 화면보다 큰 섹션 안에서는 어느 방향이든 그 자리에 둔다", () => {
    expect(findSnapTarget(2500, 1, sections, PAGE_HEIGHT)).toBeNull()
    expect(findSnapTarget(2500, -1, sections, PAGE_HEIGHT)).toBeNull()
  })

  it("큰 섹션 아래 끝을 조금 지나면 끝 화면으로 돌아오고, 10% 넘게 지나면 다음 섹션으로 간다", () => {
    expect(findSnapTarget(2750, 1, sections, PAGE_HEIGHT)).toBe(2700)
    expect(findSnapTarget(2800, 1, sections, PAGE_HEIGHT)).toBe(3400)
  })

  it("아래 섹션에서 위로 10% 넘게 굴리면 큰 섹션의 아래 끝 화면에 붙는다", () => {
    expect(findSnapTarget(3300, -1, sections, PAGE_HEIGHT)).toBe(2700)
  })

  it("Hero와 소개 정착 화면처럼 먼 구간도 같은 기준으로 한 번에 넘긴다", () => {
    const heroAndAbout = [section(0), section(1900)]

    expect(findSnapTarget(100, 1, heroAndAbout, PAGE_HEIGHT)).toBe(1900)
    expect(findSnapTarget(50, 1, heroAndAbout, PAGE_HEIGHT)).toBe(0)
    expect(findSnapTarget(1800, -1, heroAndAbout, PAGE_HEIGHT)).toBe(0)
    expect(findSnapTarget(1850, -1, heroAndAbout, PAGE_HEIGHT)).toBe(1900)
  })

  it("이미 섹션 시작에 있으면 움직이지 않는다", () => {
    expect(findSnapTarget(600, 1, sections, PAGE_HEIGHT)).toBeNull()
  })
})

describe("getCenteredScrollTop", () => {
  it("섹션이 헤더 아래 보이는 영역의 세로 가운데에 오는 스크롤 위치를 준다", () => {
    expect(getCenteredScrollTop(1000, 600, 900, 80)).toBe(810)
  })

  it("섹션 높이가 보이는 영역과 같으면 섹션 위쪽이 헤더 바로 아래에 온다", () => {
    expect(getCenteredScrollTop(1000, 820, 900, 80)).toBe(920)
  })
})

describe("useSectionMagnet", () => {
  const CURRENT_TOP = 1000
  const VIEWPORT_HEIGHT = 800
  const HEADER_HEIGHT = 80
  const STATS_TOP = 700
  const NEXT_TOP = 1500
  const SECTION_HEIGHT = 300
  const CENTER_OFFSET =
    HEADER_HEIGHT + (VIEWPORT_HEIGHT - HEADER_HEIGHT - SECTION_HEIGHT) / 2
  let frames: FrameRequestCallback[] = []
  let scrollTo = vi.fn()

  function placeSection(id: string, top: number, height: number) {
    const element = document.getElementById(id) as HTMLElement
    element.getBoundingClientRect = () =>
      ({
        top: top - CURRENT_TOP,
        bottom: top + height - CURRENT_TOP,
        height,
      }) as DOMRect
  }

  function renderOnPage({
    magnetAllowed = true,
    nextId = "values",
    nextHeight = SECTION_HEIGHT,
    nextPadding = "0px",
  } = {}) {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: magnetAllowed })),
    )
    vi.stubGlobal("scrollY", CURRENT_TOP)
    vi.stubGlobal("innerHeight", VIEWPORT_HEIGHT)
    document.body.innerHTML = `<header></header><main><section id="stats"></section><section id="${nextId}" style="padding: ${nextPadding}"></section></main>`
    const header = document.querySelector("header") as HTMLElement
    header.getBoundingClientRect = () => ({ height: HEADER_HEIGHT }) as DOMRect
    placeSection("stats", STATS_TOP, SECTION_HEIGHT)
    placeSection(nextId, NEXT_TOP, nextHeight)
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

  it("휠을 아래로 굴려 멈추면 아래 섹션, 위로 굴려 멈추면 위 섹션을 화면 세로 가운데에 둔다", () => {
    renderOnPage()

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))
    expect(lastScrollTop()).toBe(NEXT_TOP - CENTER_OFFSET)

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: -100 }))
    expect(lastScrollTop()).toBe(STATS_TOP - CENTER_OFFSET)
  })

  it("화면보다 큰 섹션은 위쪽에 맞춰 멈춘다", () => {
    renderOnPage({ nextHeight: 1200 })

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))

    expect(lastScrollTop()).toBe(NEXT_TOP)
  })

  it("CTA는 화면보다 커도 헤더를 빼지 않고 패딩 안쪽 콘텐츠를 화면 정중앙에 둔다", () => {
    const paddingTop = 200
    const paddingBottom = 100
    const ctaHeight = 900
    renderOnPage({
      nextId: "cta",
      nextHeight: ctaHeight,
      nextPadding: `${paddingTop}px 0 ${paddingBottom}px`,
    })

    stopScrollingAfter(new WheelEvent("wheel", { deltaY: 100 }))

    const contentHeight = ctaHeight - paddingTop - paddingBottom
    expect(lastScrollTop()).toBe(
      NEXT_TOP + paddingTop - (VIEWPORT_HEIGHT - contentHeight) / 2,
    )
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
