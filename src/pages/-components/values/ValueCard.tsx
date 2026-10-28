import { type ReactNode, useId, useState } from "react"

import "./values.css"

interface ValueCardProps {
  title: string
  subtitle: string
  image: string
  icon: ReactNode
  description: readonly string[]
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
      className="value-card relative isolate flex h-[210px] w-full max-w-[310px] flex-col justify-between gap-5 overflow-hidden rounded-3xl border-[#0b6b64] border-t-6 px-9 pt-12 pb-[38px] text-white max-md:data-[expanded=true]:h-auto md:h-[363px] md:w-auto md:max-w-none md:pb-[50px] lg:h-[460px] lg:min-w-0 lg:flex-1 xl:h-[400px] xl:max-w-[310px]"
      data-expanded={expanded}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
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
        <span className="value-card-badge flex size-[60px] shrink-0 items-center justify-center rounded-lg border border-[#15e7cf]">
          {icon}
        </span>
        <span className="flex flex-col gap-1 md:gap-[7px]">
          <span className="text-heading-1-semibold md:text-display-2-semibold">
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
          className="flex cursor-pointer flex-col items-start gap-[7px] text-left after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-white focus-visible:after:-outline-offset-4"
          onClick={() => setExpanded((isExpanded) => !isExpanded)}
          type="button"
        >
          <span className="text-heading-1-semibold md:text-display-2-semibold">
            {title}
          </span>{" "}
          <span className="text-title-2-semibold" lang="en">
            {subtitle}
          </span>
        </button>
      </h3>
      <div
        aria-hidden={!expanded}
        className="value-card-detail flex flex-col gap-[1.45em] whitespace-normal text-base leading-[1.45] tracking-[-0.01em] xl:whitespace-pre-line xl:text-[18px]"
        id={descriptionId}
      >
        {description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </li>
  )
}
