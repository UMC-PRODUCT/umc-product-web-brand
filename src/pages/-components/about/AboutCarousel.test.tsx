import { act, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { AboutCarousel } from "./AboutCarousel"
import { type AboutSlide } from "./constants"

const embla = vi.hoisted(() => {
  const listeners = new Map<string, Set<() => void>>()
  const state = { target: 0, location: 0 }
  const engine = {
    target: { get: () => state.target },
    offsetLocation: { get: () => state.location },
    dragHandler: { pointerDown: () => false },
  }
  const api = {
    selectedScrollSnap: () => 0,
    internalEngine: () => engine,
    rootNode: () => document.body,
    slideNodes: () => [],
    scrollTo: vi.fn(),
    scrollNext: vi.fn(),
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
    reset() {
      listeners.clear()
      Object.assign(state, { target: 0, location: 0 })
      api.scrollNext.mockClear()
    },
  }
})

vi.mock("embla-carousel-react", () => ({
  default: () => [() => {}, embla.api],
}))

const SLIDES: AboutSlide[] = [1, 2, 3].map((number) => ({
  id: `slide-${number}`,
  src: `/slide-${number}.webp`,
  srcSet: `/slide-${number}.webp 800w`,
  alt: `사진 ${number}`,
}))

const stubReducedMotion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (query: string) => ({
    media: query,
    matches: reduce && query.includes("reduce"),
    addEventListener: () => {},
    removeEventListener: () => {},
  }))

class FakePointerEvent extends MouseEvent {
  pointerType: string

  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init)
    this.pointerType = init.pointerType ?? ""
  }
}

const renderCarousel = (zooming = false) =>
  render(
    <AboutCarousel
      label="활동 사진"
      slides={SLIDES}
      startIndex={0}
      zooming={zooming}
    />,
  )

const carousel = () => screen.getByRole("region", { name: "활동 사진" })

describe("AboutCarousel 자동 넘김", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    stubReducedMotion(false)
    vi.stubGlobal("PointerEvent", FakePointerEvent)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    embla.reset()
  })

  it("가운데 사진이 2초 머문 뒤 다음 사진으로 넘긴다", () => {
    renderCarousel()

    act(() => vi.advanceTimersByTime(1999))
    expect(embla.api.scrollNext).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(1))
    expect(embla.api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("축소 인터랙션 중에는 넘기지 않고, 정착하면 그때부터 센다", () => {
    const { rerender } = renderCarousel(true)

    act(() => vi.advanceTimersByTime(5000))
    expect(embla.api.scrollNext).not.toHaveBeenCalled()

    rerender(
      <AboutCarousel
        label="활동 사진"
        slides={SLIDES}
        startIndex={0}
        zooming={false}
      />,
    )
    act(() => vi.advanceTimersByTime(2000))
    expect(embla.api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("마우스를 올린 동안에는 넘기지 않는다", () => {
    renderCarousel()

    fireEvent.pointerEnter(carousel(), { pointerType: "mouse" })
    act(() => vi.advanceTimersByTime(5000))
    expect(embla.api.scrollNext).not.toHaveBeenCalled()

    fireEvent.pointerLeave(carousel(), { pointerType: "mouse" })
    act(() => vi.advanceTimersByTime(2000))
    expect(embla.api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("키보드로 점 버튼에 포커스한 동안에는 넘기지 않는다", () => {
    renderCarousel()

    act(() => screen.getByRole("button", { name: "2번째 사진" }).focus())
    act(() => vi.advanceTimersByTime(5000))
    expect(embla.api.scrollNext).not.toHaveBeenCalled()
  })

  it("동작 줄이기 설정에서는 넘기지 않는다", () => {
    stubReducedMotion(true)
    renderCarousel()

    act(() => vi.advanceTimersByTime(5000))
    expect(embla.api.scrollNext).not.toHaveBeenCalled()
  })
})
