import { describe, expect, it } from "vitest"

import { MEMBER_PHOTOS } from "../-components/memberPhotos"
import { OFFICE_GENERATIONS } from "./centralOffice"

const MAX_TAGS = 2
const BUREAUS = ["operations", "education"] as const

describe("OFFICE_GENERATIONS", () => {
  it.each(OFFICE_GENERATIONS)(
    "$label 묶음의 모든 사람이 사람 표에 있다",
    (generation) => {
      for (const bureau of BUREAUS) {
        for (const group of generation.bureaus[bureau]) {
          for (const { memberId, tags } of group.entries) {
            expect(generation.members[memberId], memberId).toBeDefined()
            expect(tags?.length ?? 0).toBeLessThanOrEqual(MAX_TAGS)
          }
        }
      }
    },
  )

  it.each(OFFICE_GENERATIONS)(
    "$label 사진 이름이 모두 사진 표에 있다",
    (generation) => {
      for (const member of Object.values(generation.members)) {
        if (member.photo)
          expect(MEMBER_PHOTOS.has(member.photo), member.photo).toBe(true)
      }
    },
  )

  it("기수는 11, 10, 9 순서다", () => {
    expect(OFFICE_GENERATIONS.map(({ id }) => id)).toEqual([11, 10, 9])
  })
})
