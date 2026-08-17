import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MechanicRobotProps {
    className?: string;
    label?: string;
}

/**
 * easeInOutSine as a cubic bezier. Velocity is zero at both ends of every
 * segment, so a [0, -amp, 0] keyframe loop joins itself with no jerk at the
 * seam – this is what keeps the hover perfectly smooth on repeat.
 */
const EASE_SINE: [number, number, number, number] = [0.37, 0, 0.63, 1];
const BOUNCE_DURATION = 2.6;
const SPRING = { stiffness: 110, damping: 20, mass: 0.7 };

/** Shared timing so both eyes blink in perfect sync. */
const blinkTransition = {
    duration: 7.4,
    times: [0, 0.3, 0.325, 0.35, 0.6, 0.72, 0.745, 0.77, 1],
    repeat: Infinity,
    ease: 'easeInOut' as const,
};

/** Vertical hover loop; `delay` phase-shifts a limb for follow-through. */
const hover = (amplitude: number, delay = 0) => ({
    animate: { y: [0, -amplitude, 0] },
    transition: {
        duration: BOUNCE_DURATION,
        ease: EASE_SINE,
        repeat: Infinity,
        repeatType: 'loop' as const,
        delay,
    },
});

/**
 * Mechanic robot – cap, denim dungarees, tool pocket, articulated hard-surface
 * limbs – on a continuous hover loop with lagging secondary motion, squash &
 * stretch, a reactive ground shadow and pointer tracking.
 */
