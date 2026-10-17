import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Section } from "./Section"
import { SectionHeading } from "./SectionHeading"

describe("SectionHeading", () => {
  it("h2 제목이 섹션 이름이 되고 섹션은 헤더 톤을 알린다", () => {
    render(
      <Section headerTone="light" id="stats" labelledBy="stats-title">
        <SectionHeading title="새로운 가능성을 UMC에서" titleId="stats-title" />
      </Section>,
    )

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "새로운 가능성을 UMC에서",
    )
    expect(
      screen.getByRole("region", { name: "새로운 가능성을 UMC에서" }),
    ).toHaveAttribute("data-header-tone", "light")
  })
})
