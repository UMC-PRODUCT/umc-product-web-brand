import { ToggleGroup } from "radix-ui"

import { cn } from "@/utils/cn"

import {
  type FilterOption,
  type FilterProps,
  formatOptionLabel,
} from "./filterOptions"

function splitRows(options: readonly FilterOption[]) {
  const rows: FilterOption[][] = []
  for (const option of options) {
    const lastRow = rows.at(-1)
    if (!lastRow || option.breakBefore) rows.push([option])
    else lastRow.push(option)
  }
  return rows
}

export function FilterChips({
  label,
  options,
  value,
  onValueChange,
  className,
}: FilterProps) {
  return (
    <ToggleGroup.Root
      aria-label={label}
      className={cn("flex flex-col gap-2", className)}
      onValueChange={(next) => {
        if (next) onValueChange(next)
      }}
      role="radiogroup"
      type="single"
      value={value}
    >
      {splitRows(options).map((row) => (
        <div className="flex flex-wrap gap-2" key={row[0]?.value}>
          {row.map((option) => (
            <ToggleGroup.Item
              className="h-[34px] cursor-pointer whitespace-nowrap rounded-full border border-teal-grey-200 bg-white px-3 text-label-3-medium text-teal-grey-600 outline-teal-500 outline-offset-2 hover:bg-teal-grey-50 focus-visible:outline-2 data-[state=on]:border-teal-300 data-[state=on]:bg-teal-75 data-[state=on]:text-teal-600 motion-safe:transition-colors"
              key={option.value}
              value={option.value}
            >
              {formatOptionLabel(option)}
            </ToggleGroup.Item>
          ))}
        </div>
      ))}
    </ToggleGroup.Root>
  )
}
