import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from 'framer-motion';

/* ===========================================================================
   Full-viewport, scroll-driven showcase of the tire types.

   Layout: an N x 100vh tall track whose only child is pinned (sticky) for the
   whole scroll. Panels crossfade against each other as scroll progress moves
   through their slice of the track, so there is never a hard cut between two
   tire types — image, headline and specs all interpolate on the same value.
   =========================================================================== */

interface TirePanel {
    id: string;
    image: string;
    index: string;
    title: string;
    sub: string;
    desc: string;
    specs: { label: string; value: string }[];
}

/* Build the opacity keyframes for one panel.
   Edges are pushed far outside [0,1] so the first panel is already solid at
   the top of the track and the last one stays solid at the bottom. */
function panelRange(i: number, count: number) {
    const step = 1 / count;
    const fade = step * 0.4;

    const enterFrom = i === 0 ? -2 : i * step - fade;
    const enterTo = i === 0 ? -1 : i * step + fade;
    const leaveFrom = i === count - 1 ? 2 : (i + 1) * step - fade;
    const leaveTo = i === count - 1 ? 3 : (i + 1) * step + fade;

    return [enterFrom, enterTo, leaveFrom, leaveTo];
}

/* ─── One crossfading panel ─── */
function Panel({
    panel,
    i,
    count,
    progress,
}: {
    panel: TirePanel;
    i: number;
    count: number;
    progress: MotionValue<number>;
}) {
    const range = panelRange(i, count);

    const opacity = useTransform(progress, range, [0, 1, 1, 0]);
    // Slow continuous drift keeps the still image feeling alive while pinned
    const scale = useTransform(progress, range, [1.14, 1.04, 1.0, 0.94]);
    const imageY = useTransform(progress, range, ['6%', '0%', '0%', '-6%']);
    // Copy travels further than the image — a parallax depth cue
    const textY = useTransform(progress, range, [70, 0, 0, -70]);
    const textOpacity = useTransform(
        progress,
        [range[0], range[1] + 0.02, range[2] - 0.02, range[3]],
        [0, 1, 1, 0],
    );

    return (
        <motion.div
            style={{ opacity }}
            className="absolute inset-0"
            aria-hidden={undefined}
        >
            {/* ── Image layer ── */}
            <motion.div style={{ scale, y: imageY }} className="absolute inset-0">
                <img
                    src={panel.image}
                    alt={panel.title}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                />
            </motion.div>

            {/* Legibility scrim: dark on the left where the copy sits */}
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />

            {/* ── Copy layer ── */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative z-10 flex h-full items-center"
            >
                <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="max-w-xl">
                        {/* Index + kicker */}
                        <div className="mb-5 flex items-center gap-4">
                            <span className="font-mono text-xs tracking-[0.28em] text-copper">
                                {panel.index}
                            </span>
                            <span className="h-px w-14 bg-copper/40" />
                            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-ash">
                                {panel.sub}
                            </span>
                        </div>

                        {/* Display headline */}
                        <h3 className="font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.88] text-bone">
                            {panel.title}
                        </h3>

                        <p className="mt-7 max-w-md text-base leading-relaxed font-light text-bone-dim sm:text-lg">
                            {panel.desc}
                        </p>

                        {/* Specs */}
                        <dl className="mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-lg border border-bone/10 bg-bone/10">
                            {panel.specs.map((spec) => (
                                <div key={spec.label} className="bg-obsidian/85 px-4 py-4">
                                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ash-dim">
                                        {spec.label}
                                    </dt>
                                    <dd className="mt-1.5 font-display text-2xl text-copper-hi">
                                        {spec.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── Section ─── */
const TireShowcase = () => {
    const { t } = useTranslation();
    const trackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    // Smooth the raw scroll value so fast wheel flicks don't snap between panels
    const progress = useSpring(scrollYProgress, {
        stiffness: 260,
        damping: 42,
        restDelta: 0.001,
    });

    const panels: TirePanel[] = [
        {
            id: 'summer',
            image: '/grafics/tires/summer.webp',
            index: '01',
            title: t('show_summer_title'),
            sub: t('show_summer_sub'),
            desc: t('show_summer_desc'),
            specs: [
                { label: t('spec_temp'), value: '> 7 °C' },
                { label: t('spec_grip'), value: t('spec_grip_dry') },
                { label: t('spec_life'), value: '40 tkm' },
            ],
        },
        {
            id: 'winter',
            image: '/grafics/tires/winter.webp',
            index: '02',
            title: t('show_winter_title'),
            sub: t('show_winter_sub'),
            desc: t('show_winter_desc'),
            specs: [
                { label: t('spec_temp'), value: '< 7 °C' },
                { label: t('spec_grip'), value: t('spec_grip_snow') },
                { label: t('spec_mark'), value: '3PMSF' },
            ],
        },
        {
            id: 'allseason',
            image: '/grafics/tires/allseason.webp',
            index: '03',
            title: t('show_allseason_title'),
            sub: t('show_allseason_sub'),
            desc: t('show_allseason_desc'),
            specs: [
                { label: t('spec_temp'), value: '−10…30 °C' },
                { label: t('spec_grip'), value: t('spec_grip_wet') },
                { label: t('spec_change'), value: '0×' },
            ],
        },
        {
            id: 'offroad',
            image: '/grafics/tires/offroad.webp',
            index: '04',
            title: t('show_offroad_title'),
            sub: t('show_offroad_sub'),
            desc: t('show_offroad_desc'),
            specs: [
                { label: t('spec_terrain'), value: 'A/T · M/T' },
                { label: t('spec_grip'), value: t('spec_grip_mud') },
                { label: t('spec_carcass'), value: '6–10 PR' },
            ],
        },
    ];

    const count = panels.length;

    // Progress rail fill
    const railScale = useTransform(progress, [0, 1], [0, 1]);

    return (
        <section
            id="tires"
            aria-label={t('show_eyebrow')}
            ref={trackRef}
            className="relative"
            style={{ height: `${count * 100}vh` }}
        >
            {/* Pinned viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian grain">
                {panels.map((panel, i) => (
                    <Panel
                        key={panel.id}
                        panel={panel}
                        i={i}
                        count={count}
                        progress={progress}
                    />
                ))}

                {/* ── Section label, top ── */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 pt-28 sm:px-10 lg:px-16">
                    <span className="eyebrow">{t('show_eyebrow')}</span>
                    <span className="hidden font-mono text-[0.6875rem] tracking-[0.2em] text-ash-dim sm:block">
                        {t('show_scroll_hint')}
                    </span>
                </div>

                {/* ── Progress rail, right edge ── */}
                <div className="pointer-events-none absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 lg:right-10 lg:block">
                    <div className="flex flex-col items-end gap-5">
                        {panels.map((panel, i) => {
                            const range = panelRange(i, count);
                            return (
                                <TickLabel
                                    key={panel.id}
                                    label={panel.title}
                                    progress={progress}
                                    range={range}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* ── Bottom progress bar ── */}
                <div className="absolute inset-x-0 bottom-0 z-20 h-px bg-bone/10">
                    <motion.div
                        style={{ scaleX: railScale }}
                        className="h-full origin-left bg-copper"
                    />
                </div>
            </div>
        </section>
    );
};

/* ─── One label on the progress rail ─── */
function TickLabel({
    label,
    progress,
    range,
}: {
    label: string;
    progress: MotionValue<number>;
    range: number[];
}) {
    const active = useTransform(progress, range, [0, 1, 1, 0]);
    const width = useTransform(active, [0, 1], [14, 40]);
    const opacity = useTransform(active, [0, 1], [0.32, 1]);

    return (
        <motion.div style={{ opacity }} className="flex items-center gap-3">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-bone">
                {label}
            </span>
            <motion.span style={{ width }} className="h-px bg-copper" />
        </motion.div>
    );
}

export default TireShowcase;
