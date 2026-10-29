import { createFileRoute, type SearchSchemaInput } from "@tanstack/react-router"

import { FilterChips } from "./-components/FilterChips"
import { FilterSelect } from "./-components/FilterSelect"
import { MemberGroupSection } from "./-components/MemberGroupSection"
import { MemberPageShell } from "./-components/MemberPageShell"
import { countMembers } from "./-components/memberGroups"
import { PageHeader } from "./-components/PageHeader"
import {
  findProductGeneration,
  type ProductSearch,
  resolveProductSearch,
} from "./-components/productSearch"
import { SegmentedControl } from "./-components/SegmentedControl"
import { PRODUCT_COPY, PRODUCT_GENERATIONS } from "./-data/umcProduct"

export const Route = createFileRoute("/about/umc-product")({
  validateSearch: (
    search: { generation?: number | string; team?: string } & SearchSchemaInput,
  ) => resolveProductSearch(search),
  head: () => ({ meta: [{ title: "UMC PRODUCT | UMC" }] }),
  component: UmcProductPage,
})

const GENERATION_OPTIONS = PRODUCT_GENERATIONS.map(({ id, label }) => ({
  value: String(id),
  label,
}))

function UmcProductPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const generation = findProductGeneration(search.generation)
  const team =
    generation.teams.find(({ id }) => id === search.team) ?? generation.teams[0]
  const teamOptions = generation.teams.map(
    ({ id, label, groups, breakBefore }, index) => ({
      value: id,
      label,
      breakBefore,
      count: index === 0 ? countMembers(groups) : undefined,
    }),
  )
  const changeSearch = (next: ProductSearch) =>
    navigate({ search: next, replace: true, resetScroll: false })
  const changeTeam = (teamId: string) =>
    changeSearch({ generation: generation.id, team: teamId })

  return (
    <MemberPageShell heroDescription={PRODUCT_COPY.heroDescription}>
      <PageHeader
        description={PRODUCT_COPY.description}
        title={PRODUCT_COPY.title}
      />
      <div className="mt-8 flex flex-col gap-3 md:gap-6">
        <SegmentedControl
          label="기수"
          onValueChange={(generationId) =>
            changeSearch({ generation: Number(generationId), team: "all" })
          }
          options={GENERATION_OPTIONS}
          value={String(generation.id)}
        />
        {teamOptions.length > 1 && (
          <>
            <FilterChips
              className="hidden md:flex"
              label="팀"
              onValueChange={changeTeam}
              options={teamOptions}
              value={team.id}
            />
            <FilterSelect
              className="md:hidden"
              label="팀"
              onValueChange={changeTeam}
              options={teamOptions}
              value={team.id}
            />
          </>
        )}
      </div>
      <div className="mt-8 flex flex-col gap-[100px] md:mt-[100px]">
        {team.groups.map((group) => (
          <MemberGroupSection
            group={group}
            key={group.title}
            members={generation.members}
          />
        ))}
      </div>
    </MemberPageShell>
  )
}
