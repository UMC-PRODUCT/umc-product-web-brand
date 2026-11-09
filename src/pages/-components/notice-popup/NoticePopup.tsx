import { CloseIcon } from "@umc-product/icons"
import { Dialog } from "radix-ui"
import { type ReactNode, useId, useRef, useState } from "react"

import { cn } from "@/utils/cn"

import { NoticePopupPagination } from "./NoticePopupPagination"

import "./notice-popup.css"

const SCALE_WITH_POPUP_CLASS = "md:[zoom:var(--notice-popup-scale)]"

export interface NoticePopupSlide {
  id: string
  content: ReactNode
}

interface NoticePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  slides: readonly NoticePopupSlide[]
}

export function NoticePopup({
  open,
  onOpenChange,
  title,
  slides,
}: NoticePopupProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="notice-popup-overlay fixed inset-0 z-80 grid place-items-center overflow-auto bg-dimmed-medium p-4">
          <Dialog.Content
            aria-describedby={undefined}
            className="notice-popup-content relative flex flex-col items-center gap-1 rounded-[20px] bg-white p-1.5 outline-none md:gap-2.5 md:rounded-[calc(34px*var(--notice-popup-scale))] md:p-[calc(10px*var(--notice-popup-scale))] md:shadow-drop-neutral-2 lg:gap-1 xl:gap-2"
            onOpenAutoFocus={(event) => {
              event.preventDefault()
              contentRef.current?.focus()
            }}
            ref={contentRef}
            tabIndex={-1}
          >
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
            {slides.length > 1 ? (
              <NoticePopupCarousel label={title} slides={slides} />
            ) : (
              <div className={SCALE_WITH_POPUP_CLASS}>{slides[0]?.content}</div>
            )}
            <Dialog.Close
              aria-label="닫기"
              className={cn(
                "absolute top-[23.021px] right-[20.565px] flex size-[21.435px] items-center justify-center rounded-[7.145px] bg-[rgb(67_71_71/0.5)] text-white outline-white outline-offset-2 hover:bg-[rgb(67_71_71/0.7)] focus-visible:outline-2 motion-safe:transition-colors md:top-8 md:right-[34px] md:size-[30px] md:rounded-[10px]",
                SCALE_WITH_POPUP_CLASS,
              )}
            >
              <CloseIcon aria-hidden className="size-[17.148px] md:size-6" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface NoticePopupCarouselProps {
  label: string
  slides: readonly NoticePopupSlide[]
}

function NoticePopupCarousel({ label, slides }: NoticePopupCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const slideId = useId()
  const selectedSlide = slides[selectedIndex]

  return (
    <>
      <section aria-label={label} aria-roledescription="carousel">
        <figure
          aria-label={`${selectedIndex + 1} / ${slides.length}`}
          aria-roledescription="slide"
          className={SCALE_WITH_POPUP_CLASS}
          id={slideId}
        >
          {selectedSlide?.content}
        </figure>
      </section>
      <NoticePopupPagination
        controlsId={slideId}
        onSelect={setSelectedIndex}
        selectedIndex={selectedIndex}
        slides={slides}
      />
    </>
  )
}
