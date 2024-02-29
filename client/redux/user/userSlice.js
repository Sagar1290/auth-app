import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    currentUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInEnd: (state, action) => {
            (state.loading = false),
                (state.currentUser = action.payload),
                (state.error = false);
        },
        signInFailed: (state, action) => {
            (state.loading = false), (state.error = action.payload);
        },
        signOut: (state) => {
            state.currentUser = null
        },
        updateUserStart: (state) => {
            state.loading = true
        },
        updateUserEnd: (state, action) => {
            state.currentUser = action.payload,
                state.loading = false,
                state.error = false
        },
        updateUserFailed: (state, action) => {
            state.loading = false,
                state.error = action.payload
        }
    },
});

export const { signInEnd, signInStart, signInFailed, signOut, updateUserEnd, updateUserStart, updateUserFailed } = userSlice.actions;
export default userSlice.reducer 