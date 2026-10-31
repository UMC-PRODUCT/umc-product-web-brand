import { createFileRoute, notFound } from "@tanstack/react-router"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"

import { findProject, PROJECT_CONTAINER_CLASS } from "./-components/constants"
import { ProjectDetailHeader } from "./-components/ProjectDetailHeader"
import { ProjectIntroImages } from "./-components/ProjectIntroImages"
import { ProjectPageShell } from "./-components/ProjectPageShell"
import { getProjectIntroImages } from "./-components/projectIntroImageData"

export const Route = createFileRoute("/projects/$projectId")({
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
          />
          <ProjectIntroImages
            images={getProjectIntroImages(project.id)}
            name={project.name}
          />
        </Container>
      </Section>
    </ProjectPageShell>
  )
}
