import React, { createContext, useContext } from "react";

interface NoteIdContextType {
    id: number;
}

export const NoteIdContext = createContext<NoteIdContextType>({ id: 1 });

export const useNoteIdContext = () => {
    const context = useContext(NoteIdContext);
    return context;
};

interface NoteIdProviderProps {
    id: number;
    children: React.ReactNode;
}

export const NoteIdContextProvider: React.FC<NoteIdProviderProps> = ({ id, children }) => {
    const noteIdContextValue: NoteIdContextType = { id };

    return <NoteIdContext.Provider value={noteIdContextValue}>{children}</NoteIdContext.Provider>;
};
