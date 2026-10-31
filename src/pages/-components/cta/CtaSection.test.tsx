import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { CtaSection } from "./CtaSection"
import { CTA_COPY } from "./constants"

describe("CtaSection", () => {
  it("제목을 그림 대신 텍스트로 읽는다", () => {
    render(<CtaSection />)

    expect(
      screen.getByRole("heading", { level: 2, name: CTA_COPY.title }),
    ).toBeInTheDocument()
  })

  it("모집 마감 상태를 링크 없이 보여 준다", () => {
    render(<CtaSection />)

    expect(screen.getByText("11기 모집 마감")).toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})
