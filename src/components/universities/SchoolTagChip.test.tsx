import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SchoolTagChip } from "./SchoolTagChip"

describe("SchoolTagChip", () => {
  it("로고가 있으면 장식 이미지로 두고 학교 이름은 텍스트로 읽힌다", () => {
    const { container } = render(
      <SchoolTagChip logoSrc="/gachon.png" name="가천대학교" />,
    )

    expect(screen.getByText("가천대학교")).toBeInTheDocument()
    expect(screen.queryByRole("img")).toBeNull()
    expect(container.querySelector("img")).toHaveAttribute("alt", "")
  })

  it("로고가 없으면 자리 표시를 보조기술에서 숨긴다", () => {
    const { container } = render(<SchoolTagChip name="한국대" size="sm" />)

    expect(container.querySelector("img")).toBeNull()
    expect(container.querySelector("[aria-hidden]")).not.toBeNull()
    expect(screen.getByText("한국대")).toBeInTheDocument()
  })
})
