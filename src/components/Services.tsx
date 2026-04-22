import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaSun, FaSnowflake, FaCloudSunRain, FaMountain, FaDharmachakra, FaLifeRing, FaGaugeHigh, FaArrowRight, FaCircleInfo } from 'react-icons/fa6';
import { useModal } from '../context/ModalContext';
import TypewriterText from './TypewriterText';

const Services = () => {
    const { t } = useTranslation();
    const { openModal } = useModal();

    const tires = [
        { id: 'summer', title: 'tire_summer_title', icon: <FaSun />, color: 'bg-brand-orange', img: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=600&auto=format&fit=crop' },
        { id: 'winter', title: 'tire_winter_title', icon: <FaSnowflake />, color: 'bg-blue-500', img: 'https://images.unsplash.com/photo-1483304528321-0674f0040030?q=80&w=600&auto=format&fit=crop' },
        { id: 'allseason', title: 'tire_allseason_title', icon: <FaCloudSunRain />, color: 'bg-green-600', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop' },
        { id: 'offroad', title: 'tire_offroad_title', icon: <FaMountain />, color: 'bg-stone-600', img: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?q=80&w=600&auto=format&fit=crop' },
    ];

    const rims = [
        { id: 'alu', title: 'rim_alu_title', desc: 'rim_alu_desc', icon: <FaDharmachakra />, color: 'bg-brand-orange', img: 'https://images.unsplash.com/photo-1611821064430-0d41029bb027?q=80&w=800&auto=format&fit=crop' },
        { id: 'steel', title: 'rim_steel_title', desc: 'rim_steel_desc', icon: <FaLifeRing />, color: 'bg-gray-600', img: 'https://images.unsplash.com/photo-1616789916450-482438883907?q=80&w=800&auto=format&fit=crop' },
        { id: 'rdks', title: 'rim_rdks_title', desc: 'rim_rdks_desc', icon: <FaGaugeHigh />, color: 'bg-blue-500', img: 'https://images.unsplash.com/photo-1595182967280-990522c07049?q=80&w=800&auto=format&fit=crop' },
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
                        whileInView={{ width: 96 }} // 24 * 4 = 96px
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-1 bg-brand-orange mx-auto mt-6"
                    ></motion.div>
                </div>

                {/* Tire Grid */}
                <div className="mb-16">
                    <TypewriterText
                        text={t('tire_overview_title')}
                        className="text-2xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4 block"
                        tag="h3"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {tires.map((tire) => (
                            <div key={tire.id} className="group cursor-pointer relative rounded-xl overflow-hidden h-64 border border-gray-700 hover:border-brand-orange transition-all" onClick={() => openModal('tire', tire)}>
                                <img src={tire.img} alt={t(tire.title)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                                    <div className={`w-10 h-10 ${tire.color} rounded-full flex items-center justify-center mb-3 text-white`}>
                                        {tire.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white">{t(tire.title)}</h4>
                                    <p className="text-xs text-gray-400 mt-1 flex items-center">
                                        <FaCircleInfo className="mr-1" /> {t('click_info')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Rim Grid */}
                <div>
                    <TypewriterText
                        text={t('rim_overview_title')}
                        className="text-2xl font-bold text-white mb-8 border-l-4 border-brand-orange pl-4 block"
                        tag="h3"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {rims.map((rim) => (
                            <div key={rim.id} className="group bg-brand-dark rounded-xl border border-gray-800 hover:border-brand-orange transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,87,34,0.15)] relative overflow-hidden min-h-[350px] cursor-pointer" onClick={() => openModal('rim', rim)}>
                                <div className="absolute top-0 right-0 w-2/3 h-2/3 z-0 pointer-events-none overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark z-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brand-dark/20 to-brand-dark z-10"></div>
                                    <img src={rim.img} alt={t(rim.title)} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700" />
                                </div>

                                <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                                    <div>
                                        <div className={`w-16 h-16 ${rim.color} rounded-2xl flex items-center justify-center shrink-0 text-white text-3xl shadow-lg mb-6`}>
                                            {rim.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{t(rim.title)}</h3>
                                        <p className="text-gray-300 max-w-xs">{t(rim.desc)}</p>
                                    </div>
                                    <div className="mt-8 flex items-center text-brand-orange font-bold group-hover:translate-x-2 transition-transform">
                                        {t('click_info')} <FaArrowRight className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;
