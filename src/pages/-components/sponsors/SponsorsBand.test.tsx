import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SPONSORS, SPONSORS_COPY } from "./constants"
import { SponsorsBand } from "./SponsorsBand"

describe("SponsorsBand", () => {
  it("줄바꿈 항목은 접근성 트리에서 빠지고 로고 7개만 목록 항목으로 읽힌다", () => {
    render(<SponsorsBand />)

    expect(screen.getAllByRole("listitem")).toHaveLength(7)
    expect(
      screen.getAllByRole("img").map((img) => img.getAttribute("alt")),
    ).toEqual(SPONSORS.map((sponsor) => sponsor.name))
  })

  it("설명은 로고 목록 뒤에 온다", () => {
    render(<SponsorsBand />)
    const list = screen.getByRole("list")
    const description = screen.getByText(
      SPONSORS_COPY.descriptionLines.join(" "),
    )

    expect(
      list.compareDocumentPosition(description) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })
})
