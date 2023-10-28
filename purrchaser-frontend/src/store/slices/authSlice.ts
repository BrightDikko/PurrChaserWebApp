import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthService from "@/store/services/authService";
import {UserInfo} from "@/types/UserInfo";


const user = ((typeof window !== "undefined") && (localStorage.getItem("user"))) ? JSON.parse(localStorage.getItem("user")!) : null;

export interface User {
    fullName: string | null;
    schoolName: string | null;
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: user ? user : null,
    token: null,
    isAuthenticated: user ? true : false,
};


export const register = createAsyncThunk(
    "auth/register",
    async (request: UserInfo, thunkAPI) => {
        try {
            const response = await AuthService.register(request);
            return response.data;
        } catch (error) {
            console.error("An error occurred during registration: ", error);
            return thunkAPI.rejectWithValue("Error");
        }
    });


export const login = createAsyncThunk(
    "auth/login",
    async (request: UserInfo, thunkAPI) => {
        try {
            const data = await AuthService.login(request);
            return {user: data};
        } catch (error) {
            console.error("An error occurred during login: ", error);
            return thunkAPI.rejectWithValue("Error");
        }
    })

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await AuthService.logout();
    });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.isAuthenticated = false;
            console.log("action: ", action);
        },

        loginUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            console.log("action: ", action);
            console.log("user: ", user);
        },

        logoutUser: (state) => {
            console.log("Logging out user")
            state.isAuthenticated = false;
            state.user = null;
        },

        setCredentials: (
            state,
            {payload: {user, token}}: PayloadAction<{ user: User, token: string }>
        ) => {
            state.user = user;
            state.token = token;
        }

    },
})

export const {
    registerUser,
    loginUser,
    logoutUser,
    setCredentials
} = authSlice.actions;

export default authSlice.reducer;