import { useCanGoBack, useNavigate, useRouter } from "@tanstack/react-router"
import { Button, ErrorPageContainer } from "@umc-product/react"

import "./not-found.css"

export function NotFoundPage() {
  const router = useRouter()
  const navigate = useNavigate()
  const canGoBack = useCanGoBack()

  return (
    <main className="not-found-page flex min-h-dvh items-center justify-center px-6 pt-20 pb-[116px]">
      <ErrorPageContainer
        actions={
          <>
            {canGoBack && (
              <Button
                onClick={() => router.history.back()}
                size="lg"
                variant="weak"
              >
                이전으로 이동
              </Button>
            )}
            <Button onClick={() => navigate({ to: "/" })} size="lg">
              홈으로 이동
            </Button>
          </>
        }
        body={
          <>
            입력한 주소가 잘못되었거나,
            <br />
            페이지가 이동 또는 삭제되었을 수 있어요
          </>
        }
        title="페이지를 찾을 수 없어요"
      />
    </main>
  )
}
