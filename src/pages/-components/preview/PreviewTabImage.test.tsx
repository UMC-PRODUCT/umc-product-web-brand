import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { PreviewTabImage } from "./PreviewTabImage"

describe("PreviewTabImage", () => {
  it("사진이 로드되기 전에는 스켈레톤을 보여주고 로드되면 없앤다", () => {
    const onLoad = vi.fn()
    render(
      <PreviewTabImage alt="행사 사진" onLoad={onLoad} src="/photo.webp" />,
    )

    expect(screen.getByTestId("preview-image-skeleton")).toBeInTheDocument()
    expect(screen.getByAltText("행사 사진")).toHaveClass("opacity-0")

    fireEvent.load(screen.getByAltText("행사 사진"))

    expect(
      screen.queryByTestId("preview-image-skeleton"),
    ).not.toBeInTheDocument()
    expect(screen.getByAltText("행사 사진")).toHaveClass("opacity-100")
    expect(onLoad).toHaveBeenCalled()
  })
})
