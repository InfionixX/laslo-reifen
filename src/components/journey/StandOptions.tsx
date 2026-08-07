/* ===========================================================================
   The four options on a display stand.

   Brand names are real DOM text, never baked into the generated photograph:
   they stay translatable, crisp at any zoom, and legally honest - these are
   the manufacturers we broker, written out, not fabricated logos.

   No entrance animation here on purpose. The scene's own copy layer already
   fades the whole block in, and a second scroll-triggered stagger would fire
   while the scene is still mounted-but-invisible - so nobody would ever see
   it, and it would cost frames during the crossfade.
   =========================================================================== */

export interface StandOption {
    brand: string;
    tier: string;
    size: string;
    note: string;
}

const StandOptions = ({ options, label }: { options: StandOption[]; label: string }) => (
    <div className="mt-8">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-dim">
            {label}
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
            {options.map((option, i) => (
                <li
                    key={option.brand}
                    className="rounded-lg border border-ink/15 bg-showroom/94 p-4 shadow-[0_2px_18px_rgba(26,28,32,0.08)] transition-colors duration-300 hover:border-copper/60"
                >
                    {/* Position on the stand */}
                    <span className="font-mono text-[0.625rem] tracking-[0.2em] text-copper">
                        {String(i + 1).padStart(2, '0')}
                    </span>

                    <p className="mt-2 font-display text-xl leading-tight text-ink">
                        {option.brand}
                    </p>

                    <p className="mt-0.5 font-mono text-[0.625rem] tracking-[0.1em] text-ink-dim">
                        {option.size}
                    </p>

                    <span className="mt-3 inline-block rounded-full bg-copper/15 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-copper-lo">
                        {option.tier}
                    </span>

                    <p className="mt-2.5 text-xs leading-relaxed text-ink-dim">{option.note}</p>
                </li>
            ))}
        </ul>
    </div>
);

export default StandOptions;
