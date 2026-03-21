import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCheck, FaLanguage, FaTruckFast } from 'react-icons/fa6';
import TypewriterText from './TypewriterText';

const About = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Subtle Decorative element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange opacity-[0.03] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Text Content */}
                    <div className="flex-1">
                        <TypewriterText
                            text={t('about_badge')}
                            className="text-brand-orange font-medium tracking-widest mb-3 block text-sm"
                            tag="h3"
                        />
                        <TypewriterText
                            text={t('about_title')}
                            className="text-3xl md:text-5xl font-bold text-white mb-8 block"
                            tag="h2"
                            delay={0.2}
                        />
                        <div className="space-y-6 text-gray-400 font-light leading-relaxed mb-12">
                            <TypewriterText
                                text={t('about_text_1')}
                                tag="p"
                                delay={0.5}
                                speed={0.01}
                            />
                            <TypewriterText
                                text={t('about_text_2')}
                                tag="p"
                                delay={1.5}
                                speed={0.01}
                            />
                        </div>

                        {/* Minimalist Feature List */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 2.0 }}
                            className="space-y-6"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-brand-orange/10 p-2 rounded-full">
                                    <FaCheck className="text-brand-orange text-lg" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg mb-1">{t('feature_1_title')}</h4>
                                    <p className="text-sm text-gray-500 font-light">{t('feature_1_desc')}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-brand-orange/10 p-2 rounded-full">
                                    <FaLanguage className="text-brand-orange text-lg" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg mb-1">{t('feature_2_title')}</h4>
                                    <p className="text-sm text-gray-500 font-light">{t('feature_2_desc')}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-brand-orange/10 p-2 rounded-full">
                                    <FaTruckFast className="text-brand-orange text-lg" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-lg mb-1">{t('feature_3_title')}</h4>
                                    <p className="text-sm text-gray-500 font-light">{t('feature_3_desc')}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image - Smaller and cleaner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/3 max-w-md mx-auto relative group"
                    >
                        {/* Soft subtle glow behind image */}
                        <div className="absolute inset-0 bg-brand-orange opacity-10 blur-2xl rounded-2xl group-hover:opacity-20 transition-opacity duration-500"></div>
                        <img
                            src="/grafics/pictures/about_us_picture.png"
                            alt="Über uns"
                            className="relative z-10 rounded-2xl shadow-xl w-full object-cover aspect-[4/5] opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;

