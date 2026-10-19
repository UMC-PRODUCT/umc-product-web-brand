import "./stats.css"

interface StatCardProps {
  label: string
  value: number
  unit: string
}

export function StatCard({ label, value, unit }: StatCardProps) {
  return (
    <div className="stat-card relative isolate flex h-[220px] flex-1 flex-col items-end justify-between overflow-hidden rounded-3xl px-8 pt-8 pb-9">
      <dt className="w-full text-[24px] text-white leading-[1.3] tracking-[-0.96px]">
        {label}
      </dt>
      <dd>
        <span className="sr-only">{`${value}${unit} 이상`}</span>
        <span aria-hidden className="flex items-end gap-1">
          <span className="stat-card-value font-bold text-[72px] text-teal-50 leading-[72px] tracking-[-3px]">
            {value}
          </span>
          <span className="flex h-[72px] items-end">
            <span className="stat-card-unit -mr-1 self-start font-medium text-[38px] leading-none tracking-[-3px]">
              +
            </span>
            <span className="stat-card-unit flex h-11 w-[30px] items-center font-medium text-[34px] leading-none tracking-[-3px]">
              {unit}
            </span>
          </span>
        </span>
      </dd>
    </div>
  )
}
