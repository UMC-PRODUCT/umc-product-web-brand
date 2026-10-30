import { type ReactNode } from "react"

import { Footer } from "@/components/footer/Footer"
import { LogoHeader } from "@/components/header/LogoHeader"
import { Container } from "@/components/layout/Container"
import { cn } from "@/utils/cn"

import { MemberHero } from "./MemberHero"
import { MEMBER_CONTAINER_CLASS } from "./memberLayout"

interface MemberPageShellProps {
  heroDescription: string
  children: ReactNode
}

export function MemberPageShell({
  heroDescription,
  children,
}: MemberPageShellProps) {
  return (
    <div className="min-h-dvh overflow-x-clip bg-teal-grey-50">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:bg-white focus:px-4 focus:py-2"
        href="#main"
      >
        본문으로 건너뛰기
      </a>
      <LogoHeader />
      <main id="main" tabIndex={-1}>
        <MemberHero description={heroDescription} />
        <Container className={cn(MEMBER_CONTAINER_CLASS, "pt-12 pb-20")}>
          {children}
        </Container>
      </main>
      <Footer tone="light" />
    </div>
  )
}
