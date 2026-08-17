import { useTranslation } from 'react-i18next';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import {
    Award, Users, Handshake,
    Network, Globe, Truck, Tag, MessageCircle, ShieldCheck, ShoppingCart, Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

// ---------------------------------------------------------------------------
// Inline Tabs wrappers – styled for the brand dark theme
// ---------------------------------------------------------------------------
const Tabs = TabsPrimitive.Root;

const TabsList = ({ className = '', ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
    <TabsPrimitive.List
        className={`flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-6 ${className}`}
        {...props}
    />
);

const TabsTrigger = ({ className = '', ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
    <TabsPrimitive.Trigger
        className={`
            flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-gray-400 cursor-pointer
            border border-white/10 transition-all duration-300 whitespace-nowrap
            data-[state=active]:bg-brand-orange data-[state=active]:text-white data-[state=active]:border-brand-orange
            hover:text-white hover:border-white/30
            ${className}
        `}
        {...props}
    />
);

const TabsContent = ({ className = '', ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
    <TabsPrimitive.Content
        className={`focus-visible:outline-none ${className}`}
        {...props}
    />
);

// ---------------------------------------------------------------------------
// Benefit row item
// ---------------------------------------------------------------------------
interface BenefitItem {
    icon: React.ReactNode;
    title: string;
    desc: string;
}

const BenefitRow = ({ icon, title, desc }: BenefitItem) => (
    <div className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-brand-dark/60 px-4 py-3.5 hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all duration-200 group">
        <div className="shrink-0 bg-brand-orange/10 text-brand-orange p-2.5 rounded-lg group-hover:bg-brand-orange/20 transition-colors duration-200">
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight">{title}</p>
            <p className="text-gray-500 text-xs mt-0.5 font-light">{desc}</p>
        </div>
    </div>
);

// ---------------------------------------------------------------------------
// Partner card
// ---------------------------------------------------------------------------
interface PartnerItem {
    name: string;
    category: string;
    accent: string;
}

const PartnerCard = ({ name, category, accent }: PartnerItem) => (
    <Card className="group cursor-pointer hover:border-brand-orange/40 hover:bg-brand-orange/5 hover:-translate-y-0.5 transition-all duration-300 py-0 gap-0">
        <div className="p-5 flex flex-col items-center justify-center min-h-[110px] text-center">
            {/* Colored brand initial badge */}
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3 transition-all duration-300 group-hover:scale-105"
                style={{ backgroundColor: accent }}
            >
                {name.charAt(0)}
            </div>
            <p className="text-white font-bold text-sm tracking-wide leading-tight">{name}</p>
            <p className="text-gray-500 text-xs mt-1 font-light">{category}</p>
        </div>
    </Card>
);

// ---------------------------------------------------------------------------
// Main About component
// ---------------------------------------------------------------------------
const About = () => {
    const { t } = useTranslation();

    // Benefit items for Tab 2
    const benefits: BenefitItem[] = [
        { icon: <Network className="h-4 w-4" />, title: t('benefit_1_title'), desc: t('benefit_1_desc') },
        { icon: <Globe className="h-4 w-4" />, title: t('benefit_2_title'), desc: t('benefit_2_desc') },
        { icon: <Truck className="h-4 w-4" />, title: t('benefit_3_title'), desc: t('benefit_3_desc') },
        { icon: <Tag className="h-4 w-4" />, title: t('benefit_4_title'), desc: t('benefit_4_desc') },
        { icon: <MessageCircle className="h-4 w-4" />, title: t('benefit_5_title'), desc: t('benefit_5_desc') },
        { icon: <ShieldCheck className="h-4 w-4" />, title: t('benefit_6_title'), desc: t('benefit_6_desc') },
        { icon: <ShoppingCart className="h-4 w-4" />, title: t('benefit_7_title'), desc: t('benefit_7_desc') },
        { icon: <Zap className="h-4 w-4" />, title: t('benefit_8_title'), desc: t('benefit_8_desc') },
    ];

    // Partner brands for Tab 3
    const partners: PartnerItem[] = [
        { name: 'Michelin', category: 'Reifen', accent: '#e63946' },
        { name: 'Bridgestone', category: 'Reifen', accent: '#e85d04' },
        { name: 'Continental', category: 'Reifen & Felgen', accent: '#fca311' },
        { name: 'Goodyear', category: 'Reifen', accent: '#2d6a4f' },
        { name: 'Pirelli', category: 'Reifen', accent: '#c9184a' },
        { name: 'Dunlop', category: 'Reifen', accent: '#023e8a' },
        { name: 'Hankook', category: 'Reifen', accent: '#e63946' },
        { name: 'Falken', category: 'Reifen', accent: '#4361ee' },
        { name: 'Yokohama', category: 'Reifen', accent: '#e36414' },
        { name: 'BF Goodrich', category: 'Reifen', accent: '#6a0572' },
        { name: 'Nokian', category: 'Reifen', accent: '#1b4332' },
        { name: 'AEZ', category: 'Felgen', accent: '#2b2d42' },
    ];

    const tabs = [
        { value: 'tab-1', icon: <Award className="h-4 w-4 shrink-0" />, label: t('about_tab1_label') },
        { value: 'tab-2', icon: <Users className="h-4 w-4 shrink-0" />, label: t('about_tab2_label') },
        { value: 'tab-3', icon: <Handshake className="h-4 w-4 shrink-0" />, label: t('about_tab3_label') },
    ];

    return (
        <section id="about" className="py-24 bg-gradient-to-b from-brand-dark to-black relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange opacity-[0.03] rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center gap-4 text-center mb-12"
                >
                    <Badge
                        variant="outline"
                        className="border-brand-orange/40 text-brand-orange bg-brand-orange/10 px-4 py-1 text-xs tracking-widest uppercase font-medium"
                    >
                        {t('about_badge')}
                    </Badge>
                    <h2 className="max-w-2xl text-3xl md:text-5xl font-bold text-white">
                        {t('about_title')}
                    </h2>
                    <p className="text-gray-400 max-w-xl text-base font-light leading-relaxed">
                        {t('about_text_2')}
                    </p>
                </motion.div>

                {/* Tabs */}
                <Tabs defaultValue="tab-1">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <TabsList className="w-full">
                            {tabs.map((tab) => (
                                <TabsTrigger key={tab.value} value={tab.value}>
                                    {tab.icon}
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </motion.div>

                    {/* Panel container */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="mt-8 rounded-2xl bg-brand-gray/50 border border-white/[0.06] p-6 lg:p-12"
                    >

                        {/* ── Tab 1: "Qualität erfahren" – text + small image ── */}
                        <TabsContent
                            value="tab-1"
                            className="grid place-items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14"
                        >
                            {/* Text */}
                            <div className="flex flex-col gap-5">
                                <Badge variant="outline" className="w-fit border-white/10 bg-white/5 text-gray-300 text-xs uppercase tracking-widest">
                                    {t('about_tab1_badge')}
                                </Badge>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                                    {t('about_tab1_title')}
                                </h3>
                                <p className="text-gray-400 text-base lg:text-lg font-light leading-relaxed">
                                    {t('about_tab1_desc')}
                                </p>
                                <Button
                                    className="mt-2 w-fit gap-2 bg-brand-orange text-white hover:bg-brand-orange/85 font-semibold shadow-lg shadow-brand-orange/20"
                                    size="lg"
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    {t('about_tab1_btn')}
                                </Button>
                            </div>

                            {/* Image – smaller, portrait */}
                            <div className="relative group w-48 shrink-0 hidden lg:block">
                                <div className="absolute inset-0 bg-brand-orange opacity-10 blur-xl rounded-2xl group-hover:opacity-20 transition-opacity duration-500" />
                                <img
                                    src="/grafics/pictures/about_us_picture.png"
                                    alt={t('about_badge')}
                                    className="relative z-10 rounded-2xl shadow-2xl w-full object-cover aspect-[3/4] opacity-90 hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                        </TabsContent>

                        {/* ── Tab 2: "Unsere Benefits" – icon keyword grid + small image ── */}
                        <TabsContent
                            value="tab-2"
                            className="grid place-items-start gap-10 lg:grid-cols-[1fr_auto] lg:gap-14"
                        >
                            {/* Benefits list */}
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-col gap-1.5">
                                    <Badge variant="outline" className="w-fit border-white/10 bg-white/5 text-gray-300 text-xs uppercase tracking-widest">
                                        {t('about_tab2_badge')}
                                    </Badge>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mt-3">
                                        {t('about_tab2_title')}
                                    </h3>
                                </div>

                                {/* 2-column grid of benefit items */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                                    {benefits.map((b, i) => (
                                        <BenefitRow key={i} {...b} />
                                    ))}
                                </div>

                                <Button
                                    className="mt-2 w-fit gap-2 bg-brand-orange text-white hover:bg-brand-orange/85 font-semibold shadow-lg shadow-brand-orange/20"
                                    size="lg"
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    {t('about_tab2_btn')}
                                </Button>
                            </div>

                            {/* Image – small portrait */}
                            <div className="relative group w-48 shrink-0 hidden lg:block">
                                <div className="absolute inset-0 bg-brand-orange opacity-10 blur-xl rounded-2xl group-hover:opacity-20 transition-opacity duration-500" />
                                <img
                                    src="/grafics/pictures/about_us_picture.png"
                                    alt={t('about_badge')}
                                    className="relative z-10 rounded-2xl shadow-2xl w-full object-cover aspect-[3/4] opacity-90 hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                        </TabsContent>

                        {/* ── Tab 3: "Verfügbare Marken" – brands grid ── */}
                        <TabsContent
                            value="tab-3"
                            className="flex flex-col gap-8"
                        >
                            {/* Header */}
                            <div className="flex flex-col gap-2">
                                <Badge variant="outline" className="w-fit border-white/10 bg-white/5 text-gray-300 text-xs uppercase tracking-widest">
                                    {t('about_tab3_badge')}
                                </Badge>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mt-1">
                                    {t('about_tab3_title')}
                                </h3>
                                <p className="text-gray-400 text-base font-light leading-relaxed max-w-2xl">
                                    {t('about_tab3_subtitle')}
                                </p>
                            </div>

                            {/* Partner grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {partners.map((partner) => (
                                    <PartnerCard key={partner.name} {...partner} />
                                ))}
                            </div>

                            {/* Stats row */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                {[
                                    { val: t('about_tab3_stat1_val'), label: t('about_tab3_stat1_label') },
                                    { val: t('about_tab3_stat2_val'), label: t('about_tab3_stat2_label') },
                                    { val: t('about_tab3_stat3_val'), label: t('about_tab3_stat3_label') },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="px-5 py-2.5 bg-brand-dark/70 border border-white/[0.07] rounded-full flex items-center gap-2"
                                    >
                                        <span className="text-xl font-bold text-brand-orange">{stat.val}</span>
                                        <span className="text-sm text-gray-400 font-light">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                    </motion.div>
                </Tabs>
            </div>
        </section>
    );
};

export default About;
