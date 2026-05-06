import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaSun, FaSnowflake, FaCloudSunRain, FaMountain, FaDharmachakra, FaLifeRing, FaGaugeHigh } from 'react-icons/fa6';
import ItemCarousel, { type CarouselCategory, type PriceTier } from './ui/item-carousel';
import TypewriterText from './TypewriterText';

/* ─── Reusable tier styling presets ─── */
const TIER_BUDGET: Pick<PriceTier, 'label' | 'accent' | 'bgClass' | 'badgeClass'> = {
    label: 'Preisgünstig',
    accent: 'border-emerald-500/30',
    bgClass: 'bg-emerald-950/20',
    badgeClass: 'bg-emerald-500/20 text-emerald-400',
};
const TIER_MID: Pick<PriceTier, 'label' | 'accent' | 'bgClass' | 'badgeClass'> = {
    label: 'Mittelklasse',
    accent: 'border-blue-500/30',
    bgClass: 'bg-blue-950/20',
    badgeClass: 'bg-blue-500/20 text-blue-400',
};
const TIER_PREMIUM: Pick<PriceTier, 'label' | 'accent' | 'bgClass' | 'badgeClass'> = {
    label: 'Premium',
    accent: 'border-amber-500/40',
    bgClass: 'bg-amber-950/20',
    badgeClass: 'bg-amber-500/20 text-amber-400',
};

