import { describe, expect, it } from "vitest"

import { findProject, PROJECT_LIST } from "./constants"
import { getProjectIntroImages } from "./projectIntroImageData"

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
})
