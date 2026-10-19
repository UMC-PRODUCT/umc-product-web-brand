import { ChevronDown } from "lucide-react"
import { Accordion } from "radix-ui"
import { type ComponentProps, type ReactNode } from "react"

import { cn } from "@/utils/cn"

import "./faq.css"

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
        // 배경 레이어 d0e8e3 12%, b6c1c1 16%는 토큰에 없는 시안 값 (#22). Figma Glass 효과는 배경 블러로 옮긴다
        // 테두리는 faq.css의 ::before가 레이아웃 밖에 그리므로 여백은 시안 값 그대로 쓴다
        "faq-accordion-item relative rounded-(--umc-radius-12) bg-[linear-gradient(rgb(208_232_227/0.12),rgb(208_232_227/0.12)),linear-gradient(rgb(182_193_193/0.16),rgb(182_193_193/0.16))] py-(--umc-spacing-padding-32) pr-[30px] pl-[40px] backdrop-blur-[4px]",
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
