import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { FilterChips } from "./FilterChips"

const OPTIONS = [
  { value: "all", label: "전체", count: 46 },
  { value: "leads", label: "총괄단" },
]

describe("FilterChips", () => {
  it("인원 수가 있는 칩은 라벨 뒤에 수를 붙인다", () => {
    render(
      <FilterChips
        label="팀"
        onValueChange={vi.fn()}
        options={OPTIONS}
        value="all"
      />,
    )

    expect(screen.getByRole("radio", { name: "전체 46" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
  })

  it("다른 칩을 누르면 그 값을 알리고, 선택된 칩을 다시 누르면 알리지 않는다", () => {
    const onValueChange = vi.fn()
    render(
      <FilterChips
        label="팀"
        onValueChange={onValueChange}
        options={OPTIONS}
        value="all"
      />,
    )

    fireEvent.click(screen.getByRole("radio", { name: "전체 46" }))
    fireEvent.click(screen.getByRole("radio", { name: "총괄단" }))

    expect(onValueChange).toHaveBeenCalledOnce()
    expect(onValueChange).toHaveBeenCalledWith("leads")
  })

  it("새 줄로 표시한 칩부터 다음 줄에 놓는다", () => {
    render(
      <FilterChips
        label="팀"
        onValueChange={vi.fn()}
        options={[
          ...OPTIONS,
          { value: "platform", label: "Platform Team", breakBefore: true },
        ]}
        value="all"
      />,
    )

    const rows = screen.getByRole("radiogroup").children
    expect([...rows].map((row) => row.textContent)).toEqual([
      "전체 46총괄단",
      "Platform Team",
    ])
  })
})
