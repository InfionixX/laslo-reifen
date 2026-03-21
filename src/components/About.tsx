import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaCheck, FaLanguage, FaTruckFast } from 'react-icons/fa6';
import TypewriterText from './TypewriterText';
import Tire3D from './Tire3D';

const About = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-brand-orange z-0"></div>
                        <Tire3D />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-brand-orange z-0"></div>
                    </motion.div>

                    <div>
                        <TypewriterText
                            text={t('about_badge')}
                            className="text-brand-orange font-bold uppercase tracking-wider mb-2 block"
                            tag="h3"
                        />
                        <TypewriterText
                            text={t('about_title')}
                            className="text-4xl font-bold text-white mb-6 block"
                            tag="h2"
                            delay={0.2}
                        />
                        <TypewriterText
                            text={t('about_text_1')}
                            className="text-gray-400 mb-6 leading-relaxed block"
                            tag="p"
                            delay={0.5}
                            speed={0.01}
                        />
                        <TypewriterText
                            text={t('about_text_2')}
                            className="text-gray-400 mb-8 leading-relaxed block"
                            tag="p"
                            delay={1.5}
                            speed={0.01}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 2.0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        >
                            <div className="bg-brand-gray p-4 rounded-lg border border-gray-800">
                                <FaCheck className="text-brand-orange text-xl mb-2" />
                                <h4 className="text-white font-bold">{t('feature_1_title')}</h4>
                                <p className="text-sm text-gray-500">{t('feature_1_desc')}</p>
                            </div>
                            <div className="bg-brand-gray p-4 rounded-lg border border-gray-800">
                                <FaLanguage className="text-brand-orange text-xl mb-2" />
                                <h4 className="text-white font-bold">{t('feature_2_title')}</h4>
                                <p className="text-sm text-gray-500">{t('feature_2_desc')}</p>
                            </div>
                            <div className="bg-brand-gray p-4 rounded-lg border border-gray-800 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                                <FaTruckFast className="text-brand-orange text-xl mb-2" />
                                <h4 className="text-white font-bold">{t('feature_3_title')}</h4>
                                <p className="text-sm text-gray-500">{t('feature_3_desc')}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

