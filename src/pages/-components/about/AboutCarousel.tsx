import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useId, useState } from "react"

import { cn } from "@/utils/cn"

import { CarouselPagination } from "./CarouselPagination"
import { type AboutSlide } from "./constants"

import "./about.css"

interface AboutCarouselProps {
  slides: readonly AboutSlide[]
  startIndex: number
  label: string
  className?: string
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function AboutCarousel({
  slides,
  startIndex,
  label,
  className,
}: AboutCarouselProps) {
  const viewportId = useId()
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    startIndex,
  })
  const [selectedIndex, setSelectedIndex] = useState(startIndex)

  useEffect(() => {
    if (!emblaApi) return
    const syncSelectedIndex = () =>
      setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", syncSelectedIndex)
    return () => {
      emblaApi.off("select", syncSelectedIndex)
    }
  }, [emblaApi])

  const scrollTo = (index: number) =>
    emblaApi?.scrollTo(index, prefersReducedMotion())

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className={cn("flex flex-col items-center gap-7", className)}
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
              className="about-slide relative mr-4 h-[500px] w-[900px] shrink-0"
              data-active={index === selectedIndex}
              key={slide.id}
            >
              <div
                aria-hidden
                className="about-slide-shadow absolute inset-0 rounded-3xl"
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
              </div>
            </figure>
          ))}
        </div>
      </div>
      <CarouselPagination
        controlsId={viewportId}
        count={slides.length}
        getLabel={(index) => `${index + 1}번째 사진`}
        onSelect={scrollTo}
        selectedIndex={selectedIndex}
      />
    </section>
  )
}
