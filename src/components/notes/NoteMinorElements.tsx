import React, { useState } from "react";
import Note from "./Note";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { NoteProps } from "../../models";
import useFilteredNotes from "../../hooks/useFilteredNotes";
import NoteForm from "../modal/NoteForm";
import { useModalContext } from "../../context/ModalContext";
import { changeCurrentTable } from "../../redux/SummarySlice";
import { buttonIcons } from "../icons/IconsSvg";

export const EmptyNote: React.FC<{ showMessage: boolean }> = ({ showMessage }) => {
    const { archived } = useAppSelector((state) => state.summary.currentTable);
    const message = `No ${archived ? "archived" : "active"} notes found.`;

    return (
        <div className="table-row">
            <p className="empty-list">{showMessage && message}</p>
        </div>
    );
};

export const FiltredNotes: React.FC<{ list: NoteProps[] }> = ({ list }) => {
    const [showAllNotes, setShowAllNotes] = useState(false);
    const displayedNotes = showAllNotes ? list : list.slice(0, 5);

    const emptyRowsCount = Math.max(0, 5 - displayedNotes.length);
    const emptyRows = new Array(emptyRowsCount).fill(null);

    const toggleShowAllNotes = () => {
        setShowAllNotes((prevShowAllNotes) => !prevShowAllNotes);
    };

    return (
        <section id="notesTableBody">
            {displayedNotes.map(({ id, ...noteProps }) => (
                <Note key={id} id={id} {...noteProps} />
            ))}
            {emptyRows.map((_, index) => (
                <EmptyNote
                    key={`empty-${index}`}
                    showMessage={index === 0 && emptyRowsCount === 5}
                />
            ))}
            {list.length > 5 && (
                <LoadMore showAllNotes={showAllNotes} toggleShowAllNotes={toggleShowAllNotes} />
            )}
        </section>
    );
};

export const ActiveArchivedButtons: React.FC = () => {
    const { currentCategory, currentArchivedStatus } = useFilteredNotes();
    const dispatch = useAppDispatch();

    const setIsActive = (appliedArchiveStatus: boolean) => {
        return appliedArchiveStatus === currentArchivedStatus ? "active" : "inactive";
    };

    const handleArchiveStatus = (showArchive: boolean) => {
        if (showArchive !== currentArchivedStatus) {
            dispatch(changeCurrentTable({ category: currentCategory, archived: showArchive }));
        }
    };

    return (
        <div className="toggle-notes">
            <button onClick={() => handleArchiveStatus(false)} className={setIsActive(false)}>
                Active
            </button>
            <button onClick={() => handleArchiveStatus(true)} className={setIsActive(true)}>
                Archived
            </button>
        </div>
    );
};

export const CreateRuturnButtons: React.FC = () => {
    const { openModal, setModalBody, setModalPurpose } = useModalContext();
    const { currentCategory, currentArchivedStatus } = useFilteredNotes();
    const dispatch = useAppDispatch();

    const returnButtonIsVisible =
        currentCategory !== "All" || (currentCategory === "All" && currentArchivedStatus);

    const handleCreateNote = () => {
        setModalPurpose("create note");
        setModalBody(<NoteForm />);
        openModal();
    };

    const handleReturnToAll = () => {
        dispatch(changeCurrentTable({ category: "All", archived: false }));
    };

    return (
        <div className="create-return-buttons">
            {returnButtonIsVisible && (
                <button className="return" onClick={handleReturnToAll}>
                    Back to All Notes
                </button>
            )}
            {!currentArchivedStatus && (
                <button className="create-note" onClick={handleCreateNote}>
                    Create Note
                </button>
            )}
        </div>
    );
};

interface LoadMoreProps {
    showAllNotes: boolean;
    toggleShowAllNotes: () => void;
}

export const LoadMore: React.FC<LoadMoreProps> = ({ showAllNotes, toggleShowAllNotes }) => {
    return (
        <div className="load-more">
            <button onClick={toggleShowAllNotes}>
                {showAllNotes ? buttonIcons.ArrowUp : buttonIcons.ArrowDown}
            </button>
            <p>{showAllNotes ? "Show Less" : "Show More"}</p>
        </div>
    );
};
