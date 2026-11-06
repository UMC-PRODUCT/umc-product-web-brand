import { Link, useCanGoBack, useRouter } from "@tanstack/react-router"

import cone from "@/assets/not-found/cone.svg"

import "./not-found.css"

const CONE_WIDTH_PX = 192
const CONE_HEIGHT_PX = 180
const ACTION_CLASS =
  "flex h-12 min-w-24 cursor-pointer items-center justify-center rounded-xl bg-teal-600 px-6 font-semibold text-[18px] text-white leading-[1.4] tracking-[-0.01em] outline-teal-500 outline-offset-2 focus-visible:outline-2 md:h-14 md:px-8 md:text-title-2-semibold"

export function NotFoundPage() {
  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <main className="not-found-page flex min-h-dvh items-center justify-center px-6 pt-20 pb-[116px]">
      <div className="flex w-full max-w-[460px] flex-col items-center gap-9 text-center md:gap-[46px]">
        <img
          alt=""
          className="h-[135px] w-[144px] md:h-[180px] md:w-[192px]"
          height={CONE_HEIGHT_PX}
          src={cone}
          width={CONE_WIDTH_PX}
        />
        <div className="flex flex-col items-center gap-8 md:gap-[38px]">
          <div className="flex flex-col gap-3 md:gap-[18px]">
            <h1 className="font-bold text-[28px] text-teal-500 leading-[1.2] tracking-[-0.02em] md:text-[40px]">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="font-medium text-[16px] text-teal-grey-600 leading-[1.5] tracking-[-0.01em] md:text-[20px]">
              입력하신 주소가 잘못되었거나,
              <br />
              페이지가 이동 또는 삭제되었을 수 있습니다.
            </p>
          </div>
          {canGoBack ? (
            <button
              className={ACTION_CLASS}
              onClick={() => router.history.back()}
              type="button"
            >
              이전으로 이동
            </button>
          ) : (
            <Link className={ACTION_CLASS} to="/">
              홈으로 이동
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
