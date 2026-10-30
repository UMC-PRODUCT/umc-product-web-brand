import { render, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SPONSORS, SPONSORS_COPY } from "../sponsors/constants"
import { StatsSection } from "./StatsSection"

describe("StatsSection", () => {
  it("후원사 띠를 통계 섹션 안에 담아 한 섹션으로 보여 준다", () => {
    const { container } = render(<StatsSection />)
    const sections = container.querySelectorAll("section")
    const stats = within(sections[0] as HTMLElement)

    expect(sections).toHaveLength(1)
    expect(sections[0]).toHaveAttribute("id", "stats")
    expect(
      stats.getByRole("heading", { level: 3, name: SPONSORS_COPY.title }),
    ).toBeInTheDocument()
    expect(
      stats.getAllByRole("img").map((img) => img.getAttribute("alt")),
    ).toEqual(SPONSORS.map((sponsor) => sponsor.name))
  })
})
