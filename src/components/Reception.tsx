import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Check, Send } from 'lucide-react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa6';

/* ===========================================================================
   Reception — the last stop of the walk.

   The journey ends at the desk, so this is where the enquiry is taken. Unlike
   the pinned scenes this is an ordinary section in document flow: a form has
   to be focusable, scrollable and screen-reader friendly, which a stage that
   is mid-crossfade cannot guarantee.
   =========================================================================== */

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const fieldClass =
    'w-full border-b border-ink/15 bg-transparent py-3 text-ink placeholder-ink-faint ' +
    'transition-colors duration-300 focus:border-copper focus:outline-none';

const labelClass = 'font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint';

const errorClass = 'mt-1.5 block font-mono text-[0.625rem] text-copper';

const Reception = () => {
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
        { icon: Phone, label: t('phone_label'), value: '+49 123 456 789', href: 'tel:+49123456789' },
        { icon: Mail, label: 'Email', value: 'info@laslo-reifen.de', href: 'mailto:info@laslo-reifen.de' },
        { icon: MapPin, label: t('address_label'), value: 'München, Deutschland' },
    ];

    const steps = [
        { n: '01', title: t('process_1_title') },
        { n: '02', title: t('process_2_title') },
        { n: '03', title: t('process_3_title') },
        { n: '04', title: t('process_4_title') },
    ];

    return (
        <section id="contact" className="relative overflow-hidden bg-showroom grain">
            {/* The desk itself, held behind the content */}
            <div className="absolute inset-0">
                <img
                    src="/grafics/shop/10-reception.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-showroom via-showroom/85 to-showroom" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 sm:px-10 sm:py-36 lg:px-16">

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
                        <span className="eyebrow">{t('reception_eyebrow')}</span>
                    </div>
                    <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-ink">
                        {t('contact_title')}
                    </h2>
                    <p className="mt-6 text-lg leading-relaxed font-light text-ink-dim">
                        {t('reception_body')}
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">

                    {/* ── Left: how it works + reach us ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-12 lg:col-span-5"
                    >
                        {/* Four steps */}
                        <div>
                            <p className={labelClass}>{t('process_badge')}</p>
                            <ol className="mt-5 flex flex-col">
                                {steps.map((step) => (
                                    <li
                                        key={step.n}
                                        className="flex items-baseline gap-4 border-b border-ink/10 py-3.5"
                                    >
                                        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-copper">
                                            {step.n}
                                        </span>
                                        <span className="font-display text-xl text-ink">
                                            {step.title}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Contact details */}
                        <dl className="flex flex-col">
                            {details.map((item) => {
                                const Row = (
                                    <>
                                        <item.icon className="h-4 w-4 shrink-0 text-copper" />
                                        <div className="min-w-0">
                                            <dt className={labelClass}>{item.label}</dt>
                                            <dd className="mt-1 text-lg text-ink">{item.value}</dd>
                                        </div>
                                    </>
                                );

                                return item.href ? (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="flex items-start gap-4 border-b border-ink/10 py-5 transition-colors duration-300 hover:border-copper/50"
                                    >
                                        {Row}
                                    </a>
                                ) : (
                                    <div
                                        key={item.label}
                                        className="flex items-start gap-4 border-b border-ink/10 py-5"
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
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink-dim transition-all duration-300 hover:border-copper hover:text-copper"
                                    >
                                        <social.icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right: the form, on the desk ── */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-7 rounded-2xl border border-ink/10 bg-showroom/85 p-7 backdrop-blur-xl sm:p-10 lg:col-span-6 lg:col-start-7"
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
                                {errors.name && <span className={errorClass}>Pflichtfeld</span>}
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
                                    <span className={errorClass}>Gültige Email erforderlich</span>
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
                                className={`${fieldClass} [&>option]:bg-showroom`}
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
                                <span className={errorClass}>Nachricht erforderlich</span>
                            )}
                        </div>

                        {submitError && <p className="font-mono text-xs text-copper">{submitError}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group mt-2 inline-flex w-fit items-center gap-2.5 rounded-full bg-copper px-8 py-4 text-sm font-medium text-showroom transition-colors duration-300 hover:bg-copper-lo disabled:cursor-not-allowed disabled:opacity-50"
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
                        className="fixed right-5 bottom-5 z-50 flex items-start gap-3 rounded-xl border border-copper/30 bg-showroom/95 px-5 py-4 backdrop-blur-xl"
                    >
                        <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-copper">
                            <Check className="h-3 w-3 text-showroom" />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-ink">{t('toast_success')}</p>
                            <p className="mt-0.5 text-xs font-light text-ink-dim">{t('toast_msg')}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Reception;
