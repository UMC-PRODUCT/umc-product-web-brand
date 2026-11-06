import { describe, expect, it } from "vitest"

import { findProject, PROJECT_LIST } from "./constants"
import { PROJECT_DETAILS } from "./detail/projectDetails"
import { getProjectIntroImages } from "./detail/projectImageData"

describe("findProject", () => {
  it("id로 프로젝트를 찾고 없으면 undefined를 준다", () => {
    expect(findProject("muffin")?.name).toBe("Muffin")
    expect(findProject("unknown")).toBeUndefined()
  })

  it("모든 프로젝트의 id가 겹치지 않고 소개 이미지가 있다", () => {
    const ids = PROJECT_LIST.map(({ id }) => id)

    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) {
      expect(getProjectIntroImages(id).length).toBeGreaterThan(0)
    }
  })

  it("모든 프로젝트에 이용 흐름과 핵심 기능 글이 있다", () => {
    for (const { id } of PROJECT_LIST) {
      expect(PROJECT_DETAILS[id]?.flow?.length).toBeGreaterThan(0)
      expect(PROJECT_DETAILS[id]?.features?.items.length).toBeGreaterThan(0)
    }
  })

  it("노션에 기술 스택이 없는 부글만 기술 스택이 비어 있다", () => {
    const withoutStack = PROJECT_LIST.filter(
      ({ id }) => !PROJECT_DETAILS[id]?.stack,
    )

    expect(withoutStack.map(({ id }) => id)).toEqual(["boogle"])
  })
})
