"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type BannerConfig, CAROUSEL_INTERVAL_MS } from "@/lib/banners.config";

interface BannerCarouselProps {
  banners: BannerConfig[];
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const isSingle = banners.length === 1;
  const currentBanner = banners[currentIndex];

  useEffect(() => {
    if (isSingle || isPaused) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % banners.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, isSingle, banners.length, resetKey]);

  if (banners.length === 0) return null;

  function goNext() {
    setCurrentIndex((i) => (i + 1) % banners.length);
    setResetKey((k) => k + 1);
  }

  function goPrev() {
    setCurrentIndex((i) => (i - 1 + banners.length) % banners.length);
    setResetKey((k) => k + 1);
  }

  function goTo(index: number) {
    setCurrentIndex(index);
    setResetKey((k) => k + 1);
  }

  function handleTouchStart(e: React.TouchEvent) {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    setIsPaused(false);
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) >= 50) {
      if (delta < 0) { goNext(); } else { goPrev(); }
    }
    setTouchStartX(null);
  }

  function handleBannerClick() {
    if (!currentBanner.linkTarget) return;
    router.push(currentBanner.linkTarget);
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-muted select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner image area */}
      <div
        className={`aspect-[16/5] w-full relative${currentBanner.linkTarget ? " cursor-pointer" : ""}`}
        onClick={handleBannerClick}
      >
        <Image
          key={currentBanner.id}
          src={currentBanner.imageUrl}
          alt={currentBanner.title ?? "Promotional banner"}
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Text overlay */}
        {(currentBanner.title || currentBanner.subtitle) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-10 md:px-6 md:pb-5">
            {currentBanner.title && (
              <p className="text-white font-semibold text-sm md:text-xl leading-tight drop-shadow">
                {currentBanner.title}
              </p>
            )}
            {currentBanner.subtitle && (
              <p className="text-white/80 text-xs md:text-sm mt-0.5 leading-snug drop-shadow">
                {currentBanner.subtitle}
              </p>
            )}
            {currentBanner.ctaText && (
              <span className="inline-block mt-2 text-xs font-medium text-white underline underline-offset-2 opacity-90">
                {currentBanner.ctaText} →
              </span>
            )}
          </div>
        )}

        {/* Arrow buttons — desktop only */}
        {!isSingle && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous banner"
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/30 hover:bg-black/55 text-white transition-colors z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next banner"
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/30 hover:bg-black/55 text-white transition-colors z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators — all screen sizes, hidden for single banner */}
      {!isSingle && (
        <div className="flex justify-center items-center gap-1.5 pt-2 pb-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
