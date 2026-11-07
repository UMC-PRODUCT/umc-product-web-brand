import { fireEvent, render, screen } from "@testing-library/react"
import { ToastProvider } from "@umc-product/react"
import { describe, expect, it } from "vitest"

import { RECRUITING_NOTICE_MESSAGE } from "@/hooks/useRecruitingNoticeToast"

import { RECRUITMENT_COPY } from "./constants"
import { RecruitmentSection } from "./RecruitmentSection"

describe("RecruitmentSection", () => {
  it("모집 안내 보러가기를 누르면 리크루팅 안내 Brand 토스트를 띄운다", async () => {
    render(
      <ToastProvider>
        <RecruitmentSection />
      </ToastProvider>,
    )

    const button = screen.getByRole("button", { name: RECRUITMENT_COPY.cta })
    expect(button).toBeEnabled()
    fireEvent.click(button)

    const message = await screen.findByText(RECRUITING_NOTICE_MESSAGE, {
      selector: ".umc-toast__message",
    })
    const toast = message.closest(".umc-toast")
    expect(toast).toHaveAttribute("data-color", "brand")
    expect(toast).toHaveAttribute("data-icon")
  })
})
