'use client'

/**
 * @author: @emerald-ui
 * @description: A 3D marquee component that rotates images in a 3D space.
 * @version: 1.0.0
 * @license: MIT
 */
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ThreeDMarqueeProps {
  images?: string[]
  className?: string
}

/** Lokale Fallback-Bilder aus public/grafics/pictures/_hero. */
const defaultImages = Array.from(
  { length: 12 },
  (_, i) => `/grafics/pictures/_hero/hero-${String(i + 1).padStart(2, '0')}.webp`,
)

const ThreeDMarquee = ({
  images = defaultImages,
  className,
}: ThreeDMarqueeProps) => {
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div
      className={cn(
        'mx-auto block h-[500px] w-full overflow-hidden rounded-2xl lg:h-[600px]',
        className
      )}
    >
      <div className='flex size-full items-center justify-center'>
        <div className='aspect-square size-[350px] sm:size-[500px] shrink-0 scale-[1.3] sm:scale-[1.15] lg:size-[700px] lg:scale-[1.25]'>
          <div
            style={{ transform: 'rotateX(45deg) rotateY(0deg) rotateZ(45deg)' }}
            className='relative top-0 right-[-50%] grid size-full origin-top-left grid-cols-3 gap-4 transform-3d lg:gap-5 lg:right-[-55%]'
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                animate={{ y: colIndex % 2 === 0 ? 50 : -50 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                key={colIndex + 'marquee'}
                className='flex flex-col items-start gap-4 lg:gap-5'
              >
                {subarray.map((src, imageIndex) => (
                  <div className='relative' key={imageIndex + src}>
                    <img
                      className='aspect-4/3 h-full w-full rounded-lg object-cover select-none shadow-lg shadow-black/40'
                      key={imageIndex}
                      src={src}
                      draggable={false}
                      alt={`Reifen & Felgen ${imageIndex + 1}`}
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDMarquee
