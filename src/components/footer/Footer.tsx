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
    links: [
      { label: "테크 블로그" },
      { label: "유튜브" },
      { label: "링크드인" },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "문의하기" }],
  },
]

interface FooterChannel {
  icon: ComponentType<SVGProps<SVGSVGElement>> | "umc"
  links: FooterLink[]
}

const CHANNELS: FooterChannel[] = [
  { icon: "umc", links: [{ label: "iOS" }, { label: "Android" }] },
  { icon: "umc", links: [{ label: "Product Tech" }] },
  { icon: InstagramIcon, links: [{ label: "Instagram" }] },
  { icon: KakaoIcon, links: [{ label: "Kakao" }] },
]

// 다크 배경 283938, 라이트 배경 f6f7f7 위 e5f5f2 10%, 다크 채널 글자 f6f7f7은 토큰에 없는 시안 값 (#22)
const footerVariants = cva("", {
  variants: {
    tone: {
      dark: "bg-[#283938] text-inverse",
      light:
        "bg-[#f6f7f7] bg-[linear-gradient(rgb(229_245_242/0.1),rgb(229_245_242/0.1))] text-placeholder",
    },
  },
})

const channelTextVariants = cva("", {
  variants: {
    tone: {
      dark: "text-[#f6f7f7]",
      light: "text-placeholder",
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
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[34px] py-(--umc-spacing-64) pr-[56px] pl-[60px]">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-(--umc-spacing-gap-16)">
            <UmcEmblem aria-hidden className="h-[20px] w-auto" />
            <span
              className="font-bold text-[20px] leading-[1.6] tracking-[-0.4px]"
              lang="en"
            >
              University MakeUs Challenge
            </span>
          </p>
          <div className="flex items-center gap-(--umc-spacing-gap-24) text-body-3-regular">
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
          {/* SF Pro 15px 시안을 Pretendard로 옮긴다 (#22) */}
          <p className="font-medium text-[15px] leading-[1.252]" lang="en">
            Made by UMC PRODUCT
          </p>
          <nav aria-label="사이트 링크" className="flex gap-[140px]">
            {LINK_GROUPS.map((group) => (
              <div
                className="flex flex-col gap-(--umc-spacing-gap-10)"
                key={group.title}
              >
                <h2 className="text-body-3-medium" lang="en">
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-(--umc-spacing-gap-4) text-[13px] leading-[1.252]">
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
            "flex items-center gap-(--umc-spacing-gap-24) font-medium text-[14px] leading-[1.5] tracking-[-0.14px]",
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