const Services = () => {
    const { t } = useTranslation();

    const tireCategories: CarouselCategory[] = [
        {
            id: 'summer',
            title: t('tire_summer_title'),
            icon: <FaSun />,
            color: 'bg-brand-orange',
            exploreText: 'Sommerreifen anzeigen',
            photos: [
                { id: 's1', src: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=600&auto=format&fit=crop', alt: 'Sommerreifen Parkplatz', rotation: -12, x: -80, y: 10, zIndex: 10 },
                { id: 's2', src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop', alt: 'Sportliches Fahrzeug', rotation: 3, x: 0, y: -12, zIndex: 20 },
                { id: 's3', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop', alt: 'Performance Reifen', rotation: 10, x: 70, y: 5, zIndex: 30 },
            ],
            tiers: [
                { ...TIER_BUDGET, photos: [
                    { id: 'sb1', src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop', alt: 'Budget Sommerreifen' },
                    { id: 'sb2', src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=600&auto=format&fit=crop', alt: 'Alltagsreifen Sommer' },
                ]},
                { ...TIER_MID, photos: [
                    { id: 'sm1', src: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=600&auto=format&fit=crop', alt: 'Mittelklasse Sommer' },
                    { id: 'sm2', src: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?q=80&w=600&auto=format&fit=crop', alt: 'Qualitätsreifen Sommer' },
                ]},
                { ...TIER_PREMIUM, photos: [
                    { id: 'sp1', src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop', alt: 'Premium Performance' },
                    { id: 'sp2', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop', alt: 'High-End Sommerreifen' },
                ]},
            ],
        },
        {
            id: 'winter',
            title: t('tire_winter_title'),
            icon: <FaSnowflake />,
            color: 'bg-blue-500',
            exploreText: 'Winterreifen anzeigen',
            photos: [
                { id: 'w1', src: 'https://images.unsplash.com/photo-1483304528321-0674f0040030?q=80&w=600&auto=format&fit=crop', alt: 'Winterstraße', rotation: -10, x: -75, y: 8, zIndex: 10 },
                { id: 'w2', src: 'https://images.unsplash.com/photo-1548266652-99cf27701ab1?q=80&w=600&auto=format&fit=crop', alt: 'Schneefahrt', rotation: 2, x: 5, y: -10, zIndex: 20 },
                { id: 'w3', src: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=600&auto=format&fit=crop', alt: 'Winterlandschaft', rotation: 14, x: 80, y: 3, zIndex: 30 },
            ],
            tiers: [
                { ...TIER_BUDGET, photos: [
                    { id: 'wb1', src: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?q=80&w=600&auto=format&fit=crop', alt: 'Budget Winterreifen' },
                    { id: 'wb2', src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=600&auto=format&fit=crop', alt: 'Alltagsreifen Winter' },
                ]},
                { ...TIER_MID, photos: [
                    { id: 'wm1', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&auto=format&fit=crop', alt: 'Mittelklasse Winter' },
                    { id: 'wm2', src: 'https://images.unsplash.com/photo-1548266652-99cf27701ab1?q=80&w=600&auto=format&fit=crop', alt: 'Qualitätsreifen Winter' },
                ]},
                { ...TIER_PREMIUM, photos: [
                    { id: 'wp1', src: 'https://images.unsplash.com/photo-1483304528321-0674f0040030?q=80&w=600&auto=format&fit=crop', alt: 'Premium Winterreifen' },
                    { id: 'wp2', src: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=600&auto=format&fit=crop', alt: 'High-End Winterreifen' },
                ]},
            ],
        },
        {
            id: 'allseason',
            title: t('tire_allseason_title'),
            icon: <FaCloudSunRain />,
            color: 'bg-green-600',
            exploreText: 'Allwetterreifen anzeigen',
            photos: [
                { id: 'a1', src: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop', alt: 'Allwetter Fahrt', rotation: -14, x: -85, y: 12, zIndex: 10 },
                { id: 'a2', src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?q=80&w=600&auto=format&fit=crop', alt: 'Regenfahrt', rotation: -2, x: -5, y: -8, zIndex: 20 },
                { id: 'a3', src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop', alt: 'SUV nasse Straße', rotation: 11, x: 75, y: 6, zIndex: 30 },
            ],
            tiers: [
                { ...TIER_BUDGET, photos: [
                    { id: 'ab1', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop', alt: 'Budget Allwetter' },
                    { id: 'ab2', src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=600&auto=format&fit=crop', alt: 'Alltagsreifen Allwetter' },
                ]},
                { ...TIER_MID, photos: [
                    { id: 'am1', src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?q=80&w=600&auto=format&fit=crop', alt: 'Mittelklasse Allwetter' },
                    { id: 'am2', src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=600&auto=format&fit=crop', alt: 'Qualitätsreifen Allwetter' },
                ]},
                { ...TIER_PREMIUM, photos: [
                    { id: 'ap1', src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop', alt: 'Premium Allwetter' },
                    { id: 'ap2', src: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop', alt: 'High-End Allwetter' },
                ]},
            ],
        },
        {
            id: 'offroad',
            title: t('tire_offroad_title'),
            icon: <FaMountain />,
            color: 'bg-stone-600',
            exploreText: 'Offroadreifen anzeigen',
            photos: [
                { id: 'o1', src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop', alt: 'Offroad Gelände', rotation: -8, x: -70, y: 15, zIndex: 10 },
                { id: 'o2', src: 'https://images.unsplash.com/photo-1519752594763-2633d8d4ea29?q=80&w=600&auto=format&fit=crop', alt: 'Geländefahrt', rotation: 4, x: 10, y: -12, zIndex: 20 },
                { id: 'o3', src: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=600&auto=format&fit=crop', alt: 'Offroad Adventure', rotation: 13, x: 78, y: 0, zIndex: 30 },
            ],
            tiers: [
                { ...TIER_BUDGET, photos: [
                    { id: 'ob1', src: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=600&auto=format&fit=crop', alt: 'Budget Offroadreifen' },
                    { id: 'ob2', src: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=600&auto=format&fit=crop', alt: 'Alltagsreifen Offroad' },
                ]},
                { ...TIER_MID, photos: [
                    { id: 'om1', src: 'https://images.unsplash.com/photo-1519752594763-2633d8d4ea29?q=80&w=600&auto=format&fit=crop', alt: 'Mittelklasse Offroad' },
                    { id: 'om2', src: 'https://images.unsplash.com/photo-1581235707960-35f13de9c5f6?q=80&w=600&auto=format&fit=crop', alt: 'Qualitätsreifen Offroad' },
                ]},
                { ...TIER_PREMIUM, photos: [
                    { id: 'op1', src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop', alt: 'Premium Offroad' },
                    { id: 'op2', src: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=600&auto=format&fit=crop', alt: 'High-End Offroad' },
                ]},
            ],
        },
    ];

    const rimCategories: CarouselCategory[] = [
        {
            id: 'alu',
            title: t('rim_alu_title'),
            icon: <FaDharmachakra />,
            color: 'bg-brand-orange',
            exploreText: 'Alufelgen anzeigen',
            photos: [
                { id: 'al1', src: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?q=80&w=600&auto=format&fit=crop', alt: 'Alufelge Sport', rotation: -15, x: -85, y: 10, zIndex: 10 },
                { id: 'al2', src: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=600&auto=format&fit=crop', alt: 'Premium Felge', rotation: -2, x: 0, y: -15, zIndex: 20 },
                { id: 'al3', src: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=600&auto=format&fit=crop', alt: 'Felgen Design', rotation: 12, x: 80, y: 5, zIndex: 30 },
            ],
            tiers: [
                { ...TIER_BUDGET, photos: [
                    { id: 'alb1', src: 'https://images.unsplash.com/photo-1514867644123-6385d58d3cd4?q=80&w=600&auto=format&fit=crop', alt: 'Budget Alufelge' },
                    { id: 'alb2', src: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=600&auto=format&fit=crop', alt: 'Standard Alufelge' },
                ]},
                { ...TIER_MID, photos: [
                    { id: 'alm1', src: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?q=80&w=600&auto=format&fit=crop', alt: 'Mittelklasse Alufelge' },
                    { id: 'alm2', src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&auto=format&fit=crop', alt: 'Sport Alufelge' },
                ]},
                { ...TIER_PREMIUM, photos: [
                    { id: 'alp1', src: 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=600&auto=format&fit=crop', alt: 'Premium Alufelge' },
                    { id: 'alp2', src: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=600&auto=format&fit=crop', alt: 'Luxury Alufelge' },
                ]},
            ],
        },
        {
            id: 'steel',
            title: t('rim_steel_title'),
            icon: <FaLifeRing />,
            color: 'bg-gray-600',
            exploreText: 'Stahlfelgen anzeigen',
            photos: [
                { id: 'st1', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop', alt: 'Stahlfelge', rotation: -10, x: -75, y: 12, zIndex: 10 },
                { id: 'st2', src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop', alt: 'Robuste Felge', rotation: 3, x: 5, y: -10, zIndex: 20 },
                { id: 'st3', src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop', alt: 'Stahlrad Montage', rotation: 11, x: 70, y: 4, zIndex: 30 },
            ],
            tiers: [
                { ...TIER_BUDGET, photos: [
                    { id: 'stb1', src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600&auto=format&fit=crop', alt: 'Budget Stahlfelge' },
                    { id: 'stb2', src: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=600&auto=format&fit=crop', alt: 'Standard Stahlfelge' },
                ]},
                { ...TIER_MID, photos: [
                    { id: 'stm1', src: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=600&auto=format&fit=crop', alt: 'Mittelklasse Stahl' },
                    { id: 'stm2', src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop', alt: 'Qualität Stahlfelge' },
                ]},
                { ...TIER_PREMIUM, photos: [
                    { id: 'stp1', src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop', alt: 'Premium Stahlfelge' },
                    { id: 'stp2', src: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop', alt: 'High-End Stahl' },
                ]},
            ],
        },
        {
            id: 'rdks',
            title: t('rim_rdks_title'),
            icon: <FaGaugeHigh />,
            color: 'bg-blue-500',
            exploreText: 'RDKS anzeigen',
            photos: [
                { id: 'rd1', src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop', alt: 'RDKS System', rotation: -13, x: -80, y: 8, zIndex: 10 },
                { id: 'rd2', src: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=600&auto=format&fit=crop', alt: 'Reifendruck Sensor', rotation: 0, x: 0, y: -14, zIndex: 20 },
                { id: 'rd3', src: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=600&auto=format&fit=crop', alt: 'Sicherheitstechnik', rotation: 14, x: 82, y: 2, zIndex: 30 },
            ],
            tiers: [
                { ...TIER_BUDGET, photos: [
                    { id: 'rdb1', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=600&auto=format&fit=crop', alt: 'Budget RDKS' },
                    { id: 'rdb2', src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=600&auto=format&fit=crop', alt: 'Standard RDKS' },
                ]},
                { ...TIER_MID, photos: [
                    { id: 'rdm1', src: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=600&auto=format&fit=crop', alt: 'Mittelklasse RDKS' },
                    { id: 'rdm2', src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop', alt: 'Qualitäts RDKS' },
                ]},
                { ...TIER_PREMIUM, photos: [
                    { id: 'rdp1', src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop', alt: 'Premium RDKS' },
                    { id: 'rdp2', src: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=600&auto=format&fit=crop', alt: 'High-End RDKS' },
                ]},
            ],
        },
    ];

    return (
        <section id="services" className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-brand-dark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-orange opacity-[0.02] rounded-full blur-[100px] -translate-x-1/2 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <TypewriterText
                        text={t('services_badge')}
                        className="text-brand-orange font-bold uppercase tracking-wider mb-2 block"
                        tag="h3"
                    />
                    <TypewriterText
                        text={t('services_title')}
                        className="text-4xl font-bold text-white block"
                        tag="h2"
                        delay={0.2}
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-1 bg-brand-orange mx-auto mt-6"
                    ></motion.div>
                </div>

                {/* Tire Overview */}
                <div className="mb-24">
                    <TypewriterText
                        text={t('tire_overview_title')}
                        className="text-3xl font-bold text-white mb-4 border-l-4 border-brand-orange pl-4 block text-center lg:text-left"
                        tag="h3"
                    />
                    <ItemCarousel items={tireCategories} />
                </div>

                {/* Rim Overview */}
                <div>
                    <TypewriterText
                        text={t('rim_overview_title')}
                        className="text-3xl font-bold text-white mb-4 border-l-4 border-brand-orange pl-4 block text-center lg:text-left"
                        tag="h3"
                    />
                    <ItemCarousel items={rimCategories} />
                </div>
            </div>
        </section>
    );
};

export default Services;
