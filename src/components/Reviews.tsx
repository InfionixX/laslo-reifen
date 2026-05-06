import { useTranslation } from 'react-i18next';
import { GiCarWheel } from 'react-icons/gi';
import { AnimatedTestimonials, type Testimonial } from './ui/animated-testimonials';

const Reviews = () => {
    const { t } = useTranslation();

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: t('review_1_name'),
            role: "Verifizierter Kauf",
            company: "",
            content: t('review_1_text'),
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=500&q=80',
        },
        {
            id: 2,
            name: t('review_2_name'),
            role: "Verifizierter Kauf",
            company: "",
            content: t('review_2_text'),
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1549419137-ee1375d86242?w=500&q=80',
        },
        {
            id: 3,
            name: t('review_3_name'),
            role: "Verifizierter Kauf",
            company: "",
            content: t('review_3_text'),
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&q=80',
        }
    ];

    const Logo = (
        <>
            <GiCarWheel className="text-brand-orange text-3xl" />
            <span className="text-white text-xl font-bold tracking-tighter">
                {t('brand_1')} <span className="text-brand-orange">{t('brand_2')}</span>
            </span>
        </>
    );

    return (
        <AnimatedTestimonials
            title={`${t('reviews_title')}`}
            subtitle={t('reviews_subtitle')}
            badgeText="Verifizierte Bewertungen"
            testimonials={testimonials}
            logo={Logo}
            trustedCompanies={["Michelin", "Continental", "Pirelli", "Goodyear", "Bridgestone"]}
            trustedCompaniesTitle="Partner & Top-Marken"
        />
    );
};

export default Reviews;
