import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ToastProvider } from "@umc-product/react"

import { TopToastProvider } from "@/components/toast/TopToastProvider"

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
      <TopToastProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </TopToastProvider>
    </QueryClientProvider>
  )
}
