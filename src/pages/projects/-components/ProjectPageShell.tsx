import { type ReactNode } from "react"

import { Footer } from "@/components/footer/Footer"
import { SiteHeader } from "@/components/header/SiteHeader"

interface ProjectPageShellProps {
  children: ReactNode
}

export function ProjectPageShell({ children }: ProjectPageShellProps) {
  return (
    <div className="min-h-dvh overflow-x-clip bg-teal-grey-50">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:bg-white focus:px-4 focus:py-2"
        href="#main"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer tone="light" />
    </div>
  )
}
