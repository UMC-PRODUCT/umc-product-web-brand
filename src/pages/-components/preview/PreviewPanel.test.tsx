import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PREVIEW_TABS } from "./constants"
import { PreviewPanel } from "./PreviewPanel"

describe("PreviewPanel", () => {
  it("탭을 바꿔도 이미 연 탭의 사진을 다시 마운트하지 않는다", () => {
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

  it("스테퍼로 이전·다음 탭으로 옮기고 처음과 끝에서는 멈춘다", () => {
    const first = PREVIEW_TABS[0]
    const second = PREVIEW_TABS[1]
    const last = PREVIEW_TABS.at(-1)
    if (!first || !second || !last) throw new Error("탭 데이터가 없다")

    render(<PreviewPanel />)

    const prev = screen.getByRole("button", { name: "이전 활동" })
    const next = screen.getByRole("button", { name: "다음 활동" })
    expect(prev).toBeDisabled()

    fireEvent.click(next)
    expect(screen.getByRole("tab", { name: second.label })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(prev).toBeEnabled()

    for (let i = 1; i < PREVIEW_TABS.length; i++) fireEvent.click(next)
    expect(screen.getByRole("tab", { name: last.label })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(next).toBeDisabled()
  })

  it("선택하지 않은 탭의 패널은 DOM에 두고 숨긴다", () => {
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
