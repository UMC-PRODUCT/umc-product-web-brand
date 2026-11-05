import { act, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { HERO_SLIDES, ProjectsHeroSlides } from "./ProjectsHeroSlides"

const embla = vi.hoisted(() => {
  const engine = {
    target: { get: () => 0 },
    offsetLocation: { get: () => 0 },
    dragHandler: { pointerDown: () => false },
  }
  const api = {
    internalEngine: () => engine,
    scrollNext: vi.fn(),
    on: () => api,
    off: () => api,
  }
  const options: unknown[] = []
  return { api, options }
})

vi.mock("embla-carousel-react", () => ({
  default: (options: unknown) => {
    embla.options.push(options)
    return [() => {}, embla.api]
  },
}))

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    media: query,
    matches: reduce && query.includes("reduce"),
    addEventListener: () => {},
    removeEventListener: () => {},
  }))

describe("ProjectsHeroSlides", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    embla.api.scrollNext.mockClear()
    embla.options.length = 0
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("수상 사진을 섹션 순서대로 그리고 보조기술에서 숨긴다", () => {
    stubReducedMotion(false)
    const { container } = render(<ProjectsHeroSlides />)

    const images = container.querySelectorAll("img")
    expect([...images].map((image) => image.getAttribute("src"))).toEqual(
      HERO_SLIDES.map((slide) => slide.src),
    )
    expect(HERO_SLIDES.map((slide) => slide.id)).toEqual([
      "5029",
      "5028",
      "5027",
      "5020",
      "5025",
    ])
    expect(screen.getByTestId("projects-hero-slides")).toHaveAttribute(
      "aria-hidden",
      "true",
    )
    expect(embla.options[0]).toMatchObject({ loop: true, watchDrag: false })
  })

  it("2초마다 다음 사진으로 넘긴다", () => {
    stubReducedMotion(false)
    render(<ProjectsHeroSlides />)

    act(() => vi.advanceTimersByTime(1999))
    expect(embla.api.scrollNext).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(embla.api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("움직임 줄이기를 켜면 넘기지 않는다", () => {
    stubReducedMotion(true)
    render(<ProjectsHeroSlides />)

    act(() => vi.advanceTimersByTime(10000))
    expect(embla.api.scrollNext).not.toHaveBeenCalled()
  })
})
