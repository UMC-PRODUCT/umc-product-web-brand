import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { type HeaderTone } from "@/components/layout/Section"

import { useSectionUnderHeader } from "./useSectionUnderHeader"

const HEADER_HEIGHT = 80
const SECTION_WIDTH = 1440
const SECTION_HEIGHT = 100

interface SectionBox {
  top: number
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
  section.id = id
  section.dataset.headerTone = tone
  section.getBoundingClientRect = () => sectionBoxes.get(id) as DOMRect
  sectionBoxes.set(id, { top, ...size })
  document.body.append(section)
}

function moveSection(id: string, top: number) {
  const box = sectionBoxes.get(id)
  if (box) sectionBoxes.set(id, { ...box, top })
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

describe("useSectionUnderHeader", () => {
  afterEach(() => {
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

  it("섹션 사이 간격에서는 위 섹션의 값을 돌려준다", () => {
    addSection("faq", "light", -400)
    addSection("cta", "dark", 200)

    const { result } = renderUnderHeader()

    expect(result.current).toEqual({ id: "faq", tone: "light" })
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
