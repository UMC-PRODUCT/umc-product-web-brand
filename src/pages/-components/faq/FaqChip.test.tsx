import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { FaqChip } from "./FaqChip"

describe("FaqChip", () => {
  it("선택 상태를 aria-pressed로 알린다", () => {
    render(
      <>
        <FaqChip selected>전체</FaqChip>
        <FaqChip>PM</FaqChip>
      </>,
    )

    expect(screen.getByRole("button", { name: "전체" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
    expect(screen.getByRole("button", { name: "PM" })).toHaveAttribute(
      "aria-pressed",
      "false",
    )
  })

  it("type=button이고 누르면 onClick을 부른다", () => {
    const onClick = vi.fn()
    render(<FaqChip onClick={onClick}>Design</FaqChip>)

    const chip = screen.getByRole("button", { name: "Design" })
    fireEvent.click(chip)

    expect(chip).toHaveAttribute("type", "button")
    expect(onClick).toHaveBeenCalledOnce()
  })
})
