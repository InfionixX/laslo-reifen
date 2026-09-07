import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCookieBite, FaChevronDown } from 'react-icons/fa6';
import { useModal } from '../context/ModalContext';

/**
 * Cookie-Hinweis.
 *
 * Bewusst ein INFORMATIONS-Hinweis und kein Consent-Banner: Die Seite setzt
 * ausschließlich technisch notwendige Cookies, die nach § 25 Abs. 2 Nr. 2
 * TDDDG einwilligungsfrei sind. Ein „Akzeptieren“-Button würde nach der
 * DSK-Orientierungshilfe zwingend einen gleichwertigen „Ablehnen“-Button
 * erfordern – dessen Betätigung hier aber folgenlos bliebe, weil die Cookies
 * für den Betrieb nötig sind. Das wäre irreführend.
 *
 * SOBALD ein Drittanbieter-, Analyse- oder Marketing-Cookie dazukommt, muss
 * dieser Hinweis durch ein echtes Consent-Banner mit gleichwertigem Ablehnen
 * und vorheriger Blockade der Dienste ersetzt werden.
 */

const STORAGE_KEY = 'mg-cookie-notice-ack-v1';

/** Vom Server bzw. der Seite selbst gesetzte Einträge – Grundlage der Detailansicht. */
const COOKIE_ROWS = [
    {
        name: 'PHPSESSID',
        provider: 'STRATO AG (Hosting)',
        purposeKey: 'cookie_session_purpose',
        durationKey: 'cookie_session_duration',
    },
    {
        name: STORAGE_KEY,
        provider: 'magyar-gumis.de',
        purposeKey: 'cookie_notice_purpose',
        durationKey: 'cookie_notice_duration',
        storageKey: 'cookie_notice_storage',
    },
] as const;

const CookieNotice = () => {
    const { t } = useTranslation();
    const { openModal } = useModal();

    // Lazy initialisiert, damit der Hinweis bei bereits erfolgter Kenntnisnahme
    // nicht kurz aufblitzt.
    const [visible, setVisible] = useState(() => {
        if (typeof window === 'undefined') return false;
        try {
            return window.localStorage.getItem(STORAGE_KEY) !== 'true';
        } catch {
            // Privater Modus o. ä. – dann lieber anzeigen als verschlucken.
            return true;
        }
    });
    const [showDetails, setShowDetails] = useState(false);

    const acknowledge = () => {
        try {
            window.localStorage.setItem(STORAGE_KEY, 'true');
        } catch {
            /* Speichern nicht möglich – Hinweis erscheint beim nächsten Besuch erneut. */
        }
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="cookie-notice-title"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-3 sm:p-5 pointer-events-none"
                >
                    <div className="pointer-events-auto max-w-4xl mx-auto bg-brand-gray/95 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-5 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-10 h-10 shrink-0 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                                    <FaCookieBite />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h2 id="cookie-notice-title" className="text-white font-bold text-base sm:text-lg">
                                        {t('cookie_title')}
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                                        {t('cookie_text')}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                                        {t('cookie_legal_note')}
                                    </p>
                                </div>
                            </div>

                            {/* Detailansicht */}
                            <AnimatePresence initial={false}>
                                {showDetails && (
                                    <motion.div
                                        key="details"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-5 pt-5 border-t border-gray-700/70">
                                            <p className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-3">
                                                {t('cookie_group_necessary')}
                                            </p>

                                            {/* Breite Tabelle darf horizontal scrollen, nie die Seite */}
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left text-xs min-w-[520px]">
                                                    <thead>
                                                        <tr className="text-gray-500 border-b border-gray-700/70">
                                                            <th className="pb-2 pr-3 font-medium">{t('cookie_col_name')}</th>
                                                            <th className="pb-2 pr-3 font-medium">{t('cookie_col_provider')}</th>
                                                            <th className="pb-2 pr-3 font-medium">{t('cookie_col_purpose')}</th>
                                                            <th className="pb-2 font-medium">{t('cookie_col_duration')}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-gray-400">
                                                        {COOKIE_ROWS.map((row) => (
                                                            <tr key={row.name} className="border-b border-gray-800 last:border-0 align-top">
                                                                <td className="py-2.5 pr-3">
                                                                    <span className="text-gray-200 font-mono text-[11px] break-all">{row.name}</span>
                                                                    {'storageKey' in row && (
                                                                        <span className="block text-[10px] text-gray-500 mt-0.5">
                                                                            {t(row.storageKey)}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="py-2.5 pr-3">{row.provider}</td>
                                                                <td className="py-2.5 pr-3">{t(row.purposeKey)}</td>
                                                                <td className="py-2.5">{t(row.durationKey)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <p className="text-gray-500 text-xs mt-3">{t('cookie_no_third_party')}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Aktionen */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-5">
                                <button
                                    type="button"
                                    onClick={acknowledge}
                                    className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-brand-orange/20"
                                >
                                    {t('cookie_ack')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowDetails((v) => !v)}
                                    aria-expanded={showDetails}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-gray-300 hover:text-brand-orange text-sm font-medium px-2 py-2 transition-colors"
                                >
                                    {showDetails ? t('cookie_hide_details') : t('cookie_show_details')}
                                    <FaChevronDown
                                        className={`text-[11px] transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openModal('privacy')}
                                    className="w-full sm:w-auto sm:ml-auto text-gray-400 hover:text-brand-orange text-sm underline underline-offset-4 transition-colors"
                                >
                                    {t('cookie_privacy_link')}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieNotice;
