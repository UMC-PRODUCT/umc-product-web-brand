import { render, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { SPONSORS, SPONSORS_COPY } from "../sponsors/constants"
import { STATS } from "./constants"
import { StatsSection } from "./StatsSection"

describe("StatsSection", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

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

  it("동작 줄이기에서는 숫자를 세지 않고 최종값을 보이며, 스크린리더는 최종값 문장을 읽는다", () => {
    const { container } = render(<StatsSection />)

    expect(
      [...container.querySelectorAll(".stat-card-value")].map(
        (value) => value.textContent,
      ),
    ).toEqual(STATS.map((stat) => String(stat.value)))
    for (const stat of STATS) {
      expect(
        within(container).getByText(`${stat.value}${stat.unit} 이상`),
      ).toHaveClass("sr-only")
    }
  })
})
