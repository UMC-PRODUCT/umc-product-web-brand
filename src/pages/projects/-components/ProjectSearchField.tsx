import { SearchIcon } from "@umc-product/icons"

import { cn } from "@/utils/cn"

interface ProjectSearchFieldProps {
  label: string
  placeholder: string
  value: string
  onValueChange: (value: string) => void
  className?: string
}

const ICON_SIZE = 24

export function ProjectSearchField({
  label,
  placeholder,
  value,
  onValueChange,
  className,
}: ProjectSearchFieldProps) {
  return (
    <label
      className={cn(
        "flex h-[44px] items-center gap-(--umc-spacing-gap-10) rounded-(--umc-radius-12) bg-teal-grey-75 px-(--umc-spacing-padding-16) shadow-inner-neutral-2",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <input
        className="min-w-0 flex-1 bg-transparent text-body-1-regular text-teal-grey-900 outline-none placeholder:text-teal-grey-400 [&::-webkit-search-cancel-button]:hidden"
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
      <SearchIcon
        aria-hidden
        className="shrink-0 text-icon-neutral-weak-400"
        size={ICON_SIZE}
      />
    </label>
  )
}
