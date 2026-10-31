import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ValueCard } from "./ValueCard"

describe("ValueCard", () => {
  it("제목 버튼을 누르면 설명을 펼친 상태로 고정하고, 다시 누르면 접는다", () => {
    render(
      <ul>
        <ValueCard
          description={"첫 줄\n둘째 줄"}
          icon={null}
          image="growth.webp"
          subtitle="Growth"
          title="성장"
        />
      </ul>,
    )
    const toggle = screen.getByRole("button", { name: "성장 Growth" })
    const description = screen.getByText(/첫 줄/)

    expect(toggle).toHaveAttribute("aria-expanded", "false")
    expect(description).toHaveAttribute("aria-hidden", "true")
    expect(toggle).toHaveAttribute("aria-controls", description?.id)

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "true")
    expect(description).toHaveAttribute("aria-hidden", "false")

    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute("aria-expanded", "false")
  })
})
