import { ChevronRightIcon } from "@umc-product/icons"

interface PageHeaderProps {
  title: string
  description: string
}

const CHEVRON_SIZE = 16

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="md:pl-3">
      <nav aria-label="현재 위치">
        <ol className="flex h-[22px] items-center font-medium text-[13px] text-teal-grey-400 leading-[1.5] md:text-body-3-medium">
          <li>About</li>
          <li aria-current="page" className="flex items-center">
            <ChevronRightIcon aria-hidden size={CHEVRON_SIZE} />
            {title}
          </li>
        </ol>
      </nav>
      <h1 className="mt-[26px] text-heading-4-semibold text-teal-grey-900 md:text-heading-2-semibold">
        {title}
      </h1>
      <p className="mt-3 text-body-3-regular text-teal-grey-600">
        {description}
      </p>
    </header>
  )
}
