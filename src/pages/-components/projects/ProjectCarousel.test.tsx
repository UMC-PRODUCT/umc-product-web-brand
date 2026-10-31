import { act, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { type Project } from "./constants"
import { ProjectCarousel } from "./ProjectCarousel"

const embla = vi.hoisted(() => {
  const listeners = new Map<string, Set<() => void>>()
  const state = { selectedIndex: 0, target: 0, location: 0 }
  const engine = {
    target: { get: () => state.target },
    offsetLocation: { get: () => state.location },
    dragHandler: { pointerDown: () => false },
  }
  const api = {
    selectedScrollSnap: () => state.selectedIndex,
    internalEngine: () => engine,
    scrollNext: () => {},
    scrollPrev: () => {},
    on: (event: string, callback: () => void) => {
      const set = listeners.get(event) ?? new Set()
      set.add(callback)
      listeners.set(event, set)
      return api
    },
    off: (event: string, callback: () => void) => {
      listeners.get(event)?.delete(callback)
      return api
    },
  }
  return {
    api,
    state,
    emit(event: string) {
      for (const callback of listeners.get(event) ?? []) callback()
    },
    reset() {
      listeners.clear()
      Object.assign(state, { selectedIndex: 0, target: 0, location: 0 })
    },
  }
})

vi.mock("embla-carousel-react", () => ({
  default: () => [() => {}, embla.api],
}))

const PROJECTS: Project[] = [1, 2, 3].map((number) => ({
  id: `프로젝트 ${number}`,
  name: `프로젝트 ${number}`,
  description: "소개",
  parts: ["Web"],
  award: "대상",
  thumbnail: "/thumbnail.webp",
}))

const slide = (number: number) =>
  screen.getByRole("figure", { name: `${number} / ${PROJECTS.length}` })

describe("ProjectCarousel", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      media: query,
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    embla.reset()
  })

  it("다음 카드는 넘어가기 시작할 때가 아니라 가운데에 도착한 뒤 확대한다", () => {
    render(<ProjectCarousel label="수상작" projects={PROJECTS} />)

    Object.assign(embla.state, { selectedIndex: 1, target: -400 })
    act(() => embla.emit("select"))
    expect(slide(1)).toHaveAttribute("data-active", "true")
    expect(slide(2)).toHaveAttribute("data-active", "false")

    embla.state.location = -400
    act(() => embla.emit("scroll"))
    expect(slide(1)).toHaveAttribute("data-active", "false")
    expect(slide(2)).toHaveAttribute("data-active", "true")
  })
})
