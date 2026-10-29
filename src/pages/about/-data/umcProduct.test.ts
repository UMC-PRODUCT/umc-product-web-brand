import { describe, expect, it } from "vitest"

import { countMembers } from "../-components/memberGroups"
import { MEMBER_PHOTOS } from "../-components/memberPhotos"
import { PRODUCT_GENERATIONS } from "./umcProduct"

const MAX_TAGS = 2

describe("PRODUCT_GENERATIONS", () => {
  it.each(PRODUCT_GENERATIONS)(
    "$label 묶음의 모든 사람이 사람 표에 있다",
    (generation) => {
      const entries = generation.teams.flatMap((team) =>
        team.groups.flatMap((group) => group.entries),
      )
      for (const { memberId } of entries) {
        expect(generation.members[memberId], memberId).toBeDefined()
      }
    },
  )

  it.each(PRODUCT_GENERATIONS)(
    "$label 사진 이름이 모두 사진 표에 있다",
    (generation) => {
      for (const member of Object.values(generation.members)) {
        if (member.photo)
          expect(MEMBER_PHOTOS.has(member.photo), member.photo).toBe(true)
      }
    },
  )

  it.each(PRODUCT_GENERATIONS)(
    "$label 태그는 카드마다 2개 이하다",
    (generation) => {
      const entries = generation.teams.flatMap((team) =>
        team.groups.flatMap((group) => group.entries),
      )
      for (const entry of entries) {
        expect(entry.tags?.length ?? 0).toBeLessThanOrEqual(MAX_TAGS)
      }
    },
  )

  it.each(PRODUCT_GENERATIONS)(
    "$label 팀 id가 겹치지 않고 첫 보기는 전체다",
    (generation) => {
      const ids = generation.teams.map((team) => team.id)
      expect(new Set(ids).size).toBe(ids.length)
      expect(ids[0]).toBe("all")
    },
  )

  it("전체 보기 인원은 3기 46명, 2기 23명, 1기 21명이다", () => {
    expect(
      PRODUCT_GENERATIONS.map((generation) =>
        countMembers(generation.teams[0].groups),
      ),
    ).toEqual([46, 23, 21])
  })

  it("자리표시 이메일을 싣지 않는다", () => {
    const emails = PRODUCT_GENERATIONS.flatMap((generation) =>
      Object.values(generation.members).map((member) => member.email),
    )
    expect(emails).not.toContain("12345677098@naver.com")
    expect(emails).not.toContain("98765432100")
  })
})
