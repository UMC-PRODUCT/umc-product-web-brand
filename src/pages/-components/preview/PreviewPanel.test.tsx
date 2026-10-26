import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { PREVIEW_TABS } from "./constants"
import { PreviewPanel } from "./PreviewPanel"

// jsdom에는 matchMedia가 없다. 1440 이상 여부만 정해 주고 나머지 질의(모션 줄이기 등)는 false로 둔다
function stubWideScreen(wide: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      media: query,
      matches: wide && query === "(min-width: 90rem)",
      addEventListener: () => {},
      removeEventListener: () => {},
    })),
  )
  // 슬라이드(Embla)는 IntersectionObserver·ResizeObserver를 쓴다. jsdom에는 없어 빈 구현을 둔다
  const EmptyObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  vi.stubGlobal("IntersectionObserver", EmptyObserver)
  vi.stubGlobal("ResizeObserver", EmptyObserver)
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("PreviewPanel 1440 이상", () => {
  it("탭을 바꿔도 이미 연 탭의 사진을 다시 마운트하지 않는다", () => {
    stubWideScreen(true)
    const [first, second] = PREVIEW_TABS
    if (!first?.image || !second?.image) throw new Error("탭 데이터가 없다")

    render(<PreviewPanel />)

    const firstImage = screen.getByAltText(first.image.alt)
    fireEvent.load(firstImage)
    expect(firstImage).toHaveClass("opacity-100")

    fireEvent.mouseDown(screen.getByRole("tab", { name: second.label }))
    fireEvent.mouseDown(screen.getByRole("tab", { name: first.label }))

    expect(screen.getByAltText(first.image.alt)).toBe(firstImage)
    expect(firstImage).toHaveClass("opacity-100")
  })

  it("선택하지 않은 탭의 패널은 DOM에 두고 숨긴다", () => {
    stubWideScreen(true)
    render(<PreviewPanel />)

    const inactivePanels = document.querySelectorAll(
      '[role="tabpanel"][data-state="inactive"]',
    )
    expect(inactivePanels).toHaveLength(PREVIEW_TABS.length - 1)
    for (const panel of inactivePanels) {
      expect(panel).toHaveClass("data-[state=inactive]:hidden")
    }
  })
})

describe("PreviewPanel 1440 미만", () => {
  it("스테퍼로 이전·다음 슬라이드로 옮기고 처음과 끝에서는 멈춘다", () => {
    stubWideScreen(false)
    const second = PREVIEW_TABS[1]
    const last = PREVIEW_TABS.at(-1)
    if (!second || !last) throw new Error("탭 데이터가 없다")

    render(<PreviewPanel />)

    expect(screen.queryByRole("tablist")).not.toBeInTheDocument()
    const prev = screen.getByRole("button", { name: "이전 활동" })
    const next = screen.getByRole("button", { name: "다음 활동" })
    const current = () => document.querySelector("[aria-live]")
    expect(prev).toBeDisabled()

    fireEvent.click(next)
    expect(current()).toHaveTextContent(second.label)
    expect(prev).toBeEnabled()

    for (let i = 1; i < PREVIEW_TABS.length; i++) fireEvent.click(next)
    expect(current()).toHaveTextContent(last.label)
    expect(next).toBeDisabled()
  })

  it("보이는 슬라이드만 보조기기에 읽힌다", () => {
    stubWideScreen(false)
    render(<PreviewPanel />)

    fireEvent.click(screen.getByRole("button", { name: "다음 활동" }))

    const slides = document.querySelectorAll('[aria-roledescription="slide"]')
    expect(slides).toHaveLength(PREVIEW_TABS.length)
    expect(slides[1]).not.toHaveAttribute("aria-hidden")
    expect(slides[0]).toHaveAttribute("aria-hidden", "true")
  })
})
