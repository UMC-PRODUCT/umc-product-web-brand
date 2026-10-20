import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Footer } from "./Footer"

describe("Footer", () => {
  it("contentinfo 랜드마크이고 헤더 톤을 알린다", () => {
    render(<Footer tone="light" />)

    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-header-tone",
      "light",
    )
  })

  it("기본 톤은 dark다", () => {
    render(<Footer />)

    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-header-tone",
      "dark",
    )
  })

  it("사이트 링크는 네 묶음의 제목과 항목으로 보여준다", () => {
    render(<Footer />)

    const nav = screen.getByRole("navigation", { name: "사이트 링크" })
    expect(
      within(nav)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["About", "Service", "Community", "Contact"])
    expect(within(nav).getByText("UPMS 서비스")).toBeInTheDocument()
  })

  it("채널 목록의 아이콘은 보조기술에서 숨긴다", () => {
    render(<Footer />)

    const channels = screen.getByRole("list", { name: "UMC 채널" })
    expect(within(channels).getAllByRole("listitem")).toHaveLength(4)
    for (const icon of channels.querySelectorAll("svg")) {
      expect(icon).toHaveAttribute("aria-hidden")
    }
  })
})