export function MechanicRobot({
    className,
    label = 'Roboter-Mechaniker mit Mütze und Latzhose',
}: MechanicRobotProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const sx = useSpring(pointerX, SPRING);
    const sy = useSpring(pointerY, SPRING);

    const headX = useTransform(sx, [-1, 1], [-10, 10]);
    const headY = useTransform(sy, [-1, 1], [-7, 7]);
    const headTilt = useTransform(sx, [-1, 1], [-4.5, 4.5]);
    const faceX = useTransform(sx, [-1, 1], [-5, 5]);
    const faceY = useTransform(sy, [-1, 1], [-4, 4]);
    const torsoX = useTransform(sx, [-1, 1], [-3.5, 3.5]);

    useEffect(() => {
        if (reduceMotion) return;

        const onPointerMove = (e: PointerEvent) => {
            const rect = wrapRef.current?.getBoundingClientRect();
            if (!rect) return;
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const clamp = (v: number) => Math.max(-1, Math.min(1, v));
            pointerX.set(clamp((e.clientX - cx) / (rect.width * 1.1)));
            pointerY.set(clamp((e.clientY - cy) / (rect.height * 1.1)));
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        return () => window.removeEventListener('pointermove', onPointerMove);
    }, [pointerX, pointerY, reduceMotion]);

    /* Static pose when the visitor prefers reduced motion */
    const anim = (amplitude: number, delay = 0) => (reduceMotion ? {} : hover(amplitude, delay));

    return (
        <div ref={wrapRef} className={cn('relative w-full flex items-center justify-center', className)}>
            {/* ambient backdrop: vignette + layered glow for depth and contrast */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(58% 58% at 50% 36%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)' }}
            />
            <div className="absolute w-[80%] aspect-square rounded-full bg-brand-orange opacity-[0.11] blur-[110px] pointer-events-none" />
            <div className="absolute w-[42%] aspect-square rounded-full bg-sky-400 opacity-[0.05] blur-[85px] translate-x-10 -translate-y-8 pointer-events-none" />
            <div className="absolute w-[38%] aspect-square rounded-full bg-white opacity-[0.045] blur-[65px] -translate-x-6 pointer-events-none" />

            <svg
                viewBox="0 0 400 540"
                className="relative w-full max-w-[400px] h-auto overflow-visible"
                role="img"
                aria-label={label}
            >
                <defs>
                    <linearGradient id="mr-shell" x1="0.15" y1="0" x2="0.85" y2="1">
                        <stop offset="0%" stopColor="#868d97" />
                        <stop offset="12%" stopColor="#3a3e46" />
                        <stop offset="55%" stopColor="#0e1013" />
                        <stop offset="100%" stopColor="#020203" />
                    </linearGradient>
                    <linearGradient id="mr-shellSoft" x1="0.2" y1="0" x2="0.8" y2="1">
                        <stop offset="0%" stopColor="#6c737c" />
                        <stop offset="16%" stopColor="#2b2e33" />
                        <stop offset="52%" stopColor="#141619" />
                        <stop offset="100%" stopColor="#040506" />
                    </linearGradient>
                    <linearGradient id="mr-denim" x1="0.25" y1="0" x2="0.75" y2="1">
                        <stop offset="0%" stopColor="#71a0e0" />
                        <stop offset="22%" stopColor="#3f6499" />
                        <stop offset="62%" stopColor="#223e6a" />
                        <stop offset="100%" stopColor="#0e1c33" />
                    </linearGradient>
                    <linearGradient id="mr-denimDeep" x1="0.2" y1="0" x2="0.8" y2="1">
                        <stop offset="0%" stopColor="#5480bd" />
                        <stop offset="20%" stopColor="#2c4c80" />
                        <stop offset="58%" stopColor="#1b3358" />
                        <stop offset="100%" stopColor="#091324" />
                    </linearGradient>
                    <linearGradient id="mr-cap" x1="0.28" y1="0" x2="0.72" y2="1">
                        <stop offset="0%" stopColor="#6f9de0" />
                        <stop offset="30%" stopColor="#33569a" />
                        <stop offset="65%" stopColor="#1a2e50" />
                        <stop offset="100%" stopColor="#0c1830" />
                    </linearGradient>
                    <linearGradient id="mr-capBrim" x1="0.3" y1="0" x2="0.7" y2="1">
                        <stop offset="0%" stopColor="#4c74b8" />
                        <stop offset="40%" stopColor="#1d3358" />
                        <stop offset="100%" stopColor="#070f1e" />
                    </linearGradient>
                    <linearGradient id="mr-metal" x1="0" y1="0" x2="0.5" y2="1">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="35%" stopColor="#c5cbd3" />
                        <stop offset="70%" stopColor="#8a919b" />
                        <stop offset="100%" stopColor="#565c65" />
                    </linearGradient>
                    <linearGradient id="mr-boot" x1="0.2" y1="0" x2="0.8" y2="1">
                        <stop offset="0%" stopColor="#5a616a" />
                        <stop offset="18%" stopColor="#24272c" />
                        <stop offset="55%" stopColor="#121316" />
                        <stop offset="100%" stopColor="#020303" />
                    </linearGradient>
                    <radialGradient id="mr-face" cx="0.5" cy="0.4" r="0.7">
                        <stop offset="0%" stopColor="#15181c" />
                        <stop offset="65%" stopColor="#08090b" />
                        <stop offset="100%" stopColor="#000000" />
                    </radialGradient>
                    <radialGradient id="mr-gloss" cx="0.32" cy="0.22" r="0.55">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.07" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="mr-shadow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0.65" />
                        <stop offset="55%" stopColor="#000000" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </radialGradient>
                    <filter id="mr-glow" x="-70%" y="-70%" width="240%" height="240%">
                        <feGaussianBlur stdDeviation="3" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="mr-bloom" x="-90%" y="-90%" width="280%" height="280%">
                        <feGaussianBlur stdDeviation="7" />
                    </filter>
                </defs>

                {/* ── ground shadow: tightens and fades as the robot lifts ── */}
                <motion.ellipse
                    cx="200" cy="478" rx="84" ry="14" fill="url(#mr-shadow)"
                    style={{ transformBox: 'view-box', transformOrigin: '200px 478px' }}
                    animate={reduceMotion ? undefined : { scaleX: [1, 0.78, 1], scaleY: [1, 0.82, 1], opacity: [0.9, 0.45, 0.9] }}
                    transition={{ duration: BOUNCE_DURATION, ease: EASE_SINE, repeat: Infinity, repeatType: 'loop' }}
                />

                {/* ── whole figure: primary hover ── */}
                <motion.g {...anim(22)} style={{ transformBox: 'view-box', transformOrigin: '200px 300px' }}>
                    {/* squash & stretch, very subtle */}
                    <motion.g
                        style={{ transformBox: 'view-box', transformOrigin: '200px 430px' }}
                        animate={reduceMotion ? undefined : { scaleY: [1, 1.022, 1], scaleX: [1, 0.985, 1] }}
                        transition={{ duration: BOUNCE_DURATION, ease: EASE_SINE, repeat: Infinity, repeatType: 'loop', delay: 0.08 }}
                    >
                        {/* ══ LEGS + BOOTS (lagging behind the body) ══ */}
                        <motion.g {...anim(4, 0.2)}>
                            <path d="M150 330 h48 v52 h-48 Z" fill="url(#mr-denimDeep)" />
                            <path d="M202 330 h48 v52 h-48 Z" fill="url(#mr-denimDeep)" />
                            <path d="M150 330 h13 v52 h-13 Z" fill="#ffffff" fillOpacity="0.08" />
                            <path d="M202 330 h13 v52 h-13 Z" fill="#ffffff" fillOpacity="0.08" />
                            <rect x="146" y="374" width="56" height="14" rx="6" fill="url(#mr-denim)" />
                            <rect x="198" y="374" width="56" height="14" rx="6" fill="url(#mr-denim)" />
                            <path d="M144 384 h58 v22 c0 17 -14 27 -30 27 c-17 0 -30 -10 -30 -27 Z" fill="url(#mr-boot)" stroke="#000000" strokeOpacity="0.5" strokeWidth="1.4" />
                            <path d="M198 384 h58 v22 c0 17 -13 27 -30 27 c-16 0 -30 -10 -30 -27 Z" fill="url(#mr-boot)" stroke="#000000" strokeOpacity="0.5" strokeWidth="1.4" />
                            <ellipse cx="172" cy="429" rx="32" ry="10" fill="#0a0b0c" />
                            <ellipse cx="228" cy="429" rx="32" ry="10" fill="#0a0b0c" />
                            <path d="M150 394 h44" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="3.4" strokeLinecap="round" />
                            <path d="M206 394 h44" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="3.4" strokeLinecap="round" />
                            <ellipse cx="160" cy="400" rx="12" ry="9" fill="#ffffff" fillOpacity="0.07" />
                        </motion.g>

                        {/* ══ ARMS: one smooth tapered limb per side, held slightly off the body,
                             jointed only at the shoulder socket (slight lag + sway) ══ */}
                        <motion.g
                            fill="url(#mr-shellSoft)"
                            stroke="#000000"
                            strokeOpacity="0.45"
                            strokeWidth="1.2"
                            style={{ transformBox: 'view-box', transformOrigin: '200px 250px' }}
                            animate={reduceMotion ? undefined : { y: [0, -3, 0], rotate: [0, 1.1, 0] }}
                            transition={{ duration: BOUNCE_DURATION, ease: EASE_SINE, repeat: Infinity, repeatType: 'loop', delay: 0.13 }}
                        >
                            {/* left shoulder socket – the one joint that stays anchored to the torso */}
                            <ellipse cx="115" cy="223" rx="13" ry="11" fill="url(#mr-metal)" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
                            {/* left upper arm, held out from the torso for a natural gap under the arm */}
                            <rect x="91" y="226" width="30" height="60" rx="15" transform="rotate(-14 106 256)" />
                            {/* left forearm, overlapping the bicep so the limb reads as one piece */}
                            <rect x="83" y="270" width="24" height="66" rx="12" transform="rotate(-7 95 303)" />
                            {/* left gripper */}
                            <g transform="rotate(-12 93 354)">
                                <ellipse cx="93" cy="354" rx="17" ry="19" />
                                <path d="M84 363 v10 M93 366 v11 M102 363 v9" stroke="#000" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
                                <ellipse cx="89" cy="346" rx="7" ry="8" fill="#ffffff" fillOpacity="0.12" stroke="none" />
                            </g>

                            {/* right shoulder socket */}
                            <ellipse cx="285" cy="223" rx="13" ry="11" fill="url(#mr-metal)" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
                            {/* right upper arm */}
                            <rect x="279" y="226" width="30" height="60" rx="15" transform="rotate(14 294 256)" />
                            {/* right forearm */}
                            <rect x="293" y="270" width="24" height="62" rx="12" transform="rotate(9 305 301)" />
                            {/* right gripper */}
                            <g transform="rotate(12 307 354)">
                                <ellipse cx="307" cy="354" rx="17" ry="19" />
                                <path d="M316 363 v10 M307 366 v11 M298 363 v9" stroke="#000" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
                                <ellipse cx="311" cy="346" rx="7" ry="8" fill="#ffffff" fillOpacity="0.12" stroke="none" />
                            </g>
                        </motion.g>

                        {/* ══ TORSO ══ */}
                        <motion.g style={{ x: torsoX }}>
                            <path d="M108 268 C108 220 146 198 200 198 C254 198 292 220 292 268 C292 318 262 352 200 352 C138 352 108 318 108 268 Z" fill="url(#mr-shell)" stroke="#000000" strokeOpacity="0.5" strokeWidth="1.5" />
                            <path d="M152 204 C170 216 230 216 248 204 C230 198 170 198 152 204 Z" fill="#000" fillOpacity="0.5" />
                            <ellipse cx="164" cy="240" rx="50" ry="34" fill="url(#mr-gloss)" />
                            <path d="M286 252 C291 270 290 294 282 312 C288 292 288 270 282 254 Z" fill="#ffffff" fillOpacity="0.20" />

                            {/* chest LED */}
                            <motion.circle
                                cx="200" cy="216" r="6" fill="#ffffff" filter="url(#mr-glow)"
                                animate={reduceMotion ? undefined : { opacity: [0.75, 1, 0.75] }}
                                transition={{ duration: 2.1, ease: 'easeInOut', repeat: Infinity }}
                            />

                            {/* ── DUNGAREES ── */}
                            <path d="M110 266 C140 292 260 292 290 266 C291 316 258 352 200 352 C142 352 109 316 110 266 Z" fill="url(#mr-denim)" />
                            <path d="M112 272 C142 296 258 296 288 272 C258 302 142 302 112 272 Z" fill="#ffffff" fillOpacity="0.10" />

                            {/* shoulder straps */}
                            <path d="M172 236 C166 224 160 216 152 211" stroke="#274370" strokeWidth="17" fill="none" strokeLinecap="round" />
                            <path d="M228 236 C234 224 240 216 248 211" stroke="#1f3660" strokeWidth="17" fill="none" strokeLinecap="round" />
                            <path d="M169 234 C164 224 159 218 152 214" stroke="#5480c4" strokeOpacity="0.5" strokeWidth="4" fill="none" strokeLinecap="round" />

                            {/* bib */}
                            <path d="M161 270 L239 270 L241 282 L159 282 Z" fill="#000" fillOpacity="0.3" />
                            <path d="M163 228 L237 228 L241 274 L159 274 Z" fill="url(#mr-denim)" />
                            <path d="M163 228 L237 228 L237.5 234 L162.5 234 Z" fill="#ffffff" fillOpacity="0.17" />
                            <rect x="163" y="226" width="15" height="11" rx="3" fill="url(#mr-metal)" />
                            <rect x="222" y="226" width="15" height="11" rx="3" fill="url(#mr-metal)" />

                            {/* tool pocket */}
                            <rect x="177" y="242" width="46" height="24" rx="4" fill="#000" fillOpacity="0.26" />
                            <rect x="177" y="242" width="46" height="24" rx="4" fill="none" stroke="#FF5722" strokeOpacity="0.9" strokeWidth="2.4" />
                            <path d="M177 250 h46" stroke="#FF5722" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 4" />
                            {/* wrench, swaying a touch behind the body */}
                            <motion.g
                                transform="rotate(-20 191 236)"
                                style={{ transformBox: 'view-box', transformOrigin: '191px 250px' }}
                                animate={reduceMotion ? undefined : { rotate: [0, 2.4, 0] }}
                                transition={{ duration: BOUNCE_DURATION, ease: EASE_SINE, repeat: Infinity, repeatType: 'loop', delay: 0.24 }}
                            >
                                <rect x="187" y="222" width="9" height="32" rx="4.5" fill="url(#mr-metal)" />
                                <path d="M184 216 h15 v9 h-5 v5 h-5 v-5 h-5 Z" fill="url(#mr-metal)" />
                                <rect x="189.4" y="226" width="2.6" height="24" rx="1.3" fill="#ffffff" fillOpacity="0.45" />
                            </motion.g>

                            <path d="M115 306 C148 330 252 330 285 306 C268 342 132 342 115 306 Z" fill="#000" fillOpacity="0.26" />
                            <ellipse cx="150" cy="296" rx="24" ry="14" fill="#ffffff" fillOpacity="0.07" />
                            <path d="M128 294 C160 312 240 312 272 294" stroke="#FF5722" strokeOpacity="0.3" strokeWidth="1.7" fill="none" strokeDasharray="5 5" />
                        </motion.g>

                        {/* ══ HEAD (trails the body by a hair) ══ */}
                        <motion.g {...anim(5, 0.05)}>
                            <motion.g style={{ x: headX, y: headY, rotate: headTilt, transformBox: 'view-box', transformOrigin: '200px 200px' }}>
                                {/* ear pads */}
                                <rect x="86" y="106" width="34" height="62" rx="17" fill="url(#mr-shellSoft)" stroke="#000000" strokeOpacity="0.45" strokeWidth="1.2" />
                                <rect x="94" y="118" width="15" height="38" rx="7.5" fill="url(#mr-metal)" fillOpacity="0.5" />
                                <rect x="280" y="106" width="34" height="62" rx="17" fill="url(#mr-shellSoft)" stroke="#000000" strokeOpacity="0.45" strokeWidth="1.2" />
                                <rect x="291" y="118" width="15" height="38" rx="7.5" fill="url(#mr-metal)" fillOpacity="0.35" />

                                {/* helmet */}
                                <ellipse cx="200" cy="124" rx="92" ry="76" fill="url(#mr-shell)" stroke="#000000" strokeOpacity="0.5" strokeWidth="1.6" />
                                <ellipse cx="200" cy="124" rx="92" ry="76" fill="url(#mr-gloss)" />
                                <path d="M288 100 C294 116 294 142 286 162 C292 140 292 116 284 102 Z" fill="#ffffff" fillOpacity="0.22" />

                                {/* face screen */}
                                <ellipse cx="200" cy="134" rx="71" ry="52" fill="url(#mr-face)" />
                                <ellipse cx="200" cy="134" rx="71" ry="52" fill="none" stroke="#dfe6ee" strokeOpacity="0.3" strokeWidth="1.8" />

                                {/* face: bloom pass + crisp pass, blinking together */}
                                <motion.g style={{ x: faceX, y: faceY }}>
                                    {/* left eye: scales around its own center, so nothing drifts */}
                                    <motion.g
                                        style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
                                        animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.08, 1, 1, 1, 0.08, 1, 1] }}
                                        transition={blinkTransition}
                                    >
                                        <g filter="url(#mr-bloom)" opacity="0.55">
                                            <ellipse cx="173" cy="128" rx="13" ry="15.5" fill="#ffffff" />
                                        </g>
                                        <ellipse cx="173" cy="128" rx="13" ry="15.5" fill="#ffffff" />
                                        <ellipse cx="169" cy="122" rx="4.6" ry="5.4" fill="#ffffff" />
                                    </motion.g>
                                    {/* right eye: identical blink, own center, stays in sync */}
                                    <motion.g
                                        style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}
                                        animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.08, 1, 1, 1, 0.08, 1, 1] }}
                                        transition={blinkTransition}
                                    >
                                        <g filter="url(#mr-bloom)" opacity="0.55">
                                            <ellipse cx="227" cy="128" rx="13" ry="15.5" fill="#ffffff" />
                                        </g>
                                        <ellipse cx="227" cy="128" rx="13" ry="15.5" fill="#ffffff" />
                                        <ellipse cx="223" cy="122" rx="4.6" ry="5.4" fill="#ffffff" />
                                    </motion.g>
                                </motion.g>
                                <motion.g style={{ x: faceX, y: faceY }}>
                                    <path d="M176 158 Q200 178 224 158" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" fill="none" filter="url(#mr-bloom)" opacity="0.55" />
                                    <path d="M176 158 Q200 178 224 158" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" fill="none" />
                                </motion.g>

                                {/* ══ CAP (lags a hair behind the head) ══ */}
                                <motion.g
                                    style={{ transformBox: 'view-box', transformOrigin: '200px 100px' }}
                                    animate={reduceMotion ? undefined : { y: [0, 1.8, 0], rotate: [0, -1.4, 0] }}
                                    transition={{ duration: BOUNCE_DURATION, ease: EASE_SINE, repeat: Infinity, repeatType: 'loop', delay: 0.16 }}
                                >
                                    <g transform="rotate(-5 200 76)">
                                        <path d="M126 82 C130 50 160 32 200 32 C240 32 270 50 274 82 C244 72 156 72 126 82 Z" fill="url(#mr-cap)" />
                                        <path d="M148 76 C154 52 170 38 190 35 C172 43 158 57 155 79 Z" fill="#ffffff" fillOpacity="0.24" />
                                        <path d="M200 33 C197 48 196 60 196 70" stroke="#0d1a2e" strokeOpacity="0.45" strokeWidth="2" fill="none" />
                                        <path d="M200 33 C203 48 204 60 204 70" stroke="#0d1a2e" strokeOpacity="0.45" strokeWidth="2" fill="none" />
                                        <circle cx="200" cy="34" r="7" fill="#FF5722" />
                                        <ellipse cx="198" cy="31.6" rx="3" ry="2.4" fill="#ffffff" fillOpacity="0.5" />
                                        <path d="M124 80 C156 70 244 70 276 80 C296 86 290 95 264 100 C232 106 168 106 136 100 C110 95 104 86 124 80 Z" fill="url(#mr-capBrim)" />
                                        <path d="M130 82 C158 74 242 74 270 82 C280 85 277 90 266 93 C238 86 162 86 134 93 C123 90 120 85 130 82 Z" fill="#ffffff" fillOpacity="0.14" />
                                        <path d="M136 99 C168 106 232 106 264 99 C232 111 168 111 136 99 Z" fill="#000" fillOpacity="0.42" />
                                    </g>
                                </motion.g>
                            </motion.g>
                        </motion.g>
                    </motion.g>
                </motion.g>
            </svg>
        </div>
    );
}

export default MechanicRobot;
