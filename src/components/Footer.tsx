import { useTranslation } from 'react-i18next';
import { GiCarWheel } from 'react-icons/gi';
import { useModal } from '../context/ModalContext';
import SocialLinks from './ui/social-links';

const Footer = () => {
    const { t } = useTranslation();
    const { openModal } = useModal();

    return (
        <footer className="bg-gradient-to-b from-brand-dark to-black border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <GiCarWheel className="text-brand-orange text-2xl" />
                            <span className="text-white text-xl font-bold tracking-tighter">
                                {t('brand_1')} <span className="text-brand-orange">{t('brand_2')}</span>
                            </span>
                        </div>
                        <p className="text-gray-500 max-w-sm">
                            {t('footer_desc')}
                        </p>

                        {/* Social profiles */}
                        <div className="mt-6">
                            <h4 className="text-white font-bold mb-3 uppercase text-sm tracking-wider">{t('social_label')}</h4>
                            <SocialLinks variant="solid" iconClassName="text-lg" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('footer_links')}</h4>
                        <ul className="space-y-2">
                            <li><a href="#home" className="text-gray-500 hover:text-brand-orange transition-colors text-sm">{t('nav_home')}</a></li>
                            <li><a href="#about" className="text-gray-500 hover:text-brand-orange transition-colors text-sm">{t('nav_about')}</a></li>
                            <li><a href="#services" className="text-gray-500 hover:text-brand-orange transition-colors text-sm">{t('nav_services')}</a></li>
                            <li><a href="#contact" className="text-gray-500 hover:text-brand-orange transition-colors text-sm">{t('nav_contact')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">{t('footer_legal')}</h4>
                        <ul className="space-y-2">
                            <li><button onClick={() => openModal('impressum')} className="text-gray-500 hover:text-brand-orange transition-colors text-sm text-left">Impressum</button></li>
                            <li><button onClick={() => openModal('privacy')} className="text-gray-500 hover:text-brand-orange transition-colors text-sm text-left">Datenschutz</button></li>
                            <li><button onClick={() => openModal('widerruf')} className="text-gray-500 hover:text-brand-orange transition-colors text-sm text-left">Widerrufsbelehrung</button></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-sm">&copy; 2026 Magyar Gumis. Alle Rechte vorbehalten.</p>
                    <a href="mailto:laszlo@magyar-gumis.de" className="text-gray-600 hover:text-brand-orange transition-colors text-sm">laszlo@magyar-gumis.de</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
