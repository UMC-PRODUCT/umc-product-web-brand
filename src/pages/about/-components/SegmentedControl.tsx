import { ToggleGroup } from "radix-ui"

import { cn } from "@/utils/cn"

import { type FilterProps } from "./filterOptions"

export function SegmentedControl({
  label,
  options,
  value,
  onValueChange,
  className,
}: FilterProps) {
  return (
    <ToggleGroup.Root
      aria-label={label}
      className={cn(
        "flex h-[46px] gap-2 rounded-[14px] bg-teal-grey-75 p-1 shadow-[inset_-1px_2.5px_4px_rgb(228_228_228/0.2)]",
        className,
      )}
      onValueChange={(next) => {
        if (next) onValueChange(next)
      }}
      role="radiogroup"
      type="single"
      value={value}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          className="h-[38px] min-w-[100px] flex-1 cursor-pointer rounded-xl px-3 text-label-3-semibold text-teal-600 outline-teal-500 outline-offset-2 focus-visible:outline-2 data-[state=on]:bg-white data-[state=on]:text-teal-grey-800 data-[state=on]:shadow-[0_1px_2px_rgb(99_196_184/0.2),0_0_10px_rgb(156_163_163/0.3)] motion-safe:transition-[background-color,box-shadow,color]"
          key={option.value}
          value={option.value}
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}
