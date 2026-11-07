import { fireEvent, render, screen, within } from "@testing-library/react"
import { ToastProvider } from "@umc-product/react"
import { describe, expect, it } from "vitest"

import { TopToastProvider } from "@/components/toast/TopToastProvider"
import { RECRUITING_NOTICE_MESSAGE } from "@/hooks/useRecruitingNoticeToast"

import {
  PREPARING_SERVICE_MESSAGE,
  QUICK_LINKS,
  QUICK_LINKS_TITLE,
} from "./constants"
import { QuickLinksMenu } from "./QuickLinksMenu"

function renderMenu() {
  render(
    <TopToastProvider>
      <ToastProvider>
        <QuickLinksMenu links={QUICK_LINKS} title={QUICK_LINKS_TITLE} />
      </ToastProvider>
    </TopToastProvider>,
  )
  fireEvent.keyDown(screen.getByRole("button", { name: QUICK_LINKS_TITLE }), {
    key: "Enter",
  })
}

function selectNoticeItem(label: string) {
  const item = screen.getByRole("menuitem", { name: label })
  expect(item).not.toHaveAttribute("href")
  fireEvent.click(item)
}

describe("QuickLinksMenu", () => {
  it("지원하기를 고르면 메뉴를 닫고 양쪽에 원뿔이 있고 X가 없는 리크루팅 안내 Brand 토스트를 띄운다", async () => {
    renderMenu()
    selectNoticeItem("지원하기")

    const message = await screen.findByText(RECRUITING_NOTICE_MESSAGE, {
      selector: ".umc-toast__message",
    })
    const toast = message.closest<HTMLElement>(".umc-toast")
    expect(toast).toHaveAttribute("data-color", "brand")
    expect(toast).toHaveAttribute("data-placement", "bottom")
    expect(toast).toHaveAttribute("data-icon")
    expect(toast?.querySelector(".umc-toast__close")).toBeNull()
    expect(
      toast && within(toast).getByRole("button", { name: "닫기" }),
    ).toHaveClass("umc-toast__action")
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("준비 중인 UMC 테크블로그를 고르면 메뉴를 닫고 아이콘만 있는 상단 Error 토스트를 띄운다", async () => {
    renderMenu()
    selectNoticeItem("UMC 테크블로그")

    const message = await screen.findByText(PREPARING_SERVICE_MESSAGE, {
      selector: ".umc-toast__message",
    })
    const toast = message.closest(".umc-toast")
    expect(toast).toHaveAttribute("data-color", "error")
    expect(toast).toHaveAttribute("data-placement", "top")
    expect(toast).toHaveAttribute("data-icon")
    expect(toast?.querySelector(".umc-toast__action")).toBeNull()
    expect(toast?.querySelector(".umc-toast__close")).toBeNull()
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("데모데이 매칭 서비스는 새 창으로 여는 UPMS 링크로 남는다", () => {
    renderMenu()

    const upms = screen.getByRole("menuitem", {
      name: "데모데이 매칭 서비스 (새 창)",
    })
    expect(upms).toHaveAttribute(
      "href",
      "https://activity.university.neordinary.com/",
    )
    expect(upms).toHaveAttribute("target", "_blank")
    expect(upms).toHaveAttribute("rel", "noopener noreferrer")
  })
})
