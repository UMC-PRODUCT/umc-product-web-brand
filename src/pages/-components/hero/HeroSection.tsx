import { useRef } from "react"

import BreakTheRules from "@/assets/landing/hero/break-the-rules.svg?react"
import glowBase from "@/assets/landing/hero/glow-base.webp"
import glowRim from "@/assets/landing/hero/glow-rim.webp"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

import "./hero.css"
import { useHeroIntro } from "./useHeroIntro"

export function HeroSection() {
  const glowRef = useRef<HTMLDivElement>(null)
  const { intro, glow } = useHeroIntro(glowRef)

  return (
    <Section
      className="hero-backdrop relative isolate overflow-hidden rounded-b-[60px]"
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
        <Container className="flex h-full flex-col items-center justify-center pt-20 pb-[140px]">
          <hgroup className="flex flex-col items-center text-center">
            <p
              className="hero-eyebrow font-medium text-[22px] text-teal-300 uppercase leading-[1.4] tracking-[2px]"
              lang="en"
            >
              University MakeUs Challenge
            </p>
            <h1
              className="hero-title mt-6 h-[100px] pt-[7px] text-white"
              id="hero-title"
            >
              <span className="sr-only" lang="en">
                Break the rules
              </span>
              <BreakTheRules aria-hidden />
            </h1>
            <p className="hero-description mt-7 pt-0.5 pb-[18px] text-[24px] text-teal-grey-300 leading-[1.4] tracking-[-0.48px]">
              기획부터 개발까지 가능한 대학생 IT 창업 연합 동아리, 새로운
              가능성을 UMC에서
            </p>
          </hgroup>
        </Container>
      </div>
    </Section>
  )
}
