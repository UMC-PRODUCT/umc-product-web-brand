import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { useAboutMode } from "./useAboutMode"

function stubMediaQuery(initialMatches: boolean) {
  let matches = initialMatches
  const listeners = new Set<() => void>()
  const matchMedia = vi.fn((query: string) => ({
    media: query,
    get matches() {
      return matches
    },
    addEventListener: (_type: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) =>
      listeners.delete(listener),
  }))
  vi.stubGlobal("matchMedia", matchMedia)
  return {
    matchMedia,
    change(next: boolean) {
      matches = next
      for (const listener of listeners) listener()
    },
  }
}

describe("useAboutMode", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("동작 줄이기가 꺼져 있고 화면이 충분히 크면 zoom을 돌려준다", () => {
    const media = stubMediaQuery(true)

    const { result } = renderHook(() => useAboutMode())

    expect(result.current).toBe("zoom")
    expect(media.matchMedia).toHaveBeenCalledWith(
      "(prefers-reduced-motion: no-preference) and (min-height: 700px) and (min-width: 1024px)",
    )
  })

  it("조건이 바뀌면 static으로 바꾼다", () => {
    const media = stubMediaQuery(true)
    const { result } = renderHook(() => useAboutMode())

    act(() => media.change(false))

    expect(result.current).toBe("static")
  })
})
