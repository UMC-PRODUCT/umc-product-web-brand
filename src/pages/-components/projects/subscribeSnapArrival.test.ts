import { type UseEmblaCarouselType } from "embla-carousel-react"
import { describe, expect, it, vi } from "vitest"

import { subscribeSnapArrival } from "./subscribeSnapArrival"

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>

function createFakeEmbla() {
  const listeners = new Map<string, Set<() => void>>()
  const createEngine = () => {
    const engineState = { target: 400, location: 0, pointerDown: false }
    const engine = {
      target: { get: () => engineState.target },
      offsetLocation: { get: () => engineState.location },
      dragHandler: { pointerDown: () => engineState.pointerDown },
    }
    return { engine, engineState }
  }
  let current = createEngine()
  const state = current.engineState
  const reInit = () => {
    current = createEngine()
    return current.engineState
  }
  const api = {
    internalEngine: () => current.engine,
    on: (event: string, callback: () => void) => {
      const set = listeners.get(event) ?? new Set()
      set.add(callback)
      listeners.set(event, set)
      return api
    },
    off: (event: string, callback: () => void) => {
      listeners.get(event)?.delete(callback)
      return api
    },
  }
  const emit = (event: string) => {
    for (const callback of listeners.get(event) ?? []) callback()
  }
  const count = () =>
    [...listeners.values()].reduce((sum, set) => sum + set.size, 0)
  return {
    embla: api as unknown as EmblaCarouselType,
    state,
    emit,
    count,
    reInit,
  }
}

describe("subscribeSnapArrival", () => {
  it("넘어가기 시작한 카드가 가운데에서 0.5px 안으로 들어오면 한 번만 알린다", () => {
    const { embla, state, emit } = createFakeEmbla()
    const onArrive = vi.fn()
    subscribeSnapArrival(embla, onArrive)

    emit("select")
    state.location = 399
    emit("scroll")
    expect(onArrive).not.toHaveBeenCalled()

    state.location = 399.6
    emit("scroll")
    state.location = 399.9
    emit("scroll")
    state.location = 400
    emit("settle")
    expect(onArrive).toHaveBeenCalledTimes(1)
  })

  it("끄는 동안에는 가운데를 지나도 알리지 않고 손을 뗀 뒤 도착하면 알린다", () => {
    const { embla, state, emit } = createFakeEmbla()
    const onArrive = vi.fn()
    subscribeSnapArrival(embla, onArrive)

    state.pointerDown = true
    emit("select")
    state.location = 400
    emit("scroll")
    expect(onArrive).not.toHaveBeenCalled()

    state.pointerDown = false
    emit("scroll")
    expect(onArrive).toHaveBeenCalledTimes(1)
  })

  it("움직임 없이 바로 옮겨지면 선택되는 즉시 알린다", () => {
    const { embla, state, emit } = createFakeEmbla()
    const onArrive = vi.fn()
    subscribeSnapArrival(embla, onArrive)

    state.location = 400
    emit("settle")
    expect(onArrive).not.toHaveBeenCalled()

    emit("select")
    expect(onArrive).toHaveBeenCalledTimes(1)
  })

  it("Embla가 다시 초기화되면 새 엔진의 위치로 도착을 판정한다", () => {
    const { embla, state, emit, reInit } = createFakeEmbla()
    const onArrive = vi.fn()
    subscribeSnapArrival(embla, onArrive)

    state.location = 400
    const next = reInit()
    emit("select")
    expect(onArrive).not.toHaveBeenCalled()

    next.location = 400
    emit("scroll")
    expect(onArrive).toHaveBeenCalledTimes(1)
  })

  it("구독을 풀면 리스너를 모두 지운다", () => {
    const { embla, count } = createFakeEmbla()
    const unsubscribe = subscribeSnapArrival(embla, vi.fn())

    unsubscribe()
    expect(count()).toBe(0)
  })
})
