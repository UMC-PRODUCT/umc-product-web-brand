import { UmcLogo } from "@umc-product/icons"
import { cva } from "class-variance-authority"
import { type ComponentType, type ReactNode, type SVGProps } from "react"

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

const CHANNELS: FooterChannel[] = [
  {
    icon: "umc",
    links: [{ label: "Web" }, { label: "iOS" }, { label: "Android" }],
  },
  { icon: "umc", links: [{ label: "Product Tech" }] },
  { icon: InstagramIcon, links: [{ label: "Instagram" }] },
  { icon: KakaoIcon, links: [{ label: "Kakao" }] },
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
          "flex flex-col gap-[34px] py-(--umc-spacing-64)",
          // Figma 여백 64/56/64/60 (Pad 이상). Mobile 시안이 없어 다른 섹션과 같은 좌우 32를 쓴다
          "px-8 md:pr-[56px] md:pl-[60px]",
        )}
      >
        {/* Mobile은 시안이 없어 세로로 쌓는다. Pad는 브랜드와 약관이 한 줄에 들어가지 않으면 약관을 아래로 내린다 */}
        <div className="flex flex-col items-start gap-(--umc-spacing-gap-16) md:flex-row md:flex-wrap md:items-center md:justify-between">
          <p className="flex items-center gap-(--umc-spacing-gap-16)">
            <UmcEmblem aria-hidden className="h-[20px] w-auto shrink-0" />
            {/* Figma 텍스트: SemiBold 20, 줄 높이 160%, 자간 -2%. 같은 텍스트 스타일 토큰이 없다 */}
            <span
              className="font-semibold text-[20px] leading-[1.6] tracking-[-0.02em]"
              lang="en"
            >
              University MakeUs Challenge
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-x-(--umc-spacing-gap-24) gap-y-(--umc-spacing-gap-4) text-body-3-regular">
            <ul className="flex gap-(--umc-spacing-gap-24)">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
            <small className="text-body-3-regular" lang="en">
              © 2026 UMC All rights reserved.
            </small>
          </div>
        </div>
        <div className="flex flex-col gap-(--umc-spacing-gap-16)">
          <p
            className={cn("text-body-2-medium", madeByTextVariants({ tone }))}
            lang="en"
          >
            Made by UMC PRODUCT
          </p>
          <nav
            aria-label="사이트 링크"
            // Figma 묶음 간격 140 (Pad 이상). Mobile은 140이 들어가지 않아 40으로 줄이고 줄을 바꾼다
            className="flex flex-wrap gap-x-10 gap-y-(--umc-spacing-gap-24) md:gap-x-[140px]"
          >
            {LINK_GROUPS.map((group) => (
              <div
                className="flex flex-col gap-(--umc-spacing-gap-10)"
                key={group.title}
              >
                <h2
                  className={cn(
                    "text-body-3-medium",
                    groupTitleVariants({ tone }),
                  )}
                  lang="en"
                >
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-(--umc-spacing-gap-4) text-label-5-medium">
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
            // Figma 채널 간격 24. Mobile은 한 줄에 들어가지 않아 줄을 바꾼다
            "flex flex-wrap items-center gap-x-(--umc-spacing-gap-24) gap-y-(--umc-spacing-gap-8)",
            // Figma 텍스트: Medium 14, 줄 높이 150%, 자간 -1%. 같은 텍스트 스타일 토큰이 없다
            "font-medium text-[14px] leading-[1.5] tracking-[-0.01em]",
            channelTextVariants({ tone }),
          )}
          lang="en"
        >
          {CHANNELS.map((channel) => (
            <li
              className="flex items-center gap-[7px]"
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
  if (Icon === "umc") return <UmcLogo aria-hidden height={12} />

  return <Icon aria-hidden className="size-[16px]" />
}
