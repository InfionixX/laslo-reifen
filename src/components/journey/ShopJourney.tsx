import { useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
    AnimatePresence,
    cubicBezier,
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import StandOptions, { type StandOption } from './StandOptions';
import ReviewPins from './ReviewPins';

/* ===========================================================================
   ShopJourney - the whole site as one walk through the shop.

   A tall track pins a single full-viewport stage. Every scene reads the same
   scroll value: it approaches, holds still while you read it, then the camera
   drifts through it as the next one arrives.

   Three numbers decide how it feels:

   SCENE_VH   how much scroll one scene owns. Higher means the content stays
              put longer before anything starts moving.
   HOLD       the share of that scroll where the scene is completely static.
              The rest is split between the incoming and outgoing crossfade.
   EXIT_SCALE how far the camera pushes past a scene on its way out. Small
              values read as expensive and deliberate; large ones read as a
              zoom effect.
   =========================================================================== */

const SCENE_VH = 130;
const HOLD = 0.68;
const EXIT_SCALE = 1.16;

/* Linear interpolation between keyframes is what makes a crossfade look
   mechanical. Easing every segment is most of the "smoother" ask. */
const easeSoft = cubicBezier(0.4, 0, 0.2, 1);
const linear = (t: number) => t;

type Tone = 'dusk' | 'bright';

interface SceneDef {
    id: string;
    image: string;
    tone: Tone;
    eyebrow?: string;
    title?: string;
    body?: string;
    /** Rendered below the body - stand options, review pins, the shop sign. */
    content?: ReactNode;
    /** Centred scenes are the establishing shots; the rest are left-aligned. */
    center?: boolean;
    /** Nudge the copy off dead centre - the sign has to land on the facade's
        blank signage band, which sits in the upper third of the frame. */
    offsetY?: string;
    /** Id for the navbar to jump to. Every scene paints at the same sticky
        position, so the anchor lives in the track instead (see below). */
    anchor?: string;
}

/* Keyframes for one scene: [enter start, hold start, hold end, exit end].
   The first and last are pushed outside [0,1] so the journey opens and closes
   on a solid frame instead of fading up from nothing. */
function sceneRange(i: number, count: number) {
    const step = 1 / count;
    const fade = (step * (1 - HOLD)) / 2;

    return [
        i === 0 ? -2 : i * step - fade,
        i === 0 ? -1 : i * step + fade,
        i === count - 1 ? 2 : (i + 1) * step - fade,
        i === count - 1 ? 3 : (i + 1) * step + fade,
    ];
}

/* --- One scene on the stage --- */
function Scene({
    scene,
    i,
    count,
    progress,
}: {
    scene: SceneDef;
    i: number;
    count: number;
    progress: MotionValue<number>;
}) {
    const range = sceneRange(i, count);
    const eased = { ease: [easeSoft, linear, easeSoft] };

    const opacity = useTransform(progress, range, [0, 1, 1, 0], eased);
    // A gentle push rather than a zoom: the camera drifts through the scene.
    const scale = useTransform(progress, range, [0.96, 1, 1.015, EXIT_SCALE], eased);

    /* The copy holds full strength across the entire static stretch and only
       fades at the very edges, so text is readable for as long as possible
       rather than being mid-fade whenever you stop scrolling. */
    const copyRange = [
        range[0] + (range[1] - range[0]) * 0.5,
        range[1],
        range[2],
        range[2] + (range[3] - range[2]) * 0.5,
    ];
    const copyOpacity = useTransform(progress, copyRange, [0, 1, 1, 0], eased);
    const copyY = useTransform(progress, range, [34, 0, 0, -34], eased);

    const dusk = scene.tone === 'dusk';

    return (
        <motion.div
            style={{ opacity, willChange: 'opacity' }}
            className="absolute inset-0"
        >
            {/* Photograph */}
            <motion.div
                style={{ scale, willChange: 'transform' }}
                className="absolute inset-0"
            >
                <img
                    src={scene.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    draggable={false}
                />
            </motion.div>

            {/* Legibility scrim, tuned per half of the journey */}
            {dusk ? (
                <div className="absolute inset-0 bg-gradient-to-b from-dusk-deep/75 via-dusk/40 to-dusk-deep/85" />
            ) : scene.center ? (
                <div className="absolute inset-0 bg-showroom/50" />
            ) : (
                <>
                    {/* Narrow viewports: the copy spans the full width, so the
                        product cannot be left uncovered. */}
                    <div className="absolute inset-0 bg-showroom/88 lg:hidden" />

                    {/* Wide viewports: fully opaque behind the copy column, then
                        off a cliff so the stand keeps its contrast. An even
                        left-to-right fade washes the product out at exactly the
                        point where it is the subject of the scene. */}
                    <div
                        className="absolute inset-0 hidden lg:block"
                        style={{
                            background:
                                'linear-gradient(90deg, #f7f6f4 0%, #f7f6f4 40%, rgba(247,246,244,0.70) 57%, rgba(247,246,244,0.16) 76%, rgba(247,246,244,0) 90%)',
                        }}
                    />
                </>
            )}

            {/* Vignette. The showroom renders are high-key and edge-to-edge
                bright, which flattens them; darkening the corners gives the
                frame depth without touching the middle. */}
            {!dusk && (
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(125% 95% at 50% 42%, transparent 42%, rgba(26,28,32,0.20) 100%)',
                    }}
                />
            )}

            {/* Copy */}
            <motion.div
                style={{ y: copyY, opacity: copyOpacity, willChange: 'transform, opacity' }}
                className="relative z-10 flex h-full items-center"
            >
                <div
                    className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 ${
                        scene.center ? 'text-center' : ''
                    } ${scene.offsetY ?? ''}`}
                >
                    <div className={scene.center ? 'mx-auto max-w-3xl' : 'max-w-2xl'}>
                        {scene.eyebrow && (
                            <div
                                className={`mb-6 flex items-center gap-4 ${
                                    scene.center ? 'justify-center' : ''
                                }`}
                            >
                                <span className="h-px w-10 bg-copper" />
                                <span className="eyebrow">{scene.eyebrow}</span>
                            </div>
                        )}

                        {scene.title && (
                            <h2
                                className={`font-display leading-[0.95] ${
                                    scene.center
                                        ? 'text-[clamp(2.5rem,7vw,5.5rem)]'
                                        : 'text-[clamp(2.25rem,6vw,5rem)]'
                                } ${dusk ? 'text-bone' : 'text-ink'}`}
                            >
                                {scene.title}
                            </h2>
                        )}

                        {scene.body && (
                            <p
                                className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${
                                    scene.center ? 'mx-auto' : ''
                                } ${dusk ? 'font-light text-bone-dim' : 'text-ink-dim'}`}
                            >
                                {scene.body}
                            </p>
                        )}

                        {scene.content}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* --- The shop sign: fixed brand, claim swaps with the language --- */
