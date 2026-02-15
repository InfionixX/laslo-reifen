import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaLocationDot, FaInstagram, FaFacebookF, FaLinkedinIn, FaMapLocationDot, FaPaperPlane, FaCircleCheck } from 'react-icons/fa6';
import TypewriterText from './TypewriterText';

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const Contact = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

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
        } catch (error) {
            setSubmitError('An error occurred. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-24 bg-brand-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-brand-gray rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 md:p-12 flex flex-col justify-between bg-gradient-to-br from-gray-900 to-black relative"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                        <div className="relative z-10">
                            <TypewriterText
                                text={t('contact_badge')}
                                className="text-brand-orange font-bold uppercase tracking-wider mb-2 block"
                                tag="h3"
                                delay={0.3}
                            />
                            <TypewriterText
                                text={t('contact_title')}
                                className="text-3xl md:text-4xl font-bold text-white mb-8 block"
                                tag="h2"
                                delay={0.5}
                            />

                            <div className="space-y-6">

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-orange shrink-0">
                                        <FaPhone />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-500 uppercase tracking-wide">{t('phone_label')}</p>
                                        <a href="tel:+49123456789" className="text-white text-lg font-semibold hover:text-brand-orange cursor-pointer transition-colors">+49 123 456 789</a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-orange shrink-0">
                                        <FaEnvelope />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-500 uppercase tracking-wide">Email</p>
                                        <a href="mailto:info@laslo-reifen.de" className="text-white text-lg font-semibold hover:text-brand-orange cursor-pointer transition-colors">info@laslo-reifen.de</a>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-brand-orange shrink-0">
                                        <FaLocationDot />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-500 uppercase tracking-wide">{t('address_label')}</p>
                                        <p className="text-white text-lg font-semibold">München, Deutschland</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 relative z-10">
                            <p className="text-gray-500 text-sm mb-4">{t('social_label')}</p>
                            <div className="flex space-x-4">
                                <a href="https://www.instagram.com/laslo.reifen?igsh=MXZxZDBvdWN5Y2oxNw==" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-orange flex items-center justify-center text-white transition-colors"><FaInstagram /></a>
                                <a href="https://www.facebook.com/share/17uXyhRbgV/" target="_blank" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-orange flex items-center justify-center text-white transition-colors"><FaFacebookF /></a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-orange flex items-center justify-center text-white transition-colors"><FaLinkedinIn /></a>
                            </div>
                        </div>

                        {/* Map Iframe */}
                        <div className="mt-12 relative z-10 pt-8 border-t border-gray-800/50">
                            <label className="block text-sm font-medium text-gray-400 mb-3">{t('storage_label')}</label>
                            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-700 relative bg-gray-900 shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.1858568962843!2d10.677126112318389!3d50.1389548714157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a24ba30c2e3e71%3A0x8616c280ec7b4e5c!2sReifen%20Nik-M%C3%BCller%20KG!5e0!3m2!1sde!2sde!4v1769803670619!5m2!1sde!2sde"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>

                                <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/10">
                                    <a href="https://maps.app.goo.gl/qLoQAAP91YKz1nNJ8" target="_blank" className="pointer-events-auto bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-bold border border-white/20 transition-all flex items-center">
                                        <FaMapLocationDot className="mr-2" /> In Google Maps öffnen
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-10 md:p-12"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_name')}</label>
                                    <input
                                        {...register('name', { required: true })}
                                        type="text"
                                        className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span className="text-red-500 text-xs">Pflichtfeld</span>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_email')}</label>
                                    <input
                                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                        type="email"
                                        className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs">Gültige Email erforderlich</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_subject')}</label>
                                <select
                                    {...register('subject')}
                                    className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-all"
                                >
                                    <option value="General">{t('opt_general')}</option>
                                    <option value="Tires">{t('opt_tires')}</option>
                                    <option value="Rims">{t('opt_rims')}</option>
                                    <option value="Partner">{t('opt_partner')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">{t('form_message')}</label>
                                <textarea
                                    {...register('message', { required: true })}
                                    rows={4}
                                    className="w-full bg-brand-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder-gray-600"
                                    placeholder="..."
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-xs">Nachricht erforderlich</span>}
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
            </div>

            {/* Toast Notification */}
            <div className={`fixed bottom-5 right-5 bg-brand-gray border-l-4 border-brand-orange text-white px-6 py-4 rounded shadow-2xl transform transition-transform duration-300 z-50 flex items-center ${submitSuccess ? 'translate-y-0' : 'translate-y-24'}`}>
                <FaCircleCheck className="text-green-500 mr-3 text-xl" />
                <div>
                    <h4 className="font-bold">{t('toast_success')}</h4>
                    <p className="text-sm text-gray-400">{t('toast_msg')}</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
