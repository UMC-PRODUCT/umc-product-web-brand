import { Tabs } from "radix-ui"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { cn } from "@/utils/cn"

import { FAQ_CATEGORIES, FAQ_COPY } from "./constants"
import { FaqAccordion, FaqAccordionItem } from "./FaqAccordion"
import { FaqChip } from "./FaqChip"

export function FaqSection() {
  return (
    <Section headerTone="light" id="faq" labelledBy="faq-title">
      {/* Figma 섹션 좌우 여백: Mobile 32, Pad 이상 80 (공용 Container의 Pad 60을 덮는다) */}
      <Container className="md:px-20">
        <SectionHeading
          eyebrow={FAQ_COPY.eyebrow}
          title={FAQ_COPY.title}
          titleId="faq-title"
        />
        <Tabs.Root
          // Figma 제목·칩·목록 사이 간격: Mobile 32, Pad 28, Small PC 이상 32
          className="mt-8 flex flex-col gap-8 md:mt-7 md:gap-7 lg:mt-8 lg:gap-8"
          defaultValue={FAQ_CATEGORIES[0]?.id}
        >
          <Tabs.List
            aria-label={FAQ_COPY.categoriesLabel}
            // Figma 칩 간격 14. 시안보다 칩이 하나 많아 좁은 화면에서는 줄을 바꾼다
            className="flex flex-wrap justify-center gap-x-[14px] gap-y-(--umc-spacing-gap-8)"
          >
            {FAQ_CATEGORIES.map(({ id, label, lang }) => (
              <FaqChip
                // Figma 칩 크기: PC 이상 Lg, 그 아래 Md. Size 변형은 반응형을 받지 않아 Lg 값을 덮는다
                className="xl:h-[42px] xl:px-(--umc-spacing-padding-16) xl:text-title-2-medium"
                key={id}
                lang={lang}
                size="md"
                value={id}
              >
                {label}
              </FaqChip>
            ))}
          </Tabs.List>
          {FAQ_CATEGORIES.map(({ id, items }) => (
            <Tabs.Content
              className={cn(
                "mx-auto w-full outline-teal-500 outline-offset-4 focus-visible:outline-2",
                // Figma 목록 좌우 여백: Mobile 10, Pad 이상 56. 최대 폭 1312, 1920 이상 1440
                "max-w-[1312px] px-2.5 md:px-14 2xl:max-w-[1440px]",
              )}
              key={id}
              value={id}
            >
              <FaqAccordion collapsible type="single">
                {items.map(({ question, answer }) => (
                  <FaqAccordionItem
                    key={question}
                    question={question}
                    value={question}
                  >
                    {answer}
                  </FaqAccordionItem>
                ))}
              </FaqAccordion>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Container>
    </Section>
  )
}
