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
      <Button arrow asChild variant="weak">
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

  it("Lg는 화살표가 있을 때만 높이가 64px이다", () => {
    render(
      <>
        <Button size="lg">11기 지원하기</Button>
        <Button arrow size="lg">
          모집 안내 보러가기
        </Button>
      </>,
    )

    const plain = screen.getByRole("button", { name: "11기 지원하기" })
    const withArrow = screen.getByRole("button", { name: "모집 안내 보러가기" })
    expect(plain).toHaveClass("h-[62px]")
    expect(plain).not.toHaveClass("h-[64px]")
    expect(withArrow).toHaveClass("h-[64px]", "pr-(--umc-spacing-padding-16)")
    expect(withArrow).not.toHaveClass("h-[62px]")
  })

  it("Color와 Style 조합에 맞는 배경을 고른다", () => {
    render(
      <Button color="neutral" variant="weak">
        모집 안내 보러가기
      </Button>,
    )

    const button = screen.getByRole("button", { name: "모집 안내 보러가기" })
    expect(button).toHaveClass(
      "bg-fill-neutral-medium-100",
      "text-teal-grey-700",
    )
    expect(button).not.toHaveClass("bg-fill-primary-medium-100")
  })
})
