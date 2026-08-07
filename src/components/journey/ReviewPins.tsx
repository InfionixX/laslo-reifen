import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

/* ===========================================================================
   Customer reviews as note cards pinned to the board on the showroom wall.

   The tilt is a static style rather than an entrance animation: the scene's
   copy layer already handles fading the block in, and the cards mount one
   scene early because of the journey's culling, so an entrance here would
   play out unseen. Hovering straightens the card - that is the only motion.
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
            {reviews.map((review) => (
                <li
                    key={review.name}
                    style={{ rotate: `${review.tilt}deg` }}
                    className="relative rounded-sm bg-showroom p-5 shadow-[0_12px_34px_rgba(26,28,32,0.20)] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:!rotate-0 hover:-translate-y-1 sm:p-6"
                >
                    {/* Pin */}
                    <span className="absolute -top-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-copper shadow-[0_2px_5px_rgba(26,28,32,0.45)]" />

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
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-dim">
                            {review.name}
                        </span>
                    </figcaption>
                </li>
            ))}
        </ul>
    );
};

export default ReviewPins;
