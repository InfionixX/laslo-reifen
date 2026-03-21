import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCircleCheck, FaCircleInfo } from 'react-icons/fa6';
import TypewriterText from '../components/TypewriterText';
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

const ContactPage = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
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
        } catch (error) {
            setSubmitError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="pt-32 pb-12 bg-brand-dark min-h-screen relative overflow-hidden">
            {/* Subtle Decorative element */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-orange opacity-[0.03] rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">

                {/* Header Welcome Text */}
                <div className="text-center mb-16 relative z-10">
                    <TypewriterText
                        text={t('contact_page_badge')}
                        className="text-brand-orange font-bold uppercase tracking-wider mb-2 block"
                        tag="h3"
                    />
                    <TypewriterText
                        text={t('contact_page_title')}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 block"
                        tag="h1"
                        delay={0.2}
                    />
                    <TypewriterText
                        text={t('contact_page_desc')}
                        className="text-gray-400 max-w-2xl mx-auto leading-relaxed block"
                        tag="p"
                        delay={0.5}
                        speed={0.01}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10 w-full max-w-6xl mx-auto rounded-3xl">

                    {/* The Image from About Us */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full relative group mt-8 lg:mt-0"
                    >
                        <div className="absolute inset-0 bg-brand-orange opacity-10 blur-2xl rounded-2xl group-hover:opacity-20 transition-opacity duration-500"></div>
                        <img
                            src="/grafics/pictures/about_us_picture.png"
                            alt="Kontakt Illustration"
                            className="relative z-10 rounded-3xl shadow-2xl w-full h-[600px] object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />
                    </motion.div>

                    {/* Contact Form Container like the main styling */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="p-8 md:p-12 w-full h-full flex flex-col justify-center bg-brand-gray/50 rounded-3xl border border-gray-800 shadow-xl relative"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] rounded-3xl"></div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_name')}</label>
                                    <input
                                        {...register('name', { required: true })}
                                        type="text"
                                        className="w-full bg-brand-dark border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        placeholder="Max Mustermann"
                                    />
                                    {errors.name && <span className="text-red-500 text-xs mt-1 block">Pflichtfeld</span>}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
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
                                    </div>
                                    <div>
                                        <input
                                            {...register('hsn', { required: true })}
                                            type="text"
                                            className="w-full bg-brand-dark border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-orange transition-all placeholder-gray-600 uppercase"
                                            placeholder={t('form_hsn')}
                                        />
                                        {errors.hsn && <span className="text-red-500 text-xs mt-1 block">Pflichtfeld</span>}
                                    </div>
                                    <div>
                                        <input
                                            {...register('tsn', { required: true })}
                                            type="text"
                                            className="w-full bg-brand-dark border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-orange transition-all placeholder-gray-600 uppercase"
                                            placeholder={t('form_tsn')}
                                        />
                                        {errors.tsn && <span className="text-red-500 text-xs mt-1 block">Pflichtfeld</span>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_tire_type')}</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <label className="cursor-pointer">
                                            <input type="radio" value="summer" {...register('tireType', { required: true })} className="peer sr-only" />
                                            <div className="text-center px-1 py-3 bg-brand-dark border border-gray-700 rounded-xl text-gray-400 peer-checked:bg-brand-orange/20 peer-checked:border-brand-orange peer-checked:text-brand-orange transition-all text-xs sm:text-sm font-medium shadow-sm hover:border-gray-500">
                                                {t('form_summer')}
                                            </div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input type="radio" value="winter" {...register('tireType', { required: true })} className="peer sr-only" />
                                            <div className="text-center px-1 py-3 bg-brand-dark border border-gray-700 rounded-xl text-gray-400 peer-checked:bg-brand-orange/20 peer-checked:border-brand-orange peer-checked:text-brand-orange transition-all text-xs sm:text-sm font-medium shadow-sm hover:border-gray-500">
                                                {t('form_winter')}
                                            </div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input type="radio" value="allseason" {...register('tireType', { required: true })} className="peer sr-only" />
                                            <div className="text-center px-1 py-3 bg-brand-dark border border-gray-700 rounded-xl text-gray-400 peer-checked:bg-brand-orange/20 peer-checked:border-brand-orange peer-checked:text-brand-orange transition-all text-xs sm:text-sm font-medium shadow-sm hover:border-gray-500">
                                                {t('form_allseason')}
                                            </div>
                                        </label>
                                    </div>
                                    {errors.tireType && <span className="text-red-500 text-xs mt-1 block">Pflichtfeld</span>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_tire_count')}</label>
                                        <input
                                            {...register('tireCount', { required: true, min: 1 })}
                                            type="number"
                                            defaultValue={4}
                                            className="w-full bg-brand-dark border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        />
                                        {errors.tireCount && <span className="text-red-500 text-xs mt-1 block">Min. 1 Stück</span>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_phone')}</label>
                                        <input
                                            {...register('phone', { required: true })}
                                            type="tel"
                                            className="w-full bg-brand-dark border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                            placeholder="+49 123 45678"
                                        />
                                        {errors.phone && <span className="text-red-500 text-xs mt-1 block">Pflichtfeld</span>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_messenger')}</label>
                                    <input
                                        {...register('messenger')}
                                        type="text"
                                        className="w-full bg-brand-dark border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        placeholder="z.B. max.mustermann"
                                    />
                                </div>

                                <div className="flex items-center gap-3 bg-brand-dark/50 p-4 rounded-xl border border-gray-700/50 hover:bg-brand-dark transition-colors cursor-pointer" onClick={() => { const el = document.getElementById('rdks') as HTMLInputElement; if (el) el.click(); }}>
                                    <input
                                        {...register('rdks')}
                                        type="checkbox"
                                        className="w-5 h-5 accent-brand-orange bg-gray-700 border-gray-600 rounded cursor-pointer pointer-events-none"
                                        id="rdks"
                                    />
                                    <label htmlFor="rdks" className="text-sm font-medium text-white cursor-pointer select-none pointer-events-none w-full">
                                        {t('form_rdks')}
                                    </label>
                                </div>
                            </div>

                            {submitError && <div className="text-red-500 text-sm">{submitError}</div>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(255,87,34,0.39)] hover:shadow-[0_6px_20px_rgba(255,87,34,0.23)] hover:-translate-y-1 flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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
            </div>

            {/* Toast Notification */}
            <div className={`fixed bottom-5 right-5 bg-brand-gray border-l-4 border-brand-orange text-white px-6 py-4 rounded-xl shadow-2xl transform transition-transform duration-300 z-50 flex items-center ${submitSuccess ? 'translate-y-0' : 'translate-y-32'}`}>
                <FaCircleCheck className="text-green-500 mr-3 text-2xl" />
                <div>
                    <h4 className="font-bold text-lg">{t('toast_success')}</h4>
                    <p className="text-sm text-gray-400">{t('toast_msg')}</p>
                </div>
            </div>

            {/* HSN/TSN Info Modal */}
            <Modal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} title="Fahrzeugschein (HSN/TSN)" maxWidth="max-w-4xl">
                <div className="flex flex-col items-center">
                    <p className="mb-6 text-gray-300 text-lg text-center leading-relaxed max-w-2xl">
                        {t('form_hsn_tsn_info')}
                    </p>
                    <img src="/grafics/pictures/_contact-page/_info/fahrzeugschein-hsn-tsn.png" alt="Fahrzeugschein" className="w-full rounded-xl border border-gray-600 shadow-2xl" />
                </div>
            </Modal>
        </div>
    );
};

export default ContactPage;
