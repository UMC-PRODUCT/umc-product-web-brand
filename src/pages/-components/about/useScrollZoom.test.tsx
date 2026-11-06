import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { useScrollZoom } from "./useScrollZoom"

const STAGE_HEIGHT = 820
const RUNWAY = 900

function mountZoomSection(sectionTop: number, stageTop: number) {
  const section = document.createElement("section")
  const stage = document.createElement("div")
  const carousel = document.createElement("div")
  carousel.className = "about-carousel-viewport"
  carousel.style.paddingTop = "48px"
  Object.defineProperty(carousel, "offsetTop", { value: 227 })
  const slide = document.createElement("figure")
  slide.className = "about-slide"
  Object.defineProperty(slide, "offsetWidth", { value: 900 })
  Object.defineProperty(slide, "offsetHeight", { value: 500 })
  carousel.append(slide)
  stage.append(carousel)
  section.append(stage)
  document.body.append(section)
  const position = { sectionTop, stageTop }
  section.getBoundingClientRect = () =>
    ({ top: position.sectionTop, height: STAGE_HEIGHT + RUNWAY }) as DOMRect
  stage.getBoundingClientRect = () => ({ top: position.stageTop }) as DOMRect
  Object.defineProperty(stage, "offsetHeight", { value: STAGE_HEIGHT })
  return {
    section,
    sectionRef: { current: section },
    stageRef: { current: stage },
    moveTo(nextSectionTop: number, nextStageTop: number) {
      position.sectionTop = nextSectionTop
      position.stageTop = nextStageTop
    },
  }
}

describe("useScrollZoom", () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    document.body.replaceChildren()
  })

  it("무대가 고정되기 전에는 첫 프레임 값을 섹션 변수로 쓴다", () => {
    const zoom = mountZoomSection(600, 600)

    const { result } = renderHook(() =>
      useScrollZoom(zoom.sectionRef, zoom.stageRef),
    )

    expect(zoom.section.style.getPropertyValue("--about-zoom-scale")).toBe(
      "2.4",
    )
    expect(zoom.section.style.getPropertyValue("--about-heading-opacity")).toBe(
      "0",
    )
    expect(result.current).toBe(false)
  })

  it("무대가 런웨이 끝까지 내려가면 마지막 프레임으로 정착한다", () => {
    vi.useFakeTimers({
      toFake: ["requestAnimationFrame", "cancelAnimationFrame"],
    })
    const zoom = mountZoomSection(80, 80)
    const { result } = renderHook(() =>
      useScrollZoom(zoom.sectionRef, zoom.stageRef),
    )

    zoom.moveTo(80 - RUNWAY, 80)
    act(() => {
      window.dispatchEvent(new Event("scroll"))
      vi.advanceTimersToNextFrame()
    })

    expect(zoom.section.style.getPropertyValue("--about-zoom-scale")).toBe("1")
    expect(zoom.section.style.getPropertyValue("--about-finish-opacity")).toBe(
      "1",
    )
    expect(result.current).toBe(true)
  })

  it("정착 전 무대 안으로 포커스가 들어오면 정착 위치로 즉시 스크롤한다", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {})
    const zoom = mountZoomSection(80, 80)
    renderHook(() => useScrollZoom(zoom.sectionRef, zoom.stageRef))

    zoom.stageRef.current.dispatchEvent(new FocusEvent("focusin"))

    expect(scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "instant" }),
    )
  })
})
