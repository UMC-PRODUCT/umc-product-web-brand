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
        // Figma Landing/Pannel/Button(732:15611): 높이 56, 반경 16, 20/140%/-2% Medium. 기본 글자 TealGray-600은 Figma 656b6b, 코드 토큰 teal-grey-600(606262)을 따른다
        "flex h-[56px] w-full cursor-pointer items-center rounded-(--umc-radius-button-16) px-(--umc-spacing-padding-16) py-0.5 text-left text-teal-grey-600 text-title-2-medium outline-teal-500 outline-offset-2 hover:text-brand-default-600 focus-visible:outline-2 motion-safe:transition-colors",
        // 선택 상태: 배경 Fill/Brand/Medium-100(ddf4f1), 안쪽 그림자 2개
        "data-[state=active]:bg-fill-primary-medium-100 data-[state=active]:text-teal-600 data-[state=active]:shadow-[inset_-1px_-1px_1px_rgb(255_255_255/0.25),inset_1px_1px_3px_rgb(11_107_100/0.13)]",
        className,
      )}
      value={value}
    >
      {label}
    </Tabs.Trigger>
  )
}
