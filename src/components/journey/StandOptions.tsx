import { motion } from 'framer-motion';

/* ===========================================================================
   The four options on a display stand.

   Brand names are real DOM text, never baked into the generated photograph:
   they stay translatable, crisp at any zoom, and legally honest — these are
   the manufacturers we broker, written out, not fabricated logos.
   =========================================================================== */

export interface StandOption {
    brand: string;
    tier: string;
    size: string;
    note: string;
}

const StandOptions = ({ options, label }: { options: StandOption[]; label: string }) => (
    <div className="mt-8">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint">
            {label}
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
            {options.map((option, i) => (
                <motion.li
                    key={option.brand}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        delay: 0.1 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group rounded-lg border border-ink/12 bg-showroom/80 p-4 backdrop-blur-md transition-colors duration-300 hover:border-copper/50"
                >
                    {/* Position on the stand */}
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] text-copper">
                        {String(i + 1).padStart(2, '0')}
                    </span>

                    <p className="mt-2 font-display text-xl leading-tight text-ink">
                        {option.brand}
                    </p>

                    <p className="mt-0.5 font-mono text-[0.625rem] tracking-[0.1em] text-ink-faint">
                        {option.size}
                    </p>

                    <span className="mt-3 inline-block rounded-full bg-copper/12 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-copper-lo">
                        {option.tier}
                    </span>

                    <p className="mt-2.5 text-xs leading-relaxed font-light text-ink-dim">
                        {option.note}
                    </p>
                </motion.li>
            ))}
        </ul>
    </div>
);

export default StandOptions;
