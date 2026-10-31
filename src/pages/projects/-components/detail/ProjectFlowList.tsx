import { type ProjectFlowStep } from "./projectDetails"

interface ProjectFlowListProps {
  steps: readonly ProjectFlowStep[]
}

export function ProjectFlowList({ steps }: ProjectFlowListProps) {
  return (
    <ol className="mt-8 flex flex-col gap-(--umc-spacing-gap-24)">
      {steps.map(({ text, note }, index) => (
        <li
          className="flex items-start gap-[10px] md:gap-(--umc-spacing-gap-12) lg:gap-[14px]"
          key={text}
        >
          {/* Figma Badge/Brand/Number: 지름 28, Medium 18, 흰 글자 */}
          <span className="flex size-[28px] shrink-0 items-center justify-center rounded-(--umc-radius-full) bg-teal-grey-400 font-medium text-[18px] text-white leading-[1.4]">
            {index + 1}
          </span>
          <p className="flex min-w-0 flex-wrap items-center gap-x-(--umc-spacing-gap-12) font-medium text-[14px] text-neutral-default-900 leading-[1.4] tracking-[-0.02em] md:text-[16px] lg:text-[20px]">
            {text}
            {note && (
              <span className="text-[14px] text-neutral-weak-500 lg:text-[16px]">
                {note}
              </span>
            )}
          </p>
        </li>
      ))}
    </ol>
  )
}
