import { type ProjectIntroImage } from "./projectIntroImageData"

interface ProjectIntroImagesProps {
  name: string
  images: readonly ProjectIntroImage[]
}

export function ProjectIntroImages({ name, images }: ProjectIntroImagesProps) {
  return (
    <div className="mt-8 px-3">
      {images.map(({ src, width, height }, index) => (
        <img
          alt={`${name} 소개 이미지 ${index + 1}`}
          className="block h-auto w-full"
          decoding="async"
          height={height}
          key={src}
          loading={index === 0 ? "eager" : "lazy"}
          src={src}
          width={width}
        />
      ))}
    </div>
  )
}
