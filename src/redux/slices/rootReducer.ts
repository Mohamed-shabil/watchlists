import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import watchListReducer from "./watchListSlice";

const rootReducer = combineReducers({
    auth: userReducer,
    watchLists: watchListReducer,
});
export default rootReducer;
