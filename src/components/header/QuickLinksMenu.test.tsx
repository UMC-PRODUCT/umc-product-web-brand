import { fireEvent, render, screen } from "@testing-library/react"
import { ToastProvider } from "@umc-product/react"
import { describe, expect, it } from "vitest"

import {
  PREPARING_SERVICE_MESSAGE,
  QUICK_LINKS,
  QUICK_LINKS_TITLE,
} from "./constants"
import { QuickLinksMenu } from "./QuickLinksMenu"

function renderMenu() {
  render(
    <ToastProvider>
      <QuickLinksMenu links={QUICK_LINKS} title={QUICK_LINKS_TITLE} />
    </ToastProvider>,
  )
  fireEvent.keyDown(screen.getByRole("button", { name: QUICK_LINKS_TITLE }), {
    key: "Enter",
  })
}

describe("QuickLinksMenu", () => {
  it.each(["지원하기", "UMC 테크블로그"])(
    "준비 중인 %s를 고르면 메뉴를 닫고 준비 중 토스트를 띄운다",
    async (label) => {
      renderMenu()

      const item = screen.getByRole("menuitem", { name: label })
      expect(item).not.toHaveAttribute("href")
      fireEvent.click(item)

      expect(
        await screen.findByText(PREPARING_SERVICE_MESSAGE),
      ).toBeInTheDocument()
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    },
  )

  it("UPMS는 새 창으로 여는 링크로 남는다", () => {
    renderMenu()

    const upms = screen.getByRole("menuitem", { name: "UPMS (새 창)" })
    expect(upms).toHaveAttribute(
      "href",
      "https://activity.university.neordinary.com/",
    )
    expect(upms).toHaveAttribute("target", "_blank")
    expect(upms).toHaveAttribute("rel", "noopener noreferrer")
  })
})
