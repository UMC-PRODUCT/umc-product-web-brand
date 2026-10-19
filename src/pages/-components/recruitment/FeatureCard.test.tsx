import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FeatureCard } from "./FeatureCard"

describe("FeatureCard", () => {
  it("분야 이름은 h3 제목, 설명은 본문으로 렌더링한다", () => {
    render(
      <FeatureCard
        description="사용자가 더 쉽고 편리하게 사용할 수 있는 경험을 설계해요."
        title="Design"
      />,
    )

    expect(
      screen.getByRole("heading", { level: 3, name: "Design" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "사용자가 더 쉽고 편리하게 사용할 수 있는 경험을 설계해요.",
      ),
    ).toBeInTheDocument()
  })

  it("눌러서 이동하는 요소가 아니라 링크나 버튼이 없다", () => {
    render(<FeatureCard description="설명" title="PM" />)

    expect(screen.queryByRole("link")).toBeNull()
    expect(screen.queryByRole("button")).toBeNull()
  })
})
