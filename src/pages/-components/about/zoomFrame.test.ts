import { describe, expect, it } from "vitest"

import { getZoomFrame, getZoomStart } from "./zoomFrame"

const STORYBOARD_START = { scale: 2.4, offset: -542 }

const STORYBOARD_FRAMES = [
  {
    progress: 0,
    scale: 2.4,
    offset: -542,
    activeImageOpacity: 0.2,
    inactiveImageOpacity: 0,
    dimOpacity: 1,
    headingOpacity: 0,
    finishOpacity: 0,
  },
  {
    progress: 0.25,
    scale: 1.79,
    offset: -347,
    activeImageOpacity: 0.3,
    inactiveImageOpacity: 0,
    dimOpacity: 0.7,
    headingOpacity: 0,
    finishOpacity: 0,
  },
  {
    progress: 0.5,
    scale: 1.35,
    offset: -10,
    activeImageOpacity: 0.3,
    inactiveImageOpacity: 0,
    dimOpacity: 0.7,
    headingOpacity: 1,
    finishOpacity: 0,
  },
  {
    progress: 0.75,
    scale: 1.09,
    offset: -10,
    activeImageOpacity: 0.6,
    inactiveImageOpacity: 0.6,
    dimOpacity: 0,
    headingOpacity: 1,
    finishOpacity: 0,
  },
  {
    progress: 1,
    scale: 1,
    offset: 0,
    activeImageOpacity: 1,
    inactiveImageOpacity: 1,
    dimOpacity: 0,
    headingOpacity: 1,
    finishOpacity: 1,
  },
]

describe("getZoomFrame", () => {
  it.each(STORYBOARD_FRAMES)(
    "스토리보드 시작값이면 진행도 $progress에서 프레임 값을 돌려준다",
    ({ progress, offset, ...expected }) => {
      const frame = getZoomFrame(progress, STORYBOARD_START)

      expect(frame.offset).toBeCloseTo(offset, -1)
      for (const [key, value] of Object.entries(expected)) {
        expect(frame[key as keyof typeof frame], key).toBeCloseTo(value, 2)
      }
    },
  )

  it("시작 배율과 거리를 처음 프레임에 쓰고 끝에서는 원래 크기로 돌아온다", () => {
    const start = { scale: 2.9, offset: -700 }

    const first = getZoomFrame(0, start)
    const last = getZoomFrame(1, start)

    expect(first).toMatchObject(start)
    expect(last.scale).toBe(1)
    expect(last.offset).toBeCloseTo(0, 5)
  })

  it("프레임 사이는 선형으로 잇는다", () => {
    expect(
      getZoomFrame(0.875, STORYBOARD_START).activeImageOpacity,
    ).toBeCloseTo(0.8, 5)
    expect(getZoomFrame(0.125, STORYBOARD_START).dimOpacity).toBeCloseTo(
      0.85,
      5,
    )
  })

  it("범위 밖 진행도는 양 끝 프레임으로 고정한다", () => {
    expect(getZoomFrame(-0.5, STORYBOARD_START)).toEqual(
      getZoomFrame(0, STORYBOARD_START),
    )
    expect(getZoomFrame(1.5, STORYBOARD_START)).toEqual(
      getZoomFrame(1, STORYBOARD_START),
    )
  })
})

describe("getZoomStart", () => {
  const LAYOUT_1440 = {
    stickyTop: 80,
    gapAboveSection: 217,
    slideTop: 273.5,
    slideHeight: 500,
  }

  it("사진 위쪽 끝을 Hero 아래 끝보다 150px 위에서 시작한다", () => {
    const start = getZoomStart({ ...LAYOUT_1440, viewportHeight: 900 })

    expect(start.offset).toBe(-(217 + 150 + 273.5))
  })

  it("고정 순간 사진이 화면 아래 끝을 넘도록 배율을 키운다", () => {
    const short = getZoomStart({ ...LAYOUT_1440, viewportHeight: 900 })
    const tall = getZoomStart({ ...LAYOUT_1440, viewportHeight: 1080 })

    expect(short.scale).toBeCloseTo((900 + 80 + 287) / 500, 5)
    expect(tall.scale).toBeCloseTo((1080 + 80 + 287) / 500, 5)
  })

  it("배율은 스토리보드 값 2.4보다 작아지지 않는다", () => {
    const start = getZoomStart({ ...LAYOUT_1440, viewportHeight: 600 })

    expect(start.scale).toBe(2.4)
  })
})

describe("edgeFeather", () => {
  it("Hero와 겹치는 진행도 0에서만 화면 기준 90px만큼 위쪽 끝을 흐린다", () => {
    const start = { scale: 2.5, offset: -600 }

    expect(getZoomFrame(0, start).edgeFeather * 2.5).toBeCloseTo(90, 5)
    expect(getZoomFrame(0.25, start).edgeFeather).toBe(0)
  })
})
