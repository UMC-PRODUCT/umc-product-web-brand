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

  it("기수는 11기부터 1기까지 내림차순이다", () => {
    expect(OFFICE_GENERATIONS.map(({ id }) => id)).toEqual([
      11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ])
  })

  it("역대 운영진 명단과 다른 시안 값을 바로잡았다", () => {
    const entriesOf = (
      generation: number,
      bureau: (typeof BUREAUS)[number],
      title: string,
    ) =>
      OFFICE_GENERATIONS.find(({ id }) => id === generation)
        ?.bureaus[bureau].find((group) => group.title === title)
        ?.entries.map(({ memberId, tags }) =>
          [memberId, ...(tags ?? []).map(({ label }) => label)].join(":"),
        )

    expect(entriesOf(10, "operations", "Finance Manager")).toEqual(["푸짐바오"])
    expect(entriesOf(10, "education", "Web 파트장")).toEqual(["지이"])
    expect(entriesOf(9, "operations", "행사기획")).toEqual([
      "수:Lead",
      "도레미",
      "페임",
    ])
  })
})
