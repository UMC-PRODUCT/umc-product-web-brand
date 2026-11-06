import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { MemberGroupSection } from "./MemberGroupSection"

describe("MemberGroupSection", () => {
  it("설명이 없는 묶음은 제목만 그린다", () => {
    const { container } = render(
      <MemberGroupSection
        group={{ title: "운영국장", description: "", entries: [] }}
        members={{}}
      />,
    )

    expect(
      screen.getByRole("heading", { name: "운영국장" }),
    ).toBeInTheDocument()
    expect(container.querySelector("section > p")).toBeNull()
  })
})
