import { type SyntheticEvent } from "react"

import { cn } from "@/utils/cn"

interface PreviewTabImageProps {
  src: string
  alt: string
  loading?: "lazy" | "eager"
  onLoad?: () => void
  className?: string
}

export function PreviewTabImage({
  src,
  alt,
  loading = "lazy",
  onLoad,
  className,
}: PreviewTabImageProps) {
  // 숨긴 패널(display: none)의 사진은 내려받아도 디코딩되지 않아 처음 열 때 한 프레임 비어 보인다. 받자마자 미리 디코딩해 둔다
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    // jsdom처럼 decode가 없는 환경도 있다
    event.currentTarget.decode?.().catch(() => {})
    onLoad?.()
  }

  return (
    <div
      className={cn(
        "relative aspect-[1021/600] w-full overflow-hidden lg:aspect-auto lg:h-[415.4px] xl:h-[500px]",
        className,
      )}
    >
      <img
        alt={alt}
        className="size-full select-none object-cover"
        // 탭을 열 때 디코딩이 덜 끝났어도 빈 프레임 없이 사진과 함께 그린다
        decoding="sync"
        draggable={false}
        height={600}
        // Preview 근처에 오기 전에는 받지 않는다. 첫 사진이 내려오면 PreviewPanel이 eager로 바꿔 나머지를 미리 받는다
        loading={loading}
        onLoad={handleLoad}
        src={src}
        width={1021}
      />
    </div>
  )
}
