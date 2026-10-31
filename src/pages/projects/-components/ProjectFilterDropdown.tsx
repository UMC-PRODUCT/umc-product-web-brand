import { CheckIcon, ExpandMoreIcon } from "@umc-product/icons"
import { cva } from "class-variance-authority"
import { DropdownMenu } from "radix-ui"
import { type ReactNode } from "react"

import { cn } from "@/utils/cn"

export interface ProjectFilterOption {
  value: string
  label: string
}

interface ProjectFilterDropdownProps {
  label: string
  options: readonly ProjectFilterOption[]
  value: readonly string[]
  onValueChange: (value: readonly string[]) => void
  placeholder?: string
  multiple?: boolean
  className?: string
}

const ALL_LABEL = "전체"
const ICON_SIZE = 16

const triggerVariants = cva(
  cn(
    "flex h-[44px] cursor-pointer items-center gap-(--umc-spacing-gap-8) whitespace-nowrap rounded-(--umc-radius-text-field-box) border text-label-3-medium shadow-inner-neutral-2 outline-teal-500 outline-offset-2 focus-visible:outline-2",
    // Figma 안쪽 테두리 1px: 왼쪽 16, 오른쪽 14(아이콘 영역 10 + 4)에서 두께를 뺀다
    "pr-[13px] pl-[15px]",
  ),
  {
    variants: {
      filtered: {
        false:
          "border-neutral-medium-300 bg-white text-neutral-default-900 [&_svg]:text-icon-neutral-medium-500",
        true: "border-teal-300 bg-teal-50 text-brand-default-600 [&_svg]:text-icon-brand-medium-500",
      },
    },
  },
)

// Figma Menu Item Md: 높이 44, 위아래 8, 좌우 16, Label/2-Regular
const ITEM_CLASS =
  "flex min-h-[44px] cursor-pointer items-center justify-between gap-(--umc-spacing-gap-10) rounded-(--umc-radius-8) px-(--umc-spacing-padding-16) py-(--umc-spacing-padding-8) text-[16px] text-neutral-default-900 leading-[1.4] tracking-[-0.32px] outline-none data-highlighted:not-data-[state=checked]:bg-teal-grey-50 data-highlighted:not-data-[state=checked]:shadow-inner-neutral-2"

// Figma State=Selected: 오른쪽 여백 10, Label/3-Medium, 안쪽 그림자는 투명도 20%
const SELECTED_ITEM_CLASS =
  "data-[state=checked]:bg-teal-50 data-[state=checked]:pr-(--umc-spacing-padding-10) data-[state=checked]:text-brand-default-600 data-[state=checked]:text-label-3-medium data-[state=checked]:shadow-[inset_1px_1px_2px_0_#d3d8d833]"

const getTriggerText = (
  selected: readonly ProjectFilterOption[],
  fallback: string,
) => {
  const [first] = selected
  if (!first) return fallback
  return selected.length === 1
    ? first.label
    : `${first.label} 외 ${selected.length - 1}`
}

function SelectableItemContent({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <DropdownMenu.ItemIndicator className="text-teal-500">
        <CheckIcon size={ICON_SIZE} />
      </DropdownMenu.ItemIndicator>
    </>
  )
}

export function ProjectFilterDropdown({
  label,
  options,
  value,
  onValueChange,
  placeholder = label,
  multiple = false,
  className,
}: ProjectFilterDropdownProps) {
  // 표시 순서를 고른 순서가 아니라 옵션 순서에 맞춘다
  const selected = options.filter((option) => value.includes(option.value))
  const filtered = selected.length > 0
  const triggerText = getTriggerText(selected, placeholder)

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={`${label} 필터: ${filtered ? triggerText : ALL_LABEL}`}
        className={cn(triggerVariants({ filtered }), className)}
      >
        {triggerText}
        <ExpandMoreIcon size={ICON_SIZE} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className={cn(
            "z-60 w-[140px] rounded-(--umc-radius-12) bg-white p-(--umc-spacing-padding-4) shadow-drop-neutral-1",
            // Figma 기수 메뉴: 항목 6.5개 높이에서 잘리고 나머지는 스크롤. 스크롤바는 시안에 없다
            "max-h-[294px] overflow-y-auto [scrollbar-width:none]",
          )}
        >
          <DropdownMenu.Item
            className={ITEM_CLASS}
            onSelect={() => onValueChange([])}
          >
            {ALL_LABEL}
          </DropdownMenu.Item>
          {multiple ? (
            options.map((option) => (
              <DropdownMenu.CheckboxItem
                checked={value.includes(option.value)}
                className={cn(ITEM_CLASS, SELECTED_ITEM_CLASS)}
                key={option.value}
                onCheckedChange={(checked) =>
                  onValueChange(
                    checked
                      ? [...value, option.value]
                      : value.filter((item) => item !== option.value),
                  )
                }
                // 여러 개를 이어서 고를 수 있게 메뉴를 열어 둔다
                onSelect={(event) => event.preventDefault()}
              >
                <SelectableItemContent>{option.label}</SelectableItemContent>
              </DropdownMenu.CheckboxItem>
            ))
          ) : (
            <DropdownMenu.RadioGroup
              onValueChange={(next) => onValueChange([next])}
              value={value[0] ?? ""}
            >
              {options.map((option) => (
                <DropdownMenu.RadioItem
                  className={cn(ITEM_CLASS, SELECTED_ITEM_CLASS)}
                  key={option.value}
                  value={option.value}
                >
                  <SelectableItemContent>{option.label}</SelectableItemContent>
                </DropdownMenu.RadioItem>
              ))}
            </DropdownMenu.RadioGroup>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
