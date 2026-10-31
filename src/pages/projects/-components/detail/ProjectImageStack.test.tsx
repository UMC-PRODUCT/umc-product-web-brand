import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PROJECT_LIST } from "../constants"
import { ProjectImageStack } from "./ProjectImageStack"
import {
  getProjectDetailImages,
  getProjectIntroImages,
} from "./projectImageData"

const IMAGES = [
  { src: "/1.webp", width: 2576, height: 3200 },
  { src: "/2.webp", width: 2576, height: 1000 },
]

describe("ProjectImageStack", () => {
  it("순서대로 보여주고 요청하면 첫 조각만 바로 불러온다", () => {
    render(<ProjectImageStack eagerFirst images={IMAGES} label="Muffin 소개" />)

    const [first, second] = screen.getAllByRole("img")
    expect(first).toHaveAccessibleName("Muffin 소개 1")
    expect(first).toHaveAttribute("loading", "eager")
    expect(second).toHaveAccessibleName("Muffin 소개 2")
    expect(second).toHaveAttribute("loading", "lazy")
  })

  it("기본으로는 모든 조각을 지연해서 불러온다", () => {
    render(<ProjectImageStack images={IMAGES} label="IA" />)

    for (const image of screen.getAllByRole("img")) {
      expect(image).toHaveAttribute("loading", "lazy")
    }
  })
})

describe("projectImageData", () => {
  it("없는 프로젝트는 빈 목록을 준다", () => {
    expect(getProjectIntroImages("unknown")).toEqual([])
  })

  it("조각을 번호 순서로 주고 마지막 조각만 높이가 다르다", () => {
    const images = getProjectIntroImages("brifo")

    expect(images).toHaveLength(2)
    expect(images[0]?.height).toBe(3200)
    expect(images[1]?.height).toBe(1147)
  })

  it("모든 프로젝트에 IA와 Design System이 있다", () => {
    for (const { id } of PROJECT_LIST) {
      expect(getProjectDetailImages(id, "ia").length).toBeGreaterThan(0)
      expect(
        getProjectDetailImages(id, "design-system").length,
      ).toBeGreaterThan(0)
    }
  })

  it("티칭만 UI 이미지가 없다", () => {
    const withoutUi = PROJECT_LIST.filter(
      ({ id }) => getProjectDetailImages(id, "ui").length === 0,
    )

    expect(withoutUi.map(({ id }) => id)).toEqual(["teaching"])
  })
})
