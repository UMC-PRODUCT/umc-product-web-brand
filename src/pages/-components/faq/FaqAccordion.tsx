import { ChevronDown } from "lucide-react"
import { Accordion } from "radix-ui"
import { type ComponentProps, type ReactNode } from "react"

import { cn } from "@/utils/cn"

import "./faq.css"

type FaqAccordionProps = ComponentProps<typeof Accordion.Root>

export function FaqAccordion({ className, ...props }: FaqAccordionProps) {
  return (
    <Accordion.Root
      className={cn(
        "flex flex-col gap-(--umc-spacing-gap-12) md:gap-(--umc-spacing-gap-20) xl:gap-(--umc-spacing-gap-16) 2xl:gap-(--umc-spacing-gap-20)",
        className,
      )}
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
        // Figma Web/Landing/Accordion. 닫힘 배경은 랜딩 인스턴스 값(#fcfcfc 20%, 원본 100%)이고 토큰에 없다
        "rounded-(--umc-radius-24) border border-neutral-weaker-100 bg-[#fcfcfc]/20 shadow-drop-neutral-3 data-[state=open]:bg-fill-primary-weak-75 motion-safe:transition-[background-color,border-color,box-shadow]",
        // Hover(State3): 안쪽 테두리 2px. 레이아웃이 밀리지 않도록 1px 테두리에 안쪽 그림자 1px를 더한다
        "data-[state=closed]:hover:border-primary-medium-300 data-[state=closed]:hover:shadow-[inset_0_0_0_1px_var(--umc-color-border-primary-medium-300),var(--umc-shadow-drop-neutral-3)]",
        "outline-teal-500 outline-offset-4 has-focus-visible:outline-2",
        className,
      )}
      value={value}
    >
      <Accordion.Header>
        <Accordion.Trigger
          className={cn(
            "group flex w-full items-center justify-between gap-(--umc-spacing-gap-10) text-left focus-visible:outline-none",
            // Figma 테두리는 안쪽에 그려지므로 여백에서 1px씩 뺀다
            "py-[15px] pr-[15px] pl-[23px] data-[state=open]:pb-(--umc-spacing-gap-24) md:py-[19px] md:pr-[29px] md:pl-[39px] md:data-[state=open]:pt-[23px] lg:py-[23px]",
          )}
        >
          <span
            className={cn(
              "text-[14px] md:text-[18px] lg:text-[20px] xl:text-[22px]",
              // 줄 높이는 글자 크기 뒤에 둔다. cn()이 뒤에 오는 글자 크기 클래스를 보고 앞의 leading을 지운다
              "flex items-center gap-(--umc-spacing-gap-10) font-semibold leading-[1.3] tracking-[-0.02em]",
            )}
          >
            {/* Figma Q는 줄 높이 35지만 34 높이 행 가운데에 놓인다. 행이 1px 커지지 않도록 34로 맞춘다 */}
            <span
              aria-hidden
              className="text-[18px] text-brand-default-600 leading-[34px] md:text-[27px] lg:text-[24px] xl:text-[27px]"
            >
              Q
            </span>
            <span className="-my-px text-neutral-strong-800">{question}</span>
          </span>
          <span className="flex shrink-0 px-(--umc-spacing-padding-16)">
            <ChevronDown
              aria-hidden
              className="size-[24px] text-[#47413c] group-data-[state=open]:rotate-180 motion-safe:transition-transform"
            />
          </span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="faq-accordion-content overflow-hidden">
        <p className="whitespace-pre-line pr-[29px] pb-[15px] pl-[23px] text-[13px] text-neutral-medium-600 leading-[1.6] tracking-[-0.01em] md:pr-[43px] md:pb-[23px] md:pl-[39px] md:text-[16px] xl:text-[18px]">
          {children}
        </p>
      </Accordion.Content>
    </Accordion.Item>
  )
}
