import { CloseIcon } from "@umc-product/icons"
import { Dialog } from "radix-ui"
import { type ReactNode, useId, useRef, useState } from "react"

import { NoticePopupPagination } from "./NoticePopupPagination"

import "./notice-popup.css"

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
        <Dialog.Overlay className="notice-popup-overlay fixed inset-0 z-80 grid place-items-center overflow-auto bg-dimmed-weak p-4">
          <Dialog.Content
            aria-describedby={undefined}
            className="notice-popup-content relative flex flex-col items-center gap-2 rounded-[34px] bg-white p-2.5 shadow-drop-neutral-2 outline-none"
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
              slides[0]?.content
            )}
            <Dialog.Close
              aria-label="닫기"
              className="absolute top-8 right-[34px] flex size-[30px] items-center justify-center rounded-[10px] bg-[rgb(67_71_71/0.5)] text-white outline-white outline-offset-2 hover:bg-[rgb(67_71_71/0.7)] focus-visible:outline-2 motion-safe:transition-colors"
            >
              <CloseIcon aria-hidden size={24} />
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