function ShopSign() {
    const { t, i18n } = useTranslation();

    return (
        <div className="flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(2.75rem,10vw,8rem)] leading-[0.9] tracking-tight text-bone"
            >
                {t('brand_1')} <span className="italic text-copper-hi">{t('brand_2')}</span>
            </motion.h1>

            <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 block h-px w-40 origin-center bg-copper/60"
            />

            {/* The claim is the part that actually changes on language switch,
                keyed so the old line leaves before the new one arrives. */}
            <div className="mt-6 h-7 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={i18n.language}
                        initial={{ y: 26, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -26, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-bone-dim sm:text-xs"
                    >
                        {t('sign_claim')}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
}

/* --- Section --- */
const ShopJourney = () => {
    const { t } = useTranslation();
    const trackRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ['start start', 'end end'],
    });

    /* Near-critical damping (2*sqrt(320) is about 36): responsive enough not
       to lag behind the wheel, damped enough not to wobble at the end of a
       flick. The previous spring was heavily overdamped, which read as the
       stage dragging behind the scroll. */
    const progress = useSpring(scrollYProgress, {
        stiffness: 320,
        damping: 40,
        restDelta: 0.0005,
    });

    const stand = (options: StandOption[]) => (
        <StandOptions options={options} label={t('stand_label')} />
    );

    const scenes: SceneDef[] = [
        {
            id: 'exterior',
            image: '/grafics/shop/01-exterior.webp',
            tone: 'dusk',
            center: true,
            // vh, not %, so the sign tracks the facade's signage band across
            // viewport sizes instead of scaling with its own content height
            offsetY: '-translate-y-[17vh]',
            content: <ShopSign />,
        },
        {
            id: 'entrance',
            image: '/grafics/shop/02-entrance.webp',
            tone: 'dusk',
            center: true,
            eyebrow: t('journey_enter_eyebrow'),
            title: t('journey_enter_title'),
            body: t('journey_enter_body'),
        },
        {
            id: 'hall',
            anchor: 'about',
            image: '/grafics/shop/03-hall.webp',
            tone: 'bright',
            eyebrow: t('about_badge'),
            title: t('journey_hall_title'),
            body: t('journey_hall_body'),
        },
        {
            id: 'summer',
            anchor: 'tires',
            image: '/grafics/shop/04-summer.webp',
            tone: 'bright',
            eyebrow: t('show_summer_sub'),
            title: t('show_summer_title'),
            body: t('show_summer_desc'),
            content: stand([
                { brand: 'Michelin', tier: t('tier_performance'), size: '225/45 R17 94Y', note: t('opt_note_dry') },
                { brand: 'Continental', tier: t('tier_premium'), size: '205/55 R16 91V', note: t('opt_note_balance') },
                { brand: 'Goodyear', tier: t('tier_comfort'), size: '195/65 R15 91H', note: t('opt_note_quiet') },
                { brand: 'Falken', tier: t('tier_entry'), size: '185/65 R15 88T', note: t('opt_note_value') },
            ]),
        },
        {
            id: 'winter',
            image: '/grafics/shop/05-winter.webp',
            tone: 'bright',
            eyebrow: t('show_winter_sub'),
            title: t('show_winter_title'),
            body: t('show_winter_desc'),
            content: stand([
                { brand: 'Nokian', tier: t('tier_performance'), size: '225/45 R17 94V', note: t('opt_note_ice') },
                { brand: 'Continental', tier: t('tier_premium'), size: '205/55 R16 91H', note: t('opt_note_snow') },
                { brand: 'Dunlop', tier: t('tier_comfort'), size: '195/65 R15 91T', note: t('opt_note_quiet') },
                { brand: 'Hankook', tier: t('tier_entry'), size: '185/65 R15 88T', note: t('opt_note_value') },
            ]),
        },
        {
            id: 'allseason',
            image: '/grafics/shop/06-allseason.webp',
            tone: 'bright',
            eyebrow: t('show_allseason_sub'),
            title: t('show_allseason_title'),
            body: t('show_allseason_desc'),
            content: stand([
                { brand: 'Michelin', tier: t('tier_performance'), size: '225/45 R17 94W', note: t('opt_note_wet') },
                { brand: 'Goodyear', tier: t('tier_premium'), size: '205/55 R16 94V', note: t('opt_note_balance') },
                { brand: 'Bridgestone', tier: t('tier_comfort'), size: '195/65 R15 91H', note: t('opt_note_quiet') },
                { brand: 'Falken', tier: t('tier_entry'), size: '185/65 R15 88H', note: t('opt_note_value') },
            ]),
        },
        {
            id: 'offroad',
            image: '/grafics/shop/07-offroad.webp',
            tone: 'bright',
            eyebrow: t('show_offroad_sub'),
            title: t('show_offroad_title'),
            body: t('show_offroad_desc'),
            content: stand([
                { brand: 'BF Goodrich', tier: t('tier_performance'), size: '265/70 R17 121S', note: t('opt_note_mud') },
                { brand: 'Yokohama', tier: t('tier_premium'), size: '245/70 R16 111T', note: t('opt_note_gravel') },
                { brand: 'Pirelli', tier: t('tier_comfort'), size: '235/65 R17 108V', note: t('opt_note_road') },
                { brand: 'Hankook', tier: t('tier_entry'), size: '215/70 R16 100T', note: t('opt_note_value') },
            ]),
        },
        {
            id: 'rims',
            anchor: 'services',
            image: '/grafics/shop/08-rimwall.webp',
            tone: 'bright',
            eyebrow: t('services_badge'),
            title: t('journey_rim_title'),
            body: t('journey_rim_body'),
            content: (
                <StandOptions
                    label={t('rim_wall_label')}
                    options={[
                        { brand: 'AEZ', tier: t('tier_performance'), size: '18" · 5×112', note: t('opt_note_alloy') },
                        { brand: 'Continental', tier: t('tier_premium'), size: '17" · 5×108', note: t('opt_note_alloy_mid') },
                        { brand: t('rim_steel_title'), tier: t('tier_comfort'), size: '16" · 5×112', note: t('opt_note_steel') },
                        { brand: 'RDKS', tier: t('tier_entry'), size: '433 MHz', note: t('opt_note_rdks') },
                    ]}
                />
            ),
        },
        {
            id: 'pinboard',
            anchor: 'reviews',
            image: '/grafics/shop/09-pinboard.webp',
            tone: 'bright',
            eyebrow: t('journey_board_eyebrow'),
            title: t('reviews_title'),
            content: <ReviewPins />,
        },
    ];

    const count = scenes.length;

    /* Ten full-bleed 2048px images decode to roughly 90 MB of bitmap and all of
       them stay in the compositor even at zero opacity, which is what made the
       stage stutter. Only the current scene and its immediate neighbours are
       mounted; the crossfade never reaches further than one scene either way. */
    const [active, setActive] = useState(0);
    const activeRef = useRef(0);

    const threshold = (2 - 0.15) / count;
    useMotionValueEvent(progress, 'change', (v) => {
        const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
        if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
        }

        // Fixed chrome cannot see which scene is behind it, so publish the tone
        document.documentElement.dataset.tone = v >= threshold ? 'bright' : 'dusk';
    });

    const railScale = useTransform(progress, [0, 1], [0, 1]);
    const cueOpacity = useTransform(progress, [0, 0.035], [1, 0]);

    const trackVh = count * SCENE_VH;

    return (
        <section
            id="home"
            ref={trackRef}
            className="relative"
            style={{ height: `${trackVh}vh` }}
            aria-label={t('journey_aria')}
        >
            {/* Scroll anchors. Each sits at the point in the track where its
                scene is fully on screen, so #tires and friends still work even
                though every scene paints at the same sticky position. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {scenes.map((scene, i) =>
                    scene.anchor ? (
                        <span
                            key={scene.anchor}
                            id={scene.anchor}
                            className="absolute left-0 block w-px"
                            style={{ top: `${((i + 0.5) / count) * (trackVh - 100)}vh` }}
                        />
                    ) : null,
                )}
            </div>

            <div className="sticky top-0 h-screen w-full overflow-hidden grain">
                {scenes.map((scene, i) =>
                    Math.abs(i - active) <= 1 ? (
                        <Scene
                            key={scene.id}
                            scene={scene}
                            i={i}
                            count={count}
                            progress={progress}
                        />
                    ) : null,
                )}

                {/* Scroll cue, only on the very first frame */}
                <motion.div
                    style={{ opacity: cueOpacity }}
                    className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center"
                >
                    <span className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-bone-dim">
                        {t('journey_cue')}
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/25 text-copper-hi"
                        >
                            <ArrowDown className="h-3.5 w-3.5" />
                        </motion.span>
                    </span>
                </motion.div>

                {/* How far through the shop we are */}
                <div className="tone-bd absolute inset-x-0 bottom-0 z-20 h-px border-b">
                    <motion.div
                        style={{ scaleX: railScale }}
                        className="h-full origin-left bg-copper"
                    />
                </div>
            </div>
        </section>
    );
};

export default ShopJourney;
