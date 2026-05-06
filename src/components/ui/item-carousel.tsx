import { useState, useCallback, useRef, useId, type ReactNode } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  rotation?: number;
  x?: number;
  y?: number;
  zIndex?: number;
}

export interface PriceTier {
  label: string;
  accent: string;       // border/glow color class
  bgClass: string;      // background class
  badgeClass: string;    // badge styling
  photos: GalleryPhoto[];
}

export interface CarouselCategory {
  id: string;
  title: string;
  icon: ReactNode;
  color: string;
  photos: GalleryPhoto[];     // 3 photos for stacked preview
  tiers?: PriceTier[];        // 3 price tiers for expanded view
  exploreText?: string;
}

interface ItemCarouselProps {
  items: CarouselCategory[];
}

const wrap = (min: number, max: number, v: number): number => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const springTransition = {
  type: "spring" as const,
  stiffness: 160,
  damping: 18,
  mass: 1,
};

/* ─── Mini photo stack (for prev/next preview) ─── */
function PhotoStackPreview({ photos, title, icon, color }: {
  photos: GalleryPhoto[];
  title: string;
  icon: ReactNode;
  color: string;
}) {
  const stack = photos.slice(0, 3);
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative h-[200px] lg:h-[260px] w-full flex items-center justify-center">
        {stack.map((photo, i) => (
          <div
            key={photo.id}
            className="absolute w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-2xl lg:rounded-3xl overflow-hidden border-4 border-[#111] shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            style={{
              transform: `rotate(${photo.rotation || 0}deg) translate(${(photo.x || 0) * 0.45}px, ${(photo.y || 0) * 0.45}px)`,
              zIndex: photo.zIndex || i,
            }}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-xs", color)}>
          {icon}
        </div>
        <span className="text-white/60 text-xs lg:text-sm font-medium">{title}</span>
      </div>
    </div>
  );
}

