import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaLocationDot, FaPaperPlane, FaCircleCheck, FaCircleInfo } from 'react-icons/fa6';
import TypewriterText from './TypewriterText';
import Modal from './Modal';
import MechanicRobot from './ui/mechanic-robot';

type FormData = {
    name: string;
    email: string;
    dialCode: string;
    phone: string;
    subject: string;
    hsn: string;
    tsn: string;
    message: string;
};

/** Country dial codes, Laslo's core markets first. */
const DIAL_CODES = [
    { iso: 'DE', code: '+49' },
    { iso: 'HU', code: '+36' },
    { iso: 'AT', code: '+43' },
    { iso: 'CH', code: '+41' },
    { iso: 'SK', code: '+421' },
    { iso: 'CZ', code: '+420' },
    { iso: 'PL', code: '+48' },
    { iso: 'RO', code: '+40' },
    { iso: 'HR', code: '+385' },
    { iso: 'SI', code: '+386' },
    { iso: 'RS', code: '+381' },
    { iso: 'NL', code: '+31' },
    { iso: 'BE', code: '+32' },
    { iso: 'FR', code: '+33' },
    { iso: 'IT', code: '+39' },
    { iso: 'ES', code: '+34' },
    { iso: 'GB', code: '+44' },
];

/** Subjects that require the vehicle key numbers to make a useful quote. */
const VEHICLE_SUBJECTS = ['Tires', 'Rims'];

