import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { todoApi } from '../api'

export const store = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoApi.middleware)
})