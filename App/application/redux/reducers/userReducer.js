import { createReducer } from "@reduxjs/toolkit";
import {
    ON_PROFILE_CHANGE,
    ON_TOKEN_SET
} from "./userTypes";


const initialState = {
    profile: null,
    token: null,
}

export default userReducer = createReducer(initialState, (builder) => {

    builder.addCase(ON_PROFILE_CHANGE, (state, action) => {
        state.profile = action?.profile;
        state.token = action?.token;
    })
    builder.addCase(ON_TOKEN_SET, (state, action) => {
        state.token = action?.token;
    })
})