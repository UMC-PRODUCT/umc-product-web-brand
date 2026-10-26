import { renderHook } from "@testing-library/react"
import { type UseEmblaCarouselType } from "embla-carousel-react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useAutoAdvance } from "./useAutoAdvance"

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>

// Embla의 on/off/emit만 흉내 내는 가짜 API
function createFakeEmbla() {
  const listeners = new Map<string, Set<() => void>>()
  const api = {
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
  const emit = (event: string) => {
    for (const callback of listeners.get(event) ?? []) callback()
  }
  const count = () =>
    [...listeners.values()].reduce((sum, set) => sum + set.size, 0)
  return { api, embla: api as unknown as EmblaCarouselType, emit, count }
}

describe("useAutoAdvance", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("delay가 지나면 다음 카드로 넘긴다", () => {
    const { api, embla } = createFakeEmbla()
    renderHook(() => useAutoAdvance(embla, { delay: 2000, paused: false }))

    vi.advanceTimersByTime(1999)
    expect(api.scrollNext).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("카드가 멈추면 처음부터 다시 센다", () => {
    const { api, embla, emit } = createFakeEmbla()
    renderHook(() => useAutoAdvance(embla, { delay: 2000, paused: false }))

    vi.advanceTimersByTime(1500)
    emit("settle")
    vi.advanceTimersByTime(1500)
    expect(api.scrollNext).not.toHaveBeenCalled()
    vi.advanceTimersByTime(500)
    expect(api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("누르고 있는 동안에는 넘기지 않고, 손을 떼면 다시 센다", () => {
    const { api, embla, emit } = createFakeEmbla()
    renderHook(() => useAutoAdvance(embla, { delay: 2000, paused: false }))

    emit("pointerDown")
    vi.advanceTimersByTime(5000)
    expect(api.scrollNext).not.toHaveBeenCalled()

    emit("pointerUp")
    vi.advanceTimersByTime(2000)
    expect(api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("멈춤 상태에서는 넘기지 않고 이벤트도 등록하지 않는다", () => {
    const { api, embla, count } = createFakeEmbla()
    renderHook(() => useAutoAdvance(embla, { delay: 2000, paused: true }))

    vi.advanceTimersByTime(5000)
    expect(api.scrollNext).not.toHaveBeenCalled()
    expect(count()).toBe(0)
  })

  it("멈춤이 풀리면 다시 센다", () => {
    const { api, embla } = createFakeEmbla()
    const { rerender } = renderHook(
      ({ paused }) => useAutoAdvance(embla, { delay: 2000, paused }),
      { initialProps: { paused: true } },
    )

    vi.advanceTimersByTime(3000)
    rerender({ paused: false })
    vi.advanceTimersByTime(2000)
    expect(api.scrollNext).toHaveBeenCalledTimes(1)
  })

  it("언마운트하면 타이머와 이벤트를 정리한다", () => {
    const { api, embla, count } = createFakeEmbla()
    const { unmount } = renderHook(() =>
      useAutoAdvance(embla, { delay: 2000, paused: false }),
    )

    unmount()
    vi.advanceTimersByTime(5000)
    expect(api.scrollNext).not.toHaveBeenCalled()
    expect(count()).toBe(0)
  })
})
