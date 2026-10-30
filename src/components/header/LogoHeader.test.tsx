import { screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderWithRouter } from "@/test/renderWithRouter"

import { LogoHeader } from "./LogoHeader"

describe("LogoHeader", () => {
  it("랜딩으로 가는 로고 링크 하나만 보여준다", async () => {
    await renderWithRouter(<LogoHeader />, { path: "/about/umc-product" })

    const header = screen.getByRole("banner")
    const links = within(header).getAllByRole("link")

    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAccessibleName("UMC 홈")
    expect(links[0]).toHaveAttribute("href", "/")
    expect(within(header).queryByRole("navigation")).toBeNull()
    expect(within(header).queryByRole("button")).toBeNull()
  })
})
