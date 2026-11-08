import { useState } from "react"

import {
  NOTICE_POPUP_DISMISSED_KEY,
  NOTICE_POPUP_MIN_WIDTH_QUERY,
} from "./constants"

const DISMISSED_VALUE = "1"

function readDismissed(): boolean {
  try {
    return (
      window.sessionStorage.getItem(NOTICE_POPUP_DISMISSED_KEY) ===
      DISMISSED_VALUE
    )
  } catch {
    return false
  }
}

function saveDismissed(): boolean {
  try {
    window.sessionStorage.setItem(NOTICE_POPUP_DISMISSED_KEY, DISMISSED_VALUE)
    return true
  } catch {
    return false
  }
}

function shouldOpenOnLoad(): boolean {
  return (
    window.matchMedia(NOTICE_POPUP_MIN_WIDTH_QUERY).matches && !readDismissed()
  )
}

export function useNoticePopupOpen() {
  const [open, setOpen] = useState(shouldOpenOnLoad)

  const changeOpen = (next: boolean) => {
    if (!next) {
      saveDismissed()
    }
    setOpen(next)
  }

  return [open, changeOpen] as const
}
