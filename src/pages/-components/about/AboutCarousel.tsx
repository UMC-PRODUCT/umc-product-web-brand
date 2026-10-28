import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useId, useRef, useState } from "react"

import { cn } from "@/utils/cn"

import { CarouselPagination } from "./CarouselPagination"
import { type AboutSlide } from "./constants"

import "./about.css"

interface AboutCarouselProps {
  slides: readonly AboutSlide[]
  startIndex: number
  label: string
  zooming: boolean
  className?: string
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function AboutCarousel({
  slides,
  startIndex,
  label,
  zooming,
  className,
}: AboutCarouselProps) {
  const viewportId = useId()
  const interactiveRef = useRef(!zooming)
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    startIndex,
    watchDrag: () => interactiveRef.current,
  })
  const [selectedIndex, setSelectedIndex] = useState(startIndex)

  useEffect(() => {
    interactiveRef.current = !zooming
  }, [zooming])

  useEffect(() => {
    if (!emblaApi) return
    const syncSelectedIndex = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    const selectClickedSlide = (event: MouseEvent) => {
      const target = event.target
      if (!interactiveRef.current || !(target instanceof Node)) return
      const clickedIndex = emblaApi
        .slideNodes()
        .findIndex((slide) => slide.contains(target))
      if (clickedIndex === -1 || clickedIndex === emblaApi.selectedScrollSnap())
        return
      emblaApi.scrollTo(clickedIndex, prefersReducedMotion())
    }
    const root = emblaApi.rootNode()
    emblaApi.on("select", syncSelectedIndex)
    root.addEventListener("click", selectClickedSlide)
    return () => {
      emblaApi.off("select", syncSelectedIndex)
      root.removeEventListener("click", selectClickedSlide)
    }
  }, [emblaApi])

  const scrollTo = (index: number) =>
    emblaApi?.scrollTo(index, prefersReducedMotion())

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className={cn("flex flex-col items-center gap-3 md:gap-8", className)}
    >
      <div
        className="about-carousel-viewport -my-12 w-full overflow-hidden py-12"
        id={viewportId}
        ref={viewportRef}
      >
        <div className="flex">
          {slides.map((slide, index) => (
            <figure
              aria-label={`${index + 1} / ${slides.length}`}
              aria-roledescription="slide"
              className="about-slide relative mr-(--about-slide-gap) h-(--about-slide-h) w-(--about-slide-w) shrink-0"
              data-active={index === selectedIndex}
              key={slide.id}
            >
              <div
                aria-hidden
                className="about-slide-shadow absolute inset-0 rounded-(--about-radius)"
              />
              <div className="about-slide-frame absolute inset-0 bg-[#051f1d]">
                <img
                  alt={slide.alt}
                  className="size-full object-cover"
                  decoding="async"
                  fetchPriority="low"
                  height={500}
                  src={slide.src}
                  width={900}
                />
                <div aria-hidden className="about-slide-dim absolute inset-0" />
                <div
                  aria-hidden
                  className="about-slide-veil absolute inset-0"
                />
                {zooming && index === selectedIndex && (
                  <div
                    aria-hidden
                    className="about-slide-tone absolute inset-x-0 bottom-0"
                    data-header-tone="dark"
                  />
                )}
              </div>
            </figure>
          ))}
        </div>
      </div>
      <CarouselPagination
        className="about-pagination"
        controlsId={viewportId}
        count={slides.length}
        getLabel={(index) => `${index + 1}번째 사진`}
        onSelect={scrollTo}
        selectedIndex={selectedIndex}
      />
    </section>
  )
}
