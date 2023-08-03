import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NoteProps } from "../models";
import { generateRandomId, initialNotes } from "../data/initialData";

const extractDatesFromContent = (content: string) => {
    const dateRegex = /\b(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/(19\d\d|20\d\d|2100)\b/g;
    return content.match(dateRegex) || [];
};

const updateNoteQty = (list: NoteProps[]) => {
    const total = list.length;
    const archived = list.filter((note) => note.archived).length;
    const active = total - archived;
    return { total, archived, active };
};

interface NoteQty {
    total: number;
    archived: number;
    active: number;
}

const initialState: {
    list: NoteProps[];
    qty: NoteQty;
    currentlyEditedNote: NoteProps | null;
} = {
    list: initialNotes,
    qty: updateNoteQty(initialNotes),
    currentlyEditedNote: null,
};

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        createNote: (
            state,
            action: PayloadAction<{ name: string; category: string; content: string }>
        ) => {
            const newNote: NoteProps = {
                ...action.payload,
                id: generateRandomId(),
                createdAt: new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }),
                dates: extractDatesFromContent(action.payload.content),
                archived: false,
            };

            return {
                ...state,
                list: [...state.list, newNote],
                qty: updateNoteQty([...state.list, newNote]),
            };
        },
        editNote: (state, action: PayloadAction<NoteProps>) => {
            const { id, name, content, category } = action.payload;
            const updatedList = state.list.map((note) =>
                note.id === id
                    ? {
                          ...note,
                          name,
                          content,
                          category,
                          dates: extractDatesFromContent(content),
                      }
                    : note
            );

            return { ...state, list: updatedList };
        },
        deleteNote: (state, action: PayloadAction<{ id: number }>) => {
            const { id } = action.payload;
            const updatedList = state.list.filter((note) => note.id !== id);
            return {
                ...state,
                list: updatedList,
                qty: updateNoteQty(updatedList),
            };
        },
        toggleNoteArchived: (
            state,
            action: PayloadAction<{ id: number; shouldArchive: boolean }>
        ) => {
            const { id, shouldArchive } = action.payload;
            const updatedList = state.list.map((note) =>
                note.id === id ? { ...note, archived: shouldArchive } : note
            );

            return {
                ...state,
                list: updatedList,
                qty: updateNoteQty(updatedList),
            };
        },
        toggleAllNotesArchived: (
            state,
            action: PayloadAction<{ filteredCategory: string; shouldArchive: boolean }>
        ) => {
            const { filteredCategory, shouldArchive } = action.payload;
            const isForAllCategories = filteredCategory === "All";

            let updatedList;
            if (!isForAllCategories) {
                updatedList = state.list.map((note) =>
                    note.category === filteredCategory ? { ...note, archived: shouldArchive } : note
                );
            } else {
                updatedList = state.list.map((note) => ({ ...note, archived: shouldArchive }));
            }

            return {
                ...state,
                list: updatedList,
                qty: updateNoteQty(updatedList),
            };
        },
        deleteAllNotes: (
            state,
            action: PayloadAction<{ isArchived: boolean; filteredCategory: string }>
        ) => {
            const { isArchived, filteredCategory } = action.payload;
            const allArchivedNotes = isArchived && filteredCategory === "All";
            const allActiveNotes = !isArchived && filteredCategory === "All";

            const updatedList = state.list.filter((note) => {
                if (allArchivedNotes) {
                    return !note.archived;
                } else if (allActiveNotes) {
                    return note.archived;
                } else if (filteredCategory) {
                    if (isArchived) {
                        return note.category !== filteredCategory || !note.archived;
                    } else {
                        return note.category !== filteredCategory || note.archived;
                    }
                }
                return false;
            });

            return {
                ...state,
                list: updatedList,
                qty: updateNoteQty(updatedList),
            };
        },
        setCurrentlyEditedNote: (state, action: PayloadAction<{ id: number | null }>) => {
            const { id } = action.payload;

            const foundNote = id !== null ? state.list.find((note) => note.id === id) : null;
            return {
                ...state,
                currentlyEditedNote: foundNote || null,
            };
        },
        initializeNotesQty: (state) => {
            return { ...state, qty: updateNoteQty(state.list) };
        },
    },
});

export const {
    createNote,
    editNote,
    deleteNote,
    toggleNoteArchived,
    toggleAllNotesArchived,
    deleteAllNotes,
    setCurrentlyEditedNote,
    initializeNotesQty,
} = noteSlice.actions;

export default noteSlice.reducer;
