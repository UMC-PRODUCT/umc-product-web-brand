import useEmblaCarousel from "embla-carousel-react"

import award5020 from "@/assets/projects/hero/award-5020.webp"
import award5025 from "@/assets/projects/hero/award-5025.webp"
import award5027 from "@/assets/projects/hero/award-5027.webp"
import award5028 from "@/assets/projects/hero/award-5028.webp"
import award5029 from "@/assets/projects/hero/award-5029.webp"
import { useAutoAdvance } from "@/hooks/useAutoAdvance"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { cn } from "@/utils/cn"

// 사진이 멈춘 뒤 다음 사진으로 넘어가기까지 기다리는 시간
const AUTO_ADVANCE_DELAY = 2000

// Figma `수상 사진` 섹션(1306:31318)의 왼쪽→오른쪽 순서
export const HERO_SLIDES = [
  { id: "5029", src: award5029, width: 1800, height: 1350 },
  { id: "5028", src: award5028, width: 1800, height: 1350 },
  { id: "5027", src: award5027, width: 1800, height: 1350 },
  { id: "5020", src: award5020, width: 1800, height: 1350 },
  { id: "5025", src: award5025, width: 836, height: 627 },
] as const

interface ProjectsHeroSlidesProps {
  className?: string
}

// 히어로 배경 사진을 2초마다 왼쪽으로 넘기고, 마지막 다음에 첫 사진으로 이어 붙인다.
// 장식 배경이라 보조기술에서 숨기고, 움직임 줄이기를 켜면 첫 사진에 멈춘다
export function ProjectsHeroSlides({ className }: ProjectsHeroSlidesProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: true,
    watchDrag: false,
  })
  const reduceMotion = usePrefersReducedMotion()

  useAutoAdvance(emblaApi, { delay: AUTO_ADVANCE_DELAY, paused: reduceMotion })

  return (
    <div
      aria-hidden
      className={cn("overflow-hidden", className)}
      data-testid="projects-hero-slides"
      ref={viewportRef}
    >
      {/* 옆으로 밀려 있는 슬라이드에 `loading="lazy"`를 주면 넘어올 때까지 받지 않아 빈 화면이 보일 수 있다.
          첫 장을 먼저 받고 나머지는 낮은 우선순위로 미리 받는다 */}
      <div className="flex h-full">
        {HERO_SLIDES.map((slide, index) => (
          <img
            alt=""
            className="h-full w-full shrink-0 object-cover"
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            height={slide.height}
            key={slide.id}
            src={slide.src}
            width={slide.width}
          />
        ))}
      </div>
    </div>
  )
}
