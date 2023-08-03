import { useAppSelector } from "./reduxHook";

interface useActionIconProps {
    action?: string;
    amount: string;
}

export const useIconAction = ({ action, amount }: useActionIconProps) => {
    const { archived: isArchived, category: filteredCategory } = useAppSelector(
        (state) => state.summary.currentTable
    );

    const isSingleNote = amount === "single note";
    const isAllNotes = amount === "all notes";

    const actionList = [
        isSingleNote && !isArchived ? "Edit" : "",
        "Delete",
        isArchived ? "Unarchive" : "Archive",
    ].filter((action) => action !== "");

    let title, className, actionIconObject;
    if (action) {
        title = isAllNotes ? `${action} All` : action;
        className = isAllNotes ? `${action}-all-notes` : `${action}-single-note`;
        actionIconObject = {
            isSingleNote,
            isAllNotes,
            actionList,
            filteredCategory,
            title,
            className,
        };
    } else {
        actionIconObject = { isSingleNote, isAllNotes, actionList, filteredCategory };
    }

    return actionIconObject;
};
