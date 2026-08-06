import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUpRight, Check, Send } from 'lucide-react';
// lucide-react dropped brand marks in v1 — social glyphs come from react-icons
import { FaInstagram, FaFacebookF } from 'react-icons/fa6';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

/* Shared field styling — hairline underline instead of boxed inputs */
const fieldClass =
    'w-full border-b border-bone/15 bg-transparent py-3 text-bone placeholder-ash-dim ' +
    'transition-colors duration-300 focus:border-copper focus:outline-none';

const labelClass =
    'font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ash-dim';

const Contact = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const onSubmit = async (data: FormData) => {
        setSubmitError('');
        try {
            const response = await fetch('/send_mail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                reset();
                setTimeout(() => setSubmitSuccess(false), 5000);
            } else {
                setSubmitError('Failed to send message. Please try again.');
            }
        } catch {
            setSubmitError('An error occurred. Please try again.');
        }
    };

    const details = [
        {
            icon: Phone,
            label: t('phone_label'),
            value: '+49 123 456 789',
            href: 'tel:+49123456789',
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'info@laslo-reifen.de',
            href: 'mailto:info@laslo-reifen.de',
        },
        {
            icon: MapPin,
            label: t('address_label'),
            value: 'München, Deutschland',
        },
    ];

    return (
        <section id="contact" className="relative bg-graphite py-28 sm:py-36 grain">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl"
                >
                    <div className="mb-7 flex items-center gap-4">
                        <span className="h-px w-10 bg-copper" />
                        <span className="eyebrow">{t('contact_badge')}</span>
                    </div>
                    <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-bone">
                        {t('contact_title')}
                    </h2>
                </motion.div>

                <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">

                    {/* ── Left: details ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-10 lg:col-span-5"
                    >
                        <dl className="flex flex-col">
                            {details.map((item) => {
                                const Row = (
                                    <>
                                        <item.icon className="h-4 w-4 shrink-0 text-copper" />
                                        <div className="min-w-0">
                                            <dt className={labelClass}>{item.label}</dt>
                                            <dd className="mt-1 text-lg text-bone">{item.value}</dd>
                                        </div>
                                    </>
                                );

                                return item.href ? (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-start gap-4 border-b border-bone/10 py-5 transition-colors duration-300 hover:border-copper/40"
                                    >
                                        {Row}
                                    </a>
                                ) : (
                                    <div
                                        key={item.label}
                                        className="flex items-start gap-4 border-b border-bone/10 py-5"
                                    >
                                        {Row}
                                    </div>
                                );
                            })}
                        </dl>

                        {/* Social */}
                        <div>
                            <p className={labelClass}>{t('social_label')}</p>
                            <div className="mt-4 flex gap-3">
                                {[
                                    {
                                        icon: FaInstagram,
                                        href: 'https://www.instagram.com/laslo.reifen?igsh=MXZxZDBvdWN5Y2oxNw==',
                                        name: 'Instagram',
                                    },
                                    {
                                        icon: FaFacebookF,
                                        href: 'https://www.facebook.com/share/17uXyhRbgV/',
                                        name: 'Facebook',
                                    },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-ash transition-all duration-300 hover:border-copper hover:text-copper"
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div>
                            <p className={labelClass}>{t('storage_label')}</p>
                            <div className="relative mt-4 h-56 overflow-hidden rounded-xl border border-bone/10">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.1858568962843!2d10.677126112318389!3d50.1389548714157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a24ba30c2e3e71%3A0x8616c280ec7b4e5c!2sReifen%20Nik-M%C3%BCller%20KG!5e0!3m2!1sde!2sde!4v1769803670619!5m2!1sde!2sde"
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: 0,
                                        // Inverting the light embed is the only reliable way to get a
                                        // dark map: an overlay div does not composite over a
                                        // cross-origin iframe, and desaturating alone leaves it
                                        // far brighter than the section around it.
                                        filter: 'invert(1) grayscale(1) contrast(0.88) brightness(0.95)',
                                    }}
                                    allowFullScreen
                                    loading="lazy"
                                    title={t('storage_label')}
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                                <a
                                    href="https://maps.app.goo.gl/qLoQAAP91YKz1nNJ8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-obsidian/85 px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-bone backdrop-blur-sm transition-colors hover:text-copper"
                                >
                                    Google Maps
                                    <ArrowUpRight className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right: form ── */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-7 lg:col-span-6 lg:col-start-7"
                    >
                        <div className="grid gap-7 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className={labelClass}>
                                    {t('form_name')}
                                </label>
                                <input
                                    id="name"
                                    {...register('name', { required: true })}
                                    type="text"
                                    className={fieldClass}
                                    placeholder="—"
                                />
                                {errors.name && (
                                    <span className="mt-1.5 block font-mono text-[0.625rem] text-copper-hi">
                                        Pflichtfeld
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className={labelClass}>
                                    {t('form_email')}
                                </label>
                                <input
                                    id="email"
                                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                    type="email"
                                    className={fieldClass}
                                    placeholder="—"
                                />
                                {errors.email && (
                                    <span className="mt-1.5 block font-mono text-[0.625rem] text-copper-hi">
                                        Gültige Email erforderlich
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className={labelClass}>
                                {t('form_subject')}
                            </label>
                            <select
                                id="subject"
                                {...register('subject')}
                                className={`${fieldClass} [&>option]:bg-obsidian`}
                            >
                                <option value="General">{t('opt_general')}</option>
                                <option value="Tires">{t('opt_tires')}</option>
                                <option value="Rims">{t('opt_rims')}</option>
                                <option value="Partner">{t('opt_partner')}</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className={labelClass}>
                                {t('form_message')}
                            </label>
                            <textarea
                                id="message"
                                {...register('message', { required: true })}
                                rows={5}
                                className={`${fieldClass} resize-none`}
                                placeholder="—"
                            />
                            {errors.message && (
                                <span className="mt-1.5 block font-mono text-[0.625rem] text-copper-hi">
                                    Nachricht erforderlich
                                </span>
                            )}
                        </div>

                        {submitError && (
                            <p className="font-mono text-xs text-copper-hi">{submitError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group mt-2 inline-flex w-fit items-center gap-2.5 rounded-full bg-copper px-8 py-4 text-sm font-medium text-obsidian transition-colors duration-300 hover:bg-copper-hi disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? '…' : t('form_submit')}
                            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </motion.form>
                </div>
            </div>

            {/* Toast */}
            <AnimatePresence>
                {submitSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        role="status"
                        className="fixed right-5 bottom-5 z-50 flex items-start gap-3 rounded-xl border border-copper/30 bg-obsidian/95 px-5 py-4 backdrop-blur-xl"
                    >
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-copper">
                            <Check className="h-3 w-3 text-obsidian" />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-bone">{t('toast_success')}</p>
                            <p className="mt-0.5 text-xs font-light text-ash">{t('toast_msg')}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
