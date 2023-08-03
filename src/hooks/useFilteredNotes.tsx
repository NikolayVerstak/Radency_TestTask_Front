import { useMemo } from "react";
import { useAppSelector } from "../hooks/reduxHook";

const useFilteredNotes = () => {
    const { list: notes } = useAppSelector((state) => state.notes);
    const { currentTable } = useAppSelector((state) => state.summary);
    const { category: currentCategory, archived: currentArchivedStatus } = currentTable;

    const filteredNotes = useMemo(() => {
        const getFilteredNotes = () => {
            return notes.filter((note) => {
                const isMatchingCategory =
                    currentCategory === "All" || note.category === currentCategory;
                if (currentArchivedStatus) {
                    return isMatchingCategory && note.archived;
                } else {
                    return isMatchingCategory && !note.archived;
                }
            });
        };
        return getFilteredNotes();
    }, [notes, currentCategory, currentArchivedStatus]);

    let headerText;
    if (currentCategory === "All") {
        headerText = currentArchivedStatus ? "All Archived Notes" : "All Active Notes";
    } else {
        headerText = currentArchivedStatus
            ? `Archived Notes - ${currentCategory}s`
            : `Active Notes - ${currentCategory}s`;
    }

    return { filteredNotes, headerText, currentCategory, currentArchivedStatus };
};

export default useFilteredNotes;
