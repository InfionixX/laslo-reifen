import { createContext, useContext } from 'react';

/* The context object and its hook live apart from the provider component so
   the provider file only exports components — otherwise React Fast Refresh
   cannot hot-reload it. */

export type ModalType = 'impressum' | 'privacy' | null;

export interface ModalContextType {
    openModal: (type: ModalType) => void;
    closeModal: () => void;
    activeModal: ModalType;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
