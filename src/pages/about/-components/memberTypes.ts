export type PartTag = "PM" | "Design" | "Web" | "iOS" | "Android" | "Spring"

export type MemberTag =
  | { kind: "role"; label: string }
  | { kind: "part"; label: PartTag }

export interface Member {
  nickname: string
  name: string
  email?: string
  school: string
  photo?: string
}

export interface GroupEntry {
  memberId: string
  tags?: readonly MemberTag[]
}

export interface MemberGroup {
  title: string
  description: string
  entries: readonly GroupEntry[]
}

export interface TeamView {
  id: string
  label: string
  breakBefore?: boolean
  groups: readonly MemberGroup[]
}

export interface ProductGeneration {
  id: number
  label: string
  members: Readonly<Record<string, Member>>
  teams: readonly [TeamView, ...TeamView[]]
}
