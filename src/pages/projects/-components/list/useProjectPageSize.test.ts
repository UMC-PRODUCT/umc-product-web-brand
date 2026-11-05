import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import {
  PROJECT_DESKTOP_QUERY,
  PROJECT_TABLET_QUERY,
  useProjectPageSize,
} from "./useProjectPageSize"

const QUERY_MIN_WIDTH: Record<string, number> = {
  [PROJECT_DESKTOP_QUERY]: 1024,
  [PROJECT_TABLET_QUERY]: 768,
}

function stubViewportWidth(initialWidth: number) {
  let width = initialWidth
  const listeners = new Set<() => void>()
  vi.stubGlobal("matchMedia", (query: string) => ({
    media: query,
    get matches() {
      return width >= (QUERY_MIN_WIDTH[query] ?? Number.POSITIVE_INFINITY)
    },
    addEventListener: (_type: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) =>
      listeners.delete(listener),
  }))
  return {
    resize(next: number) {
      width = next
      for (const listener of listeners) listener()
    },
  }
}

describe("useProjectPageSize", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it.each([
    [1440, 9],
    [1024, 9],
    [1023, 6],
    [768, 6],
    [767, 4],
    [360, 4],
  ])("폭 %i에서는 한 페이지에 %i개를 보여준다", (width, size) => {
    stubViewportWidth(width)

    const { result } = renderHook(() => useProjectPageSize())

    expect(result.current).toBe(size)
  })

  it("창 크기가 바뀌면 개수도 바뀐다", () => {
    const viewport = stubViewportWidth(1440)
    const { result } = renderHook(() => useProjectPageSize())

    act(() => viewport.resize(390))

    expect(result.current).toBe(4)
  })
})
