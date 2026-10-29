import { CheckIcon, ExpandMoreIcon } from "@umc-product/icons"
import { Select } from "radix-ui"

import { cn } from "@/utils/cn"

import { type FilterProps, formatOptionLabel } from "./filterOptions"

const CHEVRON_SIZE = 14
const CHECK_SIZE = 16

export function FilterSelect({
  label,
  options,
  value,
  onValueChange,
  className,
}: FilterProps) {
  return (
    <Select.Root onValueChange={onValueChange} value={value}>
      <Select.Trigger
        aria-label={label}
        className={cn(
          "group flex h-10 w-[216px] cursor-pointer items-center justify-between rounded-xl border border-teal-grey-100 bg-teal-grey-75 pr-4 pl-5 text-label-3-medium text-teal-600 outline-teal-500 outline-offset-2 focus-visible:outline-2",
          className,
        )}
      >
        <Select.Value />
        <Select.Icon>
          <ExpandMoreIcon
            className="group-data-[state=open]:rotate-180 motion-safe:transition-transform"
            size={CHEVRON_SIZE}
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="z-60 max-h-[286px] w-(--radix-select-trigger-width) overflow-hidden rounded-xl bg-white p-1 shadow-drop-neutral-1"
          position="popper"
        >
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                className="flex min-h-11 cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-[16px] text-teal-grey-900 leading-[1.4] outline-none data-[state=checked]:bg-teal-50 data-highlighted:bg-teal-grey-75 data-[state=checked]:text-teal-600"
                key={option.value}
                value={option.value}
              >
                <Select.ItemText>{formatOptionLabel(option)}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon size={CHECK_SIZE} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
