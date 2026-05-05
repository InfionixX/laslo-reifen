import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaSun, FaSnowflake, FaCloudSunRain, FaMountain, FaDharmachakra, FaLifeRing, FaGaugeHigh } from 'react-icons/fa6';
import ExpandableGallery from './ui/expandable-gallery';
import TypewriterText from './TypewriterText';

const Services = () => {
    const { t } = useTranslation();

    const tires = [
        { id: 'summer', title: 'tire_summer_title', icon: <FaSun />, color: 'bg-brand-orange', img: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=600&auto=format&fit=crop' },
        { id: 'winter', title: 'tire_winter_title', icon: <FaSnowflake />, color: 'bg-blue-500', img: 'https://images.unsplash.com/photo-1483304528321-0674f0040030?q=80&w=600&auto=format&fit=crop' },
        { id: 'allseason', title: 'tire_allseason_title', icon: <FaCloudSunRain />, color: 'bg-green-600', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop' },
        { id: 'offroad', title: 'tire_offroad_title', icon: <FaMountain />, color: 'bg-stone-600', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop' },
    ];

    const rims = [
        { id: 'alu', title: 'rim_alu_title', desc: 'rim_alu_desc', icon: <FaDharmachakra />, color: 'bg-brand-orange', img: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?q=80&w=800&auto=format&fit=crop' },
        { id: 'steel', title: 'rim_steel_title', desc: 'rim_steel_desc', icon: <FaLifeRing />, color: 'bg-gray-600', img: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=800&auto=format&fit=crop' },
        { id: 'rdks', title: 'rim_rdks_title', desc: 'rim_rdks_desc', icon: <FaGaugeHigh />, color: 'bg-blue-500', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop' },
    ];

    const tirePhotos = tires.map((t, i) => ({
        id: `tire-${t.id}`,
        src: t.img,
        alt: t.id,
        rotation: i === 0 ? -10 : i === 1 ? 5 : i === 2 ? -5 : 8,
        x: i === 0 ? -60 : i === 1 ? 0 : i === 2 ? 60 : -30,
        y: i === 0 ? 10 : i === 1 ? -10 : i === 2 ? 5 : 20,
        zIndex: (4 - i) * 10,
    }));

    const rimPhotos = rims.map((r, i) => ({
        id: `rim-${r.id}`,
        src: r.img,
        alt: r.id,
        rotation: i === 0 ? -12 : i === 1 ? 2 : 10,
        x: i === 0 ? -70 : i === 1 ? -5 : 65,
        y: i === 0 ? 15 : i === 1 ? -15 : 0,
        zIndex: (3 - i) * 10,
    }));

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
                        whileInView={{ width: 96 }} // 24 * 4 = 96px
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
                    
                    <ExpandableGallery photos={tirePhotos} exploreText="Alle Reifen anzeigen" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-4 mt-8"
                    >
                        {tires.map((tire) => (
                            <div key={tire.id} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                                <div className={`${tire.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm`}>
                                    {tire.icon}
                                </div>
                                <span className="text-white font-medium">{t(tire.title)}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Rim Overview */}
                <div>
                    <TypewriterText
                        text={t('rim_overview_title')}
                        className="text-3xl font-bold text-white mb-4 border-l-4 border-brand-orange pl-4 block text-center lg:text-left"
                        tag="h3"
                    />

                    <ExpandableGallery photos={rimPhotos} exploreText="Alle Felgen anzeigen" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-4 mt-8"
                    >
                        {rims.map((rim) => (
                            <div key={rim.id} className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10">
                                <div className={`${rim.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm`}>
                                    {rim.icon}
                                </div>
                                <span className="text-white font-medium">{t(rim.title)}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;
