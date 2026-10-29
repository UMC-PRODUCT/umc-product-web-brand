import { describe, expect, it } from "vitest"

import {
  countOfficeMembers,
  getOfficeSections,
  resolveOfficeSearch,
} from "./officeSearch"

describe("resolveOfficeSearch", () => {
  it("값이 없으면 11기 운영국", () => {
    expect(resolveOfficeSearch({})).toEqual({
      generation: 11,
      bureau: "operations",
    })
  })

  it("전체 기수와 문자로 온 기수를 받는다", () => {
    expect(resolveOfficeSearch({ generation: "all" }).generation).toBe("all")
    expect(resolveOfficeSearch({ generation: "10" }).generation).toBe(10)
  })

  it("데이터에 없는 기수와 잘못된 소속은 기본값으로 바꾼다", () => {
    expect(resolveOfficeSearch({ generation: 8, bureau: "sales" })).toEqual({
      generation: 11,
      bureau: "operations",
    })
  })
})

describe("getOfficeSections", () => {
  it("한 기수를 고르면 그 기수의 소속 묶음을 그대로 보여 준다", () => {
    const titles = getOfficeSections({
      generation: 10,
      bureau: "education",
    }).map(({ group }) => group.title)
    expect(titles[0]).toBe("총괄단")
    expect(titles).toContain("Node.js 파트장")
  })

  it("전체는 최신 기수부터 이어 붙이고 제목 앞에 기수를 붙인다", () => {
    const titles = getOfficeSections({
      generation: "all",
      bureau: "operations",
    }).map(({ group }) => group.title)
    expect(titles[0]).toBe("11기 총괄단")
    expect(titles.at(-1)).toBe("9기 행사기획")
    expect(
      titles.findIndex((title) => title.startsWith("10기")),
    ).toBeGreaterThan(titles.findLastIndex((title) => title.startsWith("11기")))
  })
})

describe("countOfficeMembers", () => {
  it("여러 기수에 걸친 같은 사람은 한 번만 센다", () => {
    expect(countOfficeMembers("operations")).toBe(22)
    expect(countOfficeMembers("education")).toBe(33)
  })
})
