import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import { useModal } from '../../context/ModalContext';
import { FaArrowRight } from 'react-icons/fa6';

const TireRimModal = () => {
    const { activeModal, closeModal, modalData } = useModal();
    const { t } = useTranslation();

    const isOpen = activeModal === 'tire' || activeModal === 'rim';
    const title = modalData ? t(modalData.title) : '';
    const desc = modalData ? (modalData.desc ? t(modalData.desc) : 'Premium Reifen für höchste Ansprüche.') : '';

    return (
        <Modal isOpen={isOpen} onClose={closeModal} title={title}>
            <div className="space-y-6">
                {modalData?.icon && (
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl mx-auto ${modalData.color || 'bg-brand-orange'}`}>
                        {modalData.icon}
                    </div>
                )}

                <p className="text-gray-300 text-center text-lg">{desc}</p>

                <h3 className="text-white font-bold border-b border-gray-700 pb-2">{t('available_brands')}</h3>
                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    <li>Michelin</li>
                    <li>Continental</li>
                    <li>Pirelli</li>
                    <li>Goodyear</li>
                    <li>Dunlop</li>
                    <li>Hankook</li>
                    <li>Bridgestone</li>
                    <li>Falken</li>
                </ul>

                <button
                    onClick={() => { closeModal(); window.location.href = '#contact'; }}
                    className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <span>{t('cta_primary')}</span> <FaArrowRight />
                </button>
            </div>
        </Modal>
    );
};

export default TireRimModal;
