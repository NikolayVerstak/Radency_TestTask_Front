import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
    setCurrentlyEditedNote,
    toggleAllNotesArchived,
    toggleNoteArchived,
} from "../../redux/NoteSlice";
import { useNoteIdContext } from "../../context/NoteIdContext";
import { useModalContext } from "../../context/ModalContext";
import NoteForm from "../modal/NoteForm";
import DeleteWarning from "../modal/DeleteWarning";
import { actionIcons } from "./IconsSvg";
import { useIconAction } from "../../hooks/useIconAction";
import ResultMessage from "../modal/ResultMessage";

interface ActionIconProps {
    action: string;
    amount: string;
}

export const ActionIcon: React.FC<ActionIconProps> = ({ action, amount }) => {
    const { isSingleNote, isAllNotes, title, className, filteredCategory } = useIconAction({
        action,
        amount,
    });
    const { list: notesList } = useAppSelector((state) => state.notes);
    const { id } = useNoteIdContext();
    const { openModal, setModalBody, setModalPurpose } = useModalContext();
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        setModalPurpose("edit note");
        setModalBody(<NoteForm />);
        dispatch(setCurrentlyEditedNote({ id }));
        openModal();
    };

    const handleArchive = (shouldArchive: boolean) => {
        const messageAction = shouldArchive ? "archived" : "unarchived";

        if (isSingleNote) {
            const note = notesList?.find((note) => note.id === id);
            dispatch(toggleNoteArchived({ id, shouldArchive }));
            setModalBody(
                <ResultMessage
                    amount={"single note"}
                    action={messageAction}
                    noteName={note?.name}
                    noteCategory={note?.category}
                />
            );
        } else if (isAllNotes) {
            dispatch(toggleAllNotesArchived({ filteredCategory, shouldArchive }));
            setModalBody(
                <ResultMessage
                    amount={filteredCategory === "All" ? "all uncategorized" : "all categorized"}
                    action={messageAction}
                    noteCategory={filteredCategory}
                />
            );
        }

        openModal();
    };

    const handleDelete = (id: number = 0) => {
        setModalPurpose(id ? "delete note" : "delete notes");
        setModalBody(<DeleteWarning />);
        if (id) dispatch(setCurrentlyEditedNote({ id }));
        openModal();
    };

    const handleIconClick = () => {
        if (id && isSingleNote) {
            switch (action) {
                case "Edit":
                    handleEdit();
                    return;
                case "Archive":
                    handleArchive(true);
                    return;
                case "Unarchive":
                    handleArchive(false);
                    return;
                case "Delete":
                    handleDelete(id);
                    return;
                default:
                    return;
            }
        } else if (isAllNotes) {
            switch (action) {
                case "Archive":
                    handleArchive(true);
                    return;
                case "Unarchive":
                    handleArchive(false);
                    return;
                case "Delete":
                    handleDelete();
                    return;
                default:
                    return;
            }
        }
    };

    return (
        <span className={className?.toLowerCase()} title={title} onClick={handleIconClick}>
            {actionIcons[action]}
        </span>
    );
};

export default ActionIcon;
