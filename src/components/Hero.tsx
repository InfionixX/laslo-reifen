import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Gauge } from 'lucide-react';
import ThreeDMarquee from '@/components/ui/3d-marquee';

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
// Tire & wheel image set for the 3D marquee
// ---------------------------------------------------------------------------
const tireWheelImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626814974079-fe0b52e5e1a7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1597007066540-47b440296e2f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
];

// ---------------------------------------------------------------------------
// Main Hero Section
// ---------------------------------------------------------------------------
const Hero: React.FC = () => {
    const { t } = useTranslation();

    const stats = [
        { icon: Shield, val: t('hero_stat1_val'), label: t('hero_stat1_label') },
        { icon: Gauge,  val: t('hero_stat2_val'), label: t('hero_stat2_label') },
        { icon: Zap,    val: t('hero_stat3_val'), label: t('hero_stat3_label') },
    ];

    return (
        <section
            id="home"
            className="relative min-h-screen w-full overflow-x-clip overflow-y-visible bg-brand-dark"
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

            <div
                className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-12 px-5 sm:px-6 lg:px-8"
            >
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center overflow-hidden">

                    {/* ── Left: text content ── */}
                    <div className="text-center lg:text-left space-y-5 sm:space-y-8 min-w-0">

                        {/* Badge pill */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-sm mb-1 sm:mb-2">
                                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
                                <span className="text-xs sm:text-sm text-orange-400 font-medium">
                                    {t('hero_badge')}
                                </span>
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-[1.65rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
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
                            className="text-sm sm:text-base md:text-lg text-gray-400 w-full lg:max-w-xl leading-relaxed font-light break-words mx-auto lg:mx-0"
                        >
                            {t('hero_desc')}
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
                        >
                            <a
                                href="#services"
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 rounded-full bg-brand-orange hover:bg-orange-600 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-brand-orange/25 hover:-translate-y-0.5 group"
                            >
                                {t('cta_primary')}
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 rounded-full border border-brand-orange/50 text-orange-400 hover:bg-brand-orange/10 font-semibold text-sm sm:text-base transition-all duration-200"
                            >
                                {t('cta_secondary')}
                            </a>
                        </motion.div>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 sm:grid sm:grid-cols-3 sm:gap-6 pt-4 border-t border-white/[0.07]"
                        >
                            {stats.map(({ icon: Icon, val, label }) => (
                                <div key={label} className="space-y-1 sm:space-y-1.5 text-center sm:text-left">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange mx-auto sm:mx-0" />
                                    <div className="text-lg sm:text-2xl font-bold text-white">{val}</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500 font-light leading-tight">{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: 3D image marquee ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative hidden lg:flex items-center justify-center"
                    >
                        {/* Edge-fade overlays for seamless blend */}
                        <div className="absolute inset-0 z-20 pointer-events-none" style={{
                            background: `
                                linear-gradient(to right, rgba(10,10,10,1) 0%, transparent 15%, transparent 85%, rgba(10,10,10,1) 100%),
                                linear-gradient(to bottom, rgba(10,10,10,1) 0%, transparent 15%, transparent 85%, rgba(10,10,10,1) 100%)
                            `
                        }} />
                        <ThreeDMarquee
                            images={tireWheelImages}
                            className="h-[550px] lg:h-[600px] w-full rounded-2xl"
                        />
                    </motion.div>

                    {/* Mobile: simplified marquee below text */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="relative lg:hidden overflow-hidden min-w-0"
                    >
                        <div className="absolute inset-0 z-20 pointer-events-none" style={{
                            background: `
                                linear-gradient(to right, rgba(10,10,10,1) 0%, transparent 10%, transparent 90%, rgba(10,10,10,1) 100%),
                                linear-gradient(to bottom, rgba(10,10,10,1) 0%, transparent 10%, transparent 90%, rgba(10,10,10,1) 100%)
                            `
                        }} />
                        <ThreeDMarquee
                            images={tireWheelImages}
                            className="h-[250px] sm:h-[350px] w-full rounded-2xl"
                        />
                    </motion.div>
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
            </div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-brand-dark to-transparent z-20 pointer-events-none" />
        </section>
    );
};

export default Hero;
