import useEmblaCarousel from "embla-carousel-react"
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react"

import { cn } from "@/utils/cn"

import { type Project } from "./constants"
import { ProjectCard } from "./ProjectCard"
import { useAutoAdvance } from "./useAutoAdvance"

import "./projects.css"

// 가운데 카드가 확대된 채 멈춰 있는 시간
const AUTO_ADVANCE_DELAY = 2000
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches

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
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
  )
  const paused = hovering || focused || reduceMotion

  useAutoAdvance(emblaApi, { delay: AUTO_ADVANCE_DELAY, paused })

  useEffect(() => {
    if (!emblaApi) return
    const syncSelectedIndex = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    syncSelectedIndex()
    emblaApi.on("select", syncSelectedIndex)
    return () => {
      emblaApi.off("select", syncSelectedIndex)
    }
  }, [emblaApi])

  // 마우스를 올려 둔 동안에는 넘기지 않는다. 터치는 손을 떼면 바로 다시 센다
  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setHovering(true)
  }
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setHovering(false)
  }

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
    // 카드에 조작할 요소가 없어 캐러셀 영역에 포커스를 둔다. 포커스하면 멈추고 좌우 화살표로 넘긴다
    <section
      aria-label={`${label}, 좌우 화살표 키로 넘기기`}
      aria-roledescription="carousel"
      className={cn(
        // flex로 두어 안쪽 -my-6가 바깥 margin과 겹치지(collapse) 않게 한다
        "project-carousel relative flex flex-col outline-teal-500 outline-offset-2 focus-visible:outline-2",
        className,
      )}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onKeyDown={onKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: 키보드로 캐러셀을 멈추고 넘길 유일한 수단이다
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
              data-active={index === selectedIndex}
              key={project.name}
            >
              <ProjectCard
                award={project.award}
                className="project-slide-card"
                description={project.description}
                name={project.name}
                parts={project.parts}
                thumbnailSrc={project.thumbnail}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
