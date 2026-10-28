import { useRef } from "react"

import Break from "@/assets/landing/hero/break.svg?react"
import glowBase from "@/assets/landing/hero/glow-base.webp"
import glowRim from "@/assets/landing/hero/glow-rim.webp"
import Rules from "@/assets/landing/hero/rules.svg?react"
import The from "@/assets/landing/hero/the.svg?react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

import "./hero.css"
import { useHeroIntro } from "./useHeroIntro"

const WORD_CLASS =
  "hero-word mt-[8.4px] mb-[15.4px] h-[53.2px] w-auto max-w-full md:mt-3 md:mb-[22px] md:h-[76px] lg:mt-[12.7px] lg:mb-[23.7px] lg:h-[83.6px]"

export function HeroSection() {
  const glowRef = useRef<HTMLDivElement>(null)
  const { intro, glow } = useHeroIntro(glowRef)

  return (
    <Section
      className="hero-backdrop relative isolate snap-start overflow-hidden rounded-b-[60px]"
      headerTone="dark"
      id="hero"
      labelledBy="hero-title"
    >
      <div className="hero-intro contents" data-glow={glow} data-intro={intro}>
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute -z-10"
          ref={glowRef}
        >
          <img
            alt=""
            className="hero-glow-base absolute top-0 left-0 w-full"
            decoding="async"
            height={2514}
            src={glowBase}
            width={3072}
          />
          <img
            alt=""
            className="hero-glow-rim absolute top-0 left-0 w-full"
            decoding="async"
            height={2514}
            src={glowRim}
            width={3072}
          />
        </div>
        <Container className="flex h-full flex-col items-center justify-center pt-20 pb-[120px]">
          <hgroup className="flex flex-col items-center text-center">
            <p
              className="hero-eyebrow font-medium text-[#20c9bc] text-lg uppercase leading-[1.4] tracking-[1px] md:text-2xl"
              lang="en"
            >
              University MakeUs Challenge
            </p>
            <h1 className="hero-title mt-8 text-white" id="hero-title">
              <span className="sr-only" lang="en">
                Break the rules
              </span>
              <span aria-hidden className="flex flex-wrap justify-center">
                <Break className={WORD_CLASS} />
                <The className={WORD_CLASS} />
                <Rules className={WORD_CLASS} />
              </span>
            </h1>
            <p className="hero-description mt-7 pt-0.5 pb-[18px] text-lg text-teal-grey-100 leading-[1.3] tracking-[-0.05em] md:text-2xl lg:text-[32px]">
              기획부터 개발까지 대학생 IT 연합 동아리,{" "}
              <br className="md:hidden" />
              새로운 가능성을 UMC에서
            </p>
          </hgroup>
        </Container>
      </div>
    </Section>
  )
}
