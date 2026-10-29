import { UmcLogo } from "@umc-product/icons"
import { useState } from "react"

import { cn } from "@/utils/cn"

import { MEMBER_PHOTOS } from "./memberPhotos"
import { type Member, type MemberTag, type PartTag } from "./memberTypes"

const PART_TAG_BACKGROUND: Record<PartTag, string> = {
  PM: "bg-violet-100",
  Design: "bg-pink-100",
  Web: "bg-yellow-100",
  iOS: "bg-cobalt-100",
  Android: "bg-part-android",
  Spring: "bg-part-spring",
}

const TAG_TONE: Record<Exclude<MemberTag["kind"], "part">, string> = {
  role: "bg-teal-100 text-teal-600",
  central: "bg-tag-role-central-weak text-tag-role-central-strong",
}

const PHOTO_SIZE_PX = 100
const DEFAULT_LOGO_HEIGHT_PX = 18

interface MemberCardProps {
  member: Member
  tags?: readonly MemberTag[]
}

export function MemberCard({ member, tags = [] }: MemberCardProps) {
  return (
    <div className="flex min-h-[140px] items-start gap-5 rounded-2xl border border-teal-grey-100 bg-white px-5 py-[26px] shadow-drop-neutral-2 hover:bg-[linear-gradient(rgb(244_251_250/0.6),rgb(244_251_250/0.6))] md:min-h-[158px] md:gap-6 md:px-6 md:py-[28px]">
      <ProfileImage photo={member.photo} />
      <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1.5 md:gap-3">
        <div className="flex items-start justify-between gap-2">
          <p className="flex flex-wrap items-center gap-x-1 text-body-1-semibold text-teal-grey-800 md:text-heading-3-semibold">
            <span>{member.nickname}</span>
            <span className="font-medium text-[20px] leading-none">/</span>
            <span>{member.name}</span>
          </p>
          {tags.length > 0 && (
            <ul className="flex shrink-0 gap-1.5">
              {tags.map((tag) => (
                <li
                  className={cn(
                    "flex h-[26px] items-center whitespace-nowrap rounded-md px-[7px] text-label-5-medium",
                    tag.kind === "part"
                      ? cn("text-teal-grey-900", PART_TAG_BACKGROUND[tag.label])
                      : TAG_TONE[tag.kind],
                  )}
                  key={tag.label}
                >
                  {tag.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        {(member.email || member.school) && (
          <div className="flex flex-col gap-1 font-medium text-[13px] text-teal-grey-500 leading-[1.5] md:text-title-4-medium">
            {member.email && <p className="break-all">{member.email}</p>}
            {member.school && <p>{member.school}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

function ProfileImage({ photo }: { photo?: string }) {
  const src = photo ? MEMBER_PHOTOS.get(photo) : undefined
  if (!src) {
    return (
      <div
        className="flex size-[86px] shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-75 text-teal-300 md:size-[100px]"
        data-testid="default-profile"
      >
        <UmcLogo aria-hidden height={DEFAULT_LOGO_HEIGHT_PX} />
      </div>
    )
  }
  return <ProfilePhoto src={src} />
}

function ProfilePhoto({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false)
  const showIfAlreadyLoaded = (image: HTMLImageElement | null) => {
    if (image?.complete && image.naturalWidth > 0) setLoaded(true)
  }
  return (
    <span className="block size-[86px] shrink-0 overflow-hidden rounded-full border border-teal-grey-200 bg-teal-grey-200 md:size-[100px]">
      <img
        alt=""
        className="size-full object-cover opacity-0 transition-opacity duration-200 ease-out data-loaded:opacity-100 motion-reduce:transition-none"
        data-loaded={loaded || undefined}
        decoding="async"
        height={PHOTO_SIZE_PX}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        ref={showIfAlreadyLoaded}
        src={src}
        width={PHOTO_SIZE_PX}
      />
    </span>
  )
}
