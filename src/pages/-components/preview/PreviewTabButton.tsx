import { Tabs } from "radix-ui"

import { cn } from "@/utils/cn"

interface PreviewTabButtonProps {
  value: string
  label: string
  className?: string
}

export function PreviewTabButton({
  value,
  label,
  className,
}: PreviewTabButtonProps) {
  return (
    <Tabs.Trigger
      className={cn(
        "flex h-[48px] w-full cursor-pointer items-center rounded-(--umc-radius-button-14) px-(--umc-spacing-padding-16) py-0.5 text-left text-label-2-medium text-teal-grey-600 outline-teal-500 outline-offset-2 focus-visible:outline-2 motion-safe:transition-colors",
        // Figma Button(Weak, Primary) 선택 상태: teal-100 위에 teal-200, 안쪽 그림자 2개
        "data-[state=active]:bg-teal-200 data-[state=active]:text-teal-600 data-[state=active]:shadow-[inset_-1px_-1px_1px_rgb(255_255_255/0.25),inset_1px_1px_3px_rgb(11_107_100/0.13)]",
        className,
      )}
      value={value}
    >
      {label}
    </Tabs.Trigger>
  )
}
