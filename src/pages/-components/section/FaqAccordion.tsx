import { ChevronDown } from "lucide-react"
import { Accordion } from "radix-ui"
import { type ComponentProps, type ReactNode } from "react"

import { cn } from "@/utils/cn"

type FaqAccordionProps = ComponentProps<typeof Accordion.Root>

export function FaqAccordion({ className, ...props }: FaqAccordionProps) {
  return (
    <Accordion.Root
      className={cn("flex flex-col gap-(--umc-spacing-gap-16)", className)}
      {...props}
    />
  )
}

interface FaqAccordionItemProps {
  value: string
  question: ReactNode
  children: ReactNode
  className?: string
}

export function FaqAccordionItem({
  value,
  question,
  children,
  className,
}: FaqAccordionItemProps) {
  return (
    <Accordion.Item
      className={cn(
        // 배경 레이어 d0e8e3 12%, b6c1c1 16%는 토큰에 없는 시안 값 (#22). Figma Glass 효과의 블러(반경 4)는 배경 블러로 옮긴다
        "relative rounded-(--umc-radius-12) bg-[linear-gradient(rgb(208_232_227/0.12),rgb(208_232_227/0.12)),linear-gradient(rgb(182_193_193/0.16),rgb(182_193_193/0.16))] py-(--umc-spacing-padding-32) pr-[30px] pl-[40px] backdrop-blur-[4px]",
        // 가장자리 명암: Figma Glass 효과(깊이 20, 빛 각도 -45°)를 렌더링 픽셀에 맞춘 안쪽 그림자로 흉내 낸다
        // 위·왼쪽 밝은 1px 선, 아래·오른쪽 옅은 1px 선, 위·왼쪽 안쪽 그늘(~16px), 아래·오른쪽 안쪽 반사(~12px)
        "shadow-[inset_1px_1px_0_rgb(255_255_255/0.4),inset_-1px_-1px_0_rgb(255_255_255/0.15),inset_3px_3px_14px_-4px_rgb(40_65_65/0.07),inset_-3px_-3px_12px_-4px_rgb(255_255_255/0.6)]",
        // 테두리: a0beb5 100%→0% 그라데이션, 투명도 50%, 안쪽 1px. 오른쪽 끝에서 시작해 왼쪽으로 사라진다
        // 각도와 지점은 Figma gradientTransform을 1200x98 기준 CSS 각도로 바꾼 값. a0beb5는 토큰에 없는 시안 값 (#22)
        // ::before에 mask로 테두리 두께만 남겨 그리므로 레이아웃에 영향이 없고, 여백은 시안 값 그대로 쓴다
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:content-[''] before:[background:linear-gradient(275.9deg,rgb(160_190_181/0.5)_2.2%,transparent_26.5%)_border-box] before:[mask:linear-gradient(#000_0_0)_padding-box_exclude,linear-gradient(#000_0_0)]",
        className,
      )}
      value={value}
    >
      <Accordion.Header>
        <Accordion.Trigger className="group flex min-h-[34px] w-full items-center justify-between gap-(--umc-spacing-gap-10) text-left outline-teal-500 outline-offset-4 focus-visible:outline-2">
          <span className="flex gap-(--umc-spacing-gap-10) font-semibold text-[26px] leading-[1.3]">
            <span aria-hidden className="text-brand-default-600">
              Q
            </span>
            <span className="text-neutral-strong-800">{question}</span>
          </span>
          <span className="flex shrink-0 px-(--umc-spacing-padding-16)">
            <ChevronDown
              aria-hidden
              className="size-[24px] text-icon-neutral-medium-500 group-data-[state=open]:rotate-180 motion-safe:transition-transform"
            />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="pt-[30px] pr-[14px] text-[20px] text-neutral-medium-600 leading-[1.6] tracking-[-0.2px]">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  )
}
