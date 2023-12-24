import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";

export interface User {
    fullName: string | null;
    schoolName: string | null;
    email: string;
    password: string;
}

export interface UserResponse {
    user: User
    token: string
}

export interface RegisterRequest {
    fullName: string | null;
    schoolName: string | null;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const getCurrentUser = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("user");
    }
    return null;
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        // const token = null;
        if (token) {
            headers.set('Authentication', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 2});

export const api = createApi({
    reducerPath: 'mainApi',
    baseQuery: baseQueryWithRetry,
    tagTypes: [],
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET"
            }),
            keepUnusedDataFor: 60 * 60 * 24  // 24 hours in seconds, specific to this endpoint
        }),

        register: builder.mutation<UserResponse, RegisterRequest>({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            })
        }),

        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials
            })
        })
    }),
})

export const {
    useGetAllCategoriesQuery,
    useRegisterMutation,
    useLoginMutation
} = api;