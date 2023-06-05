import axios from "axios";

const BASE_URL = 'http://localhost:8080/';



// SIGN UP API
export const SIGN_UP_API = (details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/register',
                method: 'POST',
                data: details,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}

// LOGIN  API
export const LOGIN_API = (details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/login',
                method: 'POST',
                data: details,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}



// GET USER INFO
export const GET_USER_INFO_API = (token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/user/info',
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}



// GET ALL CATEGORY API
export const GET_ACTIVITY_API = (token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/activity/all',
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}


// CREATE EVENT API 
export const CREATE_EVENT_API = (detail, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/create',
                method: 'POST',
                data: detail,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + token,
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}

// GET ALL CATEGORY API
export const GET_EVENTS_API = (token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/all',
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}