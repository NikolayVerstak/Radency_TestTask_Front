import React from "react";
import NoteActionIcons from "../icons/NoteIconsBlock";
import useFilteredNotes from "../../hooks/useFilteredNotes";

const NotesTableHeader: React.FC = () => {
    const { filteredNotes } = useFilteredNotes();

    return (
        <header id="notesTableHeader">
            <h1>
                <p className="first-column">Name</p>
                <p>Created</p>
                <p>Category</p>
                <p>Content</p>
                <p>Dates</p>
                {filteredNotes.length > 0 && <NoteActionIcons amount="all notes" />}
            </h1>
        </header>
    );
};

export default NotesTableHeader;
