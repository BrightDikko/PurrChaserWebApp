import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";

export interface User {
    firstName: string | null;
    lastName: string | null;
    schoolId: number;
    email: string;
    password: string;
}

export interface UserResponse {
    user: User
    token: string
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    schoolId: number;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface School {
    "schoolId": number;
    "name": string;
    "emailFormat": string;
}

export type AllSchools = School[];

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
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        register: builder.mutation<UserResponse, RegisterRequest>({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: credentials,
            })
        }),

        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => {
                console.log("Logging in");

                return {
                    url: "/auth/login",
                    method: "POST",
                    body: credentials
                }
            }
        }),

        getAllSchools: builder.query<AllSchools, void>({
           query: () => ({
               url: "/schools",
               method: "GET"
           }),
            keepUnusedDataFor: 60 * 60 * 24  // 24 hours in seconds, specific to this endpoint
        }),

        getAllCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET"
            }),
            keepUnusedDataFor: 60 * 60 * 24  // 24 hours in seconds, specific to this endpoint
        }),

        createNewListing: builder.mutation({
            query: (newListing) => ({
                url: "/listings",
                method: "POST",
                body: newListing,
            })
        }),

        getAllListings: builder.query({
            query: ({ page = 0, size = 24 }) => ({
                url: `/listings/all?page=${page}&size=${size}`,
                method: "GET"
            })
        }),

        getListingById: builder.query({
            query: (id) => ({
                url: `/listings/listing/${id}`,
                method: "GET"
            })
        }),

        addListingToCart: builder.mutation({
            query: ({userId, listingId}) => ({
                url: `/cart/user/${userId}/listing/${listingId}`,
                method: "POST"
            }),
            invalidatesTags: ['Cart'],
        }),

        getAllListingsInCart: builder.query({
            query: ({userId}) => ({
                url: `/cart/all?userId=${userId}`,
                method: "GET"
            }),
            providesTags: ['Cart'],
        })
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetAllSchoolsQuery,
    useGetAllCategoriesQuery,
    useCreateNewListingMutation,
    useGetAllListingsQuery,
    useGetListingByIdQuery,
    useAddListingToCartMutation,
    useGetAllListingsInCartQuery
} = api;