import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FaqSection } from "./FaqSection"

// radix Tabs는 마우스 클릭이 아니라 mousedown으로 탭을 바꾼다
function selectTab(name: string) {
  fireEvent.mouseDown(screen.getByRole("tab", { name }), { button: 0 })
}

describe("FaqSection", () => {
  it("처음에는 전체 질문을 보여 주고, 칩을 고르면 그 파트 질문으로 바꾼다", () => {
    render(<FaqSection />)

    expect(screen.getByRole("tab", { name: "전체" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(
      screen.getByRole("button", {
        name: "UMC는 어떤 동아리이고, 어떤 활동을 하나요?",
      }),
    ).toBeInTheDocument()

    selectTab("Design")

    expect(screen.getByRole("tab", { name: "Design" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    expect(
      screen.getByRole("button", { name: /디자인 포트폴리오가 꼭 필요한가요/ }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: /UMC는 어떤 동아리이고/ }),
    ).not.toBeInTheDocument()
  })

  it("질문은 한 번에 하나만 펼친다", () => {
    render(<FaqSection />)

    const first = screen.getByRole("button", { name: /전공자가 아니어도/ })
    const second = screen.getByRole("button", { name: /학교에 UMC가 없어도/ })

    fireEvent.click(first)
    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(
      screen.getByText(/전공과 관계없이 지원할 수 있어요/),
    ).toBeInTheDocument()

    fireEvent.click(second)
    expect(first).toHaveAttribute("aria-expanded", "false")
    expect(second).toHaveAttribute("aria-expanded", "true")
  })
})
