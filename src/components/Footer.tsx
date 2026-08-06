import { useTranslation } from 'react-i18next';
// lucide-react dropped brand marks in v1 - social glyphs come from react-icons
import { FaInstagram, FaFacebookF } from 'react-icons/fa6';
import { useModal } from '../context/modal';

/* ===========================================================================
   Footer - the walk ends inside, so this stays in the showroom's light half
   rather than snapping back to the dusk palette.
   =========================================================================== */

const Footer = () => {
    const { t } = useTranslation();
    const { openModal } = useModal();

    const quickLinks = [
        { key: 'nav_home', href: '#home' },
        { key: 'show_eyebrow', href: '#tires' },
        { key: 'nav_about', href: '#about' },
        { key: 'nav_services', href: '#services' },
        { key: 'nav_contact', href: '#contact' },
    ];

    const socials = [
        {
            icon: FaInstagram,
            href: 'https://www.instagram.com/laslo.reifen?igsh=MXZxZDBvdWN5Y2oxNw==',
            name: 'Instagram',
        },
        {
            icon: FaFacebookF,
            href: 'https://www.facebook.com/share/17uXyhRbgV/',
            name: 'Facebook',
        },
    ];

    return (
        <footer className="relative overflow-hidden border-t border-ink/10 bg-concrete pt-20">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

                <div className="grid gap-14 lg:grid-cols-12">

                    {/* Brand blurb */}
                    <div className="lg:col-span-5">
                        <div className="flex items-baseline gap-2">
                            <span className="font-display text-3xl tracking-tight text-ink">
                                {t('brand_1')}
                            </span>
                            <span className="font-display text-3xl italic tracking-tight text-copper">
                                {t('brand_2')}
                            </span>
                        </div>
                        <p className="mt-5 max-w-sm leading-relaxed font-light text-ink-dim">
                            {t('footer_desc')}
                        </p>

                        <div className="mt-7 flex gap-3">
                            {socials.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-dim transition-all duration-300 hover:border-copper hover:text-copper"
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <nav className="lg:col-span-3 lg:col-start-8">
                        <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                            {t('footer_links')}
                        </h2>
                        <ul className="mt-5 flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <li key={link.key}>
                                    <a
                                        href={link.href}
                                        className="text-sm font-light text-ink-dim transition-colors duration-300 hover:text-copper"
                                    >
                                        {t(link.key)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Legal */}
                    <nav className="lg:col-span-2">
                        <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                            {t('footer_legal')}
                        </h2>
                        <ul className="mt-5 flex flex-col gap-3">
                            <li>
                                <button
                                    onClick={() => openModal('impressum')}
                                    className="text-sm font-light text-ink-dim transition-colors duration-300 hover:text-copper"
                                >
                                    Impressum
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => openModal('privacy')}
                                    className="text-sm font-light text-ink-dim transition-colors duration-300 hover:text-copper"
                                >
                                    Datenschutz
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Small print */}
                <div className="mt-20 flex flex-col gap-3 border-t border-ink/10 py-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-faint uppercase">
                        © {new Date().getFullYear()} Magyar Gumis
                    </p>
                    <p className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-faint uppercase">
                        DE · HU
                    </p>
                </div>
            </div>

            {/* Oversized wordmark bleeding off the bottom edge. leading is crushed
                so the line box hugs the glyphs instead of leaving an empty band. */}
            <div
                aria-hidden="true"
                className="pointer-events-none overflow-hidden select-none px-6 sm:px-10 lg:px-16"
            >
                <span className="block translate-y-[10%] text-center font-display text-[clamp(4rem,17vw,15rem)] leading-[0.74] whitespace-nowrap text-ink/[0.055]">
                    MAGYAR GUMIS
                </span>
            </div>
        </footer>
    );
};

export default Footer;
