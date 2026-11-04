import { Link } from "@tanstack/react-router"
import useEmblaCarousel from "embla-carousel-react"
import { type FocusEvent, type KeyboardEvent, useEffect, useState } from "react"

import { subscribeSnapArrival } from "@/hooks/subscribeSnapArrival"
import { useAutoAdvance } from "@/hooks/useAutoAdvance"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { cn } from "@/utils/cn"

import { type Project } from "./constants"
import { ProjectCard } from "./ProjectCard"

import "./projects.css"

// 가운데 카드가 확대된 채 멈춰 있는 시간
const AUTO_ADVANCE_DELAY = 2000

const distanceFromCenter = (index: number, center: number, count: number) => {
  const half = Math.floor(count / 2)
  return ((((index - center + half) % count) + count) % count) - half
}

const slideSize = (index: number, center: number, count: number) =>
  distanceFromCenter(index, center, count) % 2 === 0 ? "large" : "small"

interface ProjectCarouselProps {
  projects: readonly Project[]
  label: string
  className?: string
}

export function ProjectCarousel({
  projects,
  label,
  className,
}: ProjectCarouselProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const paused = keyboardFocused || reduceMotion

  useAutoAdvance(emblaApi, { delay: AUTO_ADVANCE_DELAY, paused })

  useEffect(() => {
    if (!emblaApi) return
    const syncSelectedIndex = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    syncSelectedIndex()
    return subscribeSnapArrival(emblaApi, syncSelectedIndex)
  }, [emblaApi])

  const onFocus = (event: FocusEvent) =>
    setKeyboardFocused(event.target.matches(":focus-visible"))

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      emblaApi?.scrollPrev(reduceMotion)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      emblaApi?.scrollNext(reduceMotion)
    }
  }

  return (
    // 캐러셀 영역에 포커스하면 멈추고 좌우 화살표로 넘긴다. 카드 링크로 Tab하면 Embla가 그 카드로 넘긴다
    <section
      aria-label={`${label}, 좌우 화살표 키로 넘기기`}
      aria-roledescription="carousel"
      className={cn(
        // flex로 두어 안쪽 -my-6가 바깥 margin과 겹치지(collapse) 않게 한다
        "project-carousel relative flex flex-col outline-teal-500 outline-offset-2 focus-visible:outline-2",
        className,
      )}
      onBlur={() => setKeyboardFocused(false)}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: 카드 링크를 하나씩 거치지 않고 캐러셀을 멈추고 넘기는 자리다
      tabIndex={0}
    >
      {/* 위아래 여백은 카드 그림자가 잘리지 않게 둔다 */}
      <div className="-my-6 overflow-hidden py-6" ref={viewportRef}>
        <div aria-live={paused ? "polite" : "off"} className="flex">
          {projects.map((project, index) => (
            <figure
              aria-label={`${index + 1} / ${projects.length}`}
              aria-roledescription="slide"
              className="project-slide"
              data-size={slideSize(index, selectedIndex, projects.length)}
              key={project.name}
            >
              <Link
                className="project-slide-card rounded-(--umc-radius-24) outline-teal-500 outline-offset-2 focus-visible:outline-2"
                params={{ projectId: project.id }}
                to="/projects/$projectId"
              >
                <ProjectCard
                  award={project.award}
                  description={project.description}
                  name={project.name}
                  parts={project.parts}
                  thumbnailSrc={project.thumbnail}
                />
              </Link>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
