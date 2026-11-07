import { type ToastApi, ToastProvider, useToast } from "@umc-product/react"
import { createContext, type ReactNode, useContext } from "react"

const TopToastApiContext = createContext<ToastApi | null>(null)

function TopToastBridge({ children }: { children: ReactNode }) {
  const api = useToast()
  return (
    <TopToastApiContext.Provider value={api}>
      {children}
    </TopToastApiContext.Provider>
  )
}

export function TopToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider placement="top">
      <TopToastBridge>{children}</TopToastBridge>
    </ToastProvider>
  )
}

export function useTopToast(): ToastApi {
  const api = useContext(TopToastApiContext)
  if (api === null) {
    throw new Error("useTopToast는 TopToastProvider 안에서만 쓸 수 있다")
  }
  return api
}
