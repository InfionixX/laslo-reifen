import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ===========================================================================
   Process — how an enquiry becomes a delivered set of tires.

   Four steps on a single vertical rail. The rail fills as the section scrolls
   through the viewport, so the reader's progress and the process progress are
   the same gesture.
   =========================================================================== */

const Process = () => {
    const { t } = useTranslation();
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 75%', 'end 60%'],
    });

    const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const steps = [
        { n: '01', title: t('process_1_title'), desc: t('process_1_desc') },
        { n: '02', title: t('process_2_title'), desc: t('process_2_desc') },
        { n: '03', title: t('process_3_title'), desc: t('process_3_desc') },
        { n: '04', title: t('process_4_title'), desc: t('process_4_desc') },
    ];

    return (
        <section id="process" className="relative bg-obsidian py-28 sm:py-36 grain">
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
                        <span className="eyebrow">{t('process_badge')}</span>
                    </div>
                    <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-bone">
                        {t('process_title')}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed font-light text-ash">
                        {t('process_desc')}
                    </p>
                </motion.div>

                {/* Steps on a filling rail */}
                <div ref={ref} className="relative mt-20 pl-10 sm:pl-14">

                    {/* Rail track + fill */}
                    <div className="absolute top-2 bottom-2 left-0 w-px bg-bone/10">
                        <motion.div
                            style={{ scaleY: railScale }}
                            className="h-full w-full origin-top bg-copper"
                        />
                    </div>

                    <div className="flex flex-col gap-14 sm:gap-20">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.n}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-120px' }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.08,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative grid gap-4 md:grid-cols-12 md:gap-10"
                            >
                                {/* Node on the rail */}
                                <span className="absolute top-2.5 -left-10 h-1.5 w-1.5 rounded-full bg-copper ring-4 ring-obsidian sm:-left-14" />

                                <div className="md:col-span-4">
                                    <span className="font-mono text-xs tracking-[0.28em] text-copper">
                                        {step.n}
                                    </span>
                                    <h3 className="mt-3 font-display text-3xl text-bone sm:text-4xl">
                                        {step.title}
                                    </h3>
                                </div>

                                <p className="leading-relaxed font-light text-ash md:col-span-7 md:col-start-6 md:pt-9">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
