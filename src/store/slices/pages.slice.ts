import { createSlice } from "@reduxjs/toolkit";

interface PagesStore {
    page: number,
    columns: number
}

const initialState: PagesStore = {
    page: 0,
    columns: 5
}

const pagesSlice = createSlice({
    name: "pages",
    initialState,
    reducers: {
        changePage: function(state, action) {
            state.page = action.payload
        },
        changeColumnCount: function(state, action) {
            state.columns = action.payload
        }
    }
})

export const {changePage, changeColumnCount} = pagesSlice.actions
export default pagesSlice.reducer