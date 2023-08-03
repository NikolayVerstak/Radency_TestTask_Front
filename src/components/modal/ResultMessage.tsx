import React from "react";
import { modalIcons } from "../icons/IconsSvg";
import { useModalContext } from "../../context/ModalContext";

interface ResultMessageProps {
    amount: string;
    action: string;
    noteName?: string;
    noteCategory?: string;
    archivedStatus?: string;
}

const ResultMessage: React.FC<ResultMessageProps> = ({
    amount,
    action,
    noteName,
    noteCategory,
    archivedStatus,
}) => {
    const { closeModal } = useModalContext();

    let resultMessage;

    switch (amount) {
        case "single note": {
            resultMessage = `Your "${noteName}" ${noteCategory} has been successfully ${action}!`;
            break;
        }
        case "all uncategorized": {
            if (action === "deleted") {
                resultMessage = `All your ${archivedStatus} notes have been successfully ${action}!`;
            } else {
                resultMessage = `All your notes have been successfully ${action}!`;
            }
            break;
        }
        case "all categorized": {
            if (action === "deleted") {
                resultMessage = `All your ${archivedStatus} ${noteCategory}s have been successfully ${action}!`;
            } else {
                resultMessage = `All your ${noteCategory}s have been successfully ${action}!`;
            }
            break;
        }
        default:
            resultMessage = "";
    }

    return (
        <div className="success-result">
            <span className="close-cross" onClick={closeModal}>
                &times;
            </span>
            <p className="result-icon">{modalIcons.Success}</p>
            <p className="result-text">{resultMessage.trim()}</p>
            <button className="close-button" onClick={closeModal}>
                Close
            </button>
        </div>
    );
};

export default ResultMessage;
