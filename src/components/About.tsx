import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
    Network, Globe, Truck, Tag, MessageCircle, ShieldCheck, ShoppingCart, Zap,
} from 'lucide-react';

/* ===========================================================================
   About — editorial statement, then the reasons to choose us as a plain
   hairline grid, then a continuous partner marquee. No tabs, no cards.
   =========================================================================== */

const partners = [
    'Michelin', 'Bridgestone', 'Continental', 'Goodyear', 'Pirelli', 'Dunlop',
    'Hankook', 'Falken', 'Yokohama', 'BF Goodrich', 'Nokian', 'AEZ',
];

const About = () => {
    const { t } = useTranslation();

    const benefits = [
        { icon: Network, title: t('benefit_1_title'), desc: t('benefit_1_desc') },
        { icon: Globe, title: t('benefit_2_title'), desc: t('benefit_2_desc') },
        { icon: Truck, title: t('benefit_3_title'), desc: t('benefit_3_desc') },
        { icon: Tag, title: t('benefit_4_title'), desc: t('benefit_4_desc') },
        { icon: MessageCircle, title: t('benefit_5_title'), desc: t('benefit_5_desc') },
        { icon: ShieldCheck, title: t('benefit_6_title'), desc: t('benefit_6_desc') },
        { icon: ShoppingCart, title: t('benefit_7_title'), desc: t('benefit_7_desc') },
        { icon: Zap, title: t('benefit_8_title'), desc: t('benefit_8_desc') },
    ];

    const stats = [
        { val: t('about_tab3_stat1_val'), label: t('about_tab3_stat1_label') },
        { val: t('about_tab3_stat2_val'), label: t('about_tab3_stat2_label') },
        { val: t('about_tab3_stat3_val'), label: t('about_tab3_stat3_label') },
    ];

    return (
        <section id="about" className="relative bg-obsidian py-28 sm:py-36 grain">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* ── Editorial statement ── */}
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5"
                    >
                        <div className="mb-7 flex items-center gap-4">
                            <span className="h-px w-10 bg-copper" />
                            <span className="eyebrow">{t('about_badge')}</span>
                        </div>
                        <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-bone">
                            {t('about_title')}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7"
                    >
                        <p className="text-lg leading-relaxed font-light text-bone-dim sm:text-xl">
                            {t('about_text_1')}
                        </p>
                        <p className="leading-relaxed font-light text-ash">
                            {t('about_text_2')}
                        </p>

                        {/* Stats */}
                        <dl className="mt-4 flex flex-wrap gap-x-12 gap-y-6">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <dd className="font-display text-4xl text-copper">{stat.val}</dd>
                                    <dt className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ash-dim">
                                        {stat.label}
                                    </dt>
                                </div>
                            ))}
                        </dl>
                    </motion.div>
                </div>

                {/* ── Reasons grid ── */}
                <div className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (i % 4) * 0.07 }}
                            className="group bg-obsidian p-7 transition-colors duration-500 hover:bg-graphite"
                        >
                            <benefit.icon className="h-5 w-5 text-copper transition-transform duration-500 group-hover:-translate-y-0.5" />
                            <h3 className="mt-6 text-sm font-medium text-bone">{benefit.title}</h3>
                            <p className="mt-1.5 text-sm font-light text-ash">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Partner marquee ── */}
            <div className="relative mt-24 overflow-hidden border-y border-bone/10 py-8">
                {/* Edge feather */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-obsidian to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-obsidian to-transparent" />

                <div className="flex w-max animate-[marquee_46s_linear_infinite] items-center gap-16">
                    {/* Duplicated once so the loop is seamless */}
                    {[...partners, ...partners].map((name, i) => (
                        <span
                            key={`${name}-${i}`}
                            className="font-display text-2xl whitespace-nowrap text-ash-dim transition-colors duration-300 hover:text-copper sm:text-3xl"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
