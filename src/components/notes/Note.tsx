import React from "react";
import { NoteProps } from "../../models";
import NoteIconsBlock from "../icons/NoteIconsBlock";
import { categoryIcons } from "../icons/IconsSvg";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { NoteIdContextProvider } from "../../context/NoteIdContext";
import NoteForm from "../modal/NoteForm";
import { useModalContext } from "../../context/ModalContext";
import { setCurrentlyEditedNote } from "../../redux/NoteSlice";

const Note: React.FC<NoteProps> = ({ id, name, createdAt, category, content, dates }) => {
    const { openModal, setModalBody, setModalPurpose } = useModalContext();
    const dispatch = useAppDispatch();

    const handleShowNote = () => {
        setModalPurpose("show note");
        setModalBody(<NoteForm />);
        dispatch(setCurrentlyEditedNote({ id: id! }));
        openModal();
    };

    return (
        <NoteIdContextProvider id={id!}>
            <div className="table-row">
                <p className="note-name">
                    <span className="category-icon">{categoryIcons[category]}</span>
                    <span onClick={handleShowNote}>{name}</span>
                </p>
                <p>{createdAt}</p>
                <p>{category}</p>
                <p>{content}</p>
                <p>{dates.join(", ")}</p>
                <NoteIconsBlock amount="single note" />
            </div>
        </NoteIdContextProvider>
    );
};

export default Note;
