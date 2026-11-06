import { SearchIcon } from "@umc-product/icons"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/utils/cn"

interface ProjectSearchFieldProps {
  label: string
  placeholder: string
  value: string
  onValueChange: (value: string) => void
  className?: string
}

const ICON_SIZE = 24
export const SEARCH_DELAY_MS = 300

export function ProjectSearchField({
  label,
  placeholder,
  value,
  onValueChange,
  className,
}: ProjectSearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const [draft, setDraft] = useState(value)

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      clearTimeout(timerRef.current)
      setDraft(value)
    }
  }, [value])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const commit = (next: string) => {
    clearTimeout(timerRef.current)
    onValueChange(next)
  }

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
        onChange={(event) => {
          const next = event.target.value
          setDraft(next)
          clearTimeout(timerRef.current)
          timerRef.current = setTimeout(() => commit(next), SEARCH_DELAY_MS)
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.nativeEvent.isComposing) {
            commit(draft)
          }
        }}
        placeholder={placeholder}
        ref={inputRef}
        type="search"
        value={draft}
      />
      <SearchIcon
        aria-hidden
        className="shrink-0 text-icon-neutral-weak-400"
        size={ICON_SIZE}
      />
    </label>
  )
}
