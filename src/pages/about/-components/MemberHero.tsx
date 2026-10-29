import AboutUmc from "@/assets/about/hero/about-umc.svg?react"
import AboutUmcStacked from "@/assets/about/hero/about-umc-stacked.svg?react"
import { Container } from "@/components/layout/Container"

import { MEMBER_CONTAINER_CLASS } from "./memberLayout"

import "./member-hero.css"

interface MemberHeroProps {
  description: string
}

export function MemberHero({ description }: MemberHeroProps) {
  return (
    <div className="relative isolate min-h-[612px] pt-[290px]">
      <div aria-hidden className="member-hero-glow" />
      <div aria-hidden className="member-hero-glow member-hero-glow-breath" />
      <Container className={MEMBER_CONTAINER_CLASS}>
        <div className="pl-5">
          <p
            className="h-[136px] pt-[13.1px] text-teal-800 md:h-[95px] md:pt-[18.4px] lg:h-[108px] lg:pt-[21px]"
            lang="en"
          >
            <span className="sr-only">ABOUT UMC</span>
            <AboutUmcStacked
              aria-hidden
              className="h-[106px] w-auto md:hidden"
            />
            <AboutUmc
              aria-hidden
              className="hidden h-[53.1px] w-auto md:block lg:h-[60.7px]"
            />
          </p>
          <p className="pt-0.5 pb-3 font-medium text-[14px] text-teal-grey-600 leading-[1.35] tracking-[-0.01em] md:text-[16px] lg:text-[22px]">
            {description}
          </p>
        </div>
      </Container>
    </div>
  )
}
