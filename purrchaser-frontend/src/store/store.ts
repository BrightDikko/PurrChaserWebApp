import {configureStore} from '@reduxjs/toolkit';
import authReducer from "@/store/slices/authSlice";
import categoryReducer from "@/store/slices/categoriesSlice";
import {api} from "@/store/services/api";

export const store = configureStore({
        reducer: {
            [api.reducerPath]: api.reducer,
            auth: authReducer,
            categories: categoryReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;