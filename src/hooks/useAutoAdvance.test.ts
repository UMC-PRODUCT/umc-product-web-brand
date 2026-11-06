import { renderHook } from "@testing-library/react"
import { type UseEmblaCarouselType } from "embla-carousel-react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useAutoAdvance } from "./useAutoAdvance"

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>

function createFakeEmbla() {
  const listeners = new Map<string, Set<() => void>>()
  const position = { target: 0, location: 0 }
  const engine = {
    target: { get: () => position.target },
    offsetLocation: { get: () => position.location },
    dragHandler: { pointerDown: () => false },
  }
  const api = {
    scrollNext: vi.fn(),
    internalEngine: () => engine,
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
  return {
    api,
    embla: api as unknown as EmblaCarouselType,
    emit,
    count,
    position,
  }
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

  it("넘어가기 시작할 때가 아니라 가운데에 도착한 순간부터 다시 센다", () => {
    const { api, embla, emit, position } = createFakeEmbla()
    renderHook(() => useAutoAdvance(embla, { delay: 2000, paused: false }))

    vi.advanceTimersByTime(1500)
    position.target = 400
    emit("select")
    vi.advanceTimersByTime(300)
    position.location = 400
    emit("scroll")
    vi.advanceTimersByTime(1999)
    expect(api.scrollNext).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
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

  it("넘어가는 도중에 멈춤이 풀리면 도착한 순간부터 다시 센다", () => {
    const { api, embla, emit, position } = createFakeEmbla()
    const { rerender } = renderHook(
      ({ paused }) => useAutoAdvance(embla, { delay: 2000, paused }),
      { initialProps: { paused: true } },
    )

    position.target = 400
    position.location = 200
    rerender({ paused: false })
    vi.advanceTimersByTime(1000)
    position.location = 400
    emit("scroll")
    vi.advanceTimersByTime(1999)
    expect(api.scrollNext).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(api.scrollNext).toHaveBeenCalledTimes(1)
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
