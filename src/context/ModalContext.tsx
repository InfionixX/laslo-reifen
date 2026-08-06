import { useState, type ReactNode } from 'react';
import { ModalContext, type ModalType } from './modal';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = (type: ModalType) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    return (
        <ModalContext.Provider value={{ openModal, closeModal, activeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
