import useEmblaCarousel from "embla-carousel-react"
import {
  type FocusEvent,
  type PointerEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"

import { useAutoAdvance } from "@/hooks/useAutoAdvance"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { cn } from "@/utils/cn"

import { CarouselPagination } from "./CarouselPagination"
import { type AboutSlide } from "./constants"

import "./about.css"

const AUTO_ADVANCE_DELAY = 2000
const SLIDE_IMAGE_SIZES =
  "(min-width: 90rem) 900px, (min-width: 64rem) 684px, (min-width: 48rem) 600px, 373px"

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
  const [hovering, setHovering] = useState(false)
  const [keyboardFocused, setKeyboardFocused] = useState(false)
  const reduceMotion = usePrefersReducedMotion()

  useAutoAdvance(emblaApi, {
    delay: AUTO_ADVANCE_DELAY,
    paused: zooming || hovering || keyboardFocused || reduceMotion,
  })

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

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setHovering(true)
  }
  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType === "mouse") setHovering(false)
  }
  const onFocus = (event: FocusEvent) =>
    setKeyboardFocused(event.target.matches(":focus-visible"))

  return (
    <section
      aria-label={label}
      aria-roledescription="carousel"
      className={cn(
        "flex flex-col items-center gap-3 md:gap-[35px] lg:gap-8",
        className,
      )}
      onBlur={() => setKeyboardFocused(false)}
      onFocus={onFocus}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
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
                  sizes={SLIDE_IMAGE_SIZES}
                  src={slide.src}
                  srcSet={slide.srcSet}
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
