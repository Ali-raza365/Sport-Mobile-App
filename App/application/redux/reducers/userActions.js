import axios from "axios";
import { FETCH_USER_PROFILE_API } from "../../api/apis";
import {
    ON_PROFILE_CHANGE,
    ON_TOKEN_SET,
} from "./userTypes";


export const _onProfileChange = (token, profile) => {
    return ((dispatch) => {
        dispatch({
            type: ON_PROFILE_CHANGE,
            token: token,
            profile: profile,
        })
    })
}



export const _onJWTTokenSet = (token) => {
    return (async (dispatch) => {
        await FETCH_USER_PROFILE_API(token).then(() => {
            dispatch({
                type: ON_TOKEN_SET,
                token: token,
                profile: ''
            })
        }).catch(() => {
            dispatch({
                type: ON_TOKEN_SET,
                token: token,
                profile: ''
            })
        })

    })
}

export const _fetchUserProfile = (token) => {
    return ((dispatch) => {

        dispatch({
            type: ON_PROFILE_CHANGE,
            data: data
        })
    })
}


