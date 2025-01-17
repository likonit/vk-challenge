import { PhotoInfo } from "@/function/getPhotoById";
import { createSlice } from "@reduxjs/toolkit";

interface Column {
    photos: PhotoInfo[]
}

const initialState: {
    main: Column[],
    liked: Column[]
} = {
    main: [],
    liked: []
}

// данные о колонках в каждой странице хранятся тут.
const columnsSlice = createSlice({
    name: "columns",
    initialState,
    reducers: {
        addToColumn: function(state, action) {

            let section = action.payload.type == "liked" ? state.liked : state.main
            
            if (!section[action.payload.index]) {
                section[action.payload.index] = {
                    photos: []
                }
            }
            
            action.payload.photo.forEach((item: PhotoInfo) => {
                section[action.payload.index].photos.push(item)
            })

        },
        resetLiked: function(state) {
            state.liked = []
        }
    }
})

export const {addToColumn, resetLiked} = columnsSlice.actions
export default columnsSlice.reducer