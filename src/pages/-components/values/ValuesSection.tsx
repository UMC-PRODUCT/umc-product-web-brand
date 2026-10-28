import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { VALUES, VALUES_DESCRIPTION, VALUES_TITLE_LINES } from "./constants"
import { ValueCard } from "./ValueCard"

const BADGE_ICON_COLOR = "var(--umc-color-teal-200)"
const BADGE_ICON_SIZE = 36

export function ValuesSection() {
  const [firstTitleLine, secondTitleLine] = VALUES_TITLE_LINES

  return (
    <Section
      className="snap-start"
      headerTone="light"
      id="values"
      labelledBy="values-title"
    >
      <Container className="flex flex-col items-center gap-7 md:gap-12 lg:gap-[50px]">
        <SectionHeading
          description={VALUES_DESCRIPTION}
          title={
            <>
              {firstTitleLine} <br className="hidden md:inline" />
              {secondTitleLine}
            </>
          }
          titleId="values-title"
        />
        <ul className="flex w-full flex-col items-center gap-1.5 md:grid md:grid-cols-[repeat(2,270px)] md:justify-center md:gap-4 lg:flex lg:flex-row lg:justify-center">
          {VALUES.map((value) => (
            <ValueCard
              description={value.description}
              icon={
                <value.Icon color={BADGE_ICON_COLOR} size={BADGE_ICON_SIZE} />
              }
              image={value.image}
              key={value.id}
              subtitle={value.subtitle}
              title={value.title}
            />
          ))}
        </ul>
      </Container>
    </Section>
  )
}
