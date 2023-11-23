import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { convertApi } from "@/features/convert/api"

export const store = configureStore({
  reducer: {
    [convertApi.reducerPath]: convertApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(convertApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
