import { Fragment } from "react"

import { Section } from "@/components/layout/Section"

import { SPONSORS, SPONSORS_COPY } from "./constants"

const LINE_BREAK_CLASS = {
  mobile: "h-2 basis-full md:hidden",
  tablet: "hidden h-2.5 basis-full md:block lg:h-4 xl:hidden",
} as const

export function SponsorsSection() {
  const [firstLine, secondLine] = SPONSORS_COPY.descriptionLines

  return (
    <Section headerTone="light" id="sponsors" labelledBy="sponsors-title">
      <h2 className="sr-only" id="sponsors-title">
        {SPONSORS_COPY.title}
      </h2>
      <div className="bg-white px-8 pt-[30px] pb-7 md:pt-[50px] md:pb-[30px] lg:pt-[60px] lg:pb-9">
        <ul className="mx-auto flex max-w-[1376px] flex-wrap items-center justify-center gap-x-1.5 [--sponsor-scale:0.6] xl:flex-nowrap md:[--sponsor-scale:0.84] lg:[--sponsor-scale:1]">
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
        <p className="mt-7 break-keep text-center text-base text-neutral-medium-600 leading-[1.4] tracking-[-0.02em] md:text-xl lg:text-[22px] xl:mt-8 xl:text-2xl">
          {firstLine} <br className="hidden md:inline xl:hidden" />
          {secondLine}
        </p>
      </div>
    </Section>
  )
}
