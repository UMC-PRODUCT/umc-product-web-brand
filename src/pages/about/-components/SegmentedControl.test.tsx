import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { SegmentedControl } from "./SegmentedControl"

const OPTIONS = [
  { value: "3", label: "3기" },
  { value: "2", label: "2기" },
]

describe("SegmentedControl", () => {
  it("이름이 붙은 radiogroup에서 선택 항목만 aria-checked다", () => {
    render(
      <SegmentedControl
        label="기수"
        onValueChange={vi.fn()}
        options={OPTIONS}
        value="3"
      />,
    )

    expect(screen.getByRole("radiogroup", { name: "기수" })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "3기" })).toHaveAttribute(
      "aria-checked",
      "true",
    )
    expect(screen.getByRole("radio", { name: "2기" })).toHaveAttribute(
      "aria-checked",
      "false",
    )
  })

  it("다른 항목을 누르면 그 값을 알린다", () => {
    const onValueChange = vi.fn()
    render(
      <SegmentedControl
        label="기수"
        onValueChange={onValueChange}
        options={OPTIONS}
        value="3"
      />,
    )

    fireEvent.click(screen.getByRole("radio", { name: "2기" }))

    expect(onValueChange).toHaveBeenCalledWith("2")
  })

  it("선택된 항목을 다시 눌러도 선택을 풀지 않는다", () => {
    const onValueChange = vi.fn()
    render(
      <SegmentedControl
        label="기수"
        onValueChange={onValueChange}
        options={OPTIONS}
        value="3"
      />,
    )

    fireEvent.click(screen.getByRole("radio", { name: "3기" }))

    expect(onValueChange).not.toHaveBeenCalled()
  })
})
