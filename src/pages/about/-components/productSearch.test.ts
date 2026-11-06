import { describe, expect, it } from "vitest"

import { resolveProductSearch } from "./productSearch"

describe("resolveProductSearch", () => {
  it("값이 없으면 최신 기수의 전체 보기", () => {
    expect(resolveProductSearch({})).toEqual({ generation: 3, team: "all" })
  })

  it("문자로 온 기수도 숫자로 받는다", () => {
    expect(resolveProductSearch({ generation: "2", team: "web" })).toEqual({
      generation: 2,
      team: "web",
    })
  })

  it("데이터에 없는 기수는 최신 기수로 바꾼다", () => {
    expect(resolveProductSearch({ generation: 9 })).toEqual({
      generation: 3,
      team: "all",
    })
  })

  it("그 기수에 없는 팀은 전체 보기로 바꾼다", () => {
    expect(resolveProductSearch({ generation: 1, team: "web" })).toEqual({
      generation: 1,
      team: "all",
    })
  })

  it("문자열이 아닌 팀 값은 전체 보기로 바꾼다", () => {
    expect(resolveProductSearch({ team: ["web"] })).toEqual({
      generation: 3,
      team: "all",
    })
  })
})
