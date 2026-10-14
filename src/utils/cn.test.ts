import { describe, expect, it } from "vitest"

import { cn } from "./cn"

describe("cn", () => {
  it("뒤에 오는 Tailwind 클래스가 충돌하는 앞 클래스를 덮는다", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4")
  })

  it("falsy 값은 무시한다", () => {
    const isActive = false

    expect(cn("text-sm", isActive && "font-bold", undefined)).toBe("text-sm")
  })
})
