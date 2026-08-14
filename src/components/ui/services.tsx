import type { ReactNode, SyntheticEvent } from 'react';
import { cn } from '@/lib/utils';

export interface ServiceCard {
    /** Visible card label */
    title: string;
    /** Back image – contextual shot (vehicle / situation) */
    image: string;
    /** Front image – technical detail shot */
    overlayImage: string;
    imageAlt?: string;
    overlayAlt?: string;
    /** Optional category icon shown next to the title */
    icon?: ReactNode;
}

interface ServicesGridProps {
    items: ServiceCard[];
    /** Grid template – defaults to 2 columns from the sm breakpoint up */
    columnsClass?: string;
    className?: string;
}

/* Keeps a missing asset from rendering as a broken-image icon */
const hideBrokenImage = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.visibility = 'hidden';
};

export function ServicesGrid({
    items,
    columnsClass = 'grid-cols-1 sm:grid-cols-2',
    className,
}: ServicesGridProps) {
    return (
        <div className={cn('grid gap-6 lg:gap-8', columnsClass, className)}>
            {items.map((service) => (
                <div
                    key={service.title}
                    className="group bg-white/[0.03] border border-white/5 rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-white/[0.06] hover:border-brand-orange/30"
                >
                    {/* Image Container */}
                    <div className="relative flex-grow flex items-center justify-center mb-4">
                        {/* Back Image */}
                        <img
                            src={service.image}
                            alt={service.imageAlt ?? service.title}
                            loading="lazy"
                            decoding="async"
                            onError={hideBrokenImage}
                            className="absolute w-44 h-auto rounded-lg shadow-md transform -rotate-6 transition-all duration-500 ease-in-out group-hover:rotate-[-10deg] group-hover:scale-105"
                        />
                        {/* Front Image */}
                        <img
                            src={service.overlayImage}
                            alt={service.overlayAlt ?? service.title}
                            loading="lazy"
                            decoding="async"
                            onError={hideBrokenImage}
                            className="absolute w-44 h-auto rounded-lg shadow-lg ring-1 ring-white/10 transform rotate-3 transition-all duration-500 ease-in-out group-hover:rotate-[5deg] group-hover:scale-105"
                        />
                    </div>

                    {/* Service Title */}
                    <div className="flex items-center gap-3 mt-auto">
                        {service.icon && (
                            <span className="w-8 h-8 shrink-0 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center text-sm transition-colors duration-300 group-hover:bg-brand-orange group-hover:text-white">
                                {service.icon}
                            </span>
                        )}
                        <h3 className="text-left text-lg font-medium text-gray-100">
                            {service.title}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ServicesGrid;
