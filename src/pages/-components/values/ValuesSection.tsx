import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { VALUES, VALUES_TITLE } from "./constants"
import { ValueCard } from "./ValueCard"

const BADGE_ICON_COLOR = "var(--umc-color-teal-200)"

export function ValuesSection() {
  return (
    <Section headerTone="light" id="values" labelledBy="values-title">
      <Container className="flex flex-col items-center gap-[60px]">
        <SectionHeading title={VALUES_TITLE} titleId="values-title" />
        <ul className="flex w-full justify-center gap-6">
          {VALUES.map((value) => (
            <ValueCard
              description={value.description}
              icon={<value.Icon color={BADGE_ICON_COLOR} size={34} />}
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
