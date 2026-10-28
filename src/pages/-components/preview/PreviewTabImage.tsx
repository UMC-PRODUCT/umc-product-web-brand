import { useState } from "react"

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
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
    onLoad?.()
  }

  return (
    <div
      className={cn(
        "relative aspect-[1021/600] w-full overflow-hidden",
        className,
      )}
    >
      {/* 사진이 내려오는 동안 자리를 채우는 스켈레톤. 모션을 줄인 환경에서는 깜빡이지 않는다 */}
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 bg-teal-grey-75 motion-safe:animate-pulse"
          data-testid="preview-image-skeleton"
        />
      )}
      <img
        alt={alt}
        className={cn(
          "size-full select-none object-cover motion-safe:transition-opacity",
          loaded ? "opacity-100" : "opacity-0",
        )}
        decoding="async"
        draggable={false}
        height={600}
        // Preview 근처에 오기 전에는 받지 않는다. 첫 사진이 내려오면 PreviewPanel이 eager로 바꿔 나머지를 미리 받는다
        loading={loading}
        onLoad={handleLoad}
        // 캐시에 있던 사진은 onLoad 이전에 이미 끝나 있을 수 있다
        ref={(image) => {
          if (image?.complete && image.naturalWidth > 0) handleLoad()
        }}
        src={src}
        width={1021}
      />
    </div>
  )
}
