import { useCountUp } from "./useCountUp"

import "./stats.css"

interface StatCardProps {
  label: string
  value: number
  unit: string
  countStarted: boolean
}

export function StatCard({ label, value, unit, countStarted }: StatCardProps) {
  const shownValue = useCountUp(value, countStarted)

  return (
    <div className="stat-card relative isolate flex w-full max-w-[356px] flex-col items-end justify-between gap-2.5 overflow-hidden rounded-3xl p-5 md:flex-1 md:gap-5 md:px-6 md:pt-7 md:pb-8 lg:h-[200px] lg:gap-0 lg:px-8 xl:pt-8 xl:pb-9">
      <dt className="w-full text-lg text-white leading-[1.3] tracking-[-0.04em] lg:text-[20px] xl:text-[26px]">
        {label}
      </dt>
      <dd>
        <span className="sr-only">{`${value}${unit} 이상`}</span>
        <span aria-hidden className="flex items-end">
          <span className="stat-card-value mr-[3px] font-bold text-[40px] text-teal-50 leading-[1.4] tracking-[-3px] lg:text-[60px] xl:text-[64px]">
            {shownValue}
          </span>
          <span className="flex items-end self-stretch">
            <span className="stat-card-unit -mr-[3px] self-start font-medium text-[32px] leading-none tracking-[-3px] lg:text-[38px]">
              +
            </span>
            <span className="stat-card-unit flex h-11 w-[30px] items-center font-medium text-[28px] leading-none tracking-[-3px] lg:text-[34px]">
              {unit}
            </span>
          </span>
        </span>
      </dd>
    </div>
  )
}
