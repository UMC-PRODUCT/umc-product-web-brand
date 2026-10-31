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
          className={cn(
            "[&>p:first-child]:mb-0 [&>p:first-child]:text-[20px]",
            "md:[&>p:first-child]:mb-2 md:[&>p:first-child]:text-[22px]",
            "xl:[&>p:first-child]:mb-3",
          )}
          eyebrow={FAQ_COPY.eyebrow}
          title={FAQ_COPY.title}
          titleId="faq-title"
        />
        <Tabs.Root
          className="mt-8 flex flex-col gap-8 md:mt-7 md:gap-7 lg:mt-5 lg:gap-6 xl:gap-8 2xl:mt-8"
          defaultValue={FAQ_CATEGORIES[0]?.id}
        >
          <Tabs.List
            aria-label={FAQ_COPY.categoriesLabel}
            className="flex flex-wrap justify-center gap-x-3 gap-y-(--umc-spacing-gap-8) md:gap-x-[14px]"
          >
            {FAQ_CATEGORIES.map(({ id, label, lang }) => (
              <FaqChip
                className="h-[34px] md:h-[38px] xl:h-[42px] xl:px-(--umc-spacing-padding-16) xl:text-title-2-medium"
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
