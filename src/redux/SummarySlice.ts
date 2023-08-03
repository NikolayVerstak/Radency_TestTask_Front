import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NoteProps } from "../models";
import { initialCategoriesSummary } from "../data/initialData";

interface CategorySummary {
    name: string;
    active: number;
    archived: number;
}

interface SummaryState {
    categories: CategorySummary[];
    currentTable: {
        archived: boolean;
        category: string;
    };
}

const initialState: SummaryState = {
    categories: initialCategoriesSummary,
    currentTable: {
        archived: false,
        category: "All",
    },
};

// Create the SummarySlice
const SummarySlice = createSlice({
    name: "summary",
    initialState,
    reducers: {
        updateSummary: (state, action: PayloadAction<NoteProps[]>) => {
            const notes = action.payload;

            const updatedCategories = state.categories.map((categorySummary) => {
                const { name } = categorySummary;
                const count = notes.reduce(
                    (acc, note) => {
                        if (note.category === name) {
                            if (note.archived) {
                                acc.archived++;
                            } else {
                                acc.active++;
                            }
                        }
                        return acc;
                    },
                    { active: 0, archived: 0 }
                );

                return { name, ...count };
            });

            return {
                ...state,
                categories: updatedCategories,
            };
        },
        changeCurrentTable: (
            state,
            action: PayloadAction<{ archived: boolean; category: string }>
        ) => {
            return {
                ...state,
                currentTable: action.payload,
            };
        },
    },
});

export const { updateSummary, changeCurrentTable } = SummarySlice.actions;

export default SummarySlice.reducer;
