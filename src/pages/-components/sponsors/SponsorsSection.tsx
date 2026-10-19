import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

import { SPONSORS, SPONSORS_COPY } from "./constants"

export function SponsorsSection() {
  return (
    <Section headerTone="light" id="sponsors" labelledBy="sponsors-title">
      <h2 className="sr-only" id="sponsors-title">
        {SPONSORS_COPY.title}
      </h2>
      <Container>
        <p className="break-keep text-center text-[24px] text-neutral-weak-500 leading-[1.4] tracking-[-0.48px]">
          {SPONSORS_COPY.description}
        </p>
      </Container>
      <div className="mt-5 bg-white px-8 py-[60px]">
        <ul className="mx-auto flex max-w-[1376px] items-center justify-center gap-1.5">
          {SPONSORS.map((sponsor) => (
            <li
              className="flex min-w-0 shrink justify-center"
              key={sponsor.id}
              style={{ flexBasis: sponsor.slotWidth }}
            >
              <img
                alt={sponsor.name}
                className="h-auto max-w-full"
                decoding="async"
                height={sponsor.height}
                loading="lazy"
                src={sponsor.logo}
                width={sponsor.width}
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
