import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FaqAccordion, FaqAccordionItem } from "./FaqAccordion"

function renderFaq() {
  render(
    <FaqAccordion collapsible type="single">
      <FaqAccordionItem question="UMC는 어떤 동아리인가요?" value="about">
        전국 단위 IT 연합 동아리예요.
      </FaqAccordionItem>
      <FaqAccordionItem question="전공자가 아니어도 되나요?" value="major">
        네, 지원할 수 있어요.
      </FaqAccordionItem>
    </FaqAccordion>,
  )
}

describe("FaqAccordion", () => {
  it("질문은 h3 안의 버튼이고 처음에는 접혀 있다", () => {
    renderFaq()

    const trigger = screen.getByRole("button", {
      name: /UMC는 어떤 동아리인가요/,
    })
    expect(trigger.closest("h3")).not.toBeNull()
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("전국 단위 IT 연합 동아리예요.")).toBeNull()
  })

  it("질문을 누르면 답변이 펼쳐지고 다시 누르면 접힌다", () => {
    renderFaq()
    const trigger = screen.getByRole("button", {
      name: /UMC는 어떤 동아리인가요/,
    })

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("전국 단위 IT 연합 동아리예요.")).toBeVisible()

    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })
})
