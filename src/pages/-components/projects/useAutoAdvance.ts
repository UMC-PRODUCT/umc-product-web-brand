import { type UseEmblaCarouselType } from "embla-carousel-react"
import { useEffect } from "react"

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>

interface UseAutoAdvanceOptions {
  // 카드가 가운데에 멈춘 뒤 다음 카드로 넘어가기까지 기다리는 시간 (ms)
  delay: number
  paused: boolean
}

// 카드가 멈출 때마다 delay 뒤에 다음 카드로 넘긴다. 사용자가 끄는 동안에는 세지 않는다
export function useAutoAdvance(
  emblaApi: EmblaCarouselType | undefined,
  { delay, paused }: UseAutoAdvanceOptions,
) {
  useEffect(() => {
    if (!emblaApi || paused) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const stop = () => clearTimeout(timer)
    const schedule = () => {
      stop()
      timer = setTimeout(() => emblaApi.scrollNext(), delay)
    }

    schedule()
    emblaApi.on("settle", schedule)
    emblaApi.on("pointerDown", stop)
    // 끌지 않고 누르기만 하면 settle이 오지 않으므로 손을 뗄 때도 다시 센다
    emblaApi.on("pointerUp", schedule)
    return () => {
      stop()
      emblaApi.off("settle", schedule)
      emblaApi.off("pointerDown", stop)
      emblaApi.off("pointerUp", schedule)
    }
  }, [emblaApi, delay, paused])
}
