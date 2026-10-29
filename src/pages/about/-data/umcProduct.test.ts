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

  it("전체 보기 인원은 3기 46명, 2기 23명, 1기 18명이다", () => {
    expect(
      PRODUCT_GENERATIONS.map((generation) =>
        countMembers(generation.teams[0].groups),
      ),
    ).toEqual([46, 23, 18])
  })

  it("자리표시 이메일을 싣지 않는다", () => {
    const emails = PRODUCT_GENERATIONS.flatMap((generation) =>
      Object.values(generation.members).map((member) => member.email),
    )
    expect(emails).not.toContain("12345677098@naver.com")
    expect(emails).not.toContain("98765432100")
  })

  describe("UMC PRODUCT 조직도와 같다", () => {
    const entriesOf = (generationId: number, teamId: string, title: string) =>
      PRODUCT_GENERATIONS.find(({ id }) => id === generationId)
        ?.teams.find(({ id }) => id === teamId)
        ?.groups.find((group) => group.title.trim() === title)
        ?.entries.map(({ memberId, tags }) =>
          [memberId, ...(tags ?? []).map(({ label }) => label)].join(":"),
        )
    const memberOf = (generationId: number, memberId: string) =>
      PRODUCT_GENERATIONS.find(({ id }) => id === generationId)?.members[
        memberId
      ]

    it("1기 프론트엔드는 코튼 한 명이고 리드다", () => {
      expect(entriesOf(1, "all", "Software Engineer - Frontend")).toEqual([
        "코튼:Lead",
      ])
      expect(memberOf(1, "헤일리")).toBeUndefined()
    })

    it("1기 디자이너 리드는 웹·모바일로 나뉘고, 갈래는 웹팀 백엔드다", () => {
      expect(entriesOf(1, "all", "Product Designer")).toEqual([
        "나옹:Web Lead",
        "삼이:Mobile Lead",
      ])
      expect(entriesOf(1, "all", "Software Engineer - Backend")?.[0]).toBe(
        "갈래:Web",
      )
    })

    it("2기 프론트엔드·iOS·Android 리드에 Lead 태그를 단다", () => {
      expect(entriesOf(2, "all", "Software Engineer - Frontend")?.[0]).toBe(
        "이삭:Lead",
      )
      expect(entriesOf(2, "all", "Software Engineer - iOS")?.[0]).toBe(
        "제옹:Lead",
      )
      expect(entriesOf(2, "all", "Software Engineer - Android")?.[0]).toBe(
        "조나단:Lead",
      )
      expect(entriesOf(2, "web", "Software Engineer - Frontend")?.[0]).toBe(
        "이삭:Lead",
      )
      expect(entriesOf(2, "mobile", "Software Engineer - iOS")?.[0]).toBe(
        "제옹:Lead",
      )
      expect(entriesOf(2, "mobile", "Software Engineer - Android")?.[0]).toBe(
        "조나단:Lead",
      )
    })

    it("2기에는 제명된 하늘을 싣지 않는다", () => {
      expect(memberOf(2, "하늘")).toBeUndefined()
      expect(entriesOf(2, "all", "Software Engineer - Backend")).not.toContain(
        "하늘:Tech Lead",
      )
    })

    it("빠진 이메일은 다른 기수 값으로 채우고, 다르면 가장 최근 기수를 따른다", () => {
      expect(memberOf(1, "제옹")?.email).toBe("euijjang97@gmail.com")
      expect(memberOf(1, "어헛차")?.email).toBe("pys01022342867@gmail.com")
      expect(memberOf(1, "도리")?.email).toBe("kimdoyeon123@swu.ac.kr")
      expect(memberOf(1, "리버")?.email).toBe("jwon010523@gmail.com")
      expect(memberOf(1, "소피")?.email).toBe("yejilya@gmail.com")
      expect(memberOf(1, "조나단")?.email).toBe("rudtjr1206@gmail.com")
    })

    it("같은 사람의 이메일은 모든 기수에서 가장 최근 기수 값과 같다", () => {
      const latestEmail = new Map<string, string>()
      for (const { members } of PRODUCT_GENERATIONS) {
        for (const member of Object.values(members)) {
          const person = `${member.nickname}/${member.name}`
          if (member.email && !latestEmail.has(person))
            latestEmail.set(person, member.email)
        }
      }
      const outdated = PRODUCT_GENERATIONS.flatMap(({ id, members }) =>
        Object.values(members)
          .filter(
            (member) =>
              member.email &&
              member.email !==
                latestEmail.get(`${member.nickname}/${member.name}`),
          )
          .map((member) => `${id}기 ${member.nickname}`),
      )
      expect(outdated).toEqual([])
    })

    it("이메일이 비어 있는 사람은 다른 기수에도 이메일이 없다", () => {
      const filledElsewhere = PRODUCT_GENERATIONS.flatMap((generation) =>
        Object.values(generation.members)
          .filter((member) => !member.email)
          .filter((member) =>
            PRODUCT_GENERATIONS.some(({ id, members }) =>
              Object.values(members).some(
                (other) =>
                  id !== generation.id &&
                  other.nickname === member.nickname &&
                  other.name === member.name &&
                  other.email,
              ),
            ),
          )
          .map((member) => `${generation.id}기 ${member.nickname}`),
      )
      expect(filledElsewhere).toEqual([])
    })

    it("이름과 사진을 조직도에 맞춘다", () => {
      expect(memberOf(3, "원")?.name).toBe("김동민")
      expect(memberOf(2, "원")?.name).toBe("김동민")
      expect(memberOf(3, "토미")?.name).toBe("김민범")
      expect(memberOf(1, "하늘")?.photo).toBe("1853577af75f")
    })
  })
})
