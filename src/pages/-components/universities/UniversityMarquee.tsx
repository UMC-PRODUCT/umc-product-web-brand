import { useRef } from "react"

import { cn } from "@/utils/cn"

import { type School } from "./constants"
import { SchoolTagChip } from "./SchoolTagChip"
import { useMarquee } from "./useMarquee"

interface UniversityMarqueeProps {
  schools: School[]
  reverse?: boolean
  className?: string
}

// 같은 목록을 두 벌 이어 붙여 한 벌 너비만큼 이동하면 끊김 없이 반복된다
export function UniversityMarquee({
  schools,
  reverse = false,
  className,
}: UniversityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  useMarquee(trackRef, { reverse })

  return (
    <div
      className={cn(
        // 칩 위아래 2px씩: 포커스·그림자가 잘리지 않게 둔 여유. 칩 높이는 뷰포트별 44 · 60 · 64
        "cursor-grab touch-pan-y select-none overflow-hidden overscroll-x-contain py-0.5 active:cursor-grabbing",
        className,
      )}
    >
      <div className="flex w-max will-change-transform" ref={trackRef}>
        {[false, true].map((isCopy) => (
          <ul
            aria-hidden={isCopy || undefined}
            className="flex shrink-0 gap-5 pr-5 pl-2"
            key={String(isCopy)}
          >
            {schools.map((school) => (
              <li key={school.name}>
                <SchoolTagChip
                  logoFrame={school.frame}
                  logoSrc={school.logo}
                  name={school.name}
                  size="responsive"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
