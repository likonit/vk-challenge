import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./slices/pages.slice";
import columnsReducer from "./slices/columns.slice"
import likedReducer from "./slices/liked.slice"
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const persistConfig = {
    key: "liked",
    storage
}

// сохраняем в localstorage любимых котиков
const persistedLiked = persistReducer(persistConfig, likedReducer)

const store = configureStore({
    reducer: {
        pages: pageReducer,
        columns: columnsReducer,
        liked: persistedLiked
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        // игнорируем, чтобы не получить ошибку об несереализуемых данных
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch