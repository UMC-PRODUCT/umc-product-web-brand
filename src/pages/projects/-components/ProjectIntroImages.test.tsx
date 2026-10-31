import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ProjectIntroImages } from "./ProjectIntroImages"
import { getProjectIntroImages } from "./projectIntroImageData"

const IMAGES = [
  { src: "/1.webp", width: 2576, height: 3200 },
  { src: "/2.webp", width: 2576, height: 1000 },
]

describe("ProjectIntroImages", () => {
  it("순서대로 보여주고 첫 조각만 바로 불러온다", () => {
    render(<ProjectIntroImages images={IMAGES} name="Muffin" />)

    const [first, second] = screen.getAllByRole("img")
    expect(first).toHaveAccessibleName("Muffin 소개 이미지 1")
    expect(first).toHaveAttribute("loading", "eager")
    expect(second).toHaveAccessibleName("Muffin 소개 이미지 2")
    expect(second).toHaveAttribute("loading", "lazy")
  })
})

describe("getProjectIntroImages", () => {
  it("없는 프로젝트는 빈 목록을 준다", () => {
    expect(getProjectIntroImages("unknown")).toEqual([])
  })

  it("조각을 번호 순서로 주고 마지막 조각만 높이가 다르다", () => {
    const images = getProjectIntroImages("brifo")

    expect(images).toHaveLength(2)
    expect(images[0]?.height).toBe(3200)
    expect(images[1]?.height).toBe(1147)
  })
})
