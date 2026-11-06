import { describe, expect, it } from "vitest"

import { wrapOffset } from "./useMarquee"

describe("wrapOffset", () => {
  it("한 벌 너비 안의 위치는 그대로 둔다", () => {
    expect(wrapOffset(120, 500)).toBe(120)
  })

  it("한 벌 너비를 넘으면 처음으로 돌아온다", () => {
    expect(wrapOffset(530, 500)).toBe(30)
  })

  it("음수 위치는 반대쪽 끝에서 이어진다", () => {
    expect(wrapOffset(-30, 500)).toBe(470)
  })

  it("너비를 아직 모를 때는 0을 돌려준다", () => {
    expect(wrapOffset(100, 0)).toBe(0)
  })
})
