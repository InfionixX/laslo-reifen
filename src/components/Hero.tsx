import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

/* ===========================================================================
   Hero — editorial full-viewport opener.

   One photograph, one sentence, two actions. The headline is set in the
   display serif and reveals line by line behind a clipping mask; the image
   drifts at a slower rate than the page so the section has depth on scroll.
   =========================================================================== */

/* Masked line reveal — each line slides up from behind its own overflow box */
function RevealLine({
    children,
    delay = 0,
    className = '',
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <span className="block overflow-hidden">
            <motion.span
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${className}`}
            >
                {children}
            </motion.span>
        </span>
    );
}

const Hero = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
    const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const stats = [
        { val: t('hero_stat1_val'), label: t('hero_stat1_label') },
        { val: t('hero_stat2_val'), label: t('hero_stat2_label') },
        { val: t('hero_stat3_val'), label: t('hero_stat3_label') },
    ];

    return (
        <section
            id="home"
            ref={ref}
            className="relative h-screen min-h-[640px] w-full overflow-hidden bg-obsidian grain"
        >
            {/* ── Photograph ── */}
            <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
                <img
                    src="/grafics/tires/hero.webp"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover object-right"
                    fetchPriority="high"
                />
            </motion.div>

            {/* Scrims — dark where the copy sits, feathered into the next section */}
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/70" />

            {/* ── Copy ── */}
            <motion.div
                style={{ y: copyY, opacity: copyOpacity }}
                className="relative z-10 flex h-full flex-col justify-center"
            >
                <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="mb-8 flex items-center gap-4"
                    >
                        <span className="h-px w-10 bg-copper" />
                        <span className="eyebrow">{t('hero_eyebrow')}</span>
                    </motion.div>

                    {/* Headline */}
                    <h1 className="font-display text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.94] text-bone">
                        <RevealLine delay={0.2}>{t('hero_head_a')}</RevealLine>
                        <RevealLine delay={0.32}>{t('hero_head_b')}</RevealLine>
                        <RevealLine delay={0.44} className="text-copper-gradient italic">
                            {t('hero_head_accent')}
                        </RevealLine>
                    </h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-9 max-w-lg text-base leading-relaxed font-light text-bone-dim sm:text-lg"
                    >
                        {t('hero_desc')}
                    </motion.p>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
                    >
                        <a
                            href="#contact"
                            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-copper px-8 py-4 text-sm font-medium text-obsidian transition-colors duration-300 hover:bg-copper-hi"
                        >
                            {t('cta_primary')}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        <a
                            href="#tires"
                            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-bone/20 px-8 py-4 text-sm font-medium text-bone transition-colors duration-300 hover:border-bone/45 hover:bg-bone/5"
                        >
                            {t('cta_secondary')}
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Bottom strip: stats + scroll cue ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="absolute inset-x-0 bottom-0 z-10 border-t border-bone/10 bg-obsidian/40 backdrop-blur-sm"
            >
                {/* pr-16 on small screens keeps the last stat clear of the chat bubble */}
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-5 pr-20 sm:px-10 sm:pr-10 lg:px-16">
                    <dl className="flex items-start gap-5 sm:items-center sm:gap-14">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col gap-0.5">
                                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ash-dim">
                                    {stat.label}
                                </dt>
                                <dd className="font-display text-xl text-bone sm:text-2xl">
                                    {stat.val}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <a
                        href="#tires"
                        className="group hidden shrink-0 items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] text-ash transition-colors hover:text-bone md:flex"
                    >
                        {t('hero_scroll')}
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/20 text-copper"
                        >
                            <ArrowDown className="h-3.5 w-3.5" />
                        </motion.span>
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
