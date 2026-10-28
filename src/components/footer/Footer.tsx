import { UmcLogo } from "@umc-product/icons"
import { cva } from "class-variance-authority"
import {
  type ComponentType,
  Fragment,
  type ReactNode,
  type SVGProps,
} from "react"

import InstagramIcon from "@/assets/landing/footer/instagram.svg?react"
import KakaoIcon from "@/assets/landing/footer/kakao.svg?react"
import UmcEmblem from "@/assets/landing/footer/umc-emblem.svg?react"
import { type HeaderTone } from "@/components/layout/Section"
import { cn } from "@/utils/cn"

// 링크 주소는 아직 정해지지 않았다. href가 없으면 링크 대신 텍스트로 보여준다 (#22)
interface FooterLink {
  label: string
  href?: string
}

interface FooterLinkGroup {
  title: string
  links: FooterLink[]
}

const LEGAL_LINKS: FooterLink[] = [
  { label: "서비스이용약관" },
  { label: "개인정보처리방침" },
]

const LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "About",
    links: [{ label: "UMC PRODUCT" }, { label: "중앙사무국" }],
  },
  {
    title: "Service",
    links: [
      { label: "UMC PRODUCT APP" },
      { label: "리크루팅 서비스" },
      { label: "UPMS 서비스" },
    ],
  },
  {
    title: "Community",
    links: [{ label: "테크 블로그" }],
  },
]

interface FooterChannel {
  icon: ComponentType<SVGProps<SVGSVGElement>> | "umc"
  links: FooterLink[]
}

// Sm은 UMC 채널과 SNS 채널을 두 줄로 나눈다. Md 이상은 한 줄에 이어 놓는다
const CHANNEL_ROWS: FooterChannel[][] = [
  [
    {
      icon: "umc",
      links: [{ label: "Web" }, { label: "iOS" }, { label: "Android" }],
    },
    { icon: "umc", links: [{ label: "Product Tech" }] },
  ],
  [
    { icon: InstagramIcon, links: [{ label: "Instagram" }] },
    { icon: KakaoIcon, links: [{ label: "Kakao" }] },
  ],
]

// 다크 배경 283938, 라이트 배경 위 e5f5f2 10%는 토큰에 없는 시안 값 (#22)
// 라이트 배경은 Figma 변수 TealGray-100에 맞춰 코드 토큰 teal-grey-100을 쓴다
const footerVariants = cva("", {
  variants: {
    tone: {
      dark: "bg-[#283938] text-inverse",
      light:
        "bg-[linear-gradient(rgb(229_245_242/0.1),rgb(229_245_242/0.1))] bg-teal-grey-100 text-placeholder",
    },
  },
})

// Figma 변수 TealGray-100(f6f7f7)은 코드 토큰 teal-grey-100(eff0f0)과 값이 다르다. 코드 토큰을 따른다
const channelTextVariants = cva("", {
  variants: {
    tone: {
      dark: "text-teal-grey-100",
      light: "text-placeholder",
    },
  },
})

// 다크 시안의 "Made by" 글자는 Teal-75, 링크 묶음 제목은 Brand-Disabled-300에 연결되어 있다
const madeByTextVariants = cva("", {
  variants: {
    tone: {
      dark: "text-teal-75",
      light: "",
    },
  },
})

const groupTitleVariants = cva("", {
  variants: {
    tone: {
      dark: "text-brand-disabled-300",
      light: "",
    },
  },
})

interface FooterProps {
  tone?: HeaderTone
  className?: string
}

