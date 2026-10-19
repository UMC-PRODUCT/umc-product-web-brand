import { describe, expect, it } from "vitest"

import { easeInOutCubic, getAnchorScrollDuration } from "./anchorScroll"

describe("getAnchorScrollDuration", () => {
  it("가까운 거리도 0.9초보다 빨리 끝내지 않는다", () => {
    expect(getAnchorScrollDuration(100)).toBe(900)
  })

  it("거리가 멀수록 길어지되 1.6초를 넘지 않는다", () => {
    expect(getAnchorScrollDuration(2000)).toBe(1060)
    expect(getAnchorScrollDuration(4000)).toBe(1420)
    expect(getAnchorScrollDuration(20000)).toBe(1600)
  })

  it("위로 가는 거리도 같은 시간을 쓴다", () => {
    expect(getAnchorScrollDuration(-4000)).toBe(1420)
  })
})

describe("easeInOutCubic", () => {
  it("천천히 출발해 가운데를 지나 천천히 멈춘다", () => {
    expect(easeInOutCubic(0)).toBe(0)
    expect(easeInOutCubic(0.1)).toBeLessThan(0.1)
    expect(easeInOutCubic(0.5)).toBe(0.5)
    expect(easeInOutCubic(0.9)).toBeGreaterThan(0.9)
    expect(easeInOutCubic(1)).toBe(1)
  })
})
