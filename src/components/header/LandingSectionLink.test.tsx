import { act, fireEvent, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { renderWithRouter } from "@/test/renderWithRouter"

import { LandingSectionLink } from "./LandingSectionLink"

function Links() {
  return (
    <>
      <LandingSectionLink aria-current="location" sectionId="about">
        소개
      </LandingSectionLink>
      <LandingSectionLink sectionId="faq">자주 묻는 질문</LandingSectionLink>
    </>
  )
}

describe("LandingSectionLink", () => {
  it("랜딩 경로에서도 넘겨받은 aria-current만 단다", async () => {
    await renderWithRouter(<Links />)

    expect(screen.getByRole("link", { name: "소개" })).toHaveAttribute(
      "aria-current",
      "location",
    )
    expect(
      screen.getByRole("link", { name: "자주 묻는 질문" }),
    ).not.toHaveAttribute("aria-current")
  })

  it("basepath가 붙은 랜딩 해시 주소를 만든다", async () => {
    await renderWithRouter(<Links />, {
      path: "/umc-product-web-brand",
      basepath: "/umc-product-web-brand",
    })

    expect(
      screen.getByRole("link", { name: "자주 묻는 질문" }),
    ).toHaveAttribute("href", "/umc-product-web-brand/#faq")
  })

  it("다른 경로에서 누르면 랜딩으로 이동하고 해시를 남긴다", async () => {
    const { router } = await renderWithRouter(<Links />, {
      path: "/about/umc-product",
    })

    await act(async () => {
      fireEvent.click(screen.getByRole("link", { name: "자주 묻는 질문" }))
    })

    expect(router.state.location.pathname).toBe("/")
    expect(router.state.location.hash).toBe("faq")
  })

  it("헤더가 먼저 기본 동작을 막아도 넘겨받은 onClick은 부른다", async () => {
    const onClick = vi.fn()
    await renderWithRouter(
      <header>
        <LandingSectionLink onClick={onClick} sectionId="faq">
          자주 묻는 질문
        </LandingSectionLink>
      </header>,
    )
    screen
      .getByRole("banner")
      .addEventListener("click", (event) => event.preventDefault())

    fireEvent.click(screen.getByRole("link", { name: "자주 묻는 질문" }))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
