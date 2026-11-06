import { ChevronLeft, ChevronRight } from "lucide-react"
import { type ReactNode } from "react"

import { cn } from "@/utils/cn"

interface PreviewTabStepperProps {
  labels: readonly string[]
  index: number
  onIndexChange: (index: number) => void
  className?: string
}

// 1440 미만에서 세로 탭 목록 대신 쓰는 이전·다음 이동. 처음과 끝에서는 화살표를 비활성화한다
export function PreviewTabStepper({
  labels,
  index,
  onIndexChange,
  className,
}: PreviewTabStepperProps) {
  const isFirst = index <= 0
  const isLast = index >= labels.length - 1

  return (
    <div
      className={cn(
        // Figma Frame 2087332569: 화살표 24 · 칩 사이 간격 8
        "flex items-center gap-(--umc-spacing-gap-8)",
        className,
      )}
    >
      <StepButton
        disabled={isFirst}
        label="이전 활동"
        onClick={() => onIndexChange(index - 1)}
      >
        <ChevronLeft aria-hidden className="size-[24px]" strokeWidth={1.6} />
      </StepButton>
      <p
        aria-live="polite"
        className={cn(
          // Figma Chip(Weak, Brand, Selected): Mobile Sm 34, Pad 이상 Md 38. 16/140%/-3% Medium
          "flex h-[34px] min-w-0 flex-1 items-center justify-center rounded-(--umc-radius-full) px-(--umc-spacing-padding-12) md:h-[38px]",
          "bg-fill-primary-medium-100 text-brand-default-600 text-label-3-medium",
          "shadow-[inset_-1px_-1px_1px_rgb(255_255_255/0.25),inset_1px_1px_3px_rgb(11_107_100/0.13)]",
        )}
      >
        <span className="truncate">{labels[index]}</span>
      </p>
      <StepButton
        disabled={isLast}
        label="다음 활동"
        onClick={() => onIndexChange(index + 1)}
      >
        <ChevronRight aria-hidden className="size-[24px]" strokeWidth={1.6} />
      </StepButton>
    </div>
  )
}

interface StepButtonProps {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}

function StepButton({ label, disabled, onClick, children }: StepButtonProps) {
  return (
    <button
      aria-label={label}
      className="flex shrink-0 items-center justify-center text-icon-neutral-medium-500 outline-teal-500 outline-offset-2 focus-visible:outline-2 disabled:text-icon-disabled"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
