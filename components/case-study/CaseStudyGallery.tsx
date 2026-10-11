import { ICaseStudyItem } from "../../data/case-studies";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Props = {
  items: ReadonlyArray<ICaseStudyItem>;
};

const SWIPE_THRESHOLD_PX = 48;

function getFocusable(root: HTMLElement): HTMLElement[] {
  const nodes = root.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  return Array.from(nodes).filter((node) => !node.hasAttribute("disabled") && node.tabIndex !== -1);
}

export const CaseStudyGallery = ({ items }: Props) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const active = activeIndex !== null ? (items[activeIndex] ?? null) : null;
  const isOpen = activeIndex !== null && active !== null;

  const openAt = useCallback((index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
    setDragOffset(0);
  }, []);

  const close = useCallback(() => {
    setActiveIndex(null);
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
    dragDeltaX.current = 0;
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null || items.length === 0) return index;
      return (index - 1 + items.length) % items.length;
    });
    setDragOffset(0);
  }, [items.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) => {
      if (index === null || items.length === 0) return index;
      return (index + 1) % items.length;
    });
    setDragOffset(0);
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = getFocusable(dialogRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeEl === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      triggerRef.current?.focus();
      triggerRef.current = null;
    };
  }, [isOpen, close, showPrev, showNext]);

  const beginDrag = (clientX: number) => {
    dragStartX.current = clientX;
    dragDeltaX.current = 0;
    setIsDragging(true);
  };

  const moveDrag = (clientX: number) => {
    if (dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    dragDeltaX.current = delta;
    setDragOffset(delta);
  };

  const endDrag = () => {
    if (dragStartX.current === null) return;
    const delta = dragDeltaX.current;
    dragStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (delta <= -SWIPE_THRESHOLD_PX) {
      showNext();
      return;
    }
    if (delta >= SWIPE_THRESHOLD_PX) {
      showPrev();
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    beginDrag(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    moveDrag(event.clientX);
  };

  const viewerStyle: CSSProperties = {
    transform: `translate3d(${dragOffset}px, 0, 0)`,
    transition: isDragging ? "none" : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <>
      {/* Dense square mosaic — same idea as iOS Photos: tight gutters, no captions on tiles. */}
      <ul className="m-0 grid list-none grid-cols-3 gap-[2px] p-0 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item, index) => (
          <li key={item.id} className="min-w-0">
            <button
              type="button"
              onClick={(event) => openAt(index, event.currentTarget)}
              className="relative block aspect-square w-full cursor-pointer overflow-hidden bg-neutral-900 p-0 active:opacity-90"
              aria-label={`Open ${item.name}`}
            >
              <Image
                src={item.imageSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 16vw"
                className="object-cover object-center"
              />
            </button>
          </li>
        ))}
      </ul>

      {isOpen && active && activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[100] flex flex-col bg-black"
        >
          <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between bg-gradient-to-b from-black/55 to-transparent px-4 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <div className="min-w-0 flex-1 pr-3 pt-1 text-white">
              <p className="m-0 truncate text-[13px] font-semibold tracking-tight">{active.name}</p>
              <p className="m-0 mt-0.5 text-[11px] text-white/55">
                {active.kind} · {activeIndex + 1} of {items.length}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="pointer-events-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
              aria-label="Close gallery"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center overflow-hidden select-none"
            style={viewerStyle}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="relative h-full w-full">
              <Image
                src={active.imageSrc}
                alt={active.alt}
                fill
                sizes="100vw"
                className="pointer-events-none object-contain"
                priority
                draggable={false}
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden justify-between bg-gradient-to-t from-black/45 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12 sm:flex">
            <button
              type="button"
              onClick={showPrev}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22"
              aria-label="Previous photo"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  d="M11.5 3.5L6 9l5.5 5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={showNext}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition hover:bg-white/22"
              aria-label="Next photo"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  d="M6.5 3.5L12 9l-5.5 5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <p id={titleId} className="sr-only">
            {active.name}
          </p>
        </div>
      )}
    </>
  );
};
