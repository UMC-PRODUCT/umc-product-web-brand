import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { NoticePopup, type NoticePopupSlide } from "./NoticePopup"

const SLIDES: readonly NoticePopupSlide[] = [
  { id: "first", content: <p>첫째 안내</p> },
  { id: "second", content: <p>둘째 안내</p> },
  { id: "third", content: <p>셋째 안내</p> },
]

function renderPopup(
  slides: readonly NoticePopupSlide[],
  onOpenChange = vi.fn(),
) {
  render(
    <NoticePopup
      onOpenChange={onOpenChange}
      open
      slides={slides}
      title="UMC 안내"
    />,
  )
  return { onOpenChange }
}

function dot(position: number) {
  return screen.getByRole("button", { name: `${position}번째 안내` })
}

describe("NoticePopup", () => {
  it("슬라이드가 하나면 페이지네이션 없이 그 슬라이드만 보여 준다", () => {
    renderPopup(SLIDES.slice(0, 1))

    expect(screen.getByRole("dialog", { name: "UMC 안내" })).toBeVisible()
    expect(screen.getByText("첫째 안내")).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "이전 안내" }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: "다음 안내" }),
    ).not.toBeInTheDocument()
  })

  it("첫 슬라이드에서는 이전 화살표를, 마지막 슬라이드에서는 다음 화살표를 막는다", () => {
    renderPopup(SLIDES)

    const previous = screen.getByRole("button", { name: "이전 안내" })
    const next = screen.getByRole("button", { name: "다음 안내" })
    expect(previous).toBeDisabled()
    expect(next).toBeEnabled()

    fireEvent.click(next)
    fireEvent.click(next)

    expect(screen.getByText("셋째 안내")).toBeInTheDocument()
    expect(previous).toBeEnabled()
    expect(next).toBeDisabled()
  })

  it("화살표와 점을 누르면 그 슬라이드로 옮기고 점에 현재 위치를 표시한다", () => {
    renderPopup(SLIDES)

    expect(dot(1)).toHaveAttribute("aria-current", "true")
    expect(screen.queryByText("둘째 안내")).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "다음 안내" }))
    expect(screen.getByText("둘째 안내")).toBeInTheDocument()
    expect(dot(2)).toHaveAttribute("aria-current", "true")
    expect(dot(1)).not.toHaveAttribute("aria-current")

    fireEvent.click(dot(3))
    expect(screen.getByText("셋째 안내")).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", { name: "이전 안내" }))
    expect(screen.getByText("둘째 안내")).toBeInTheDocument()
  })

  it("닫기 버튼을 누르면 닫으라고 알린다", () => {
    const { onOpenChange } = renderPopup(SLIDES.slice(0, 1))

    fireEvent.click(screen.getByRole("button", { name: "닫기" }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
