import { cn } from "@/utils/cn"

interface ProjectCardProps {
  name: string
  description: string
  parts: string[]
  thumbnailSrc: string
  className?: string
}

export function ProjectCard({
  name,
  description,
  parts,
  thumbnailSrc,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        // 그림자 284141 12%, 반경 40px은 그림자 토큰에 없는 시안 값
        "flex flex-col overflow-hidden rounded-(--umc-radius-24) bg-white shadow-[0_4px_40px_rgb(40_65_65/0.12)]",
        className,
      )}
    >
      <img
        alt=""
        className="h-[260px] w-full bg-white object-cover"
        src={thumbnailSrc}
      />
      <div className="flex flex-col gap-(--umc-spacing-gap-12) px-(--umc-spacing-padding-20) pt-(--umc-spacing-padding-16) pb-(--umc-spacing-padding-24)">
        <h3 className="text-heading-2-semibold text-neutral-default-900">
          {name}
        </h3>
        <div className="flex flex-col gap-(--umc-spacing-gap-6) text-body-1-regular text-neutral-weak-500">
          <p className="line-clamp-2 h-[51px]">{description}</p>
          <p className="truncate">{parts.join(" · ")}</p>
        </div>
      </div>
    </article>
  )
}
