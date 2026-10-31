import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ProjectPagination } from "./ProjectPagination"

describe("ProjectPagination", () => {
  it("페이지가 하나면 그리지 않는다", () => {
    const { container } = render(
      <ProjectPagination onPageChange={vi.fn()} page={1} pageCount={1} />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it("첫 페이지에는 이전 화살표가 없고 현재 페이지를 표시한다", () => {
    render(<ProjectPagination onPageChange={vi.fn()} page={1} pageCount={3} />)

    expect(
      screen.queryByRole("button", { name: "이전 페이지" }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "1 페이지" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  it("마지막 페이지에는 다음 화살표가 없다", () => {
    render(<ProjectPagination onPageChange={vi.fn()} page={3} pageCount={3} />)

    expect(
      screen.queryByRole("button", { name: "다음 페이지" }),
    ).not.toBeInTheDocument()
  })

  it("화살표와 번호를 누르면 해당 페이지를 알린다", () => {
    const onPageChange = vi.fn()
    render(
      <ProjectPagination onPageChange={onPageChange} page={2} pageCount={3} />,
    )

    fireEvent.click(screen.getByRole("button", { name: "다음 페이지" }))
    expect(onPageChange).toHaveBeenLastCalledWith(3)

    fireEvent.click(screen.getByRole("button", { name: "1 페이지" }))
    expect(onPageChange).toHaveBeenLastCalledWith(1)
  })
})
