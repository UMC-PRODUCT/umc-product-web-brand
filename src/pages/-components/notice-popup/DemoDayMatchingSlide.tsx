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
    <div className="notice-popup-slide relative isolate flex h-[452.226px] w-[300px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] md:h-[540px] md:w-[934px] md:rounded-[30px]">
      <img
        alt=""
        className="absolute inset-0 -z-10 size-full opacity-8"
        height={SLIDE_HEIGHT_PX}
        src={photo}
        width={SLIDE_WIDTH_PX}
      />
      <div className="flex w-[253px] flex-col items-center gap-4 pt-[43.209px] pb-5 md:w-[841.626px] md:items-stretch md:gap-6 md:py-6">
        <div className="flex w-full flex-col items-center gap-3 md:h-[354.74px] md:flex-row md:items-stretch md:gap-0 md:pl-3">
          <div className="flex w-full flex-col gap-[8.642px] md:-mr-[38px] md:min-w-0 md:flex-1 md:justify-between md:gap-0 md:pt-[38px] md:pb-[30px]">
            <hgroup className="flex flex-col gap-[2.881px] md:gap-2">
              <h2 className="flex flex-col gap-[0.978px] text-white md:gap-0.5">
                <span className="flex h-[29px] items-start pt-[4.313px] pl-[1.584px] md:h-[50px] md:pt-[7px] md:pl-[2.77px]">
                  <span className="sr-only" lang="en">
                    {DEMO_DAY_MATCHING_COPY.title}
                  </span>
                  <UmcDemoDay aria-hidden className="h-6 w-auto md:h-[42px]" />
                </span>
                <span className="font-bold text-[20px] leading-[1.2] tracking-[-0.03em] md:text-[40px]">
                  {DEMO_DAY_MATCHING_COPY.subtitle}
                </span>
              </h2>
              <p
                className="text-[#36d3c0] text-[12px] leading-[1.3] tracking-[-0.01em] md:text-[18px]"
                lang="en"
              >
                {DEMO_DAY_MATCHING_COPY.englishSubtitle}
              </p>
            </hgroup>
            <div className="flex flex-col gap-[2.052px] text-[9px] leading-[1.3] md:gap-1 md:text-[14px]">
              <ol className="flex items-center gap-[6.272px] whitespace-nowrap text-teal-grey-200 md:gap-[12.83px]">
                {DEMO_DAY_MATCHING_COPY.steps.map((step, index) => (
                  <li
                    className="flex items-center gap-[6.272px] md:gap-[12.83px]"
                    key={step}
                  >
                    {index > 0 && (
                      <img
                        alt=""
                        className="-mx-[0.489px] h-[0.978px] w-[10.385px] md:-mx-px md:h-0.5 md:w-[21.2445px]"
                        height={STEP_DIVIDER_HEIGHT_PX}
                        src={stepDivider}
                        width={STEP_DIVIDER_WIDTH_PX}
                      />
                    )}
                    {step}
                  </li>
                ))}
              </ol>
              <p className="font-medium text-teal-grey-400 md:w-[434px]">
                {DEMO_DAY_MATCHING_COPY.description}
              </p>
            </div>
          </div>
          <img
            alt=""
            className="h-[200px] w-[254px] max-w-none shrink-0 object-cover object-[50%_86%] md:h-[354.74px] md:w-[425.945px]"
            height={MOCKUP_SOURCE_HEIGHT_PX}
            src={mockup}
            width={MOCKUP_SOURCE_WIDTH_PX}
          />
        </div>
        <div className="md:pl-3">
          <a
            className="notice-popup-cta relative inline-flex h-[40.74px] min-w-[67.9px] items-center justify-center rounded-[11.317px] bg-[rgb(251_252_252/0.3)] px-[15.843px] font-medium text-[16.975px] text-white leading-[1.4] tracking-[-0.02em] outline-white outline-offset-2 hover:bg-[rgb(251_252_252/0.4)] focus-visible:outline-2 motion-safe:transition-colors md:h-[51.32px] md:min-w-[82.11px] md:rounded-2xl md:px-5 md:text-[20px] md:tracking-[-0.03em]"
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
