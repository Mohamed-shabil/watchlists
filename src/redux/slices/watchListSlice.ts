import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types/types";
interface UserWatchLists {
    [watchListName: string]: IMovie[];
}

interface WatchListsState {
    [email: string]: UserWatchLists;
}

const initialState: WatchListsState = {};

const watchListSlice = createSlice({
    name: "watchList",
    initialState,
    reducers: {
        addWatchList(
            state,
            action: PayloadAction<{ email: string; name: string }>
        ) {
            if (!state[action.payload.email]) {
                state[action.payload.email] = {};
            }
            if (!state[action.payload.email][action.payload.name]) {
                state[action.payload.email][action.payload.name] = [];
            }
        },
        removeWatchList(
            state,
            action: PayloadAction<{ email: string; name: string }>
        ) {
            if (state[action.payload.email][action.payload.name]) {
                delete state[action.payload.email][action.payload.name];
            }
        },
        addMovieToWatchList(
            state,
            action: PayloadAction<{
                email: string;
                name: string;
                movie: IMovie;
            }>
        ) {
            if (
                state[action.payload.email] &&
                state[action.payload.email][action.payload.name]
            ) {
                state[action.payload.email][action.payload.name].push(
                    action.payload.movie
                );
            }
        },
        removeMovieFromWatchList(
            state,
            action: PayloadAction<{
                email: string;
                name: string;
                movieId: string;
            }>
        ) {
            state[action.payload.email][action.payload.name] = state[
                action.payload.email
            ][action.payload.name].filter(
                (movie) => movie.imdbID !== action.payload.movieId
            );
        },
    },
});

export const {
    addWatchList,
    addMovieToWatchList,
    removeWatchList,
    removeMovieFromWatchList,
} = watchListSlice.actions;
export default watchListSlice.reducer;
