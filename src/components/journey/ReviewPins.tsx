import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/* ===========================================================================
   Customer reviews as note cards pinned to the board on the showroom wall.
   Each card sits at a slight angle so the wall reads as a real pinboard
   rather than a grid of divs.
   =========================================================================== */

const ReviewPins = () => {
    const { t } = useTranslation();

    const reviews = [
        { name: t('review_1_name'), text: t('review_1_text'), tilt: -2.5 },
        { name: t('review_2_name'), text: t('review_2_text'), tilt: 1.8 },
        { name: t('review_3_name'), text: t('review_3_text'), tilt: -1.2 },
    ];

    return (
        <ul className="mt-9 grid gap-4 sm:grid-cols-3">
            {reviews.map((review, i) => (
                <motion.li
                    key={review.name}
                    initial={{ opacity: 0, y: 22, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: review.tilt }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.75,
                        delay: 0.12 + i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ rotate: 0, y: -5 }}
                    className="relative rounded-sm bg-showroom p-5 shadow-[0_10px_30px_rgba(26,28,32,0.16)] sm:p-6"
                >
                    {/* Pin */}
                    <span className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-copper shadow-[0_2px_5px_rgba(26,28,32,0.4)]" />

                    <div className="flex gap-0.5" aria-label="5 von 5">
                        {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="h-3 w-3 fill-copper text-copper" />
                        ))}
                    </div>

                    <blockquote className="mt-4 font-display text-lg leading-snug text-ink sm:text-xl">
                        „{review.text}“
                    </blockquote>

                    <figcaption className="mt-4 flex items-center gap-2.5">
                        <span className="h-px w-5 bg-copper" />
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                            {review.name}
                        </span>
                    </figcaption>
                </motion.li>
            ))}
        </ul>
    );
};

export default ReviewPins;
