import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';

/* ===========================================================================
   Navbar - fixed chrome over a stage whose brightness changes mid-journey.

   It cannot know which scene is behind it, so every colour here comes from the
   --tone-* variables that ShopJourney stamps on <html>. Crossing the shop
   threshold flips the navbar from bone-on-dusk to ink-on-showroom.
   =========================================================================== */

const navLinks = [
    { key: 'nav_home', href: '#home' },
    { key: 'show_eyebrow', href: '#tires' },
    { key: 'nav_about', href: '#about' },
    { key: 'nav_services', href: '#services' },
];

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);

    const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'de' ? 'hu' : 'de');

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
                    scrolled ? 'tone-bd backdrop-blur-xl' : 'border-transparent'
                }`}
                style={scrolled ? { background: 'var(--tone-panel)' } : undefined}
            >
                <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">

                    {/* Wordmark */}
                    <a
                        href="#home"
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-baseline gap-2"
                    >
                        <span className="tone-text font-display text-2xl tracking-tight">
                            {t('brand_1')}
                        </span>
                        <span className="font-display text-2xl italic tracking-tight text-copper transition-colors duration-300 group-hover:text-copper-hi">
                            {t('brand_2')}
                        </span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-9 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                className="tone-text-dim group relative font-mono text-[0.6875rem] uppercase tracking-[0.18em] hover:!text-copper"
                            >
                                {t(link.key)}
                                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-copper transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden items-center gap-5 md:flex">
                        <button
                            onClick={toggleLanguage}
                            className="tone-text-dim flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] hover:!text-copper"
                            aria-label="Sprache wechseln / Nyelvváltás"
                        >
                            <Globe className="h-3.5 w-3.5" />
                            {i18n.language.toUpperCase()}
                        </button>
                        <a
                            href="#contact"
                            className="rounded-full border border-copper/50 px-5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-copper transition-all duration-300 hover:bg-copper hover:text-showroom"
                        >
                            {t('nav_contact')}
                        </a>
                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleLanguage}
                            className="tone-text-dim font-mono text-[0.6875rem] uppercase tracking-[0.18em]"
                            aria-label="Sprache wechseln / Nyelvváltás"
                        >
                            {i18n.language.toUpperCase()}
                        </button>
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="tone-text"
                            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile sheet */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden"
                        style={{ background: 'var(--tone-surface)' }}
                    >
                        <div className="flex flex-col gap-2">
                            {[...navLinks, { key: 'nav_contact', href: '#contact' }].map(
                                (link, i) => (
                                    <motion.a
                                        key={link.key}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.08 + i * 0.06,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="tone-text tone-bd border-b py-5 font-display text-4xl hover:!text-copper"
                                    >
                                        {t(link.key)}
                                    </motion.a>
                                ),
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
