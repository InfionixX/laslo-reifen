import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaStar, FaQuoteLeft, FaChevronRight, FaChevronLeft } from 'react-icons/fa6';
import { GiCarWheel } from 'react-icons/gi';
import { useEffect, useRef } from 'react';

const reviewData = [
    {
        id: 1,
        nameKey: 'review_1_name',
        textKey: 'review_1_text',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&q=80',
    },
    {
        id: 2,
        nameKey: 'review_2_name',
        textKey: 'review_2_text',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1549419137-ee1375d86242?w=500&q=80',
    },
    {
        id: 3,
        nameKey: 'review_3_name',
        textKey: 'review_3_text',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&q=80',
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const Reviews = () => {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let interval: ReturnType<typeof setInterval>;

        const startAutoScroll = () => {
            interval = setInterval(() => {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
                // Only autoscroll if it's actually scrollable (mobile view)
                if (scrollWidth > clientWidth) {
                    const maxScrollLeft = scrollWidth - clientWidth;
                    if (scrollLeft >= maxScrollLeft - 10) {
                        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        // Scroll by approximate card width
                        const scrollAmount = clientWidth > 400 ? 400 : clientWidth * 0.85;
                        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }
            }, 3500);
        };

        startAutoScroll();

        // Pause auto-scroll on touch/interaction
        const handleInteraction = () => {
            clearInterval(interval);
            // Optional: Restart auto-scroll after 5 seconds of inactivity
            setTimeout(() => {
                clearInterval(interval); // clear again just in case
                startAutoScroll();
            }, 5000);
        };

        scrollContainer.addEventListener('touchstart', handleInteraction, { passive: true });
        scrollContainer.addEventListener('mousedown', handleInteraction, { passive: true });

        return () => {
            clearInterval(interval);
            scrollContainer.removeEventListener('touchstart', handleInteraction);
            scrollContainer.removeEventListener('mousedown', handleInteraction);
        };
    }, []);

    return (
        <section className="py-24 bg-gradient-to-b from-brand-dark via-brand-dark to-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-orange opacity-[0.02] rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-orange opacity-[0.02] rounded-full blur-[100px] transform -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider"
                    >
                        {t('reviews_title')}
                        <span className="text-brand-orange">.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg mb-10"
                    >
                        {t('reviews_subtitle')}
                    </motion.p>

                    {/* Minimalist Logo inserted between Header and Reviews */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-center items-center gap-2 opacity-50 mb-4"
                    >
                        <GiCarWheel className="text-brand-orange text-3xl" />
                        <span className="text-white text-xl font-bold tracking-tighter">
                            {t('brand_1')} <span className="text-brand-orange">{t('brand_2')}</span>
                        </span>
                    </motion.div>
                </div>

                <motion.div
                    ref={scrollRef}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none md:mx-0 md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {reviewData.map((review) => (
                        <motion.div
                            key={review.id}
                            variants={itemVariants}
                            viewport={{ once: true }}
                            whileInView="visible"
                            initial="hidden"
                            className="w-[85vw] min-w-[300px] sm:w-[400px] md:w-auto md:min-w-0 snap-center snap-always flex-shrink-0 bg-brand-gray/50 rounded-3xl border border-gray-800 shadow-xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] group relative flex flex-col h-full"
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]"></div>

                            {/* Product Image */}
                            <div className="relative h-48 sm:h-56 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-gray/90 to-transparent z-10"></div>
                                <img
                                    src={review.image}
                                    alt="Product"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full z-20 flex gap-1 items-center shadow-lg border border-white/10">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <FaStar key={i} className="text-brand-orange text-sm" />
                                    ))}
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="p-8 relative z-20 flex-grow flex flex-col">
                                <FaQuoteLeft className="text-brand-orange/20 text-4xl absolute top-6 left-6" />
                                <p className="text-gray-300 italic mb-8 relative z-10 flex-grow leading-relaxed mt-4 line-clamp-4">
                                    "{t(review.textKey)}"
                                </p>
                                <div className="flex justify-between items-center border-t border-gray-700/50 pt-5 mt-auto">
                                    <h4 className="text-white font-bold">{t(review.nameKey)}</h4>
                                    <div className="text-xs text-brand-orange uppercase tracking-wider font-semibold bg-brand-orange/10 px-2 py-1 rounded">Verifizierter Kauf</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile Swipe Indicator */}
                <div className="md:hidden flex justify-center items-center mt-6 gap-3 text-brand-orange/60 animate-pulse">
                    <FaChevronLeft className="text-sm" />
                    <span className="text-xs uppercase tracking-widest font-semibold">{t('swipe_to_view')}</span>
                    <FaChevronRight className="text-sm" />
                </div>
            </div>
        </section>
    );
};

export default Reviews;
