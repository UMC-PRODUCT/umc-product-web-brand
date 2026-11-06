import { renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { useSmoothAnchorScroll } from "./anchorScroll"

function renderHeaderLink(href: string) {
  const header = document.createElement("header")
  const link = document.createElement("a")
  link.href = href
  header.append(link)
  document.body.append(header)
  renderHook(() => useSmoothAnchorScroll({ current: header }))
  return link
}

function addSection(id: string) {
  const section = document.createElement("section")
  section.id = id
  document.body.append(section)
}

function clickAndReadPrevented(link: HTMLAnchorElement) {
  let prevented = false
  document.addEventListener(
    "click",
    (event) => {
      prevented = event.defaultPrevented
      event.preventDefault()
    },
    { once: true },
  )
  link.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }),
  )
  return prevented
}

function stubReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce,
    media: query,
  }))
}

describe("useSmoothAnchorScroll", () => {
  beforeEach(() => {
    stubReducedMotion(false)
    vi.stubGlobal("requestAnimationFrame", vi.fn())
    vi.stubGlobal("cancelAnimationFrame", vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.replaceChildren()
  })

  it("경로가 붙은 해시 링크도 대상이 지금 문서에 있으면 가로챈다", () => {
    addSection("faq")
    const link = renderHeaderLink("/#faq")

    expect(clickAndReadPrevented(link)).toBe(true)
  })

  it("대상이 지금 문서에 없으면 가로채지 않는다", () => {
    const link = renderHeaderLink("/#faq")

    expect(clickAndReadPrevented(link)).toBe(false)
  })

  it("다른 출처 링크는 같은 id가 있어도 가로채지 않는다", () => {
    addSection("faq")
    const link = renderHeaderLink("https://example.com/#faq")

    expect(clickAndReadPrevented(link)).toBe(false)
  })

  it("동작 줄이기 설정이면 가로채지 않는다", () => {
    stubReducedMotion(true)
    addSection("faq")
    const link = renderHeaderLink("/#faq")

    expect(clickAndReadPrevented(link)).toBe(false)
  })
})
