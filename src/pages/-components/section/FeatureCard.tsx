import { type ReactNode } from "react"

import { cn } from "@/utils/cn"

interface FeatureCardProps {
  title: ReactNode
  description: ReactNode
  className?: string
}

export function FeatureCard({
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        // Figma 채우기: teal-grey-400 20% 위에 민트 오버레이, 청록 그라데이션 2겹(4%·6%)
        // 민트 오버레이만 hover 전환을 위해 별도 요소로 빼서 그라데이션 위에 그린다 (그라데이션이 옅어 차이는 보이지 않음)
        // 2ed1be, d0f5f1은 토큰에 없는 시안 값 (#22). Figma Glass 효과는 배경 블러로 옮긴다
        "group relative isolate flex h-[281px] flex-col overflow-hidden rounded-[30px] border-t-4 border-t-primary-strong-500 bg-[linear-gradient(119.32deg,rgb(46_209_190/0.024)_8.35%,transparent_48.63%),linear-gradient(-67.94deg,rgb(46_209_190/0.04)_16.53%,transparent_37.28%)] bg-fill-neutral-inverse-weak-400/20 px-(--umc-spacing-padding-28) pt-(--umc-spacing-padding-32) backdrop-blur-[4px]",
        // 가장자리 명암: Figma Glass 효과(깊이 20, 빛 각도 -45°, 세기 0.8)를 렌더링 픽셀에 맞춘 안쪽 그림자로 흉내 낸다
        // 왼쪽 밝은 1px 선(위는 초록 테두리), 아래·오른쪽 옅은 1px 선, 위·왼쪽 안쪽 그늘(~14px), 아래·오른쪽 안쪽 반사(~8px)
        // hover 민트 오버레이에 덮이지 않도록 ::after에 그린다
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_1px_0_0_rgb(255_255_255/0.3),inset_-1px_-1px_0_rgb(255_255_255/0.15),inset_3px_3px_14px_-4px_rgb(40_65_65/0.08),inset_-3px_-3px_10px_-4px_rgb(255_255_255/0.55)] after:content-['']",
        className,
      )}
    >
      {/* hover 때 진해지는 민트 오버레이. Figma 테두리는 안쪽에 그려지므로 위 여백은 36px에서 테두리 4px를 뺀 32px */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#d0f5f1] opacity-12 group-hover:opacity-40 motion-safe:transition-opacity"
      />
      <div className="flex h-[206px] flex-col justify-between">
        <h3 className="text-brand-strong-800 text-heading-2-semibold">
          {title}
        </h3>
        <p className="text-body-1-regular text-neutral-strong-800">
          {description}
        </p>
      </div>
    </article>
  )
}
