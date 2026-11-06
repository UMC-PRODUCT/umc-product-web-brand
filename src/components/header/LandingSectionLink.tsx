import { useLinkProps } from "@tanstack/react-router"
import { type ComponentPropsWithoutRef, type MouseEvent } from "react"

interface LandingSectionLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  sectionId: string
}

export function LandingSectionLink({
  sectionId,
  children,
  onClick,
  "aria-current": ariaCurrent,
  ...props
}: LandingSectionLinkProps) {
  const linkProps = useLinkProps({
    ...props,
    to: "/",
    hash: sectionId,
    activeProps: {},
  })
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    linkProps.onClick?.(event)
  }
  return (
    <a
      {...linkProps}
      aria-current={ariaCurrent}
      href={linkProps.href}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
