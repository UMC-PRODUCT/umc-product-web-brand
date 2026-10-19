export interface ZoomStart {
  scale: number
  offset: number
}

export interface ZoomGeometry {
  viewportHeight: number
  stickyTop: number
  gapAboveSection: number
  slideTop: number
  slideHeight: number
}

export interface ZoomFrame {
  scale: number
  offset: number
  edgeFeather: number
  activeImageOpacity: number
  inactiveImageOpacity: number
  dimOpacity: number
  headingOpacity: number
  finishOpacity: number
}

type KeyframedValue = Exclude<
  keyof ZoomFrame,
  "scale" | "offset" | "edgeFeather"
>

const OFFSET_SHARE_KEYFRAMES = [1, 0.64, 0.0185, 0.0185, 0]
const EDGE_FEATHER_SHARE_KEYFRAMES = [1, 0, 0, 0, 0]

const STORYBOARD_KEYFRAMES: Record<KeyframedValue, readonly number[]> = {
  activeImageOpacity: [0.2, 0.3, 0.3, 0.6, 1],
  inactiveImageOpacity: [0, 0, 0, 0.6, 1],
  dimOpacity: [1, 0.7, 0.7, 0, 0],
  headingOpacity: [0, 0, 1, 1, 1],
  finishOpacity: [0, 0, 0, 0, 1],
}

const MIN_START_SCALE = 2.4
const HERO_OVERLAP_PX = 150
const BOTTOM_COVER_MARGIN_PX = 80
const EDGE_FEATHER_PX = 90

const KEYFRAME_COUNT = 5
const KEYFRAME_INTERVAL = 1 / (KEYFRAME_COUNT - 1)

const clampProgress = (progress: number) => Math.min(Math.max(progress, 0), 1)

function interpolate(values: readonly number[], progress: number) {
  const segment = Math.min(
    Math.floor(progress / KEYFRAME_INTERVAL),
    KEYFRAME_COUNT - 2,
  )
  const segmentProgress =
    (progress - segment * KEYFRAME_INTERVAL) / KEYFRAME_INTERVAL
  const from = values[segment] ?? 0
  const to = values[segment + 1] ?? from
  return from + (to - from) * segmentProgress
}

export function getZoomStart(geometry: ZoomGeometry): ZoomStart {
  const imageTopWhenPinned =
    geometry.stickyTop - geometry.gapAboveSection - HERO_OVERLAP_PX
  const coverScale =
    (geometry.viewportHeight + BOTTOM_COVER_MARGIN_PX - imageTopWhenPinned) /
    geometry.slideHeight
  return {
    scale: Math.max(MIN_START_SCALE, coverScale),
    offset: -(geometry.gapAboveSection + HERO_OVERLAP_PX + geometry.slideTop),
  }
}

export function getZoomFrame(progress: number, start: ZoomStart): ZoomFrame {
  const clamped = clampProgress(progress)
  const at = (key: KeyframedValue) =>
    interpolate(STORYBOARD_KEYFRAMES[key], clamped)
  const scale = 1 + (start.scale - 1) * (1 - clamped) ** 2
  const featherShare = interpolate(EDGE_FEATHER_SHARE_KEYFRAMES, clamped)
  return {
    scale,
    offset: start.offset * interpolate(OFFSET_SHARE_KEYFRAMES, clamped),
    edgeFeather: (EDGE_FEATHER_PX * featherShare) / scale,
    activeImageOpacity: at("activeImageOpacity"),
    inactiveImageOpacity: at("inactiveImageOpacity"),
    dimOpacity: at("dimOpacity"),
    headingOpacity: at("headingOpacity"),
    finishOpacity: at("finishOpacity"),
  }
}
