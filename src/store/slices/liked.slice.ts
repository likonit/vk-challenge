import { createSlice } from "@reduxjs/toolkit";

interface LikedStore {
    ids: string[],
    needRemove: string[]
}

const initialState: LikedStore = {
    ids: [],
    needRemove: []
}

const likedSlice = createSlice({
    name: "liked",
    initialState,
    reducers: {
        addId: function (state, action) {
            if (!state.ids.includes(action.payload)) {
                state.ids.push(action.payload)
            }
        },
        removeId: function (state, action) {
            state.ids = state.ids.filter((id) => id !== action.payload)
        },
        // далее идут методы, которые будут отвечать за удаление лайкнутых котов.
        // мы добавляем нужных для удаления котов в отдельный контейнер для того,
        // чтобы каждый раз не удалять отдельный id, что будет вызывать ререндер каждое удаление.
        // методы будут вызываться после перезагрузки или смены страницы.
        removeArray: function (state) {
            state.needRemove.forEach(item => {
                state.ids = state.ids.filter((id) => id !== item)
            })
            state.needRemove = []
        },
        addToRemove: function(state, action) {
            state.needRemove.push(action.payload)
        },
        removeFromRemove: function(state, action) {
            state.needRemove = state.needRemove.filter((id) => id !== action.payload)
        }
    }
})

export const {addId, removeId, removeArray, addToRemove, removeFromRemove} = likedSlice.actions
export default likedSlice.reducer