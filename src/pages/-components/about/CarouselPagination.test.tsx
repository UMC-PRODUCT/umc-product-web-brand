import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { CarouselPagination } from "./CarouselPagination"

const getLabel = (index: number) => `${index + 1}번째 사진`

function renderPagination(selectedIndex: number, onSelect = vi.fn()) {
  render(
    <CarouselPagination
      controlsId="about-slides"
      count={5}
      getLabel={getLabel}
      onSelect={onSelect}
      selectedIndex={selectedIndex}
    />,
  )
  return onSelect
}

describe("CarouselPagination", () => {
  it("선택한 사진의 버튼만 현재 항목으로 알린다", () => {
    renderPagination(2)

    expect(screen.getAllByRole("button")).toHaveLength(5)
    expect(screen.getByRole("button", { name: "3번째 사진" })).toHaveAttribute(
      "aria-current",
      "true",
    )
    expect(
      screen.getByRole("button", { name: "1번째 사진" }),
    ).not.toHaveAttribute("aria-current")
  })

  it("버튼을 누르면 그 사진으로 이동을 요청한다", () => {
    const onSelect = renderPagination(2)

    fireEvent.click(screen.getByRole("button", { name: "5번째 사진" }))

    expect(onSelect).toHaveBeenCalledWith(4)
  })

  it("좌우 화살표 키로 앞뒤 사진을 고르고 끝에서는 반대쪽으로 넘어간다", () => {
    const onSelect = renderPagination(4)
    const lastButton = screen.getByRole("button", { name: "5번째 사진" })
    const firstButton = screen.getByRole("button", { name: "1번째 사진" })

    fireEvent.keyDown(lastButton, { key: "ArrowRight" })
    expect(onSelect).toHaveBeenLastCalledWith(0)
    expect(firstButton).toHaveFocus()

    fireEvent.keyDown(firstButton, { key: "ArrowLeft" })
    expect(onSelect).toHaveBeenLastCalledWith(4)
    expect(lastButton).toHaveFocus()
  })
})
