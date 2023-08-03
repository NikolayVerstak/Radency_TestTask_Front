import React from "react";
import NotesTableHeader from "./NotesTableHeader";

import useFilteredNotes from "../../hooks/useFilteredNotes";
import Modal from "../modal/Modal";
import { ActiveArchivedButtons, CreateRuturnButtons, FiltredNotes } from "./NoteMinorElements";

const NotesTable: React.FC = () => {
    const { filteredNotes, headerText } = useFilteredNotes();

    return (
        <div className="notes-table-wrapper">
            <h1 id="tableName">{headerText}</h1>
            <article>
                <NotesTableHeader />
                <ActiveArchivedButtons />
                <FiltredNotes list={filteredNotes} />
                <CreateRuturnButtons />
            </article>
            <Modal />
        </div>
    );
};

export default NotesTable;
