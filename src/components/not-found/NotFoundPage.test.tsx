import { QueryClient } from "@tanstack/react-query"
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { routeTree } from "@/routeTree.gen"
import { renderWithRouter } from "@/test/renderWithRouter"

import { NotFoundPage } from "./NotFoundPage"

describe("NotFoundPage", () => {
  it("맞는 경로가 없으면 404 페이지를 보여 준다", async () => {
    const router = createRouter({
      routeTree,
      history: createMemoryHistory({ initialEntries: ["/about/nope"] }),
      context: { queryClient: new QueryClient() },
    })

    await act(async () => render(<RouterProvider router={router} />))

    expect(
      await screen.findByRole("heading", { name: "페이지를 찾을 수 없습니다" }),
    ).toBeInTheDocument()
  })

  it("주소를 직접 입력해 들어왔으면 홈으로 가는 링크를 보여 준다", async () => {
    await renderWithRouter(<NotFoundPage />, { path: "/nope" })

    expect(screen.getByRole("link", { name: "홈으로 이동" })).toHaveAttribute(
      "href",
      "/",
    )
  })

  it("앱 안에서 이동해 왔으면 이전 경로로 돌아간다", async () => {
    const { router } = await renderWithRouter(<NotFoundPage />, { path: "/" })
    await act(() => router.navigate({ to: "/about/umc-product" }))

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "이전으로 이동" }))
    })

    expect(router.state.location.pathname).toBe("/")
  })
})
