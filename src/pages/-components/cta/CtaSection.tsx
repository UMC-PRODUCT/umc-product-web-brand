import Umc11th from "@/assets/landing/cta/umc-11th.svg?react"
import { Button } from "@/components/button/Button"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { cn } from "@/utils/cn"

import { CTA_APPLY_URL, CTA_COPY } from "./constants"
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
      <Container className="flex flex-col items-center gap-14 py-20 md:gap-[72px]">
        <hgroup className="flex flex-col items-center break-keep text-center">
          <p
            // #20c9bc는 토큰에 없는 시안 값이다
            className="font-medium text-[#20c9bc] text-[16px] uppercase leading-[1.4] tracking-[1px] md:text-[24px]"
            lang="en"
          >
            {CTA_COPY.eyebrow}
          </p>
          {/* Figma 제목 텍스트 박스: Mobile 84(글자 70), Pad 이상 102(글자 100). 라벨과 간격 24, 25 */}
          <h2
            className="mt-6 flex h-[84px] items-center text-inverse md:mt-[25px] md:h-[102px]"
            id="cta-title"
          >
            <span className="sr-only" lang="en">
              {CTA_COPY.title}
            </span>
            <Umc11th aria-hidden className="h-[53px] w-auto md:h-[76px]" />
          </h2>
          {/* 제목 묶음과 설명 간격: Mobile 16, Pad 이상 28. 설명 박스는 위 2, 아래 18 여백을 가진다 */}
          <p className="mt-(--umc-spacing-gap-16) pt-0.5 pb-[18px] text-[16px] text-disabled leading-[1.5] tracking-[-0.03em] md:mt-(--umc-spacing-gap-28) md:text-[24px]">
            {CTA_COPY.description}
          </p>
        </hgroup>
        <Button
          asChild
          className={cn(
            // 랜딩 인스턴스 값: 모든 뷰포트에서 채우기를 Brand-Inverse/Strong-600으로 덮었다
            "bg-fill-primary-inverse-strong-600",
            // Figma 버튼 크기: Mobile Lg, Pad Xl, Small PC Lg, PC 이상 Xl. Size 변형은 반응형을 받지 않아 값을 덮는다
            "md:h-[68px] md:px-(--umc-spacing-padding-32) md:text-[24px] md:tracking-[-0.24px]",
            "lg:h-[62px] lg:px-(--umc-spacing-padding-28) lg:text-[22px] lg:tracking-[-0.22px]",
            "xl:h-[68px] xl:px-(--umc-spacing-padding-32) xl:text-[24px] xl:tracking-[-0.24px]",
          )}
          color="brand"
          size="lg"
          variant="fill"
        >
          <a href={CTA_APPLY_URL} rel="noopener noreferrer" target="_blank">
            {CTA_COPY.cta}
            <span className="sr-only"> (새 창)</span>
          </a>
        </Button>
      </Container>
    </Section>
  )
}
