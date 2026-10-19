import { createFileRoute, Link } from "@tanstack/react-router"
import { type ReactNode, useState } from "react"

import { Button } from "@/components/button/Button"
import { Footer } from "@/components/footer/Footer"

import {
  FaqAccordion,
  FaqAccordionItem,
} from "./-components/section/FaqAccordion"
import { FaqChip } from "./-components/section/FaqChip"
import { FeatureCard } from "./-components/section/FeatureCard"
import { ProjectCard } from "./-components/section/ProjectCard"
import { SchoolTagChip } from "./-components/section/SchoolTagChip"
import sampleProjectThumbnail from "./-preview/sample-project-thumbnail.jpg"
import sampleSchoolLogo from "./-preview/sample-school-logo.jpg"

const FAQ_CATEGORIES = ["전체", "PM", "Design", "Web PE", "Mobile PE"]

// 이슈 #22 컴포넌트 확인용 임시 페이지. 컴포넌트 커밋 전에 지운다
export const Route = createFileRoute("/components-preview")({
  component: ComponentsPreviewPage,
})

function ComponentsPreviewPage() {
  return (
    <main className="min-h-dvh bg-teal-grey-75 px-16 py-12">
      <h1 className="mb-12 text-display-1-bold text-teal-grey-900">
        컴포넌트 미리보기
      </h1>
      <div className="flex flex-col gap-16">
        <PreviewSection title="Button">
          <PreviewRow label="Glass · 화살표 O (링크)">
            <Button arrow asChild variant="glass">
              <Link to="/">챌린저들 프로젝트 구경하기</Link>
            </Button>
          </PreviewRow>
          <PreviewRow label="Fill · 화살표 O (링크)">
            <Button arrow asChild>
              <Link to="/">챌린저들 프로젝트 구경하기</Link>
            </Button>
          </PreviewRow>
          <PreviewRow label="Glass · 화살표 X">
            <Button variant="glass">챌린저들 프로젝트 구경하기</Button>
          </PreviewRow>
          <PreviewRow label="Fill · 화살표 X">
            <Button>챌린저들 프로젝트 구경하기</Button>
          </PreviewRow>
        </PreviewSection>
        <PreviewSection title="FAQ Chip">
          <PreviewRow label="Md (눌러서 선택)">
            <ChipGroup size="md" />
          </PreviewRow>
          <PreviewRow label="Sm (눌러서 선택)">
            <ChipGroup size="sm" />
          </PreviewRow>
        </PreviewSection>
        <PreviewSection title="FAQ Accordion">
          <FaqAccordion
            className="w-[1200px]"
            collapsible
            defaultValue="about"
            type="single"
          >
            <FaqAccordionItem
              question="전공자가 아니어도 지원할 수 있나요?"
              value="major"
            >
              네, 전공과 관계없이 지원할 수 있어요.
            </FaqAccordionItem>
            <FaqAccordionItem
              question="UMC는 어떤 동아리이고, 어떤 활동을 하나요?"
              value="about"
            >
              <p>
                UMC는 기획, 디자인, 개발 분야의 대학생들이 함께 공부하고 실제
                서비스를 만들어보는 전국 단위 IT 연합 동아리예요.
              </p>
              <br />
              <p>스터디 → 프로젝트 → 데모데이 순서로 약 6개월 동안 활동해요.</p>
              <p>
                스터디로 기본기를 쌓은 뒤 프로젝트 팀을 구성해 하나의 서비스를
                기획하고, 디자인하고, 개발하며 완성해요. 완성한 프로젝트는
                데모데이를 통해 다른 팀과 공유하고, 함께 돌아보는 시간을 가져요.
              </p>
            </FaqAccordionItem>
            <FaqAccordionItem
              question="다른 동아리나 학업과 함께할 수 있나요?"
              value="schedule"
            >
              네, 활동 일정은 학기 중 수업과 병행할 수 있게 짜여 있어요.
            </FaqAccordionItem>
          </FaqAccordion>
        </PreviewSection>
        <PreviewSection title="학교 Tag Chip">
          {(["lg", "md", "sm"] as const).map((size) => (
            <PreviewRow key={size} label={`${size} · Empty / Filled`}>
              <SchoolTagChip name="학교 명" size={size} />
              <SchoolTagChip
                logoSrc={sampleSchoolLogo}
                name="가천대학교"
                size={size}
              />
            </PreviewRow>
          ))}
          <PreviewRow label="sm · 다크 배경">
            <div className="flex gap-8 rounded-(--umc-radius-16) bg-teal-900 p-(--umc-spacing-padding-16)">
              <SchoolTagChip name="학교 명" size="sm" />
              <SchoolTagChip
                logoSrc={sampleSchoolLogo}
                name="가천대학교"
                size="sm"
              />
            </div>
          </PreviewRow>
        </PreviewSection>
        <PreviewSection title="Feature Card (마우스를 올려 hover 확인)">
          <div
            className="box-content grid w-[1200px] grid-cols-4 gap-(--umc-spacing-gap-28) rounded-(--umc-radius-24) bg-teal-grey-75 p-(--umc-spacing-padding-24)"
            id="feature-card-preview"
          >
            <FeatureCard
              description="사용자의 문제를 발견하고 해결할 문제를 정의해요. 아이디어를 구체화하고, 기획부터 출시까지 제품이 완성되는 전 과정을 이끌어요."
              title="PM"
            />
            <FeatureCard
              description="사용자가 더 쉽고 편리하게 사용할 수 있는 경험을 설계해요. 직관적인 UX와 완성도 높은 UI로 아이디어를 실제 제품 경험으로 만들어가요."
              title="Design"
            />
            <FeatureCard
              description="기획된 서비스를 실제로 동작하는 웹 제품으로 구현해요. Frontend와 Backend를 아우르며 화면 구현부터 API, 데이터베이스, 인증, 배포까지 웹 제품 개발의 전 과정을 경험해요."
              title={
                <>
                  Web
                  <br />
                  Product Engineer
                </>
              }
            />
            <FeatureCard
              description="기획된 서비스를 사용자가 직접 이용하는 모바일 앱으로 구현해요. 화면 구현부터 기능 개발, 서버 연동, 데이터 처리, 배포까지 모바일 제품 개발의 전 과정을 경험해요."
              title={
                <>
                  Mobile
                  <br />
                  Product Engineer
                </>
              }
            />
          </div>
        </PreviewSection>
        <PreviewSection title="project card">
          <div
            className="flex gap-(--umc-spacing-gap-24)"
            id="project-card-preview"
          >
            <ProjectCard
              className="w-[390px]"
              description="프로젝트 한 줄 소개가 여기에 표시됩니다. 프로젝트 한 줄 소개가 표시됩니다. 두 줄 이상의 내용은 ... 처리됩니다."
              name="프로젝트명"
              parts={["Plan", "Design", "Web", "SpringBoot"]}
              thumbnailSrc={sampleProjectThumbnail}
            />
            <ProjectCard
              className="w-[390px]"
              description="짧은 소개"
              name="소개가 한 줄인 프로젝트"
              parts={[
                "Plan",
                "Design",
                "iOS",
                "Android",
                "Web",
                "SpringBoot",
                "Node.js",
              ]}
              thumbnailSrc={sampleProjectThumbnail}
            />
          </div>
        </PreviewSection>
        <section className="-mx-16 flex flex-col gap-6">
          <h2 className="px-16 text-teal-grey-800 text-title-1-semibold">
            Footer (Dark / Light)
          </h2>
          <Footer tone="dark" />
          <Footer tone="light" />
        </section>
      </div>
    </main>
  )
}

function ChipGroup({ size }: { size: "md" | "sm" }) {
  const [selected, setSelected] = useState(FAQ_CATEGORIES[0])

  return (
    <div className="flex gap-2">
      {FAQ_CATEGORIES.map((category) => (
        <FaqChip
          key={category}
          onClick={() => setSelected(category)}
          selected={category === selected}
          size={size}
        >
          {category}
        </FaqChip>
      ))}
    </div>
  )
}

interface PreviewSectionProps {
  title: string
  children: ReactNode
}

function PreviewSection({ title, children }: PreviewSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-teal-grey-800 text-title-1-semibold">{title}</h2>
      <div className="flex flex-col gap-6 rounded-3xl bg-white p-10">
        {children}
      </div>
    </section>
  )
}

interface PreviewRowProps {
  label: string
  children: ReactNode
}

function PreviewRow({ label, children }: PreviewRowProps) {
  return (
    <div className="flex items-center gap-8">
      <p className="w-60 shrink-0 text-body-1-regular text-teal-grey-500">
        {label}
      </p>
      {children}
    </div>
  )
}
