import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProjectCard } from "./ProjectCard"

describe("ProjectCard", () => {
  it("프로젝트명은 h3, 파트 목록은 가운뎃점으로 이어 보여준다", () => {
    render(
      <ProjectCard
        description="여행 일정을 함께 짜는 앱이에요."
        name="Triple Renewal"
        parts={["Plan", "Design", "Web", "SpringBoot"]}
        thumbnailSrc="/thumbnail.png"
      />,
    )

    expect(
      screen.getByRole("heading", { level: 3, name: "Triple Renewal" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText("여행 일정을 함께 짜는 앱이에요."),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Plan · Design · Web · SpringBoot"),
    ).toBeInTheDocument()
  })

  it("썸네일은 프로젝트명과 겹치므로 장식 이미지로 둔다", () => {
    const { container } = render(
      <ProjectCard
        description="소개"
        name="프로젝트"
        parts={["Web"]}
        thumbnailSrc="/thumbnail.png"
      />,
    )

    expect(container.querySelector("img")).toHaveAttribute("alt", "")
  })
})
