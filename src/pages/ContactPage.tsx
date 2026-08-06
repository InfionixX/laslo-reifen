import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Info } from 'lucide-react';
import Modal from '../components/Modal';

type FormData = {
    name: string;
    hsn: string;
    tsn: string;
    tireType: 'summer' | 'winter' | 'allseason';
    tireCount: number;
    phone: string;
    messenger: string;
    rdks: boolean;
};

const fieldClass =
    'w-full border-b border-bone/15 bg-transparent py-3 text-bone placeholder-ash-dim ' +
    'transition-colors duration-300 focus:border-copper focus:outline-none';

const labelClass = 'font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ash-dim';

const errorClass = 'mt-1.5 block font-mono text-[0.625rem] text-copper-hi';

const ContactPage = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

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

    const tireTypes = [
        { value: 'summer', label: t('form_summer') },
        { value: 'winter', label: t('form_winter') },
        { value: 'allseason', label: t('form_allseason') },
    ] as const;

    return (
        <div className="relative min-h-screen bg-obsidian pt-36 pb-24 grain">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl"
                >
                    <div className="mb-7 flex items-center gap-4">
                        <span className="h-px w-10 bg-copper" />
                        <span className="eyebrow">{t('contact_page_badge')}</span>
                    </div>
                    <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] text-bone">
                        {t('contact_page_title')}
                    </h1>
                    <p className="mt-6 text-lg leading-relaxed font-light text-ash">
                        {t('contact_page_desc')}
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5"
                    >
                        <div className="overflow-hidden rounded-xl border border-bone/10">
                            <img
                                src="/grafics/pictures/about_us_picture.png"
                                alt={t('contact_page_img_alt')}
                                className="h-[280px] w-full object-cover lg:h-[620px]"
                            />
                        </div>
                    </motion.div>

                    {/* Quote form */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col gap-7 lg:col-span-6 lg:col-start-7"
                    >
                        {/* Name */}
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

                        {/* HSN / TSN */}
                        <div>
                            <div className="flex items-baseline justify-between gap-4">
                                <span className={labelClass}>{t('form_hsn_tsn')}</span>
                                <button
                                    type="button"
                                    onClick={() => setIsInfoModalOpen(true)}
                                    className="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-copper transition-colors hover:text-copper-hi"
                                >
                                    <Info className="h-3 w-3" />
                                    {t('form_hsn_tsn_more_info')}
                                </button>
                            </div>
                            <div className="mt-1 grid grid-cols-2 gap-6">
                                <div>
                                    <input
                                        {...register('hsn', { required: true })}
                                        type="text"
                                        aria-label={t('form_hsn')}
                                        className={`${fieldClass} uppercase`}
                                        placeholder={t('form_hsn')}
                                    />
                                    {errors.hsn && <span className={errorClass}>Pflichtfeld</span>}
                                </div>
                                <div>
                                    <input
                                        {...register('tsn', { required: true })}
                                        type="text"
                                        aria-label={t('form_tsn')}
                                        className={`${fieldClass} uppercase`}
                                        placeholder={t('form_tsn')}
                                    />
                                    {errors.tsn && <span className={errorClass}>Pflichtfeld</span>}
                                </div>
                            </div>
                        </div>

                        {/* Tire type */}
                        <fieldset>
                            <legend className={labelClass}>{t('form_tire_type')}</legend>
                            <div className="mt-3 grid grid-cols-3 gap-3">
                                {tireTypes.map((type) => (
                                    <label key={type.value} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            value={type.value}
                                            {...register('tireType', { required: true })}
                                            className="peer sr-only"
                                        />
                                        <span className="block rounded-lg border border-bone/15 px-2 py-3 text-center text-sm font-light text-ash transition-all duration-300 peer-checked:border-copper peer-checked:bg-copper/10 peer-checked:text-copper peer-focus-visible:border-copper hover:border-bone/35">
                                            {type.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {errors.tireType && <span className={errorClass}>Pflichtfeld</span>}
                        </fieldset>

                        {/* Count + phone */}
                        <div className="grid gap-7 sm:grid-cols-2">
                            <div>
                                <label htmlFor="tireCount" className={labelClass}>
                                    {t('form_tire_count')}
                                </label>
                                <input
                                    id="tireCount"
                                    {...register('tireCount', { required: true, min: 1 })}
                                    type="number"
                                    defaultValue={4}
                                    className={fieldClass}
                                />
                                {errors.tireCount && (
                                    <span className={errorClass}>Min. 1 Stück</span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phone" className={labelClass}>
                                    {t('form_phone')}
                                </label>
                                <input
                                    id="phone"
                                    {...register('phone', { required: true })}
                                    type="tel"
                                    className={fieldClass}
                                    placeholder="+49 123 45678"
                                />
                                {errors.phone && <span className={errorClass}>Pflichtfeld</span>}
                            </div>
                        </div>

                        {/* Messenger */}
                        <div>
                            <label htmlFor="messenger" className={labelClass}>
                                {t('form_messenger')}
                            </label>
                            <input
                                id="messenger"
                                {...register('messenger')}
                                type="text"
                                className={fieldClass}
                                placeholder="—"
                            />
                        </div>

                        {/* RDKS */}
                        <label
                            htmlFor="rdks"
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-bone/10 px-4 py-4 transition-colors duration-300 hover:border-bone/25"
                        >
                            <input
                                {...register('rdks')}
                                type="checkbox"
                                id="rdks"
                                className="h-4 w-4 shrink-0 accent-copper"
                            />
                            <span className="text-sm font-light text-bone-dim select-none">
                                {t('form_rdks')}
                            </span>
                        </label>

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

            {/* HSN/TSN info */}
            <Modal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                title={t('form_modal_title')}
                maxWidth="max-w-4xl"
            >
                <div className="flex flex-col items-center">
                    <p className="mb-7 max-w-2xl text-center leading-relaxed">
                        {t('form_hsn_tsn_info')}
                    </p>
                    <img
                        src="/grafics/pictures/_contact-page/_info/fahrzeugschein-hsn-tsn.png"
                        alt="Fahrzeugschein"
                        className="w-full rounded-xl border border-bone/10"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default ContactPage;
