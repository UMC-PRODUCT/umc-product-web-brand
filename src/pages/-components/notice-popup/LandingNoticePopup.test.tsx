import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { DEMO_DAY_MATCHING_COPY } from "./constants"
import { LandingNoticePopup } from "./LandingNoticePopup"

const CTA_NAME = `${DEMO_DAY_MATCHING_COPY.cta} (새 창)`

function queryPopup() {
  return screen.queryByRole("dialog", { name: "UMC 안내" })
}

describe("LandingNoticePopup", () => {
  it("랜딩에 들어오면 데모데이 팀 매칭 안내를 띄운다", () => {
    render(<LandingNoticePopup />)

    expect(queryPopup()).toBeVisible()
    expect(
      screen.getByRole("heading", { name: /UMC Demo Day\s*팀 매칭 시스템/ }),
    ).toBeInTheDocument()
    const link = screen.getByRole("link", { name: CTA_NAME })
    expect(link).toHaveAttribute("href", DEMO_DAY_MATCHING_COPY.href)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("Esc를 누르면 닫는다", () => {
    render(<LandingNoticePopup />)

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" })

    expect(queryPopup()).not.toBeInTheDocument()
  })

  it("닫은 뒤 랜딩에 다시 들어오면 처음 한 번 다시 띄운다", () => {
    const { unmount } = render(<LandingNoticePopup />)

    fireEvent.click(screen.getByRole("button", { name: "닫기" }))
    expect(queryPopup()).not.toBeInTheDocument()

    unmount()
    render(<LandingNoticePopup />)

    expect(queryPopup()).toBeVisible()
  })

  it("바로가기를 누르면 새 창으로 보내고 팝업을 닫는다", () => {
    render(<LandingNoticePopup />)

    fireEvent.click(screen.getByRole("link", { name: CTA_NAME }))

    expect(queryPopup()).not.toBeInTheDocument()
  })
})
