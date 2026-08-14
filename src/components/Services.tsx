import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaSun, FaSnowflake, FaCloudSunRain, FaMountain, FaDharmachakra, FaLifeRing, FaGaugeHigh } from 'react-icons/fa6';
import ServicesGrid, { type ServiceCard } from './ui/services';
import TypewriterText from './TypewriterText';

const IMG = '/grafics/pictures/_services';

const Services = () => {
    const { t } = useTranslation();

    const tireItems: ServiceCard[] = [
        {
            title: t('tire_summer_title'),
            icon: <FaSun />,
            image: `${IMG}/summer-context.webp`,
            imageAlt: 'Fahrzeug mit Sommerbereifung auf trockener Fahrbahn',
            overlayImage: `${IMG}/summer-detail.webp`,
            overlayAlt: 'Profildetail eines Sommerreifens',
        },
        {
            title: t('tire_winter_title'),
            icon: <FaSnowflake />,
            image: `${IMG}/winter-context.webp`,
            imageAlt: 'Fahrzeug mit Winterbereifung auf schneebedeckter Straße',
            overlayImage: `${IMG}/winter-detail.webp`,
            overlayAlt: 'Lamellenprofil eines Winterreifens im Schnee',
        },
        {
            title: t('tire_allseason_title'),
            icon: <FaCloudSunRain />,
            image: `${IMG}/allseason-context.webp`,
            imageAlt: 'Fahrzeug mit Allwetterreifen auf nasser Fahrbahn',
            overlayImage: `${IMG}/allseason-detail.webp`,
            overlayAlt: 'Wasserableitende Profilrillen eines Allwetterreifens',
        },
        {
            title: t('tire_offroad_title'),
            icon: <FaMountain />,
            image: `${IMG}/offroad-context.webp`,
            imageAlt: 'Geländewagen mit Offroadbereifung auf Schotterpiste',
            overlayImage: `${IMG}/offroad-detail.webp`,
            overlayAlt: 'Grobstolliges Profil eines Offroadreifens',
        },
    ];

    const rimItems: ServiceCard[] = [
        {
            title: t('rim_alu_title'),
            icon: <FaDharmachakra />,
            image: `${IMG}/alu-context.webp`,
            imageAlt: 'Montierte Alufelge am Fahrzeug',
            overlayImage: `${IMG}/alu-detail.webp`,
            overlayAlt: 'Detailaufnahme einer glanzgedrehten Alufelge',
        },
        {
            title: t('rim_steel_title'),
            icon: <FaLifeRing />,
            image: `${IMG}/steel-context.webp`,
            imageAlt: 'Stahlfelge mit montiertem Reifen in der Werkstatt',
            overlayImage: `${IMG}/steel-detail.webp`,
            overlayAlt: 'Detailaufnahme einer Stahlfelge mit Radschrauben',
        },
        {
            title: t('rim_rdks_title'),
            icon: <FaGaugeHigh />,
            image: `${IMG}/rdks-context.webp`,
            imageAlt: 'RDKS-Sensor am Rad montiert',
            overlayImage: `${IMG}/rdks-detail.webp`,
            overlayAlt: 'Reifendruckprüfung am Ventil',
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
                        className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4 block text-center lg:text-left"
                        tag="h3"
                    />
                    <ServicesGrid items={tireItems} />
                </div>

                {/* Rim Overview */}
                <div>
                    <TypewriterText
                        text={t('rim_overview_title')}
                        className="text-3xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4 block text-center lg:text-left"
                        tag="h3"
                    />
                    <ServicesGrid items={rimItems} columnsClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" />
                </div>
            </div>
        </section>
    );
};

export default Services;
