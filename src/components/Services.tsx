import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ===========================================================================
   Services — the wheel/rim side of the business.

   Three tall editorial tiles. The photograph sits behind the copy and lifts
   on hover; everything else is hairlines and type, so the images carry the
   whole visual weight.
   =========================================================================== */

const Services = () => {
    const { t } = useTranslation();

    const items = [
        {
            id: 'alu',
            image: '/grafics/tires/rim-alu.webp',
            index: '01',
            title: t('rim_alu_title'),
            desc: t('rim_alu_desc'),
        },
        {
            id: 'steel',
            image: '/grafics/tires/rim-steel.webp',
            index: '02',
            title: t('rim_steel_title'),
            desc: t('rim_steel_desc'),
        },
        {
            id: 'rdks',
            image: '/grafics/tires/rdks.webp',
            index: '03',
            title: t('rim_rdks_title'),
            desc: t('rim_rdks_desc'),
        },
    ];

    return (
        <section id="services" className="relative bg-graphite py-28 sm:py-36 grain">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <div className="mb-7 flex items-center gap-4">
                            <span className="h-px w-10 bg-copper" />
                            <span className="eyebrow">{t('services_badge')}</span>
                        </div>
                        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-bone">
                            {t('rim_overview_title')}
                        </h2>
                    </div>

                    <a
                        href="#contact"
                        className="group inline-flex shrink-0 items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-copper transition-colors duration-300 hover:text-copper-hi"
                    >
                        {t('rim_btn')}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </motion.div>

                {/* Tiles */}
                <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {items.map((item, i) => (
                        <motion.a
                            key={item.id}
                            href="#contact"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{
                                duration: 0.9,
                                delay: i * 0.12,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-xl border border-bone/10 bg-obsidian p-7 transition-colors duration-500 hover:border-copper/40"
                        >
                            {/* Photograph */}
                            <div className="absolute inset-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/15" />
                            </div>

                            {/* Index, pinned top */}
                            <span className="absolute top-7 left-7 font-mono text-xs tracking-[0.28em] text-copper">
                                {item.index}
                            </span>

                            {/* Copy */}
                            <div className="relative z-10">
                                <h3 className="font-display text-3xl text-bone">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed font-light text-bone-dim">
                                    {item.desc}
                                </p>

                                {/* Hairline that draws in on hover */}
                                <span className="mt-6 block h-px w-full bg-bone/15">
                                    <span className="block h-full w-0 bg-copper transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
