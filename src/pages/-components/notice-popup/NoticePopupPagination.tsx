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
  "flex size-[23.631px] shrink-0 items-center justify-center rounded-lg text-[#9ca3a3] outline-teal-500 focus-visible:outline-2 disabled:cursor-default disabled:text-teal-grey-300 lg:size-[30px]"

export function NoticePopupPagination({
  slides,
  selectedIndex,
  onSelect,
  controlsId,
}: NoticePopupPaginationProps) {
  const lastIndex = slides.length - 1

  return (
    <div className="notice-popup-pagination relative mb-1 flex items-center gap-[7px] rounded-xl bg-[rgb(251_252_252/0.05)] px-2 py-1 backdrop-blur-[21px] md:mb-0 lg:gap-2.5 lg:px-3 lg:py-1.5">
      <button
        aria-controls={controlsId}
        aria-label="이전 안내"
        className={ARROW_CLASS}
        disabled={selectedIndex === 0}
        onClick={() => onSelect(selectedIndex - 1)}
        type="button"
      >
        <ChevronLeft aria-hidden className="size-full" />
      </button>
      <div className="flex items-center gap-[4.726px] lg:gap-1.5">
        {slides.map(({ id }, index) => {
          const isSelected = index === selectedIndex
          return (
            <button
              aria-controls={controlsId}
              aria-current={isSelected ? "true" : undefined}
              aria-label={`${index + 1}번째 안내`}
              className={cn(
                "h-[6.302px] rounded-full bg-teal-grey-300 outline-teal-500 outline-offset-2 focus-visible:outline-2 lg:h-2",
                isSelected
                  ? "w-[14.179px] rounded-[6px] bg-teal-grey-500 lg:w-[18px]"
                  : "w-[6.302px] lg:w-2",
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
        <ChevronRight aria-hidden className="size-full" />
      </button>
    </div>
  )
}
