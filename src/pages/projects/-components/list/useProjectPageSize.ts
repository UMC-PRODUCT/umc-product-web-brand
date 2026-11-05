import { useSyncExternalStore } from "react"

import { PROJECT_PAGE_SIZE } from "../projectSearch"

// 그리드 열이 바뀌는 md(48rem), lg(64rem)와 같은 기준이어야 마지막 행이 채워진다
export const PROJECT_DESKTOP_QUERY = "(min-width: 64rem)"
export const PROJECT_TABLET_QUERY = "(min-width: 48rem)"

function subscribe(onChange: () => void) {
  const queries = [PROJECT_DESKTOP_QUERY, PROJECT_TABLET_QUERY].map((query) =>
    window.matchMedia(query),
  )
  for (const query of queries) query.addEventListener("change", onChange)
  return () => {
    for (const query of queries) query.removeEventListener("change", onChange)
  }
}

function getPageSize() {
  if (window.matchMedia(PROJECT_DESKTOP_QUERY).matches)
    return PROJECT_PAGE_SIZE.desktop
  if (window.matchMedia(PROJECT_TABLET_QUERY).matches)
    return PROJECT_PAGE_SIZE.tablet
  return PROJECT_PAGE_SIZE.mobile
}

const getServerPageSize = () => PROJECT_PAGE_SIZE.desktop

/** 화면 폭에 맞는 프로젝트 목록 한 페이지 개수 */
export function useProjectPageSize() {
  return useSyncExternalStore(subscribe, getPageSize, getServerPageSize)
}
