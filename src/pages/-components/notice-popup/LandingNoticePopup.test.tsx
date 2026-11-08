import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  DEMO_DAY_MATCHING_COPY,
  NOTICE_POPUP_DISMISSED_KEY,
  NOTICE_POPUP_MIN_WIDTH_QUERY,
} from "./constants"
import { LandingNoticePopup } from "./LandingNoticePopup"

function stubViewport({ wide }: { wide: boolean }) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    media: query,
    matches: query === NOTICE_POPUP_MIN_WIDTH_QUERY && wide,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

function queryPopup() {
  return screen.queryByRole("dialog", { name: "UMC 안내" })
}

describe("LandingNoticePopup", () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("1024px 이상 화면에 들어오면 데모데이 팀 매칭 안내를 띄운다", () => {
    stubViewport({ wide: true })
    render(<LandingNoticePopup />)

    expect(queryPopup()).toBeVisible()
    expect(
      screen.getByRole("heading", { name: /UMC Demo Day\s*팀 매칭 시스템/ }),
    ).toBeInTheDocument()
    const link = screen.getByRole("link", {
      name: `${DEMO_DAY_MATCHING_COPY.cta} (새 창)`,
    })
    expect(link).toHaveAttribute("href", DEMO_DAY_MATCHING_COPY.href)
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })

  it("1024px보다 좁은 화면에서는 띄우지 않는다", () => {
    stubViewport({ wide: false })
    render(<LandingNoticePopup />)

    expect(queryPopup()).not.toBeInTheDocument()
  })

  it("닫으면 같은 세션에서 다시 들어와도 띄우지 않는다", () => {
    stubViewport({ wide: true })
    const { unmount } = render(<LandingNoticePopup />)

    fireEvent.click(screen.getByRole("button", { name: "닫기" }))

    expect(queryPopup()).not.toBeInTheDocument()
    expect(window.sessionStorage.getItem(NOTICE_POPUP_DISMISSED_KEY)).toBe("1")

    unmount()
    render(<LandingNoticePopup />)

    expect(queryPopup()).not.toBeInTheDocument()
  })

  it("Esc를 누르면 닫는다", () => {
    stubViewport({ wide: true })
    render(<LandingNoticePopup />)

    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" })

    expect(queryPopup()).not.toBeInTheDocument()
  })

  it("바로가기를 누르면 새 창으로 보내고 팝업을 닫는다", () => {
    stubViewport({ wide: true })
    render(<LandingNoticePopup />)

    fireEvent.click(
      screen.getByRole("link", {
        name: `${DEMO_DAY_MATCHING_COPY.cta} (새 창)`,
      }),
    )

    expect(queryPopup()).not.toBeInTheDocument()
    expect(window.sessionStorage.getItem(NOTICE_POPUP_DISMISSED_KEY)).toBe("1")
  })
})