export function Footer({ tone = "dark", className }: FooterProps) {
  return (
    <footer
      className={cn(footerVariants({ tone }), className)}
      data-header-tone={tone}
    >
      <div
        className={cn(
          // Figma 1920 이상에서도 최대 폭 없이 화면 끝까지 넓어진다
          // Figma 묶음 간격 28 (Sm), 34 (Md 이상)
          "flex flex-col gap-(--umc-spacing-gap-28) md:gap-[34px]",
          // Figma 여백 40/24/40/32 (Sm), 64/56/64/60 (Md 이상)
          "py-10 pr-(--umc-spacing-padding-24) pl-8 md:py-(--umc-spacing-64) md:pr-[56px] md:pl-[60px]",
        )}
      >
        {/* Figma Footer 크기 변형: Sm (767 이하), Md (768 ~ 1023), Lg (1024 이상). Md는 브랜드와 약관 줄만 Lg와 다르다 */}
        {/* Sm은 브랜드 아래에 약관을 둔다. Md 이상은 시안처럼 간격 없이 양 끝에 두고, 한 줄에 들어가지 않으면 약관을 아래로 내린다 */}
        {/* 768에서 브랜드 264 + 약관 374 = 638이 콘텐츠 폭 652에 겨우 들어가므로 가로 간격을 두지 않는다 */}
        <div className="flex flex-col items-start gap-(--umc-spacing-gap-6) md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-0 md:gap-y-(--umc-spacing-gap-16)">
          {/* Figma 엠블럼 높이 15, 간격 8 (Sm, Md), 높이 20, 간격 16 (Lg) */}
          <p className="flex items-center gap-(--umc-spacing-gap-8) lg:gap-(--umc-spacing-gap-16)">
            <UmcEmblem
              aria-hidden
              className="h-[15px] w-auto shrink-0 lg:h-[20px]"
            />
            {/* Figma 텍스트: SemiBold 13 (Sm), 16 (Md), 20 (Lg), 줄 높이 160%, 자간 -2%. 같은 텍스트 스타일 토큰이 없다 */}
            <span
              className="font-semibold text-[13px] leading-[1.6] tracking-[-0.02em] md:text-[16px] lg:text-[20px]"
              lang="en"
            >
              University MakeUs Challenge
            </span>
          </p>
          <div
            className={cn(
              // 시안은 모든 크기에서 약관·저작권을 한 줄로 둔다 (360 콘텐츠 폭 304에 291이 들어간다)
              // Figma 간격 8 (Sm, Md), 24 (Lg)
              "flex items-center gap-(--umc-spacing-gap-8) whitespace-nowrap lg:gap-(--umc-spacing-gap-24)",
              // Figma 텍스트: Regular 10 (Sm), 13 (Md), 줄 높이 150%. Md의 Figma 스타일 Body/4-Regular는 코드 토큰에 없다. Lg는 body-3-regular
              "text-[10px] leading-[1.5] md:text-[13px] lg:text-body-3-regular",
            )}
          >
            <ul className="flex gap-(--umc-spacing-gap-8) lg:gap-(--umc-spacing-gap-24)">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
            {/* 브라우저 기본 font-size: smaller를 지우고 약관과 같은 크기로 맞춘다 */}
            <small className="text-[1em]" lang="en">
              © 2026 UMC All rights reserved.
            </small>
          </div>
        </div>
        <div className="flex flex-col gap-(--umc-spacing-gap-16)">
          <p
            className={cn(
              "text-body-4-semibold md:text-body-2-medium",
              madeByTextVariants({ tone }),
            )}
            lang="en"
          >
            Made by UMC PRODUCT
          </p>
          <nav
            aria-label="사이트 링크"
            // Figma 묶음 간격 16 (Sm), 140 (Md 이상). 좁은 화면에서 넘치면 줄을 바꾼다
            className="flex flex-wrap gap-x-(--umc-spacing-gap-16) gap-y-(--umc-spacing-gap-24) md:gap-x-[140px]"
          >
            {LINK_GROUPS.map((group) => (
              <div
                className="flex flex-col gap-(--umc-spacing-gap-10)"
                key={group.title}
              >
                <h2
                  className={cn(
                    "text-label-6-medium md:text-body-3-medium",
                    groupTitleVariants({ tone }),
                  )}
                  lang="en"
                >
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-(--umc-spacing-gap-4) text-label-7-medium md:text-label-5-medium">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterLinkItem link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <ul
          aria-label="UMC 채널"
          className={cn(
            // Figma 채널 간격 12 (Sm), 24 (Md 이상). Sm 줄 간격 6은 둘째 줄 채널의 위 여백으로 준다
            "flex flex-wrap items-center gap-x-(--umc-spacing-gap-12) md:gap-x-(--umc-spacing-gap-24) md:gap-y-(--umc-spacing-gap-8)",
            // Figma 텍스트: Medium 12, 줄 높이 130% (Sm). Md 이상은 Medium 14, 줄 높이 150%, 자간 -1%로 같은 텍스트 스타일 토큰이 없다
            "text-label-6-medium md:font-medium md:text-[14px] md:leading-[1.5] md:tracking-[-0.01em]",
            channelTextVariants({ tone }),
          )}
          lang="en"
        >
          {CHANNEL_ROWS.map((row, rowIndex) => (
            <Fragment key={row[0]?.links[0]?.label}>
              {/* Sm에서 채널 줄을 나누는 빈 항목 */}
              {rowIndex > 0 && (
                <li aria-hidden className="basis-full md:hidden" />
              )}
              {row.map((channel) => (
                <li
                  className={cn(
                    "flex items-center gap-[7px]",
                    rowIndex > 0 && "mt-(--umc-spacing-gap-6) md:mt-0",
                  )}
                  key={channel.links[0]?.label}
                >
                  <ChannelIcon icon={channel.icon} />
                  <span className="flex items-center gap-(--umc-spacing-2)">
                    {channel.links.map((link, index) => (
                      <ChannelLink isFirst={index === 0} key={link.label}>
                        <FooterLinkItem link={link} />
                      </ChannelLink>
                    ))}
                  </span>
                </li>
              ))}
            </Fragment>
          ))}
        </ul>
      </div>
    </footer>
  )
}

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (!link.href) return <span>{link.label}</span>

  return (
    <a
      className="outline-current outline-offset-2 hover:underline focus-visible:outline-2"
      href={link.href}
    >
      {link.label}
    </a>
  )
}

function ChannelLink({
  isFirst,
  children,
}: {
  isFirst: boolean
  children: ReactNode
}) {
  return (
    <>
      {!isFirst && <span aria-hidden>/</span>}
      {children}
    </>
  )
}

function ChannelIcon({ icon: Icon }: { icon: FooterChannel["icon"] }) {
  // Figma 워드마크 높이 9.4 (Sm), 12 (Md 이상)
  if (Icon === "umc")
    return (
      <UmcLogo
        aria-hidden
        className="h-[9.4px] w-auto md:h-[12px]"
        height={12}
      />
    )

  return <Icon aria-hidden className="size-[16px]" />
}