/* ─── Main carousel component ─── */
export function ItemCarousel({ items }: ItemCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const galleryRef = useRef<HTMLDivElement>(null);

  useOutsideClick(galleryRef, () => {
    if (isExpanded) setIsExpanded(false);
  });

  const paginate = useCallback((dir: number) => {
    if (isExpanded) return;
    setActiveIndex((prev) => wrap(0, items.length, prev + dir));
  }, [items.length, isExpanded]);

  const currentIndex = activeIndex;
  const prevIndex = wrap(0, items.length, activeIndex - 1);
  const nextIndex = wrap(0, items.length, activeIndex + 1);

  const current = items[currentIndex];
  const prev = items[prevIndex];
  const next = items[nextIndex];

  return (
    <div className="relative w-full select-none">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* ═══ EXPANDED GALLERY VIEW ═══ */
          <motion.div
            key="expanded-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LayoutGroup id={`${layoutGroupId}-expanded`}>
              <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
                {/* Back button + title */}
                <div className="w-full flex items-center justify-between px-4 mb-6">
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setIsExpanded(false)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group z-50 cursor-pointer"
                  >
                    <div className="p-2 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors text-white">
                      <HugeiconsIcon icon={ArrowLeft01Icon} width={20} height={20} />
                    </div>
                    <span className="font-medium">Zurück</span>
                  </motion.button>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", current.color)}>
                      {current.icon}
                    </div>
                    <span className="text-white text-lg font-bold">{current.title}</span>
                  </div>
                </div>

                {/* Tiered photo layout */}
                <motion.div
                  ref={galleryRef}
                  layout
                  className="relative w-full px-4"
                  transition={springTransition}
                >
                  {current.tiers && current.tiers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                      {current.tiers.map((tier, tierIdx) => (
                        <motion.div
                          key={`tier-${tierIdx}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ ...springTransition, delay: tierIdx * 0.1 }}
                          className={cn(
                            "rounded-2xl md:rounded-3xl overflow-hidden border-2 backdrop-blur-sm",
                            tier.bgClass,
                            tier.accent
                          )}
                        >
                          {/* Tier header */}
                          <div className="px-5 py-4 flex items-center gap-3">
                            <span className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                              tier.badgeClass
                            )}>
                              {tier.label}
                            </span>
                            <span className="text-white/30 text-xs">
                              {tierIdx === 0 ? "€" : tierIdx === 1 ? "€€" : "€€€"}
                            </span>
                          </div>

                          {/* Tier photos */}
                          <div className="flex flex-col gap-3 p-3 pt-0">
                            {tier.photos.map((photo) => (
                              <motion.div
                                key={`exp-${photo.id}`}
                                layoutId={`photo-${current.id}-${photo.id}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={springTransition}
                                whileHover={{ scale: 1.02 }}
                                className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/5 shadow-lg cursor-pointer bg-brand-dark"
                              >
                                <img
                                  src={photo.src}
                                  alt={photo.alt}
                                  className="w-full h-full object-cover select-none pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <span className="absolute bottom-2 left-3 text-white/80 text-xs font-medium">
                                  {photo.alt}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* Fallback: flat grid if no tiers defined */
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {current.photos.map((photo) => (
                        <motion.div
                          key={`exp-${photo.id}`}
                          layoutId={`photo-${current.id}-${photo.id}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={springTransition}
                          whileHover={{ scale: 1.02 }}
                          className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-[6px] border-[#111] shadow-lg cursor-pointer bg-brand-dark"
                        >
                          <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover select-none pointer-events-none" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </LayoutGroup>
          </motion.div>
        ) : (
          /* ═══ CAROUSEL VIEW ═══ */
          <motion.div
            key="carousel-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex items-start justify-center gap-2 md:gap-4 py-4">
              {/* Prev item (faded) */}
              <button
                onClick={() => paginate(-1)}
                className="hidden md:block w-[22%] flex-shrink-0 cursor-pointer opacity-40 hover:opacity-60 transition-all duration-300 scale-90 hover:scale-[0.93]"
                aria-label="Previous"
              >
                <PhotoStackPreview photos={prev.photos} title={prev.title} icon={prev.icon} color={prev.color} />
              </button>

              {/* Active item – ExpandableGallery stack */}
              <div className="w-full md:w-[50%] flex-shrink-0">
                <LayoutGroup id={`${layoutGroupId}-active`}>
                  <div className="relative flex flex-col items-center">
                    {/* Stacked photos */}
                    <div className="relative h-[350px] sm:h-[400px] md:h-[420px] w-full flex items-center justify-center mb-4">
                      {current.photos.slice(0, 3).map((photo, index) => (
                        <motion.div
                          key={`stack-${current.id}-${photo.id}`}
                          layoutId={`photo-${current.id}-${photo.id}`}
                          className="absolute w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-2xl md:rounded-3xl overflow-hidden border-[6px] border-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer bg-brand-dark"
                          animate={{
                            rotate: photo.rotation || 0,
                            x: photo.x || 0,
                            y: photo.y || 0,
                            zIndex: photo.zIndex || index,
                          }}
                          whileHover={{
                            scale: 1.05,
                            y: (photo.y || 0) - 15,
                            rotate: (photo.rotation || 0) * 0.8,
                            zIndex: 50,
                            transition: { type: "spring", stiffness: 400, damping: 25 },
                          }}
                          transition={springTransition}
                          onClick={() => setIsExpanded(true)}
                        >
                          <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover select-none pointer-events-none" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Title + icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-lg shadow-lg", current.color)}>
                        {current.icon}
                      </div>
                      <h4 className="text-white text-xl sm:text-2xl font-bold">{current.title}</h4>
                    </div>

                    {/* Expand button */}
                    <Button
                      variant="default"
                      onClick={() => setIsExpanded(true)}
                      className="rounded-full cursor-pointer py-6 px-8 border-border/40 font-normal group bg-brand-orange hover:bg-orange-600 text-white"
                    >
                      {current.exploreText || "Mehr entdecken"}
                      <HugeiconsIcon icon={ArrowRight01Icon} className="transition-transform group-hover:translate-x-1 ml-2" width={20} height={20} />
                    </Button>
                  </div>
                </LayoutGroup>
              </div>

              {/* Next item (faded) */}
              <button
                onClick={() => paginate(1)}
                className="hidden md:block w-[22%] flex-shrink-0 cursor-pointer opacity-40 hover:opacity-60 transition-all duration-300 scale-90 hover:scale-[0.93]"
                aria-label="Next"
              >
                <PhotoStackPreview photos={next.photos} title={next.title} icon={next.icon} color={next.color} />
              </button>
            </div>

            {/* Arrow buttons (mobile + desktop) */}
            <div className="flex items-center justify-center gap-4 mt-2">
              <button
                onClick={() => paginate(-1)}
                className="p-2.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-brand-orange/80 hover:border-brand-orange transition-all cursor-pointer"
                aria-label="Previous"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "rounded-full transition-all duration-300 cursor-pointer",
                      i === currentIndex
                        ? "w-8 h-2.5 bg-brand-orange shadow-[0_0_10px_rgba(255,87,34,0.5)]"
                        : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Go to ${item.title}`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="p-2.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-brand-orange/80 hover:border-brand-orange transition-all cursor-pointer"
                aria-label="Next"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ItemCarousel;
