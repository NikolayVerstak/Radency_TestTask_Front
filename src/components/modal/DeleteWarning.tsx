import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { useModalContext } from "../../context/ModalContext";
import { deleteAllNotes, deleteNote } from "../../redux/NoteSlice";
import ResultMessage from "./ResultMessage";

const DeleteWarning: React.FC = () => {
    const { closeModal, setModalBody } = useModalContext();
    const dispatch = useAppDispatch();

    const { currentlyEditedNote } = useAppSelector((state) => state.notes);
    const { category, archived } = useAppSelector((state) => state.summary.currentTable);

    const handleDeleteNote = () => {
        if (currentlyEditedNote) {
            dispatch(deleteNote({ id: currentlyEditedNote.id! }));

            setModalBody(
                <ResultMessage
                    amount="single note"
                    action="deleted"
                    noteName={currentlyEditedNote.name}
                    noteCategory={currentlyEditedNote.category}
                />
            );
        } else {
            dispatch(deleteAllNotes({ isArchived: archived, filteredCategory: category }));
            setModalBody(
                <ResultMessage
                    amount={category === "All" ? "all uncategorized" : "all categorized"}
                    action="deleted"
                    noteCategory={category}
                    archivedStatus={archived ? "archived" : "active"}
                />
            );
        }
    };

    let noteInfo;
    if (currentlyEditedNote) {
        noteInfo = `the "${currentlyEditedNote.name}" note`;
    } else if (!currentlyEditedNote && category === "All") {
        noteInfo = `all ${archived ? "archived" : "active"} notes`;
    } else if (!currentlyEditedNote && category !== "All") {
        noteInfo = `all ${archived ? "archived" : "active"} ${category}s`;
    }

    return (
        <div className="warning">
            <span className="close-cross" onClick={closeModal}>
                &times;
            </span>
            <p>Are you sure you want to delete {noteInfo}?</p>
            <button className="delete-button" onClick={handleDeleteNote}>
                Delete
            </button>
            <button className="cancel-button" onClick={closeModal}>
                Cancel
            </button>
        </div>
    );
};

export default DeleteWarning;
