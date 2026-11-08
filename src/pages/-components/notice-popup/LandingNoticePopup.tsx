import { NOTICE_POPUP_TITLE } from "./constants"
import { DemoDayMatchingSlide } from "./DemoDayMatchingSlide"
import { NoticePopup } from "./NoticePopup"
import { useNoticePopupOpen } from "./useNoticePopupOpen"

export function LandingNoticePopup() {
  const [open, setOpen] = useNoticePopupOpen()

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
