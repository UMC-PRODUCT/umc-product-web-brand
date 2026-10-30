import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { getCountUpValue, useCountUp } from "./useCountUp"

describe("getCountUpValue", () => {
  it("시작은 0, 길이가 지나면 목표값이고 그 뒤로 넘지 않는다", () => {
    expect(getCountUpValue(4000, 0, 1500)).toBe(0)
    expect(getCountUpValue(4000, 1500, 1500)).toBe(4000)
    expect(getCountUpValue(4000, 3000, 1500)).toBe(4000)
  })

  it("처음에 빠르고 끝에서 느려진다", () => {
    expect(getCountUpValue(4000, 750, 1500)).toBe(3500)
  })
})

describe("useCountUp", () => {
  let frames: FrameRequestCallback[] = []
  let now = 0

  function runFramesUntil(time: number) {
    act(() => {
      while (frames.length && now < time) {
        now += 16
        for (const frame of frames.splice(0)) frame(now)
      }
    })
  }

  function stubReducedMotion(reduce: boolean) {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: reduce })),
    )
  }

  beforeEach(() => {
    frames = []
    now = 0
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
    )
    vi.stubGlobal("cancelAnimationFrame", vi.fn())
    vi.spyOn(performance, "now").mockImplementation(() => now)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it("시작 전에는 0을 보이고, 시작하면 목표값까지 센다", () => {
    stubReducedMotion(false)
    const { result, rerender } = renderHook(
      ({ started }) => useCountUp(1500, started),
      { initialProps: { started: false } },
    )
    expect(result.current).toBe(0)

    rerender({ started: true })
    runFramesUntil(2000)

    expect(result.current).toBe(1500)
  })

  it("동작 줄이기에서는 처음부터 목표값을 보인다", () => {
    stubReducedMotion(true)
    const { result } = renderHook(() => useCountUp(600, false))

    expect(result.current).toBe(600)
  })
})
