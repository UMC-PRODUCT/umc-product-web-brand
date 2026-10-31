import { type ReactNode, useId, useState } from "react"

import "./values.css"

interface ValueCardProps {
  title: string
  subtitle: string
  image: string
  icon: ReactNode
  description: string
}

export function ValueCard({
  title,
  subtitle,
  image,
  icon,
  description,
}: ValueCardProps) {
  const [expanded, setExpanded] = useState(false)
  const descriptionId = useId()

  return (
    <li
      className="value-card-slot h-[204px] w-[310px] md:h-[363px] md:w-auto lg:h-[460px] lg:min-w-0 lg:flex-1 xl:h-[400px] xl:max-w-[310px]"
      data-expanded={expanded}
    >
      <div className="value-card relative isolate flex h-full flex-col gap-2 overflow-hidden rounded-3xl border-t-6 px-5 pt-6 pb-5 text-white md:justify-between md:gap-0 md:px-9 md:pt-[58px] md:pb-[60px]">
        <div aria-hidden className="value-card-layers absolute inset-0 -z-10">
          <div className="value-card-base absolute inset-0" />
          <img
            alt=""
            className="value-card-photo absolute inset-0 size-full object-cover"
            decoding="async"
            height={840}
            loading="lazy"
            src={image}
            width={620}
          />
          <div className="value-card-shade absolute inset-0" />
          <div className="value-card-shade-active absolute inset-0" />
        </div>
        <div
          aria-hidden
          className="value-card-summary pointer-events-none absolute inset-x-9 bottom-[38px] flex items-center gap-4 md:bottom-[50px] md:flex-col md:items-start md:gap-5"
        >
          <span className="value-card-badge flex size-[60px] shrink-0 items-center justify-center rounded-lg backdrop-blur-[4px]">
            {icon}
          </span>
          <span className="flex flex-col gap-1 md:gap-[7px]">
            <span className="text-heading-2-semibold md:text-display-4-bold xl:text-display-2-semibold">
              {title}
            </span>
            <span className="font-medium text-lg text-teal-grey-300 leading-[1.35] tracking-[-0.01em] md:text-[22px] xl:text-2xl">
              {subtitle}
            </span>
          </span>
        </div>
        <h3 className="value-card-detail">
          <button
            aria-controls={descriptionId}
            aria-expanded={expanded}
            className="flex cursor-pointer flex-col items-start gap-1 text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-white focus-visible:after:-outline-offset-4 md:gap-[7px]"
            onClick={() => setExpanded((isExpanded) => !isExpanded)}
            type="button"
          >
            <span className="text-heading-2-semibold md:text-display-4-bold xl:text-display-2-semibold">
              {title}
            </span>{" "}
            <span
              className="text-title-4-semibold md:text-title-2-semibold"
              lang="en"
            >
              {subtitle}
            </span>
          </button>
        </h3>
        <p
          aria-hidden={!expanded}
          className="value-card-detail max-w-[238px] whitespace-pre-line text-sm leading-[1.45] tracking-[-0.01em] md:text-[18px]"
          id={descriptionId}
        >
          {description}
        </p>
      </div>
    </li>
  )
}
