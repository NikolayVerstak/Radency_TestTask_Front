import React, { createContext, useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { setCurrentlyEditedNote } from "../redux/NoteSlice";

interface ModalContextType {
    isModalOpen: boolean;
    modalType: string;
    modalContent: React.ReactNode | null;
    setModalBody: (content: React.ReactNode) => void;
    setModalPurpose: (pursope: string) => void;
    openModal: () => void;
    closeModal: () => void;
}

const defaultModalContext: ModalContextType = {
    isModalOpen: false,
    modalType: "create note",
    modalContent: null,
    setModalPurpose: () => {},
    setModalBody: () => {},
    openModal: () => {},
    closeModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultModalContext);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
    const [modalType, setModalType] = useState("create note");

    const dispatch = useAppDispatch();
    const { currentlyEditedNote } = useAppSelector((state) => state.notes);
    const cleanCurrentlyEditedNote = () => {
        if (currentlyEditedNote) dispatch(setCurrentlyEditedNote({ id: null }));
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        cleanCurrentlyEditedNote();
    };

    const setModalBody = (content: React.ReactNode) => setModalContent(content);
    const setModalPurpose = (pursope: string) => setModalType(pursope);

    return (
        <ModalContext.Provider
            value={{
                isModalOpen,
                modalType,
                setModalPurpose,
                openModal,
                modalContent,
                setModalBody,
                closeModal,
            }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => useContext(ModalContext);
