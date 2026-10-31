import { cn } from "@/utils/cn"

import { type ProjectImage } from "./projectImageData"

interface ProjectImageStackProps {
  label: string
  images: readonly ProjectImage[]
  eagerFirst?: boolean
  className?: string
}

export function ProjectImageStack({
  label,
  images,
  eagerFirst = false,
  className,
}: ProjectImageStackProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {images.map(({ src, width, height }, index) => (
        <img
          alt={`${label} ${index + 1}`}
          className="block h-auto w-full"
          decoding="async"
          height={height}
          key={src}
          loading={eagerFirst && index === 0 ? "eager" : "lazy"}
          src={src}
          width={width}
        />
      ))}
    </div>
  )
}
