import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ProjectSearchField, SEARCH_DELAY_MS } from "./ProjectSearchField"

const renderField = (value: string, onValueChange = vi.fn()) => {
  const view = render(
    <ProjectSearchField
      label="프로젝트 이름 검색"
      onValueChange={onValueChange}
      placeholder="프로젝트 명으로 검색하세요"
      value={value}
    />,
  )
  const rerender = (next: string) =>
    view.rerender(
      <ProjectSearchField
        label="프로젝트 이름 검색"
        onValueChange={onValueChange}
        placeholder="프로젝트 명으로 검색하세요"
        value={next}
      />,
    )
  const input = screen.getByRole("searchbox", { name: "프로젝트 이름 검색" })
  return { input, rerender, onValueChange }
}

describe("ProjectSearchField", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("입력한 값은 바로 보여주고 검색은 입력이 멈춘 뒤 한 번만 한다", () => {
    const { input, onValueChange } = renderField("")

    fireEvent.change(input, { target: { value: "머" } })
    fireEvent.change(input, { target: { value: "머핀" } })

    expect(input).toHaveValue("머핀")
    expect(onValueChange).not.toHaveBeenCalled()

    vi.advanceTimersByTime(SEARCH_DELAY_MS)

    expect(onValueChange).toHaveBeenCalledTimes(1)
    expect(onValueChange).toHaveBeenLastCalledWith("머핀")
  })

  it("Enter를 누르면 기다리지 않고 바로 검색한다", () => {
    const { input, onValueChange } = renderField("")

    fireEvent.change(input, { target: { value: "머핀" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(onValueChange).toHaveBeenCalledTimes(1)
    expect(onValueChange).toHaveBeenLastCalledWith("머핀")

    vi.advanceTimersByTime(SEARCH_DELAY_MS)

    expect(onValueChange).toHaveBeenCalledTimes(1)
  })

  it("밖에서 URL 값이 바뀌면 기다리던 검색을 취소한다", () => {
    const { input, rerender, onValueChange } = renderField("")

    fireEvent.change(input, { target: { value: "머핀" } })
    rerender("책장")
    vi.advanceTimersByTime(SEARCH_DELAY_MS)

    expect(input).toHaveValue("책장")
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it("입력 중에 늦게 도착한 예전 URL 값으로 덮지 않는다", () => {
    const { input, rerender } = renderField("")
    input.focus()

    fireEvent.change(input, { target: { value: "머" } })
    fireEvent.change(input, { target: { value: "머ㅍ" } })
    rerender("머")

    expect(input).toHaveValue("머ㅍ")
  })

  it("포커스가 없을 때 URL 값이 바뀌면 따라간다", () => {
    const { input, rerender } = renderField("머핀")
    expect(input).toHaveValue("머핀")

    rerender("")

    expect(input).toHaveValue("")
  })
})
