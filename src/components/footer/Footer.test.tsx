import { screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderWithRouter } from "@/test/renderWithRouter"

import { Footer } from "./Footer"

describe("Footer", () => {
  it("contentinfo 랜드마크이고 헤더 톤을 알린다", async () => {
    await renderWithRouter(<Footer tone="light" />)

    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-header-tone",
      "light",
    )
  })

  it("기본 톤은 dark다", async () => {
    await renderWithRouter(<Footer />)

    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "data-header-tone",
      "dark",
    )
  })

  it("사이트 링크는 세 묶음의 제목과 항목으로 보여준다", async () => {
    await renderWithRouter(<Footer />)

    const nav = screen.getByRole("navigation", { name: "사이트 링크" })
    expect(
      within(nav)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["About", "Service", "Community"])
    expect(within(nav).getByText("UPMS 서비스")).toBeInTheDocument()
  })

  it("채널 목록의 아이콘은 보조기술에서 숨긴다", async () => {
    await renderWithRouter(<Footer />)

    const channels = screen.getByRole("list", { name: "UMC 채널" })
    expect(within(channels).getAllByRole("listitem")).toHaveLength(4)
    for (const icon of channels.querySelectorAll("svg")) {
      expect(icon).toHaveAttribute("aria-hidden")
    }
  })

  it("Instagram·Kakao 채널은 새 창으로 여는 공식 채널 링크다", async () => {
    await renderWithRouter(<Footer />)

    const instagram = screen.getByRole("link", { name: "Instagram (새 창)" })
    const kakao = screen.getByRole("link", { name: "Kakao (새 창)" })
    expect(instagram).toHaveAttribute(
      "href",
      "https://www.instagram.com/uni_makeus_challenge",
    )
    expect(kakao).toHaveAttribute("href", "https://pf.kakao.com/_xjqxcln")
    for (const link of [instagram, kakao]) {
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    }
  })

  it("주소가 없는 항목은 링크가 아닌 텍스트로 둔다", async () => {
    await renderWithRouter(<Footer />)

    expect(screen.queryByRole("link", { name: /UPMS 서비스/ })).toBeNull()
    expect(screen.getByText("UPMS 서비스")).toBeInTheDocument()
  })

  it("About의 UMC PRODUCT·중앙사무국은 하위 경로가 붙은 소개 페이지 링크다", async () => {
    await renderWithRouter(<Footer />, {
      path: "/umc-product-web-brand",
      basepath: "/umc-product-web-brand",
    })

    expect(screen.getByRole("link", { name: "UMC PRODUCT" })).toHaveAttribute(
      "href",
      "/umc-product-web-brand/about/umc-product",
    )
    expect(screen.getByRole("link", { name: "중앙사무국" })).toHaveAttribute(
      "href",
      "/umc-product-web-brand/about/central-office",
    )
  })
})
