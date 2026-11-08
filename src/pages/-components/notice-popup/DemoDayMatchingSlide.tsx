import mockup from "@/assets/landing/notice-popup/demo-day-matching-mockup.webp"
import photo from "@/assets/landing/notice-popup/demo-day-photo.webp"
import stepDivider from "@/assets/landing/notice-popup/step-divider.svg"
import UmcDemoDay from "@/assets/landing/notice-popup/umc-demo-day.svg?react"

import { DEMO_DAY_MATCHING_COPY } from "./constants"

const SLIDE_WIDTH_PX = 934
const SLIDE_HEIGHT_PX = 540
const MOCKUP_SOURCE_WIDTH_PX = 852
const MOCKUP_SOURCE_HEIGHT_PX = 710
const STEP_DIVIDER_WIDTH_PX = 21.2445
const STEP_DIVIDER_HEIGHT_PX = 2

interface DemoDayMatchingSlideProps {
  onNavigate: () => void
}

export function DemoDayMatchingSlide({
  onNavigate,
}: DemoDayMatchingSlideProps) {
  return (
    <div className="notice-popup-slide relative isolate flex h-[540px] w-[934px] shrink-0 items-center justify-center overflow-hidden rounded-[30px]">
      <img
        alt=""
        className="absolute inset-0 -z-10 size-full opacity-8"
        height={SLIDE_HEIGHT_PX}
        src={photo}
        width={SLIDE_WIDTH_PX}
      />
      <div className="flex w-[841.626px] flex-col gap-6 py-6">
        <div className="flex h-[354.74px] pl-3">
          <div className="-mr-[38px] flex min-w-0 flex-1 flex-col justify-between pt-[38px] pb-[30px]">
            <hgroup className="flex flex-col gap-2">
              <h2 className="flex flex-col gap-0.5 text-white">
                <span className="flex h-[50px] items-start pt-[7px] pl-[2.77px]">
                  <span className="sr-only" lang="en">
                    {DEMO_DAY_MATCHING_COPY.title}
                  </span>
                  <UmcDemoDay aria-hidden />
                </span>
                <span className="font-bold text-[40px] leading-[1.2] tracking-[-0.03em]">
                  {DEMO_DAY_MATCHING_COPY.subtitle}
                </span>
              </h2>
              <p
                className="text-[#36d3c0] text-[18px] leading-[1.3] tracking-[-0.01em]"
                lang="en"
              >
                {DEMO_DAY_MATCHING_COPY.englishSubtitle}
              </p>
            </hgroup>
            <div className="flex flex-col gap-1 text-[14px] leading-[1.3]">
              <ol className="flex items-center gap-[12.83px] whitespace-nowrap text-teal-grey-200">
                {DEMO_DAY_MATCHING_COPY.steps.map((step, index) => (
                  <li className="flex items-center gap-[12.83px]" key={step}>
                    {index > 0 && (
                      <img
                        alt=""
                        className="-mx-px"
                        height={STEP_DIVIDER_HEIGHT_PX}
                        src={stepDivider}
                        width={STEP_DIVIDER_WIDTH_PX}
                      />
                    )}
                    {step}
                  </li>
                ))}
              </ol>
              <p className="w-[434px] font-medium text-teal-grey-400">
                {DEMO_DAY_MATCHING_COPY.description}
              </p>
            </div>
          </div>
          <img
            alt=""
            className="h-[354.74px] w-[425.945px] shrink-0"
            height={MOCKUP_SOURCE_HEIGHT_PX}
            src={mockup}
            width={MOCKUP_SOURCE_WIDTH_PX}
          />
        </div>
        <div className="pl-3">
          <a
            className="notice-popup-cta relative inline-flex h-[51.32px] min-w-[82.11px] items-center justify-center rounded-2xl bg-[rgb(251_252_252/0.3)] px-5 font-medium text-[20px] text-white leading-[1.4] tracking-[-0.03em] outline-white outline-offset-2 hover:bg-[rgb(251_252_252/0.4)] focus-visible:outline-2 motion-safe:transition-colors"
            href={DEMO_DAY_MATCHING_COPY.href}
            onClick={onNavigate}
            rel="noopener noreferrer"
            target="_blank"
          >
            {DEMO_DAY_MATCHING_COPY.cta}
            <span className="sr-only"> (새 창)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
