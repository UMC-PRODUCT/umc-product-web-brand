import { ChevronLeftIcon, ChevronRightIcon } from "@umc-product/icons"

import { cn } from "@/utils/cn"

interface ProjectPaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  className?: string
}

const ICON_SIZE = 16
// Figma Pagination Item: 30x30, 모서리 10, Label/4-Semibold
const ITEM_CLASS =
  "flex size-[30px] cursor-pointer items-center justify-center rounded-(--umc-radius-10) text-label-4-semibold text-teal-grey-900 outline-teal-500 outline-offset-2 focus-visible:outline-2"

export function ProjectPagination({
  page,
  pageCount,
  onPageChange,
  className,
}: ProjectPaginationProps) {
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <nav
      aria-label="페이지"
      className={cn(
        "flex items-center justify-center gap-(--umc-spacing-gap-12)",
        className,
      )}
    >
      {/* Figma: 첫 페이지에서는 이전 화살표가, 마지막 페이지에서는 다음 화살표가 없다 */}
      {page > 1 && (
        <button
          aria-label="이전 페이지"
          className={ITEM_CLASS}
          onClick={() => onPageChange(page - 1)}
          type="button"
        >
          <ChevronLeftIcon size={ICON_SIZE} />
        </button>
      )}
      <ol className="flex items-center gap-(--umc-spacing-gap-6)">
        {pages.map((item) => (
          <li key={item}>
            <button
              aria-current={item === page ? "page" : undefined}
              aria-label={`${item} 페이지`}
              className={cn(
                ITEM_CLASS,
                "aria-[current=page]:bg-fill-neutral-medium-100 aria-[current=page]:shadow-inner-neutral-2",
              )}
              onClick={() => onPageChange(item)}
              type="button"
            >
              {item}
            </button>
          </li>
        ))}
      </ol>
      {page < pageCount && (
        <button
          aria-label="다음 페이지"
          className={ITEM_CLASS}
          onClick={() => onPageChange(page + 1)}
          type="button"
        >
          <ChevronRightIcon size={ICON_SIZE} />
        </button>
      )}
    </nav>
  )
}
