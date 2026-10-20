import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Button } from "./Button"

describe("Button", () => {
  it("기본은 type=button인 버튼으로 렌더링한다", () => {
    render(<Button>11기 지원하기</Button>)

    expect(
      screen.getByRole("button", { name: "11기 지원하기" }),
    ).toHaveAttribute("type", "button")
  })

  it("asChild면 넘긴 링크로 렌더링하고 화살표도 링크 안에 넣는다", () => {
    render(
      <Button arrow asChild variant="glass">
        <a href="/projects">챌린저들 프로젝트 구경하기</a>
      </Button>,
    )

    const link = screen.getByRole("link", {
      name: "챌린저들 프로젝트 구경하기",
    })
    expect(link).toHaveAttribute("href", "/projects")
    expect(link).not.toHaveAttribute("type")
    expect(link.querySelector("svg")).not.toBeNull()
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("화살표는 보조기술에서 숨긴다", () => {
    render(<Button arrow>모집 안내 보러가기</Button>)

    const button = screen.getByRole("button", { name: "모집 안내 보러가기" })
    expect(button.querySelector("[aria-hidden]")).not.toBeNull()
  })
})
