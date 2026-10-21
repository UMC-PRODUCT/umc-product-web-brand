import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"

import { SCHOOL_ROWS, UNIVERSITIES_COPY } from "./constants"
import { UniversityMarquee } from "./UniversityMarquee"

export function UniversitiesSection() {
  const [firstLine, secondLine] = UNIVERSITIES_COPY.description

  return (
    <Section
      headerTone="light"
      id="universities"
      labelledBy="universities-title"
    >
      <Container>
        <SectionHeading
          description={
            <>
              {firstLine}
              <br />
              {secondLine}
            </>
          }
          title={UNIVERSITIES_COPY.title}
          titleId="universities-title"
        />
      </Container>
      <div className="mt-[72px] flex flex-col gap-(--umc-spacing-gap-16)">
        {SCHOOL_ROWS.map((schools, index) => (
          <UniversityMarquee
            key={schools[0]?.name}
            reverse={index % 2 === 1}
            schools={schools}
          />
        ))}
      </div>
    </Section>
  )
}
