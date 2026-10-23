import { useState } from "react"

import { cn } from "@/utils/cn"

interface PreviewTabImageProps {
  src: string
  alt: string
  className?: string
}

export function PreviewTabImage({ src, alt, className }: PreviewTabImageProps) {
  const [loaded, setLoaded] = useState(false)

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
        // 숨긴 패널의 사진은 처음 열 때 받는다
        loading="lazy"
        onLoad={() => setLoaded(true)}
        // 캐시에 있던 사진은 onLoad 이전에 이미 끝나 있을 수 있다
        ref={(image) => {
          if (image?.complete && image.naturalWidth > 0) setLoaded(true)
        }}
        src={src}
        width={1021}
      />
    </div>
  )
}
