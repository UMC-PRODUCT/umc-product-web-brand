import { useSyncExternalStore } from "react"

export type PreviewLayout = "tabs" | "carousel"

// index.css의 --breakpoint-xl(90rem, 1440px)과 같다. 이보다 넓으면 세로 탭, 좁으면 스테퍼와 슬라이드
const TABS_QUERY = "(min-width: 90rem)"

function subscribe(onChange: () => void) {
  const query = window.matchMedia(TABS_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getLayout = (): PreviewLayout =>
  window.matchMedia(TABS_QUERY).matches ? "tabs" : "carousel"

const getServerLayout = (): PreviewLayout => "carousel"

export function usePreviewLayout() {
  return useSyncExternalStore(subscribe, getLayout, getServerLayout)
}
