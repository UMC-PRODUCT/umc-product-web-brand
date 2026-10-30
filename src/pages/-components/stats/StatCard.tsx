import "./stats.css"

interface StatCardProps {
  label: string
  value: number
  unit: string
}

export function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <div className="stat-card relative isolate flex w-full max-w-[356px] flex-col items-end justify-between gap-2.5 overflow-hidden rounded-3xl p-5 md:h-[179px] md:flex-1 md:gap-5 md:px-6 md:pt-7 md:pb-8 lg:h-[200px] lg:px-8 xl:pt-8 xl:pb-9">
      <dt className="w-full text-lg text-white leading-[1.3] tracking-[-0.04em] lg:text-[20px] xl:text-[26px]">
        {label}
      </dt>
      <dd>
        <span className="sr-only">{`${value}${unit} 이상`}</span>
        <span aria-hidden className="flex items-end gap-1">
          <span className="stat-card-value font-bold text-[40px] text-teal-50 leading-[1.4] tracking-[-0.047em] lg:text-[60px] xl:text-[64px]">
            {value}
          </span>
          <span className="flex items-end self-stretch">
            <span className="stat-card-unit -mr-1.5 self-start font-medium text-[32px] leading-none tracking-[-0.08em] lg:text-[38px]">
              +
            </span>
            <span className="stat-card-unit flex h-[1.3em] w-[0.9em] items-center font-medium text-[28px] leading-none tracking-[-0.08em] lg:text-[34px]">
              {unit}
            </span>
          </span>
        </span>
      </dd>
    </div>
  )
}
