import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { usePreviewLayout } from "./usePreviewLayout"

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

describe("usePreviewLayout", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("1440 이상이면 tabs를 돌려준다", () => {
    const media = stubMediaQuery(true)

    const { result } = renderHook(() => usePreviewLayout())

    expect(result.current).toBe("tabs")
    expect(media.matchMedia).toHaveBeenCalledWith("(min-width: 90rem)")
  })

  it("화면이 좁아지면 carousel로 바꾼다", () => {
    const media = stubMediaQuery(true)
    const { result } = renderHook(() => usePreviewLayout())

    act(() => media.change(false))

    expect(result.current).toBe("carousel")
  })
})
