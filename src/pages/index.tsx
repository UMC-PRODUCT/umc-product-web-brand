import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <h1 className="font-bold text-2xl md:text-4xl">UMC</h1>
    </main>
  )
}
