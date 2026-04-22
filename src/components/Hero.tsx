import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Zap, Shield, Gauge } from 'lucide-react';

// ---------------------------------------------------------------------------
// Animated canvas: floating particles in brand-orange
// ---------------------------------------------------------------------------
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

const AnimatedCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();



        const count = 55;
        const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 0.8,
            speedX: (Math.random() - 0.5) * 0.45,
            speedY: (Math.random() - 0.5) * 0.45,
            opacity: Math.random() * 0.45 + 0.15,
        }));

        let rafId: number;
        const animate = () => {
            // Subtle trail fade
            ctx.fillStyle = 'rgba(10, 10, 10, 0.06)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 87, 34, ${p.opacity})`; // #FF5722 with opacity
                ctx.fill();
            });

            rafId = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

// ---------------------------------------------------------------------------
// Animated 3D rim / tire SVG-based
// ---------------------------------------------------------------------------
const TireRim3D: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        let lastTime = performance.now();
        let frameId: number;
        const animate = (time: number) => {
            const delta = time - lastTime;
            lastTime = time;
            setRotation(r => (r + delta * 0.15) % 360);
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.3, delay, type: 'spring', stiffness: 45 }}
            className="relative w-64 h-64 md:w-80 md:h-80"
            style={{ perspective: '1200px' }}
        >
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    transform: `rotateY(25deg) rotateX(15deg)`,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Brake Disc (static) */}
                <div className="absolute inset-10 rounded-full border border-gray-500/30"
                     style={{ 
                         background: 'repeating-radial-gradient(circle, #333, #333 2px, #222 3px, #222 5px)',
                         boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
                     }}>
                     {/* Brake Caliper */}
                     <div className="absolute top-0 right-4 w-10 h-28 bg-brand-orange rounded-2xl border border-orange-400 shadow-[0_5px_15px_rgba(0,0,0,0.6)] z-0"
                          style={{ transform: 'rotate(25deg)', transformOrigin: 'center' }}>
                          <div className="w-full h-full flex items-center justify-center">
                              <span className="text-black/80 font-black text-[10px] tracking-widest transform rotate-90">LASLO</span>
                          </div>
                     </div>
                </div>

                {/* Spinning Wheel */}
                <div
                    className="absolute inset-0"
                    style={{
                        transform: `rotateZ(${rotation}deg)`,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Low Profile Tire */}
                    <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.9)]"
                         style={{ 
                             background: '#111', 
                             border: '28px solid #0a0a0a',
                             boxShadow: 'inset 0 0 10px rgba(0,0,0,0.9), 0 0 20px rgba(255,87,34,0.15)',
                             backgroundImage: 'repeating-conic-gradient(from 0deg, transparent 0deg, transparent 8deg, rgba(255,255,255,0.03) 8deg, rgba(255,255,255,0.03) 10deg)'
                         }}>
                    </div>

                    {/* Inner Rim Lip */}
                    <div className="absolute inset-[26px] rounded-full border-4 border-brand-orange shadow-[inset_0_0_20px_rgba(255,87,34,0.6),0_0_10px_rgba(255,87,34,0.4)]"></div>
                    <div className="absolute inset-[30px] rounded-full border-2 border-[#222]"></div>

                    {/* Tuning Spokes (Complex Y-Spoke Design) */}
                    <svg className="absolute inset-[30px] w-[calc(100%-60px)] h-[calc(100%-60px)] drop-shadow-2xl" viewBox="0 0 200 200">
                        <defs>
                            <linearGradient id="spokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#555" />
                                <stop offset="50%" stopColor="#222" />
                                <stop offset="100%" stopColor="#111" />
                            </linearGradient>
                            <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FF7043" />
                                <stop offset="100%" stopColor="#D84315" />
                            </linearGradient>
                            <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.7"/>
                            </filter>
                        </defs>
                        
                        {/* 5 Y-Spokes */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <g key={i} transform={`rotate(${i * 72} 100 100)`} filter="url(#dropShadow)">
                                {/* Main Spoke Body */}
                                <path d="M 94 100 L 94 45 L 65 5 L 85 0 L 100 30 L 115 0 L 135 5 L 106 45 L 106 100 Z" fill="url(#spokeGrad)" stroke="#666" strokeWidth="0.5" />
                                {/* Cutouts for sport look */}
                                <path d="M 98 85 L 98 48 L 82 20 L 88 15 L 100 40 L 112 15 L 118 20 L 102 48 L 102 85 Z" fill="#0a0a0a" />
                                {/* Detail lines */}
                                <path d="M 100 45 L 100 80" stroke="#FF5722" strokeWidth="1" opacity="0.3" />
                            </g>
                        ))}
                        
                        {/* Center Hub Outer */}
                        <circle cx="100" cy="100" r="28" fill="#1a1a1a" stroke="#333" strokeWidth="2" filter="url(#dropShadow)" />
                        {/* Center Hub Inner */}
                        <circle cx="100" cy="100" r="16" fill="url(#hubGrad)" stroke="#FF8A65" strokeWidth="1" />
                        
                        {/* Lug Nuts */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <circle key={i} cx={100 + 20 * Math.sin(i * 72 * Math.PI / 180)} cy={100 - 20 * Math.cos(i * 72 * Math.PI / 180)} r="3.5" fill="#888" stroke="#111" strokeWidth="1" />
                        ))}
                        
                        {/* Center Logo/Cap detail */}
                        <circle cx="100" cy="100" r="6" fill="#111" />
                        <path d="M 97 100 L 100 95 L 103 100 L 100 105 Z" fill="#FF5722" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
};

