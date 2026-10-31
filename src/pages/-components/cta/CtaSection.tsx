import Umc11th from "@/assets/landing/cta/umc-11th.svg?react"
import Umc11thMobile from "@/assets/landing/cta/umc-11th-mobile.svg?react"
import { Button } from "@/components/button/Button"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { cn } from "@/utils/cn"

import { CTA_COPY } from "./constants"
import "./cta.css"

export function CtaSection() {
  return (
    <Section
      // Figma 섹션 위 여백: Mobile 130, Pad 이상 180. 아래 80
      className="cta-section-bg pt-[130px] pb-20 md:pt-[180px]"
      headerTone="dark"
      id="cta"
      labelledBy="cta-title"
    >
      <Container className="flex flex-col items-center gap-14 px-4 py-20 md:gap-[72px]">
        <hgroup className="flex w-full max-w-[326px] flex-col items-center break-keep text-center md:max-w-none">
          <p
            // #20c9bc는 토큰에 없는 시안 값이다
            className="font-medium text-[#20c9bc] text-[16px] uppercase leading-[1.4] tracking-[1px] md:text-[24px]"
            lang="en"
          >
            {CTA_COPY.eyebrow}
          </p>
          {/* Figma 제목 텍스트 박스: Mobile 84(글자 70), Pad 이상 102(글자 100). 라벨과 간격 24, 25 */}
          <h2
            className="mt-6 flex h-[84px] items-start pt-3 text-inverse md:mt-[25px] md:h-[102px] md:pt-2.5"
            id="cta-title"
          >
            <span className="sr-only" lang="en">
              {CTA_COPY.title}
            </span>
            <Umc11thMobile aria-hidden className="md:hidden" />
            <Umc11th aria-hidden className="hidden md:block" />
          </h2>
          {/* 제목 묶음과 설명 간격: Mobile 16, Pad 이상 28. 설명 박스는 위 2, 아래 18 여백을 가진다 */}
          <p className="mt-(--umc-spacing-gap-16) pt-0.5 pb-[18px] text-[16px] text-disabled leading-[1.5] tracking-[-0.03em] md:mt-(--umc-spacing-gap-28) md:text-[24px]">
            {CTA_COPY.description}
          </p>
        </hgroup>
        <Button
          asChild
          className={cn(
            "pointer-events-none h-12 rounded-(--umc-radius-14) bg-fill-neutral-inverse-strong-600 px-(--umc-spacing-padding-16) text-[17px] leading-[1.4] tracking-[-0.34px]",
            "md:h-[62px] md:rounded-(--umc-radius-18) md:bg-fill-neutral-inverse-medium-500 md:px-(--umc-spacing-padding-28) md:text-[22px] md:leading-[1.35] md:tracking-[-0.22px]",
            "xl:h-[68px] xl:px-(--umc-spacing-padding-32) xl:text-[24px] xl:tracking-[-0.24px]",
          )}
          color="neutral"
          size="lg"
          variant="fill"
        >
          <p>{CTA_COPY.status}</p>
        </Button>
      </Container>
    </Section>
  )
}
