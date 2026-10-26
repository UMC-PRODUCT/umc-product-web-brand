import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useId } from "react"

import { cn } from "@/utils/cn"

import { PREVIEW_COPY, PREVIEW_TABS } from "./constants"
import { PreviewTabBody } from "./PreviewTabBody"
import { PreviewTabStepper } from "./PreviewTabStepper"

interface PreviewCarouselProps {
  index: number
  onIndexChange: (index: number) => void
  className?: string
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// 1440 미만: 스테퍼와 사진·설명 슬라이드. 선택 번호는 PreviewPanel이 들고, 스테퍼와 스와이프가 같은 번호를 바꾼다
export function PreviewCarousel({
  index,
  onIndexChange,
  className,
}: PreviewCarouselProps) {
  const viewportId = useId()
  // 스테퍼가 처음과 끝에서 멈추므로 슬라이드도 순환하지 않는다
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "start",
    startIndex: index,
  })

  // 스와이프로 넘기면 선택 번호를 바꾼다
  useEffect(() => {
    if (!emblaApi) return
    const syncIndex = () => onIndexChange(emblaApi.selectedScrollSnap())
    emblaApi.on("select", syncIndex)
    return () => {
      emblaApi.off("select", syncIndex)
    }
  }, [emblaApi, onIndexChange])

  // 스테퍼로 바꾼 번호로 슬라이드를 옮긴다. 모션을 줄인 환경에서는 바로 넘어간다
  useEffect(() => {
    if (!emblaApi || emblaApi.selectedScrollSnap() === index) return
    emblaApi.scrollTo(index, prefersReducedMotion())
  }, [emblaApi, index])

  return (
    <section
      aria-label={PREVIEW_COPY.tabListLabel}
      aria-roledescription="carousel"
      className={cn(
        // Figma 스테퍼 아래 사진·설명. 간격 Mobile·Pad 12, Small PC 20. Pad 이상은 좌우 안쪽 32
        "flex w-full flex-col gap-(--umc-spacing-gap-12) md:px-(--umc-spacing-padding-32) lg:gap-(--umc-spacing-gap-20)",
        className,
      )}
    >
      <PreviewTabStepper
        controlsId={viewportId}
        index={index}
        labels={PREVIEW_TABS.map((tab) => tab.label)}
        onIndexChange={onIndexChange}
      />
      <div
        className="cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
        id={viewportId}
        ref={viewportRef}
      >
        {/* 슬라이드 사이 16은 시안에 없는 값: 넘기는 동안 사진끼리 붙지 않게 둔다. 슬라이드 높이는 가장 긴 설명에 맞춰 같아진다 */}
        <div className="-ml-4 flex">
          {PREVIEW_TABS.map((tab, tabIndex) => (
            <figure
              aria-hidden={tabIndex !== index || undefined}
              aria-label={`${tabIndex + 1} / ${PREVIEW_TABS.length} ${tab.label}`}
              aria-roledescription="slide"
              className="min-w-0 flex-[0_0_100%] select-none pl-4"
              key={tab.id}
            >
              <PreviewTabBody tab={tab} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
