import React from "react";
import { useModalContext } from "../../context/ModalContext";

const Modal: React.FC = () => {
    const { isModalOpen, closeModal, modalContent } = useModalContext();

    if (isModalOpen) {
        return (
            <>
                <div className="modal-backdrop" onClick={closeModal} />
                <section className="modal-content">
                    <div className="modal-body">{modalContent}</div>
                </section>
            </>
        );
    } else {
        return null;
    }
};

export default Modal;
