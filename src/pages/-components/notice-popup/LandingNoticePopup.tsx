import { useState } from "react"

import { NOTICE_POPUP_MIN_WIDTH_QUERY, NOTICE_POPUP_TITLE } from "./constants"
import { DemoDayMatchingSlide } from "./DemoDayMatchingSlide"
import { NoticePopup } from "./NoticePopup"

const isWideEnoughForPopup = () =>
  window.matchMedia(NOTICE_POPUP_MIN_WIDTH_QUERY).matches

export function LandingNoticePopup() {
  const [open, setOpen] = useState(isWideEnoughForPopup)

  return (
    <NoticePopup
      onOpenChange={setOpen}
      open={open}
      slides={[
        {
          id: "demo-day-matching",
          content: <DemoDayMatchingSlide onNavigate={() => setOpen(false)} />,
        },
      ]}
      title={NOTICE_POPUP_TITLE}
    />
  )
}
