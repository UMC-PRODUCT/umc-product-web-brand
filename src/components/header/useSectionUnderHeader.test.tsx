import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { type HeaderTone } from "@/components/layout/Section"

import { useSectionUnderHeader } from "./useSectionUnderHeader"

const HEADER_HEIGHT = 80
const ANCHOR_OFFSET = 90
const SECTION_WIDTH = 1440
const SECTION_HEIGHT = 100

interface SectionBox {
  top: number
  bottom: number
  width: number
  height: number
}

const sectionBoxes = new Map<string, SectionBox>()

function addSection(
  id: string,
  tone: HeaderTone,
  top: number,
  size = { width: SECTION_WIDTH, height: SECTION_HEIGHT },
) {
  const section = document.createElement("section")
  if (id) section.id = id
  section.dataset.headerTone = tone
  section.getBoundingClientRect = () => sectionBoxes.get(id) as DOMRect
  sectionBoxes.set(id, { top, bottom: top + size.height, ...size })
  document.body.append(section)
}

function moveSection(id: string, top: number) {
  const box = sectionBoxes.get(id)
  if (box) sectionBoxes.set(id, { ...box, top, bottom: top + box.height })
}

function renderUnderHeader() {
  const header = document.createElement("header")
  Object.defineProperty(header, "offsetHeight", { value: HEADER_HEIGHT })
  const headerRef = { current: header }
  return renderHook(() => useSectionUnderHeader(headerRef))
}

function fireAndAdvanceFrame(type: "scroll" | "resize") {
  act(() => {
    window.dispatchEvent(new Event(type))
    vi.advanceTimersToNextFrame()
  })
}

function setAnchorOffset(offset: number) {
  document.documentElement.style.scrollPaddingTop = `${offset}px`
}

describe("useSectionUnderHeader", () => {
  beforeEach(() => {
    setAnchorOffset(HEADER_HEIGHT)
  })

  afterEach(() => {
    document.documentElement.style.scrollPaddingTop = ""
    vi.useRealTimers()
    sectionBoxes.clear()
    document.body.replaceChildren()
  })

  it("헤더 선을 지난 마지막 섹션의 id와 톤을 돌려준다", () => {
    addSection("hero", "dark", -900)
    addSection("about", "light", 40)
    addSection("stats", "light", 500)

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "about", tone: "light" })
  })

  it("섹션 사이 간격에서는 위 섹션 id와 페이지 배경 톤을 돌려준다", () => {
    addSection("hero", "dark", -1000, { width: SECTION_WIDTH, height: 900 })
    addSection("about", "light", 200)

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "hero", tone: "light" })
  })

  it("활성 섹션은 앵커 도착선(scroll-padding-top) 기준으로 판정한다", () => {
    setAnchorOffset(ANCHOR_OFFSET)
    addSection("hero", "dark", -1000, { width: SECTION_WIDTH, height: 900 })
    addSection("about", "light", ANCHOR_OFFSET)

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "about", tone: "light" })
  })

  it("어두운 섹션이 헤더 영역을 다 덮으면 Dark를 돌려준다", () => {
    setAnchorOffset(ANCHOR_OFFSET)
    addSection("hero", "dark", -815, { width: SECTION_WIDTH, height: 900 })
    addSection("about", "light", 85)

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "about", tone: "dark" })
  })

  it("id가 없는 톤 요소는 톤에만 쓰고 활성 섹션으로 고르지 않는다", () => {
    addSection("about", "light", -100, { width: SECTION_WIDTH, height: 1000 })
    addSection("", "dark", 0, { width: SECTION_WIDTH, height: 600 })

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "about", tone: "dark" })
  })

  it("어두운 섹션이 헤더 영역을 다 덮기 전에는 Light를 유지한다", () => {
    addSection("faq", "light", -900, { width: SECTION_WIDTH, height: 700 })
    addSection("cta", "dark", 30, { width: SECTION_WIDTH, height: 600 })

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "cta", tone: "light" })
  })

  it("헤더 선 아래 1px까지 걸친 섹션은 지난 것으로 본다", () => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    })
    addSection("recruit", "light", -900)
    addSection("faq", "light", HEADER_HEIGHT + 1.5)
    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "recruit", tone: "light" })

    moveSection("faq", HEADER_HEIGHT + 0.4)
    fireAndAdvanceFrame("scroll")

    expect(result.current).toEqual({ id: "faq", tone: "light" })
  })

  it("화면에 상자가 없는 섹션은 건너뛴다", () => {
    addSection("about", "light", -100)
    addSection("cta", "dark", 0, { width: 0, height: 0 })

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "about", tone: "light" })
  })

  it("스크롤하면 다음 프레임에 다시 판정한다", () => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    })
    addSection("hero", "dark", 0)
    addSection("about", "light", 900)
    const { result } = renderUnderHeader()

    moveSection("hero", -900)
    moveSection("about", 0)
    fireAndAdvanceFrame("scroll")

    expect(result.current).toEqual({ id: "about", tone: "light" })
  })

  it("리사이즈하면 다음 프레임에 다시 판정한다", () => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    })
    addSection("hero", "dark", 0)
    addSection("about", "light", 900)
    const { result } = renderUnderHeader()

    moveSection("hero", -900)
    moveSection("about", 0)
    fireAndAdvanceFrame("resize")

    expect(result.current).toEqual({ id: "about", tone: "light" })
  })

  it("톤 속성이 바뀌면 스크롤 없이도 다음 프레임에 다시 판정한다", async () => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    })
    addSection("about", "light", -100, { width: SECTION_WIDTH, height: 1000 })
    const { result } = renderUnderHeader()
    const about = document.getElementById("about")

    await act(async () => {
      about?.setAttribute("data-header-tone", "dark")
    })
    act(() => {
      vi.advanceTimersToNextFrame()
    })

    expect(result.current).toEqual({ id: "about", tone: "dark" })
  })

  it("마운트 뒤에 추가된 섹션도 판정한다", () => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    })
    addSection("hero", "dark", -900)
    const { result } = renderUnderHeader()

    addSection("about", "light", 0)
    fireAndAdvanceFrame("scroll")

    expect(result.current).toEqual({ id: "about", tone: "light" })
  })
})
