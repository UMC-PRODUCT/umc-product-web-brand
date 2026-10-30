import { Link } from "@tanstack/react-router"
import { UmcLogo } from "@umc-product/icons"

import "./header.css"

export function LogoHeader() {
  return (
    <header className="site-header site-header-translucent fixed inset-x-0 top-0 z-50 flex h-header items-center">
      <Link
        aria-label="UMC 홈"
        className="site-header-logo ml-4 rounded-lg p-4 lg:ml-[60px]"
        to="/"
      >
        <UmcLogo className="block" />
      </Link>
    </header>
  )
}
