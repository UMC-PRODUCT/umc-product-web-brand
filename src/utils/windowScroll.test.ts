import { describe, expect, it } from "vitest"

import { easeInOutCubic } from "./windowScroll"

describe("easeInOutCubic", () => {
  it("천천히 출발해 가운데를 지나 천천히 멈춘다", () => {
    expect(easeInOutCubic(0)).toBe(0)
    expect(easeInOutCubic(0.1)).toBeLessThan(0.1)
    expect(easeInOutCubic(0.5)).toBe(0.5)
    expect(easeInOutCubic(0.9)).toBeGreaterThan(0.9)
    expect(easeInOutCubic(1)).toBe(1)
  })
})
