import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { type AboutMode } from "./useAboutMode"
import { useKeepNextSectionInView } from "./useKeepNextSectionInView"

function stubMediaQuery(initialMatches: boolean) {
  let matches = initialMatches
  const listeners = new Set<() => void>()
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      media: query,
      get matches() {
        return matches
      },
      addEventListener: (_type: string, listener: () => void) =>
        listeners.add(listener),
      removeEventListener: (_type: string, listener: () => void) =>
        listeners.delete(listener),
    })),
  )
  return {
    change(next: boolean) {
      matches = next
      for (const listener of listeners) listener()
    },
  }
}

describe("useKeepNextSectionInView", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ""
  })

  it("모드가 바뀌어 다음 섹션이 밀린 만큼 스크롤을 보정한다", () => {
    const media = stubMediaQuery(false)
    document.body.innerHTML =
      '<main><section id="about"></section><section id="stats"></section></main>'
    const nextSection = document.getElementById("stats") as HTMLElement
    nextSection.getBoundingClientRect = vi
      .fn()
      .mockReturnValueOnce({ top: 500 } as DOMRect)
      .mockReturnValue({ top: 3600 } as DOMRect)
    const scrollBy = vi.fn()
    vi.stubGlobal("scrollBy", scrollBy)

    const { rerender } = renderHook(
      ({ mode }: { mode: AboutMode }) =>
        useKeepNextSectionInView(mode, "about"),
      { initialProps: { mode: "static" } },
    )
    expect(scrollBy).not.toHaveBeenCalled()

    act(() => media.change(true))
    rerender({ mode: "zoom" })

    expect(scrollBy).toHaveBeenCalledWith(0, 3100)
  })

  it("미디어 쿼리 변화 없이 다시 렌더되면 스크롤을 건드리지 않는다", () => {
    stubMediaQuery(false)
    document.body.innerHTML =
      '<main><section id="about"></section><section id="stats"></section></main>'
    const scrollBy = vi.fn()
    vi.stubGlobal("scrollBy", scrollBy)

    const { rerender } = renderHook(
      ({ mode }: { mode: AboutMode }) =>
        useKeepNextSectionInView(mode, "about"),
      { initialProps: { mode: "static" } },
    )
    rerender({ mode: "static" })

    expect(scrollBy).not.toHaveBeenCalled()
  })
})
