import { useToast } from "@umc-product/react"

export const RECRUITING_NOTICE_MESSAGE =
  "리크루팅 서비스는 12기 모집 때 공개될 예정이에요"

export function useRecruitingNoticeToast() {
  const toast = useToast()
  return () => toast.showServiceNotice({ message: RECRUITING_NOTICE_MESSAGE })
}
