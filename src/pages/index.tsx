import { createFileRoute } from "@tanstack/react-router"
import { useRef } from "react"

import { Footer } from "@/components/footer/Footer"
import { SiteHeader } from "@/components/header/SiteHeader"

import { AboutSection } from "./-components/about/AboutSection"
import { CtaSection } from "./-components/cta/CtaSection"
import { FaqSection } from "./-components/faq/FaqSection"
import { HeroSection } from "./-components/hero/HeroSection"
import { PreviewSection } from "./-components/preview/PreviewSection"
import { ProjectsSection } from "./-components/projects/ProjectsSection"
import { RecruitmentSection } from "./-components/recruitment/RecruitmentSection"
import { StatsSection } from "./-components/stats/StatsSection"
import { UniversitiesSection } from "./-components/universities/UniversitiesSection"
import { useSectionMagnet } from "./-components/useSectionMagnet"
import { ValuesSection } from "./-components/values/ValuesSection"

import "./-components/landing.css"

export const Route = createFileRoute("/")({
  component: LandingPage,
})

function LandingPage() {
  const mainRef = useRef<HTMLElement>(null)
  useSectionMagnet(mainRef)

  return (
    <div className="min-h-dvh overflow-x-clip bg-background-neutral-weak">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-70 focus:bg-white focus:px-4 focus:py-2"
        href="#main"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main
        className="landing-main flex flex-col"
        id="main"
        ref={mainRef}
        tabIndex={-1}
      >
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ValuesSection />
        <PreviewSection />
        <UniversitiesSection />
        <ProjectsSection />
        <RecruitmentSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
