import { useId } from "react"

import { MemberCard } from "./MemberCard"
import { type Member, type MemberGroup } from "./memberTypes"

interface MemberGroupSectionProps {
  group: MemberGroup
  members: Readonly<Record<string, Member>>
}

export function MemberGroupSection({
  group,
  members,
}: MemberGroupSectionProps) {
  const titleId = useId()
  return (
    <section aria-labelledby={titleId}>
      <h2
        className="text-heading-4-semibold text-teal-grey-800 md:text-title-1-semibold"
        id={titleId}
      >
        {group.title}
      </h2>
      {group.description && (
        <p className="mt-2 whitespace-pre-line font-medium text-[13px] text-teal-grey-500 leading-[1.5] md:text-body-3-medium">
          {group.description}
        </p>
      )}
      <ul className="mt-8 grid gap-4 md:grid-cols-[repeat(auto-fill,426px)]">
        {group.entries.map(({ memberId, tags }) => {
          const member = members[memberId]
          return (
            member && (
              <li key={memberId}>
                <MemberCard member={member} tags={tags} />
              </li>
            )
          )
        })}
      </ul>
    </section>
  )
}
