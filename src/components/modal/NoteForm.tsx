import React, { useEffect, useState } from "react";
import { noteCategories } from "../../data/initialData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { createNote, editNote } from "../../redux/NoteSlice";
import { useModalContext } from "../../context/ModalContext";
import ResultMessage from "./ResultMessage";

const NoteForm: React.FC = () => {
    const { currentlyEditedNote } = useAppSelector((state) => state.notes);
    const dispatch = useAppDispatch();
    const { closeModal, setModalBody, modalType } = useModalContext();

    const isShowNoteMode = modalType === "show note";

    const [noteName, setNoteName] = useState(currentlyEditedNote?.name || "");
    const [noteCategory, setNoteCategory] = useState(currentlyEditedNote?.category || "");
    const [noteContent, setNoteContent] = useState(currentlyEditedNote?.content || "");

    const [changesMade, setChangesMade] = useState(false);

    const checkChanges = () => {
        const hasChanges =
            noteName !== currentlyEditedNote?.name ||
            noteCategory !== currentlyEditedNote?.category ||
            noteContent !== currentlyEditedNote?.content;
        setChangesMade(hasChanges);
    };

    useEffect(checkChanges, [noteName, noteCategory, noteContent, currentlyEditedNote]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (currentlyEditedNote) {
            dispatch(
                editNote({
                    ...currentlyEditedNote,
                    name: noteName,
                    category: noteCategory,
                    content: noteContent,
                })
            );
        } else {
            dispatch(createNote({ name: noteName, category: noteCategory, content: noteContent }));
        }
        setModalBody(
            <ResultMessage
                action={currentlyEditedNote ? "edited" : "created"}
                amount="single note"
                noteName={noteName}
                noteCategory={noteCategory}
            />
        );
    };

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <span className="close-cross" onClick={closeModal}>
                &times;
            </span>
            <label htmlFor="noteName">Name:</label>
            <input
                type="text"
                className="note-name"
                name="noteName"
                required
                placeholder="Enter a new note name"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                disabled={isShowNoteMode}
            />

            <label htmlFor="noteCategory">Category:</label>
            <select
                className="note-category"
                name="noteCategory"
                required
                value={noteCategory}
                onChange={(e) => setNoteCategory(e.target.value)}
                disabled={isShowNoteMode}
                style={{ appearance: isShowNoteMode ? "none" : "auto" }}>
                <option value="" disabled>
                    Select a category
                </option>
                {noteCategories.map((category) => {
                    return (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    );
                })}
            </select>

            <label htmlFor="noteContent">Content:</label>
            <textarea
                className="note-content"
                name="noteContent"
                rows={4}
                required
                placeholder="Add some note description"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                disabled={isShowNoteMode}></textarea>

            {!isShowNoteMode && (
                <button type="submit" className="submit-button" disabled={!changesMade}>
                    {currentlyEditedNote ? "Save Changes" : "Add Note"}
                </button>
            )}
        </form>
    );
};

export default NoteForm;
