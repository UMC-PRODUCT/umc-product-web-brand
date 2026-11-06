import { createFileRoute, type SearchSchemaInput } from "@tanstack/react-router"

import { FilterChips } from "./-components/FilterChips"
import { FilterSelect } from "./-components/FilterSelect"
import { MemberGroupSection } from "./-components/MemberGroupSection"
import { MemberPageShell } from "./-components/MemberPageShell"
import {
  ALL_GENERATIONS,
  countOfficeMembers,
  getOfficeSections,
  type OfficeSearch,
  resolveOfficeSearch,
} from "./-components/officeSearch"
import { PageHeader } from "./-components/PageHeader"
import { SegmentedControl } from "./-components/SegmentedControl"
import { OFFICE_COPY, OFFICE_GENERATIONS } from "./-data/centralOffice"

export const Route = createFileRoute("/about/central-office")({
  validateSearch: (
    search: {
      generation?: number | string
      bureau?: string
    } & SearchSchemaInput,
  ) => ({ generation: search.generation, bureau: search.bureau }),
  head: () => ({ meta: [{ title: "중앙사무국 | UMC" }] }),
  component: CentralOfficePage,
})

const BUREAU_OPTIONS = [
  { value: "operations", label: "운영국" },
  { value: "education", label: "교육국" },
] as const

function CentralOfficePage() {
  const search = resolveOfficeSearch(Route.useSearch())
  const navigate = Route.useNavigate()
  const generationOptions = [
    {
      value: ALL_GENERATIONS,
      label: "전체",
      count: countOfficeMembers(search.bureau),
    },
    ...OFFICE_GENERATIONS.map(({ id, label }) => ({
      value: String(id),
      label,
    })),
  ]
  const sections = getOfficeSections(search)
  const selectedGeneration = OFFICE_GENERATIONS.find(
    ({ id }) => id === search.generation,
  )
  const selectedBureau = BUREAU_OPTIONS.find(
    ({ value }) => value === search.bureau,
  )
  const changeSearch = (next: OfficeSearch) =>
    navigate({ search: next, replace: true, resetScroll: false })
  const changeGeneration = (value: string) =>
    changeSearch({
      ...search,
      generation: value === ALL_GENERATIONS ? ALL_GENERATIONS : Number(value),
    })
  const changeBureau = (value: string) => {
    const bureau = BUREAU_OPTIONS.find((option) => option.value === value)
    if (bureau) changeSearch({ ...search, bureau: bureau.value })
  }

  return (
    <MemberPageShell heroDescription={OFFICE_COPY.heroDescription}>
      <PageHeader
        description={OFFICE_COPY.description}
        title={OFFICE_COPY.title}
      />
      <div className="mt-8 flex flex-col gap-3 md:gap-6">
        <FilterChips
          className="hidden md:flex"
          label="기수"
          onValueChange={changeGeneration}
          options={generationOptions}
          value={String(search.generation)}
        />
        <FilterSelect
          className="md:hidden"
          label="기수"
          onValueChange={changeGeneration}
          options={generationOptions}
          value={String(search.generation)}
        />
        <SegmentedControl
          className="md:max-w-[868px]"
          label="소속"
          onValueChange={changeBureau}
          options={BUREAU_OPTIONS}
          value={search.bureau}
        />
      </div>
      {sections.length > 0 ? (
        <div className="mt-8 flex flex-col gap-[100px] md:mt-[100px]">
          {sections.map(({ key, group, members }) => (
            <MemberGroupSection group={group} key={key} members={members} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-body-3-medium text-teal-grey-500 md:mt-[100px] md:text-title-3-medium">
          {`${selectedGeneration?.label} ${selectedBureau?.label} 명단이 없어요.`}
        </p>
      )}
    </MemberPageShell>
  )
}
