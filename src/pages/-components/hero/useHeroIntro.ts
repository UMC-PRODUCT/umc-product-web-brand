import { type RefObject, useEffect, useState } from "react"

const MAX_WAIT_MS = 600

type IntroState = "pending" | "play"
type GlowState = "pending" | "ready"

export function useHeroIntro(glowRef: RefObject<HTMLElement | null>) {
  const [intro, setIntro] = useState<IntroState>("pending")
  const [glow, setGlow] = useState<GlowState>("pending")

  useEffect(() => {
    let active = true
    let maxWaitTimer: ReturnType<typeof setTimeout> | undefined
    const images = [...(glowRef.current?.querySelectorAll("img") ?? [])]
    const glowDecoded = Promise.all(
      images.map((image) => image.decode().catch(() => undefined)),
    )
    const maxWait = new Promise<void>((resolve) => {
      maxWaitTimer = setTimeout(resolve, MAX_WAIT_MS)
    })

    Promise.race([
      Promise.all([document.fonts.ready, glowDecoded]),
      maxWait,
    ]).then(() => {
      if (active) setIntro("play")
    })
    glowDecoded.then(() => {
      if (active) setGlow("ready")
    })

    return () => {
      active = false
      clearTimeout(maxWaitTimer)
    }
  }, [glowRef])

  return { intro, glow }
}
