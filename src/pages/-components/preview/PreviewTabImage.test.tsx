import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { PreviewTabImage } from "./PreviewTabImage"

describe("PreviewTabImage", () => {
  it("사진이 로드되면 미리 디코딩하고 onLoad를 부른다", () => {
    const onLoad = vi.fn()
    render(
      <PreviewTabImage alt="행사 사진" onLoad={onLoad} src="/photo.webp" />,
    )

    const image = screen.getByAltText<HTMLImageElement>("행사 사진")
    const decode = vi.fn(() => Promise.resolve())
    image.decode = decode

    fireEvent.load(image)

    expect(decode).toHaveBeenCalled()
    expect(onLoad).toHaveBeenCalled()
  })
})
