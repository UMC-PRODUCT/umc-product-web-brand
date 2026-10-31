import { type UseEmblaCarouselType } from "embla-carousel-react"

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>

const ARRIVAL_DISTANCE_PX = 0.5

export function subscribeSnapArrival(
  emblaApi: EmblaCarouselType,
  onArrive: () => void,
) {
  let arrived = true

  const isAtTarget = () => {
    const engine = emblaApi.internalEngine()
    return (
      !engine.dragHandler.pointerDown() &&
      Math.abs(engine.target.get() - engine.offsetLocation.get()) <
        ARRIVAL_DISTANCE_PX
    )
  }

  const checkArrival = () => {
    if (arrived || !isAtTarget()) return
    arrived = true
    onArrive()
  }
  const depart = () => {
    arrived = false
    checkArrival()
  }

  emblaApi.on("select", depart)
  emblaApi.on("scroll", checkArrival)
  emblaApi.on("settle", checkArrival)
  return () => {
    emblaApi.off("select", depart)
    emblaApi.off("scroll", checkArrival)
    emblaApi.off("settle", checkArrival)
  }
}
