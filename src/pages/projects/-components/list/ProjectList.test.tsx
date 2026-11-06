import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { renderWithRouter } from "@/test/renderWithRouter"

import { PROJECTS } from "../../../-components/projects/constants"
import { ProjectList } from "./ProjectList"

describe("ProjectList", () => {
  it("불러오는 중에는 카드 대신 로딩 상태를 알린다", () => {
    render(<ProjectList isLoading projects={PROJECTS} />)

    expect(screen.getByRole("status")).toHaveTextContent("불러오는 중")
    expect(screen.queryByRole("heading")).not.toBeInTheDocument()
  })

  it("프로젝트가 없으면 안내 문구를 보여준다", () => {
    render(<ProjectList projects={[]} />)

    expect(
      screen.getByText("조건에 맞는 프로젝트가 없어요."),
    ).toBeInTheDocument()
  })

  it("불러온 프로젝트를 상세로 이어지는 카드로 보여준다", async () => {
    await renderWithRouter(<ProjectList projects={PROJECTS} />)

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(
      PROJECTS.length,
    )
    expect(screen.getAllByRole("link")[0]).toHaveAttribute(
      "href",
      expect.stringContaining("/projects/pop-it"),
    )
  })
})
