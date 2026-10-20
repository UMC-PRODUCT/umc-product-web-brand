import { type KeyboardEvent, useRef } from "react"

import { cn } from "@/utils/cn"

interface CarouselPaginationProps {
  count: number
  selectedIndex: number
  onSelect: (index: number) => void
  getLabel: (index: number) => string
  controlsId: string
  className?: string
}

const ARROW_STEP: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 }

export function CarouselPagination({
  count,
  selectedIndex,
  onSelect,
  getLabel,
  controlsId,
  className,
}: CarouselPaginationProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const step = ARROW_STEP[event.key]
    if (step === undefined) return
    event.preventDefault()
    const nextIndex = (index + step + count) % count
    onSelect(nextIndex)
    buttonRefs.current[nextIndex]?.focus()
  }

  const labels = Array.from({ length: count }, (_, index) => getLabel(index))

  return (
    <div className={cn("relative -my-1.5 flex items-center", className)}>
      {labels.map((label, index) => {
        const isSelected = index === selectedIndex
        return (
          <button
            aria-controls={controlsId}
            aria-current={isSelected ? "true" : undefined}
            aria-label={label}
            className="flex h-6 items-center rounded-full px-1.5 focus-visible:outline-2 focus-visible:outline-teal-600"
            key={label}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(button) => {
              buttonRefs.current[index] = button
            }}
            type="button"
          >
            <span
              className={cn(
                "h-3 w-3 rounded-full bg-teal-grey-200 transition-[width,background-color] duration-300 motion-reduce:transition-none",
                isSelected && "w-[46px] bg-teal-grey-300",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
