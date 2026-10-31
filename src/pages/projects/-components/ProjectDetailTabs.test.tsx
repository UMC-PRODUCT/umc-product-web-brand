import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { ProjectDetailTabs } from "./ProjectDetailTabs"

const renderTabs = (onValueChange = vi.fn()) =>
  render(
    <ProjectDetailTabs
      detail={<p>상세 내용</p>}
      intro={<p>소개 내용</p>}
      onValueChange={onValueChange}
      value="intro"
    />,
  )

describe("ProjectDetailTabs", () => {
  it("선택한 탭 내용만 그려서 다른 탭 이미지를 미리 받지 않는다", () => {
    renderTabs()

    expect(screen.getByText("소개 내용")).toBeInTheDocument()
    expect(screen.queryByText("상세 내용")).not.toBeInTheDocument()
  })

  it("다른 탭을 고르면 값을 알린다", () => {
    const onValueChange = vi.fn()
    renderTabs(onValueChange)

    fireEvent.mouseDown(
      screen.getByRole("tab", { name: "프로젝트 상세정보" }),
      { button: 0 },
    )

    expect(onValueChange).toHaveBeenCalledWith("detail")
  })
})
