import ChevronLeft from "@/assets/landing/notice-popup/chevron-left.svg?react"
import ChevronRight from "@/assets/landing/notice-popup/chevron-right.svg?react"
import { cn } from "@/utils/cn"

interface NoticePopupPaginationProps {
  slides: readonly { id: string }[]
  selectedIndex: number
  onSelect: (index: number) => void
  controlsId: string
}

const ARROW_CLASS =
  "flex size-[30px] shrink-0 items-center justify-center rounded-lg text-[#9ca3a3] outline-teal-500 focus-visible:outline-2 disabled:cursor-default disabled:text-teal-grey-300"

export function NoticePopupPagination({
  slides,
  selectedIndex,
  onSelect,
  controlsId,
}: NoticePopupPaginationProps) {
  const lastIndex = slides.length - 1

  return (
    <div className="notice-popup-pagination relative flex items-center gap-2.5 rounded-xl bg-[rgb(251_252_252/0.05)] px-3 py-1.5 backdrop-blur-[21px]">
      <button
        aria-controls={controlsId}
        aria-label="이전 안내"
        className={ARROW_CLASS}
        disabled={selectedIndex === 0}
        onClick={() => onSelect(selectedIndex - 1)}
        type="button"
      >
        <ChevronLeft aria-hidden />
      </button>
      <div className="flex items-center gap-1.5">
        {slides.map(({ id }, index) => {
          const isSelected = index === selectedIndex
          return (
            <button
              aria-controls={controlsId}
              aria-current={isSelected ? "true" : undefined}
              aria-label={`${index + 1}번째 안내`}
              className={cn(
                "h-2 rounded-full bg-teal-grey-300 outline-teal-500 outline-offset-2 focus-visible:outline-2",
                isSelected ? "w-[18px] rounded-[6px] bg-teal-grey-500" : "w-2",
              )}
              key={id}
              onClick={() => onSelect(index)}
              type="button"
            />
          )
        })}
      </div>
      <button
        aria-controls={controlsId}
        aria-label="다음 안내"
        className={ARROW_CLASS}
        disabled={selectedIndex === lastIndex}
        onClick={() => onSelect(selectedIndex + 1)}
        type="button"
      >
        <ChevronRight aria-hidden />
      </button>
    </div>
  )
}
