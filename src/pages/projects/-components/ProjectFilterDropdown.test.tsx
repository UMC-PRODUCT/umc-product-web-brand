import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeAll, describe, expect, it, vi } from "vitest"

import { ProjectFilterDropdown } from "./ProjectFilterDropdown"

const AWARDS = [
  { value: "grand", label: "대상" },
  { value: "excellence", label: "최우수상" },
  { value: "merit", label: "우수상" },
]

const openMenu = (name: RegExp) =>
  fireEvent.keyDown(screen.getByRole("button", { name }), { key: "Enter" })

beforeAll(() => {
  // Radix 메뉴 위치 계산에 필요한 API가 jsdom에 없다
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
  Element.prototype.scrollIntoView = vi.fn()
})

describe("ProjectFilterDropdown", () => {
  it("선택이 없으면 placeholder를 보여주고 필터 값은 전체로 읽어준다", () => {
    render(
      <ProjectFilterDropdown
        label="수상내역"
        multiple
        onValueChange={vi.fn()}
        options={AWARDS}
        placeholder="전체"
        value={[]}
      />,
    )

    const trigger = screen.getByRole("button", { name: "수상내역 필터: 전체" })
    expect(trigger).toHaveTextContent("전체")
  })

  it("여러 개를 고르면 옵션 순서의 첫 항목과 나머지 수를 보여준다", () => {
    render(
      <ProjectFilterDropdown
        label="수상내역"
        multiple
        onValueChange={vi.fn()}
        options={AWARDS}
        value={["merit", "grand"]}
      />,
    )

    expect(
      screen.getByRole("button", { name: "수상내역 필터: 대상 외 1" }),
    ).toHaveTextContent("대상 외 1")
  })

  it("단일 선택은 고른 값으로 바꾸고 메뉴를 닫는다", () => {
    const onValueChange = vi.fn()
    render(
      <ProjectFilterDropdown
        label="기수"
        onValueChange={onValueChange}
        options={AWARDS}
        value={["grand"]}
      />,
    )

    openMenu(/기수 필터/)
    fireEvent.click(screen.getByRole("menuitemradio", { name: "우수상" }))

    expect(onValueChange).toHaveBeenCalledWith(["merit"])
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("마우스로 고른 뒤에도 포커스를 트리거로 돌려준다", async () => {
    render(
      <ProjectFilterDropdown
        label="기수"
        onValueChange={vi.fn()}
        options={AWARDS}
        value={[]}
      />,
    )

    openMenu(/기수 필터/)
    const menu = screen.getByRole("menu")
    fireEvent.pointerDown(menu)
    fireEvent.click(screen.getByRole("menuitemradio", { name: "우수상" }))

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /기수 필터/ })).toHaveFocus(),
    )
  })

  it("복수 선택은 항목을 더하고 빼며 메뉴를 열어 둔다", () => {
    const onValueChange = vi.fn()
    render(
      <ProjectFilterDropdown
        label="수상내역"
        multiple
        onValueChange={onValueChange}
        options={AWARDS}
        value={["grand"]}
      />,
    )

    openMenu(/수상내역 필터/)
    fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "우수상" }))
    expect(onValueChange).toHaveBeenLastCalledWith(["grand", "merit"])

    fireEvent.click(screen.getByRole("menuitemcheckbox", { name: "대상" }))
    expect(onValueChange).toHaveBeenLastCalledWith([])

    expect(screen.getByRole("menu")).toBeInTheDocument()
  })

  it("전체를 고르면 선택을 비운다", () => {
    const onValueChange = vi.fn()
    render(
      <ProjectFilterDropdown
        label="수상내역"
        multiple
        onValueChange={onValueChange}
        options={AWARDS}
        value={["grand", "merit"]}
      />,
    )

    openMenu(/수상내역 필터/)
    fireEvent.click(screen.getByRole("menuitem", { name: "전체" }))

    expect(onValueChange).toHaveBeenCalledWith([])
  })
})
