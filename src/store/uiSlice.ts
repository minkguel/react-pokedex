import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface UIState {
    searchTerm: string;
    sortOption: "id-asc" | "id-desc" | "name-asc" | "name-desc";
    currentPage: number;
}

const initialState: UIState = {
    searchTerm: "",
    sortOption: "id-asc",
    currentPage: 0,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        setSortOption(state, action: PayloadAction<UIState["sortOption"]>) {
            state.sortOption = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export const { setSearchTerm, setSortOption, setCurrentPage } = uiSlice.actions;
export const selectUI = (state: RootState) => state.ui;
export default uiSlice.reducer;

