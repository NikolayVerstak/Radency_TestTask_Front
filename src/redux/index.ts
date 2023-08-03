import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./NoteSlice";
import SummaryReducer from "./SummarySlice";

const store = configureStore({
    reducer: {
        notes: noteReducer,
        summary: SummaryReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
