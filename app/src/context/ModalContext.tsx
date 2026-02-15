import { createContext, useContext, useState, type ReactNode } from 'react';

type ModalType = 'impressum' | 'privacy' | 'contact' | 'tire' | 'rim' | null;
type ModalData = any;

interface ModalContextType {
    openModal: (type: ModalType, data?: ModalData) => void;
    closeModal: () => void;
    activeModal: ModalType;
    modalData: ModalData;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [modalData, setModalData] = useState<ModalData>(null);

    const openModal = (type: ModalType, data?: ModalData) => {
        setActiveModal(type);
        setModalData(data);
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalData(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, activeModal, modalData }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
