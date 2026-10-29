import { describe, expect, it } from "vitest"

import { countMembers } from "./memberGroups"

describe("countMembers", () => {
  it("여러 묶음에 나오는 같은 사람은 한 번만 센다", () => {
    const groups = [
      { title: "총괄단", description: "", entries: [{ memberId: "리버" }] },
      {
        title: "Server",
        description: "",
        entries: [{ memberId: "리버" }, { memberId: "와나" }],
      },
    ]

    expect(countMembers(groups)).toBe(2)
  })
})
