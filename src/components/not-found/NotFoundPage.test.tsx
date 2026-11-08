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
      await screen.findByRole("heading", { name: "페이지를 찾을 수 없어요" }),
    ).toBeInTheDocument()
  })

  it("주소를 직접 입력해 들어왔으면 홈으로 이동 버튼만 보여 주고 누르면 홈으로 간다", async () => {
    const { router } = await renderWithRouter(<NotFoundPage />, {
      path: "/nope",
    })

    expect(
      screen.queryByRole("button", { name: "이전으로 이동" }),
    ).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "홈으로 이동" }))
    })

    expect(router.state.location.pathname).toBe("/")
  })

  it("앱 안에서 이동해 왔으면 이전으로 이동 버튼으로 이전 경로에 돌아간다", async () => {
    const { router } = await renderWithRouter(<NotFoundPage />, { path: "/" })
    await act(() => router.navigate({ to: "/about/umc-product" }))

    expect(
      screen.getByRole("button", { name: "홈으로 이동" }),
    ).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "이전으로 이동" }))
    })

    expect(router.state.location.pathname).toBe("/")
  })
})
