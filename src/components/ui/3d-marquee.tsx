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

const defaultImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1626814974079-fe0b52e5e1a7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
]

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
