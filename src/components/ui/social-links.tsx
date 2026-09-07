import type { IconType } from 'react-icons';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa6';
import { cn } from '@/lib/utils';

type SocialLink = {
    name: string;
    href: string;
    Icon: IconType;
};

/**
 * PLATZHALTER: zeigt vorerst auf den WhatsApp-Chat der Geschäftsnummer.
 * Wird später durch den Link zum Chatbot ersetzt – nur diese Konstante tauschen.
 * wa.me erwartet die Nummer in E.164 ohne "+" und ohne führende Null.
 */
const WHATSAPP_HREF = 'https://wa.me/4915171561144';

/** Single source of truth for the profile URLs – used by navbar and footer. */
const SOCIAL_LINKS: SocialLink[] = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/laslo.reifen?igsh=MXZxZDBvdWN5Y2oxNw==',
        Icon: FaInstagram,
    },
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/share/17uXyhRbgV/',
        Icon: FaFacebookF,
    },
    {
        name: 'WhatsApp',
        href: WHATSAPP_HREF,
        Icon: FaWhatsapp,
    },
];

/**
 * `solid` – filled pill buttons, for the roomier footer.
 * `ghost` – bare icons, so they sit quietly next to the navbar links.
 */
const VARIANTS = {
    solid: 'w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 text-gray-300 hover:bg-brand-orange hover:border-brand-orange hover:text-white hover:-translate-y-0.5',
    ghost: 'w-9 h-9 rounded-full text-gray-300 hover:text-brand-orange hover:bg-white/[0.07]',
};

interface SocialLinksProps {
    variant?: keyof typeof VARIANTS;
    className?: string;
    iconClassName?: string;
}

export function SocialLinks({ variant = 'solid', className, iconClassName }: SocialLinksProps) {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className={cn('flex items-center justify-center transition-all duration-300', VARIANTS[variant])}
                >
                    <Icon className={cn('text-base', iconClassName)} />
                </a>
            ))}
        </div>
    );
}

export default SocialLinks;
