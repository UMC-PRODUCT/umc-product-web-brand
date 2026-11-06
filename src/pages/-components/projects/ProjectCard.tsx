import { cn } from "@/utils/cn"

interface ProjectCardProps {
  name: string
  description: string
  parts: readonly string[]
  award: string
  thumbnailSrc: string
  titleAs?: "h2" | "h3"
  className?: string
}

export function ProjectCard({
  name,
  description,
  parts,
  award,
  thumbnailSrc,
  titleAs: Title = "h3",
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-(--umc-radius-24) bg-fill-neutral-default",
        // Figma 그림자 두 겹: 바깥 프레임 0 4 16 #eceeee(토큰 없음), 카드 0 4 16 #eceeee 52%(drop-neutral-2)
        "shadow-[0_4px_16px_#eceeee,var(--umc-shadow-drop-neutral-2)]",
        className,
      )}
    >
      {/* 썸네일은 카드 폭의 절반 높이(372×186). 누른 채 움직여도 브라우저 기본 이미지 끌기가 일어나지 않게 막는다 */}
      <img
        alt=""
        className="aspect-[2/1] w-full select-none bg-white object-cover"
        decoding="async"
        draggable={false}
        height={186}
        loading="lazy"
        src={thumbnailSrc}
        width={372}
      />
      <div className="flex flex-col gap-(--umc-spacing-gap-12) px-(--umc-spacing-padding-20) py-(--umc-spacing-padding-24)">
        <div className="flex flex-col gap-(--umc-spacing-gap-6)">
          <div className="flex items-center gap-(--umc-spacing-gap-6)">
            {/* Figma 제목: SemiBold 22, 줄 높이 140%, 자간 -1%. 같은 텍스트 스타일 토큰이 없다 */}
            <Title className="min-w-0 flex-1 truncate font-semibold text-[22px] text-neutral-default-900 leading-[1.4] tracking-[-0.22px]">
              {name}
            </Title>
            {/* Figma Tag/Basic Weak·Md·Brand: 높이 26, 좌우 7, Medium 14 줄 높이 145% */}
            <span className="flex h-[26px] shrink-0 items-center rounded-(--umc-radius-6) bg-fill-primary-medium-100 px-[7px] font-medium text-[14px] text-brand-default-600 leading-[1.45] shadow-drop-neutral-3">
              {award}
            </span>
          </div>
          {/* 소개가 한 줄이어도 카드 높이가 같도록 두 줄 높이(16 × 1.45 × 2)를 확보한다 */}
          <p className="line-clamp-2 min-h-[46px] text-body-1-regular text-neutral-medium-600">
            {description}
          </p>
        </div>
        <p
          className="truncate text-body-1-regular text-neutral-weak-500"
          lang="en"
        >
          {parts.join(" · ")}
        </p>
      </div>
    </article>
  )
}
