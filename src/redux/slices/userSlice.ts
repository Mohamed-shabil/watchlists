import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

interface UserState {
    user: IUser | null;
    isSignedIn: boolean;
}

const initialState: UserState = {
    user: null,
    isSignedIn: false,
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
            state.isSignedIn = true;
        },
        logoutUser(state) {
            state.user = null;
            state.isSignedIn = false;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
