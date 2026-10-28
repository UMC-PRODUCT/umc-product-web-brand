import { fireEvent, render, screen } from "@testing-library/react"
import { useState } from "react"
import { describe, expect, it } from "vitest"

import { LOGIN_URL, NAV_ITEMS, type NavId } from "./constants"
import { MobileMenu } from "./MobileMenu"

function Harness({ activeId = null }: { activeId?: NavId | null }) {
  const [open, setOpen] = useState(false)
  return (
    <MobileMenu
      activeId={activeId}
      items={NAV_ITEMS}
      onOpenChange={setOpen}
      open={open}
    />
  )
}

function openMenu() {
  const button = screen.getByRole("button", { name: "메뉴 열기" })
  fireEvent.click(button)
  return button
}

describe("MobileMenu", () => {
  it("메뉴 버튼을 누르면 패널이 열리고 aria-expanded가 true가 된다", () => {
    render(<Harness />)
    const button = screen.getByRole("button", { name: "메뉴 열기" })
    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()

    fireEvent.click(button)

    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(button).toHaveAccessibleName("메뉴 닫기")
    expect(
      screen.getByRole("navigation", { name: "주요 섹션" }),
    ).toBeInTheDocument()
  })

  it("Esc를 누르면 닫히고 포커스가 메뉴 버튼으로 돌아간다", () => {
    render(<Harness />)
    const button = openMenu()
    screen.getByRole("link", { name: "프로젝트" }).focus()

    fireEvent.keyDown(document, { key: "Escape" })

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
    expect(button).toHaveFocus()
  })

  it("패널 링크를 누르면 닫힌다", () => {
    render(<Harness />)
    openMenu()

    fireEvent.click(screen.getByRole("link", { name: "프로젝트" }))

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("패널 밖을 누르면 닫힌다", () => {
    render(<Harness />)
    openMenu()

    fireEvent.pointerDown(document.body)

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()
  })

  it("현재 섹션 항목에만 aria-current=location을 단다", () => {
    render(<Harness activeId="recruit" />)
    openMenu()

    expect(screen.getByRole("link", { name: "모집안내" })).toHaveAttribute(
      "aria-current",
      "location",
    )
    expect(screen.getByRole("link", { name: "소개" })).not.toHaveAttribute(
      "aria-current",
    )
  })

  it("패널 아래쪽 링크는 로그인 하나다", () => {
    render(<Harness />)
    openMenu()

    expect(screen.getByRole("link", { name: "로그인" })).toHaveAttribute(
      "href",
      LOGIN_URL,
    )
    expect(
      screen.queryByRole("link", { name: /지원하기/ }),
    ).not.toBeInTheDocument()
  })
})
