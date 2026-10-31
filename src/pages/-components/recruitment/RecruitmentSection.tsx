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
          className="whitespace-pre-line [&>p]:text-neutral-weak-500 xl:[&>p]:text-[22px]"
          description={RECRUITMENT_COPY.description}
          title={RECRUITMENT_COPY.title}
          titleId="recruit-title"
        />
        <ul
          className={cn(
            "grid w-full justify-center gap-5",
            "mt-10 md:mt-12 lg:mt-[54px] xl:mt-[72px]",
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
        {/* 리크루팅 페이지가 생기기 전에는 비활성 <button>, 주소가 생기면 <a>로 렌더링한다 */}
        <Button
          arrow
          asChild={RECRUITMENT_PAGE_URL !== null}
          className={cn(
            "mt-8 md:mt-12 lg:mt-[54px]",
            // Figma에 비활성 상태가 없어 모양은 Default로 두고 hover 반응만 막는다
            "disabled:pointer-events-none",
            "h-12 rounded-(--umc-radius-14) bg-teal-grey-75 pr-[14px] pl-(--umc-spacing-padding-16) text-[17px] text-neutral-medium-600 leading-[1.4] tracking-[-0.34px] backdrop-blur-none [&>span]:p-0 [&>span]:text-icon-neutral-medium-500 [&_svg]:size-4",
            "md:h-[64px] md:rounded-(--umc-radius-18) md:bg-fill-neutral-medium-100 md:pr-(--umc-spacing-padding-16) md:pl-(--umc-spacing-padding-28) md:text-[22px] md:text-teal-grey-700 md:leading-[1.35] md:tracking-[-0.22px] md:backdrop-blur-[4px] md:[&>span]:p-(--umc-spacing-padding-4) md:[&>span]:text-icon-neutral-strong-600 md:[&_svg]:size-6",
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
