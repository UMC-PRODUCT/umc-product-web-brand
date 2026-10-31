// Figma Skeleton 채우기. 같은 값의 색 토큰이 없다
const BLOCK_CLASS = "bg-[#e9ecec] motion-safe:animate-pulse"
const LINE_CLASS = `h-[12px] rounded-(--umc-radius-6) ${BLOCK_CLASS}`

export function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex flex-col overflow-hidden rounded-(--umc-radius-12) bg-fill-neutral-default shadow-[0_4px_16px_#eceeee,var(--umc-shadow-drop-neutral-2)]"
    >
      <div className={`aspect-[2/1] w-full ${BLOCK_CLASS}`} />
      {/* Figma Type=Skeleton: 본문 높이를 실제 카드(118)와 맞춰 데이터가 들어와도 밀리지 않는다 */}
      <div className="px-(--umc-spacing-padding-20) py-(--umc-spacing-padding-24)">
        <div className="flex h-[118px] flex-col gap-(--umc-spacing-gap-10)">
          <div className="flex h-[25px] items-center">
            <div
              className={`h-[18px] w-[180px] max-w-full rounded-(--umc-radius-6) ${BLOCK_CLASS}`}
            />
          </div>
          <div className="flex flex-col gap-(--umc-spacing-gap-8) pt-(--umc-spacing-padding-4)">
            <div className={LINE_CLASS} />
            <div className={LINE_CLASS} />
            <div className={LINE_CLASS} />
          </div>
        </div>
      </div>
    </div>
  )
}