// ---------------------------------------------------------------------------
// Main Hero Section
// ---------------------------------------------------------------------------
const Hero: React.FC = () => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y       = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale   = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
    const ySpring = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const stats = [
        { icon: Shield, val: t('hero_stat1_val'), label: t('hero_stat1_label') },
        { icon: Gauge,  val: t('hero_stat2_val'), label: t('hero_stat2_label') },
        { icon: Zap,    val: t('hero_stat3_val'), label: t('hero_stat3_label') },
    ];

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen w-full overflow-hidden bg-brand-dark"
        >
            {/* Particle canvas */}
            <AnimatedCanvas />

            {/* Dark gradient overlay – keeps background legible */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-brand-dark/90 to-black/95" />

            {/* Warm bottom tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-950/25 via-transparent to-transparent" />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,87,34,0.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,87,34,0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '52px 52px',
                }}
            />

            {/* Parallax + fade on scroll */}
            <motion.div
                style={{ y: ySpring, opacity, scale }}
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

                    {/* ── Left: text content ── */}
                    <div className="text-left space-y-8">

                        {/* Badge pill */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-sm mb-2">
                                <Zap className="w-4 h-4 text-brand-orange" />
                                <span className="text-sm text-orange-400 font-medium">
                                    {t('hero_badge')}
                                </span>
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                        >
                            <span className="text-white">{t('hero_title_1')}</span>
                            <br />
                            <span className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(90deg, #FF8A65, #FF5722, #E64A19)' }}>
                                {t('hero_title_2')}
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                        >
                            {t('hero_desc')}
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="#services"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-brand-orange/25 hover:-translate-y-0.5 group"
                            >
                                {t('cta_primary')}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-brand-orange/50 text-orange-400 hover:bg-brand-orange/10 font-semibold text-base transition-all duration-200"
                            >
                                {t('cta_secondary')}
                            </a>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65 }}
                            className="grid grid-cols-3 gap-6 pt-4 border-t border-white/[0.07]"
                        >
                            {stats.map(({ icon: Icon, val, label }) => (
                                <div key={label} className="space-y-1.5">
                                    <Icon className="w-5 h-5 text-brand-orange" />
                                    <div className="text-2xl font-bold text-white">{val}</div>
                                    <div className="text-xs text-gray-500 font-light leading-tight">{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: animated 3D rim ── */}
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="relative"
                        >
                            {/* Glow halo */}
                            <div className="absolute inset-0 blur-3xl rounded-full scale-150"
                                style={{ background: 'radial-gradient(circle, rgba(255,87,34,0.28) 0%, transparent 70%)' }} />

                            <TireRim3D delay={0.7} />

                            {/* Floating ring 1 */}
                            <motion.div
                                animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-8 -right-8 w-28 h-28 rounded-full border-2 border-brand-orange/25 backdrop-blur-sm"
                            />
                            {/* Floating ring 2 */}
                            <motion.div
                                animate={{ y: [0, 18, 0], rotate: [0, -4, 0] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full border-2 border-brand-orange/15 backdrop-blur-sm"
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 border-2 border-brand-orange/40 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-brand-orange rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-brand-dark to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default Hero;
