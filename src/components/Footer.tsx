import { useTranslation } from 'react-i18next';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import { useModal } from '../context/ModalContext';

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
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 text-sm">&copy; 2023 Laslo Reifen. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0 text-gray-600 text-sm">
                        <a href="https://www.instagram.com/laslo.reifen?igsh=MXZxZDBvdWN5Y2oxNw==" target="_blank" className="hover:text-brand-orange"><FaInstagram className="text-lg" /></a>
                        <a href="https://www.facebook.com/share/17uXyhRbgV/" target="_blank" className="hover:text-brand-orange"><FaFacebookF className="text-lg" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
