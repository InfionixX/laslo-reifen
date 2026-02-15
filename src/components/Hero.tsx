import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section id="home" className="hero-bg h-screen flex items-center justify-center relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1580273916550-e323be2ed5fa?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat">
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-orange rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-brand-orange rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-brand-dark to-transparent z-10"></div>

            <div className="text-center px-4 max-w-5xl mx-auto z-10 relative">
                <TypewriterText
                    text={t('hero_subtitle')}
                    tag="h2"
                    className="text-white text-lg md:text-2xl font-bold mb-4"
                    delay={0}
                />

                <div className="font-extrabold mb-8 leading-tight">
                    <TypewriterText
                        text={t('hero_title_1')}
                        tag="span"
                        className="text-3xl md:text-5xl text-brand-orange block mb-2 tracking-wide"
                        delay={0.5}
                        speed={0.1}
                    />
                    <TypewriterText
                        text={t('hero_title_2')}
                        tag="span"
                        className="text-5xl md:text-7xl lg:text-8xl text-white block"
                        delay={1.0}
                        speed={0.08}
                    />
                </div>

                <TypewriterText
                    text={t('hero_desc')}
                    tag="p"
                    className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light"
                    delay={2.5}
                    speed={0.01}
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 3.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a href="#services" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-900/50">
                        {t('cta_primary')}
                    </a>
                    <a href="#contact" className="border border-white hover:bg-white hover:text-brand-dark text-white font-bold py-4 px-8 rounded-full transition-all">
                        {t('cta_secondary')}
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

