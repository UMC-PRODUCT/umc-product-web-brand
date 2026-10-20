import "./universities.css"

import { cn } from "@/utils/cn"

import { type School } from "./constants"
import { SchoolTagChip } from "./SchoolTagChip"

interface UniversityMarqueeProps {
  schools: School[]
  reverse?: boolean
  className?: string
}

// 같은 목록을 두 벌 이어 붙여 절반(-50%)만 이동하면 끊김 없이 반복된다
export function UniversityMarquee({
  schools,
  reverse = false,
  className,
}: UniversityMarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "university-marquee-track flex w-max",
          reverse && "university-marquee-track-reverse",
        )}
      >
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
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
