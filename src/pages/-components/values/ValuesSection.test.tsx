import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { VALUES_DESCRIPTION } from "./constants"
import { ValuesSection } from "./ValuesSection"

describe("ValuesSection", () => {
  it("제목 아래 설명 문단을 보여준다", () => {
    render(<ValuesSection />)

    const description = screen.getByText(VALUES_DESCRIPTION)
    expect(description.closest("hgroup")).not.toBeNull()
  })
})
