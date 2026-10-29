import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { MemberCard } from "./MemberCard"

const MEMBER = { nickname: "리버", name: "이재원", school: "한성대학교" }

describe("MemberCard", () => {
  it("사진이 없으면 기본 프로필을 그린다", () => {
    const { container } = render(<MemberCard member={MEMBER} />)

    expect(container.querySelector("img")).toBeNull()
    expect(screen.getByTestId("default-profile")).toBeInTheDocument()
  })

  it("이메일이 없으면 이메일 줄 없이 학교만 그린다", () => {
    render(<MemberCard member={MEMBER} />)

    expect(screen.getByText("한성대학교")).toBeInTheDocument()
    expect(screen.queryByText(/@/)).toBeNull()
  })

  it("태그를 넘겨받은 순서대로 그린다", () => {
    render(
      <MemberCard
        member={MEMBER}
        tags={[
          { kind: "role", label: "Lead" },
          { kind: "part", label: "iOS" },
        ]}
      />,
    )

    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual(["Lead", "iOS"])
  })

  it("학교가 없으면 이름 줄만 그린다", () => {
    const { container } = render(
      <MemberCard member={{ nickname: "쳇쳇", name: "전채운" }} />,
    )

    expect(container.querySelectorAll("p")).toHaveLength(1)
  })
})