/* Plausibility patterns – kept next to the form they guard. */
const NAME_PATTERN = /^\p{L}[\p{L}\s'’.-]{1,59}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const PHONE_PATTERN = /^\d[\d\s/-]{4,16}$/;
const HSN_PATTERN = /^\d{4}$/;
const TSN_PATTERN = /^[A-Za-z0-9]{3}$/;

/** Inline validation message, styled like the rest of the form. */
const FieldError = ({ message }: { message?: string }) =>
    message ? <span className="text-red-500 text-xs mt-1 block">{message}</span> : null;

const Contact = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        // Hidden HSN/TSN inputs must not submit stale values or block validation.
        shouldUnregister: true,
        defaultValues: { dialCode: '+49', subject: 'General' },
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

    const subject = useWatch({ control, name: 'subject' });
    const showVehicleFields = VEHICLE_SUBJECTS.includes(subject);

    const onSubmit = async (data: FormData) => {
        setSubmitError('');
        try {
            const response = await fetch('/send_mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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

    return (
        <section id="contact" className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-brand-dark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-orange opacity-[0.02] rounded-full blur-[120px] pointer-events-none transform translate-y-1/3 translate-x-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <TypewriterText
                        text={t('contact_badge')}
                        className="text-brand-orange font-bold uppercase tracking-wider mb-2 block"
                        tag="h3"
                        delay={0.3}
                    />
                    <TypewriterText
                        text={t('contact_title')}
                        className="text-3xl md:text-4xl font-bold text-white block"
                        tag="h2"
                        delay={0.5}
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-1 bg-brand-orange mx-auto mt-6"
                    ></motion.div>
                </div>

                {/* Robot + Form card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 bg-brand-gray rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">

                    {/* Robot */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-black p-8 min-h-[400px] lg:min-h-[620px]"
                    >
                        <MechanicRobot className="max-w-[440px]" />
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 sm:p-10 md:p-12 flex flex-col justify-center"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_name')}</label>
                                    <input
                                        {...register('name', {
                                            required: t('err_required'),
                                            pattern: { value: NAME_PATTERN, message: t('err_name_invalid') },
                                        })}
                                        type="text"
                                        autoComplete="name"
                                        aria-invalid={!!errors.name}
                                        className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        placeholder="John Doe"
                                    />
                                    <FieldError message={errors.name?.message} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_email')}</label>
                                    <input
                                        {...register('email', {
                                            required: t('err_required'),
                                            pattern: { value: EMAIL_PATTERN, message: t('err_email_invalid') },
                                        })}
                                        type="email"
                                        autoComplete="email"
                                        aria-invalid={!!errors.email}
                                        className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        placeholder="john@example.com"
                                    />
                                    <FieldError message={errors.email?.message} />
                                </div>
                            </div>

                            {/* Phone: dial code dropdown + number, always required */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_phone')}</label>
                                <div className="flex gap-3">
                                    <select
                                        {...register('dialCode', { required: true })}
                                        aria-label={t('form_dial_code')}
                                        className="select-chevron w-32 sm:w-36 shrink-0 bg-brand-dark border border-gray-700 rounded-lg pl-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-all"
                                    >
                                        {DIAL_CODES.map(({ iso, code }) => (
                                            <option key={iso} value={code}>{iso} {code}</option>
                                        ))}
                                    </select>
                                    <input
                                        {...register('phone', {
                                            required: t('err_required'),
                                            pattern: { value: PHONE_PATTERN, message: t('err_phone_invalid') },
                                        })}
                                        type="tel"
                                        autoComplete="tel-national"
                                        aria-invalid={!!errors.phone}
                                        className="flex-1 min-w-0 bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        placeholder="151 23456789"
                                    />
                                </div>
                                <FieldError message={errors.phone?.message} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_subject')}</label>
                                <select
                                    {...register('subject')}
                                    className="select-chevron w-full bg-brand-dark border border-gray-700 rounded-lg pl-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-all"
                                >
                                    <option value="General">{t('opt_general')}</option>
                                    <option value="Tires">{t('opt_tires')}</option>
                                    <option value="Rims">{t('opt_rims')}</option>
                                    <option value="Partner">{t('opt_partner')}</option>
                                </select>
                            </div>

                            {/* HSN/TSN: only relevant for tire and rim enquiries */}
                            <AnimatePresence initial={false}>
                                {showVehicleFields && (
                                    <motion.div
                                        key="hsn-tsn"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="block text-sm font-medium text-gray-400">{t('form_hsn_tsn')}</label>
                                            <button
                                                type="button"
                                                onClick={() => setIsInfoModalOpen(true)}
                                                className="text-brand-orange text-sm font-medium hover:text-orange-400 hover:underline transition-all cursor-pointer flex items-center gap-1"
                                            >
                                                <FaCircleInfo className="text-xs" />
                                                {t('form_hsn_tsn_more_info')}
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <input
                                                    {...register('hsn', {
                                                        required: t('err_required'),
                                                        pattern: { value: HSN_PATTERN, message: t('err_hsn_invalid') },
                                                    })}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={4}
                                                    aria-invalid={!!errors.hsn}
                                                    className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600 uppercase"
                                                    placeholder={t('form_hsn')}
                                                />
                                                <FieldError message={errors.hsn?.message} />
                                            </div>
                                            <div>
                                                <input
                                                    {...register('tsn', {
                                                        required: t('err_required'),
                                                        pattern: { value: TSN_PATTERN, message: t('err_tsn_invalid') },
                                                    })}
                                                    type="text"
                                                    maxLength={3}
                                                    aria-invalid={!!errors.tsn}
                                                    className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600 uppercase"
                                                    placeholder={t('form_tsn')}
                                                />
                                                <FieldError message={errors.tsn?.message} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_message')}</label>
                                <textarea
                                    {...register('message', {
                                        required: t('err_required'),
                                        minLength: { value: 10, message: t('err_message_invalid') },
                                        maxLength: { value: 2000, message: t('err_message_too_long') },
                                    })}
                                    rows={4}
                                    aria-invalid={!!errors.message}
                                    className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                    placeholder="..."
                                ></textarea>
                                <FieldError message={errors.message?.message} />
                            </div>

                            {submitError && <div className="text-red-500 text-sm">{submitError}</div>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-orange-900/50 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span>Senden...</span>
                                ) : (
                                    <>
                                        <span>{t('form_submit')}</span>
                                        <FaPaperPlane />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Contact details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6"
                >
                    <div className="bg-brand-gray border border-gray-800 rounded-2xl p-5 flex items-center hover:border-brand-orange/30 transition-colors">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-orange shrink-0">
                            <FaPhone />
                        </div>
                        <div className="ml-4 min-w-0">
                            <p className="text-sm text-gray-500 uppercase tracking-wide">{t('phone_label')}</p>
                            <a href="tel:+4915171561144" className="text-white text-lg font-semibold hover:text-brand-orange cursor-pointer transition-colors">+49 1517 1561144</a>
                        </div>
                    </div>

                    <div className="bg-brand-gray border border-gray-800 rounded-2xl p-5 flex items-center hover:border-brand-orange/30 transition-colors">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-orange shrink-0">
                            <FaEnvelope />
                        </div>
                        <div className="ml-4 min-w-0">
                            <p className="text-sm text-gray-500 uppercase tracking-wide">Email</p>
                            <a href="mailto:laszlo@magyar-gumis.de" className="text-white text-lg font-semibold hover:text-brand-orange cursor-pointer transition-colors truncate block">laszlo@magyar-gumis.de</a>
                        </div>
                    </div>

                    <div className="bg-brand-gray border border-gray-800 rounded-2xl p-5 flex items-center hover:border-brand-orange/30 transition-colors">
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-orange shrink-0">
                            <FaLocationDot />
                        </div>
                        <div className="ml-4 min-w-0">
                            <p className="text-sm text-gray-500 uppercase tracking-wide">{t('address_label')}</p>
                            <p className="text-white text-lg font-semibold">Franken, Bayern</p>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Toast Notification */}
            <div className={`fixed bottom-5 right-5 bg-brand-gray border-l-4 border-brand-orange text-white px-6 py-4 rounded shadow-2xl transform transition-transform duration-300 z-50 flex items-center ${submitSuccess ? 'translate-y-0' : 'translate-y-24'}`}>
                <FaCircleCheck className="text-green-500 mr-3 text-xl" />
                <div>
                    <h4 className="font-bold">{t('toast_success')}</h4>
                    <p className="text-sm text-gray-400">{t('toast_msg')}</p>
                </div>
            </div>

            {/* HSN/TSN Info Modal */}
            <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} title={t('form_modal_title')} maxWidth="max-w-4xl">
                <div className="flex flex-col items-center">
                    <p className="mb-6 text-gray-300 text-lg text-center leading-relaxed max-w-2xl">
                        {t('form_hsn_tsn_info')}
                    </p>
                    <img src="/grafics/pictures/_contact-page/_info/fahrzeugschein-hsn-tsn.png" alt={t('form_modal_title')} className="w-full rounded-xl border border-gray-600 shadow-2xl" />
                </div>
            </Modal>
        </section>
    );
};

export default Contact;
