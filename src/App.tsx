import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRouter, RouterProvider } from "@tanstack/react-router"

import { routeTree } from "./routeTree.gen"

const DEFAULT_STALE_TIME_MS = 30 * 1000

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME_MS,
      retry: 1,
      refetchOnMount: true,
    },
  },
})

const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  context: { queryClient },
  defaultPreload: "intent",
  scrollRestorationBehavior: "instant",
  trailingSlash: "never",
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
