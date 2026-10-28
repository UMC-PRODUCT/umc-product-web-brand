import { describe, expect, it } from "vitest"

import { getAnchorScrollDuration } from "./anchorScroll"

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
