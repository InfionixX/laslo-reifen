import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/* ===========================================================================
   Reviews — three pull quotes set in the display serif.
   No avatars, no cards, no star-rating chrome beyond a small copper row.
   =========================================================================== */

const Reviews = () => {
    const { t } = useTranslation();

    const reviews = [
        { name: t('review_1_name'), text: t('review_1_text') },
        { name: t('review_2_name'), text: t('review_2_text') },
        { name: t('review_3_name'), text: t('review_3_text') },
    ];

    return (
        <section id="reviews" className="relative bg-obsidian py-28 sm:py-36 grain">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl"
                >
                    <div className="mb-7 flex items-center gap-4">
                        <span className="h-px w-10 bg-copper" />
                        <span className="eyebrow">{t('reviews_subtitle')}</span>
                    </div>
                    <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-bone">
                        {t('reviews_title')}
                    </h2>
                </motion.div>

                {/* Quotes */}
                <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 md:grid-cols-3">
                    {reviews.map((review, i) => (
                        <motion.figure
                            key={review.name}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{
                                duration: 0.9,
                                delay: i * 0.12,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex flex-col justify-between gap-8 bg-obsidian p-8 transition-colors duration-500 hover:bg-graphite sm:p-10"
                        >
                            <div>
                                {/* Rating */}
                                <div className="flex gap-1" aria-label="5 von 5">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <Star
                                            key={s}
                                            className="h-3.5 w-3.5 fill-copper text-copper"
                                        />
                                    ))}
                                </div>

                                <blockquote className="mt-7 font-display text-2xl leading-[1.25] text-bone sm:text-[1.75rem]">
                                    „{review.text}“
                                </blockquote>
                            </div>

                            <figcaption className="flex items-center gap-3">
                                <span className="h-px w-6 bg-copper" />
                                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ash">
                                    {review.name}
                                </span>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
