import { createFileRoute, notFound } from "@tanstack/react-router"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

import {
  findProject,
  PROJECT_CONTAINER_CLASS,
  PROJECT_LIST_COPY,
} from "./-components/constants"
import { ProjectDetailHeader } from "./-components/ProjectDetailHeader"
import { ProjectDetailInfo } from "./-components/ProjectDetailInfo"
import { ProjectDetailTabs } from "./-components/ProjectDetailTabs"
import { ProjectImageStack } from "./-components/ProjectImageStack"
import { ProjectPageShell } from "./-components/ProjectPageShell"
import { PROJECT_DETAILS } from "./-components/projectDetails"
import { getProjectIntroImages } from "./-components/projectImageData"
import { parseProjectDetailSearch } from "./-components/projectSearch"

export const Route = createFileRoute("/projects/$projectId")({
  validateSearch: parseProjectDetailSearch,
  loader: ({ params }) => {
    const project = findProject(params.projectId)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.name} | UMC` }],
  }),
  component: ProjectDetailPage,
})

function ProjectDetailPage() {
  const project = Route.useLoaderData()
  const { tab = "intro" } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <ProjectPageShell>
      <Section headerTone="light" id="projects" labelledBy="project-title">
        {/* Figma: 헤더 80 아래 48부터 시작하고 아래 여백은 80이다 */}
        <Container className={`${PROJECT_CONTAINER_CLASS} pt-[128px] pb-20`}>
          <ProjectDetailHeader
            award={project.award}
            description={project.description}
            generation={project.generation}
            name={project.name}
            parts={project.parts}
            tabLabel={
              tab === "detail"
                ? PROJECT_LIST_COPY.detailInfo
                : PROJECT_LIST_COPY.detailIntro
            }
          />
          <ProjectDetailTabs
            detail={
              <ProjectDetailInfo
                detail={PROJECT_DETAILS[project.id]}
                name={project.name}
                projectId={project.id}
              />
            }
            intro={
              <ProjectImageStack
                eagerFirst
                images={getProjectIntroImages(project.id)}
                label={`${project.name} 소개 이미지`}
              />
            }
            onValueChange={(next) =>
              navigate({
                search: next === "detail" ? { tab: next } : {},
                replace: true,
                resetScroll: false,
              })
            }
            value={tab}
          />
        </Container>
      </Section>
    </ProjectPageShell>
  )
}
