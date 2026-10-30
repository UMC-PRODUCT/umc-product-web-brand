import { Fragment } from "react"

import { Section } from "@/components/layout/Section"

import { SPONSORS, SPONSORS_COPY } from "./constants"

const LINE_BREAK_CLASS = {
  mobile: "h-[calc(12px*var(--sponsor-scale))] basis-full md:hidden",
  tablet:
    "hidden h-[calc(12px*var(--sponsor-scale))] basis-full md:block xl:hidden",
} as const

export function SponsorsSection() {
  const [firstLine, secondLine] = SPONSORS_COPY.descriptionLines

  return (
    <Section headerTone="light" id="sponsors" labelledBy="sponsors-title">
      <h2 className="sr-only" id="sponsors-title">
        {SPONSORS_COPY.title}
      </h2>
      <div className="bg-white px-8 pt-6 pb-[22px] md:pt-7 md:pb-7 lg:pt-10">
        <ul className="mx-auto flex max-w-[1376px] flex-wrap items-center justify-center gap-x-[calc(6px*var(--sponsor-scale))] [--sponsor-scale:0.49] xl:flex-nowrap md:[--sponsor-scale:0.67] lg:[--sponsor-scale:0.92] xl:[--sponsor-scale:0.83]">
          {SPONSORS.map((sponsor) => (
            <Fragment key={sponsor.id}>
              <li
                className="flex min-w-0 shrink justify-center"
                style={{
                  flexBasis: `calc(${sponsor.slotWidth}px * var(--sponsor-scale))`,
                }}
              >
                <img
                  alt={sponsor.name}
                  className="h-auto max-w-full"
                  decoding="async"
                  height={sponsor.height}
                  loading="lazy"
                  src={sponsor.logo}
                  style={{
                    width: `calc(${sponsor.width}px * var(--sponsor-scale))`,
                  }}
                  width={sponsor.width}
                />
              </li>
              {sponsor.lineBreakAfter && (
                <li
                  aria-hidden
                  className={LINE_BREAK_CLASS[sponsor.lineBreakAfter]}
                />
              )}
            </Fragment>
          ))}
        </ul>
        <p className="mt-5 break-keep text-center text-base text-neutral-medium-600 leading-[1.4] tracking-[-0.02em] md:mt-4 md:text-[18px] lg:mt-5 lg:text-[22px] xl:mt-6 xl:text-[26px]">
          {firstLine} <br className="hidden md:inline lg:hidden" />
          {secondLine}
        </p>
      </div>
    </Section>
  )
}
