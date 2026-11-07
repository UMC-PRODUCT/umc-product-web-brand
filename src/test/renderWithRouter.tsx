import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { act, render } from "@testing-library/react"
import { type ReactNode } from "react"

interface RenderWithRouterOptions {
  path?: string
}

export async function renderWithRouter(
  ui: ReactNode,
  { path = "/" }: RenderWithRouterOptions = {},
) {
  const router = createRouter({
    routeTree: createRootRoute({ component: () => ui }),
    history: createMemoryHistory({ initialEntries: [path] }),
    trailingSlash: "never",
  })
  const view = await act(async () => render(<RouterProvider router={router} />))
  return { ...view, router }
}
