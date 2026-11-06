import { type MemberGroup } from "./memberTypes"

export function countMembers(groups: readonly MemberGroup[]) {
  const memberIds = groups.flatMap((group) =>
    group.entries.map((entry) => entry.memberId),
  )
  return new Set(memberIds).size
}
