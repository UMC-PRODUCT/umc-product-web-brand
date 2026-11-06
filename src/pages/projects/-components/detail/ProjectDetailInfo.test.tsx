import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProjectDetailInfo } from "./ProjectDetailInfo"

const headings = () =>
  screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)

describe("ProjectDetailInfo", () => {
  it("글이 없으면 이미지 섹션만 보여준다", () => {
    render(<ProjectDetailInfo name="Muffin" projectId="muffin" />)

    expect(headings()).toEqual(["IA", "Design System", "UI"])
  })

  it("티칭은 UI 섹션을 숨긴다", () => {
    render(<ProjectDetailInfo name="TeachING" projectId="teaching" />)

    expect(headings()).toEqual(["IA", "Design System"])
  })

  it("글이 있는 섹션을 시안 순서대로 보여주고 번호와 API 수를 표시한다", () => {
    render(
      <ProjectDetailInfo
        detail={{
          flow: [{ text: "첫 단계", note: "(참고)" }],
          features: {
            summary: "기능 요약",
            items: [{ title: "인증", description: "설명", apiCount: 5 }],
          },
          stack: [{ title: "Database", description: "MySQL" }],
        }}
        name="Muffin"
        projectId="muffin"
      />,
    )

    expect(headings().slice(0, 3)).toEqual([
      "서비스 이용 흐름",
      "핵심 기능",
      "기술 스택",
    ])
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("(참고)")).toBeInTheDocument()
    expect(screen.getByText("API 수 : 5")).toBeInTheDocument()
  })
})
