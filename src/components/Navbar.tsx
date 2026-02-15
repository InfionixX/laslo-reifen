import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaGlobe, FaTimes } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLangMenuOpen(false);
    };

    const navLinks = [
        { key: 'nav_home', href: '#home' },
        { key: 'nav_about', href: '#about' },
        { key: 'nav_services', href: '#services' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel bg-brand-dark/80' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <GiCarWheel className="text-brand-orange text-3xl animate-spin-slow" />
                        <span className="text-white text-2xl font-bold tracking-tighter">
                            {t('brand_1')} <span className="text-brand-orange">{t('brand_2')}</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a key={link.key} href={link.href} className="hover:text-brand-orange text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    {t(link.key)}
                                </a>
                            ))}
                            <a href="#contact" className="bg-brand-orange hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
                                {t('nav_contact')}
                            </a>

                            {/* Language Switcher */}
                            <div className="relative inline-block text-left ml-4 group">
                                <button className="flex items-center text-gray-300 hover:text-white focus:outline-none" onClick={() => setLangMenuOpen(!langMenuOpen)}>
                                    <FaGlobe className="mr-1" /> <span>{i18n.language.toUpperCase()}</span>
                                </button>
                                <div className={`absolute right-0 mt-2 w-32 bg-brand-gray border border-gray-700 rounded-md shadow-lg transition-all duration-300 transform origin-top-right ${langMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                                    <div className="py-1">
                                        <button onClick={() => changeLanguage('de')} className="block w-full text-left px-4 py-2 text-sm hover:bg-brand-dark text-gray-300 hover:text-brand-orange">Deutsch</button>
                                        <button onClick={() => changeLanguage('hu')} className="block w-full text-left px-4 py-2 text-sm hover:bg-brand-dark text-gray-300 hover:text-brand-orange">Magyar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden gap-4">
                        <button onClick={() => changeLanguage(i18n.language === 'de' ? 'hu' : 'de')} className="text-gray-300 hover:text-brand-orange font-bold">
                            {i18n.language.toUpperCase()}
                        </button>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-brand-gray border-t border-gray-800 absolute w-full left-0">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a key={link.key} href={link.href} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:text-brand-orange" onClick={() => setMobileMenuOpen(false)}>
                                {t(link.key)}
                            </a>
                        ))}
                        <a href="#contact" className="text-brand-orange font-bold block px-3 py-2 rounded-md text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
                            {t('nav_contact')}
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
