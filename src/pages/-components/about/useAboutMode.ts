import { useSyncExternalStore } from "react"

export type AboutMode = "zoom" | "static"

export const ABOUT_ZOOM_QUERY =
  "(prefers-reduced-motion: no-preference) and (min-height: 700px) and (min-width: 1024px)"

function subscribe(onChange: () => void) {
  const query = window.matchMedia(ABOUT_ZOOM_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

const getMode = (): AboutMode =>
  window.matchMedia(ABOUT_ZOOM_QUERY).matches ? "zoom" : "static"

const getServerMode = (): AboutMode => "static"

export function useAboutMode() {
  return useSyncExternalStore(subscribe, getMode, getServerMode)
}
