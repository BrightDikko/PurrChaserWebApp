import {createSlice} from "@reduxjs/toolkit";
import {api} from "@/store/services/api";

export interface User {
    fullName: string | null;
    schoolName: string | null;
    email: string;
    password: string;
}

export interface AuthSliceState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthSliceState = {
    user: null,
    token: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = !!action.payload.user;
        },
        logoutUser: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addMatcher(api.endpoints?.register.matchPending, (state, action) => {
                // console.log('Register pending. Action: ', action);
            })
            .addMatcher(api.endpoints?.register.matchFulfilled, (state, action) => {
                // console.log('Register fulfilled. Action: ', action);
                state.isAuthenticated = false;
            })
            .addMatcher(api.endpoints?.register.matchRejected, (state, action) => {
                // console.log('Register rejected. Action: ', action);
            })

            // Login
            .addMatcher(api.endpoints?.login.matchPending, (state, action) => {
                // console.log('Login pending. Action: ', action);
            })
            .addMatcher(api.endpoints?.login.matchFulfilled, (state, action) => {
                // console.log('Login fulfilled. Action: ', action);

                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", JSON.stringify(action.payload.token))

                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = !!action.payload.user;
            })
            .addMatcher(api.endpoints?.login.matchRejected, (state, action) => {
                // console.log('Login rejected. Action: ', action);
            })
    }
})

export const {
    updateAuthState,
    logoutUser,
} = authSlice.actions;

export default authSlice.reducer;