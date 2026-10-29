import { z } from "zod"

import { OFFICE_GENERATIONS } from "../-data/centralOffice"
import { type Bureau, type Member, type MemberGroup } from "./memberTypes"

export const ALL_GENERATIONS = "all"

export interface OfficeSearch {
  generation: number | typeof ALL_GENERATIONS
  bureau: Bureau
}

export interface OfficeSection {
  key: string
  group: MemberGroup
  members: Readonly<Record<string, Member>>
}

const searchSchema = z.object({
  generation: z
    .union([z.literal(ALL_GENERATIONS), z.coerce.number().int()])
    .optional()
    .catch(undefined),
  bureau: z.enum(["operations", "education"]).catch("operations"),
})

export function resolveOfficeSearch(
  search: Record<string, unknown>,
): OfficeSearch {
  const parsed = searchSchema.parse(search)
  const knownGeneration = OFFICE_GENERATIONS.find(
    ({ id }) => id === parsed.generation,
  )?.id
  const generation =
    parsed.generation === ALL_GENERATIONS
      ? ALL_GENERATIONS
      : (knownGeneration ?? OFFICE_GENERATIONS[0].id)
  return { generation, bureau: parsed.bureau }
}

export function getOfficeSections({
  generation,
  bureau,
}: OfficeSearch): OfficeSection[] {
  const showAll = generation === ALL_GENERATIONS
  return OFFICE_GENERATIONS.filter(
    ({ id }) => showAll || id === generation,
  ).flatMap(({ id, label, members, bureaus }) =>
    bureaus[bureau].map((group) => ({
      key: `${id}-${group.title}`,
      group: showAll ? { ...group, title: `${label} ${group.title}` } : group,
      members,
    })),
  )
}

export function countOfficeMembers(bureau: Bureau) {
  const people = OFFICE_GENERATIONS.flatMap(({ members, bureaus }) =>
    bureaus[bureau].flatMap((group) =>
      group.entries.map(({ memberId }) => {
        const member = members[memberId]
        return member ? `${member.nickname}/${member.name}` : memberId
      }),
    ),
  )
  return new Set(people).size
}
