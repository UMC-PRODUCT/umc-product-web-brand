import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useHeroIntro } from "./useHeroIntro"

function deferred() {
  let resolve: () => void = () => {}
  const promise = new Promise<void>((done) => {
    resolve = done
  })
  return { promise, resolve }
}

function glowRefWithImages(decodes: Promise<void>[]) {
  const glow = document.createElement("div")
  for (const decode of decodes) {
    const image = document.createElement("img")
    image.decode = () => decode
    glow.append(image)
  }
  return { current: glow }
}

describe("useHeroIntro", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: { ready: Promise.resolve() },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("그래픽 이미지가 준비되면 인트로와 그래픽을 함께 시작한다", async () => {
    const glowRef = glowRefWithImages([Promise.resolve(), Promise.resolve()])
    const { result } = renderHook(() => useHeroIntro(glowRef))

    await act(() => vi.advanceTimersByTimeAsync(0))

    expect(result.current).toEqual({ intro: "play", glow: "ready" })
  })

  it("이미지가 늦으면 0.6초 뒤 인트로를 먼저 시작하고 그래픽은 도착한 뒤 준비된다", async () => {
    const lateImage = deferred()
    const glowRef = glowRefWithImages([lateImage.promise, Promise.resolve()])
    const { result } = renderHook(() => useHeroIntro(glowRef))

    await act(() => vi.advanceTimersByTimeAsync(599))
    expect(result.current).toEqual({ intro: "pending", glow: "pending" })

    await act(() => vi.advanceTimersByTimeAsync(1))
    expect(result.current).toEqual({ intro: "play", glow: "pending" })

    await act(async () => lateImage.resolve())
    expect(result.current).toEqual({ intro: "play", glow: "ready" })
  })
})
