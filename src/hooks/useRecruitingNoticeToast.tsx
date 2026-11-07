import { UnderConstructionPictogram } from "@umc-product/icons"
import { useToast } from "@umc-product/react"

import "./recruitingNoticeToast.css"

export const RECRUITING_NOTICE_MESSAGE =
  "리크루팅 서비스는 12기 모집 때 공개될 예정이에요"

const RECRUITING_NOTICE_DURATION_MS = 3000
const TRAILING_GRAPHIC_SIZE = 24

export function useRecruitingNoticeToast() {
  const toast = useToast()
  return () =>
    toast.show({
      message: RECRUITING_NOTICE_MESSAGE,
      icon: (
        <UnderConstructionPictogram
          className="recruiting-notice-toast-graphic"
          color="currentColor"
        />
      ),
      action: {
        label: (
          <UnderConstructionPictogram
            aria-label="닫기"
            color="currentColor"
            role="img"
            size={TRAILING_GRAPHIC_SIZE}
          />
        ),
        onClick: () => undefined,
      },
      duration: RECRUITING_NOTICE_DURATION_MS,
    })
}
