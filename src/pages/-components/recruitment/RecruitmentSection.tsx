import { Button } from "@/components/button/Button"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { SectionHeading } from "@/components/layout/SectionHeading"
import { cn } from "@/utils/cn"

import {
  RECRUITMENT_COPY,
  RECRUITMENT_FIELDS,
  RECRUITMENT_PAGE_URL,
} from "./constants"
import { FeatureCard } from "./FeatureCard"

export function RecruitmentSection() {
  return (
    <Section headerTone="light" id="recruit" labelledBy="recruit-title">
      <Container className="flex flex-col items-center">
        <SectionHeading
          // 설명은 시안처럼 두 줄로 끊는다
          className="whitespace-pre-line"
          description={RECRUITMENT_COPY.description}
          title={RECRUITMENT_COPY.title}
          titleId="recruit-title"
        />
        <ul
          className={cn(
            "grid w-full justify-center gap-5",
            // Figma 제목과 카드 사이 간격: Mobile 40, Pad 48, Small PC 이상 72
            "mt-10 md:mt-12 lg:mt-[72px]",
            // Figma 카드 배치: Mobile 1열(최대 402), Pad 305 두 칸 2×2, Small PC 이상 4열(칸마다 최대 402, 남으면 가운데)
            "grid-cols-[minmax(0,402px)] md:grid-cols-[repeat(2,305px)] lg:grid-cols-[repeat(4,minmax(0,402px))]",
          )}
        >
          {RECRUITMENT_FIELDS.map(({ field, title, description }) => (
            <li className="@container" key={field}>
              <FeatureCard
                description={description}
                field={field}
                title={title}
              />
            </li>
          ))}
        </ul>
        {/* Figma 카드와 버튼 사이 간격: Mobile 54, Pad 48, Small PC 이상 54 */}
        {/* 리크루팅 페이지가 생기기 전에는 비활성 <button>, 주소가 생기면 <a>로 렌더링한다 */}
        <Button
          arrow
          asChild={RECRUITMENT_PAGE_URL !== null}
          className={cn(
            "mt-[54px] md:mt-12 lg:mt-[54px]",
            // Figma에 비활성 상태가 없어 모양은 Default로 두고 hover 반응만 막는다
            "disabled:pointer-events-none",
            // Figma 버튼 크기: PC 이상은 Xl, 그 아래는 Lg. Size 변형은 반응형을 받지 않아 Xl 값을 덮는다
            "xl:h-[68px] xl:pr-(--umc-spacing-padding-20) xl:pl-(--umc-spacing-padding-32)",
            "xl:text-[24px] xl:tracking-[-0.24px]",
          )}
          color="neutral"
          disabled={RECRUITMENT_PAGE_URL === null}
          size="lg"
          variant="weak"
        >
          {RECRUITMENT_PAGE_URL === null ? (
            RECRUITMENT_COPY.cta
          ) : (
            <a href={RECRUITMENT_PAGE_URL}>{RECRUITMENT_COPY.cta}</a>
          )}
        </Button>
      </Container>
    </Section>
  )
}
