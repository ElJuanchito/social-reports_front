"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import Modal from "./Modal";

interface ModalContextType {
    showModal: (
        content: ReactNode,
        type?: "error" | "success" | "info",
        onClose?: () => void
    ) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("useModal debe usarse dentro de ModalProvider");
    return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const [type, setType] = useState<"error" | "success" | "info">("info");
    const [onCloseAction, setOnCloseAction] = useState<(() => void) | undefined>(undefined);

    const showModal = (
        modalContent: ReactNode,
        modalType: "error" | "success" | "info" = "info",
        onClose?: () => void
    ) => {
        setContent(modalContent);
        setType(modalType);
        setOnCloseAction(() => onClose);
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
        if (onCloseAction) {
            onCloseAction();
            setOnCloseAction(undefined);
        }
    };

    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {children}
            <Modal open={open} onClose={closeModal} type={type}>
                {content}
            </Modal>
        </ModalContext.Provider>
    );
};