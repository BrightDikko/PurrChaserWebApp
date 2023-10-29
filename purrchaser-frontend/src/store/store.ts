import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit';
import authReducer from "@/store/slices/authSlice";
import {api} from "@/store/services/api";

export const store = configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            auth: authReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;