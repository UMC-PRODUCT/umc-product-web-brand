import { describe, expect, it } from "vitest"

import {
  filterProjects,
  getProjectPage,
  parseProjectDetailSearch,
  parseProjectSearch,
} from "./projectSearch"

const project = (name: string, award = "대상", generation = 10) => ({
  name,
  award,
  generation,
})

const PROJECTS = [
  project("Muffin"),
  project("POP-IT", "최우수상"),
  project("Boogle", "우수상", 9),
]

describe("parseProjectSearch", () => {
  it("잘못된 값은 버리고 올바른 값만 남긴다", () => {
    expect(
      parseProjectSearch({
        q: "머핀",
        generation: "abc",
        award: ["unknown"],
        page: 0,
      }),
    ).toEqual({ q: "머핀" })
  })
})

describe("parseProjectDetailSearch", () => {
  it("상세정보 탭만 남기고 잘못된 값은 버린다", () => {
    expect(parseProjectDetailSearch({ tab: "detail" })).toEqual({
      tab: "detail",
    })
    expect(parseProjectDetailSearch({ tab: "nope" })).toEqual({})
  })
})

describe("filterProjects", () => {
  it("이름은 대소문자와 앞뒤 공백을 무시하고 찾는다", () => {
    expect(filterProjects(PROJECTS, { q: " muf " })).toEqual([PROJECTS[0]])
  })

  it("기수와 수상내역은 모두 만족하는 프로젝트만 남긴다", () => {
    expect(
      filterProjects(PROJECTS, {
        generation: 10,
        award: ["excellence", "merit"],
      }),
    ).toEqual([PROJECTS[1]])
  })
})

describe("getProjectPage", () => {
  const many = Array.from({ length: 10 }, (_, index) => project(`P${index}`))

  it("한 페이지에 9개씩 나눈다", () => {
    const { projects, pageCount } = getProjectPage(many, { page: 2 })

    expect(pageCount).toBe(2)
    expect(projects).toEqual([many[9]])
  })

  it("없는 페이지는 마지막 페이지로 맞춘다", () => {
    expect(getProjectPage(many, { page: 5 }).page).toBe(2)
  })

  it("결과가 없어도 페이지 수는 1이다", () => {
    expect(getProjectPage([], {}).pageCount).toBe(1)
  })
})
