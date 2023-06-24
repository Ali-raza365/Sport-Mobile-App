import axios from "axios";

// const BASE_URL = 'http://localhost:8080/';
export const BASE_URL = 'http://192.168.100.9:8080/';



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

// FORGOT PASSWORD  API
export const FORGOT_PASSWORD_API = (details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/forgot-password',
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
//  VERIFY OTP API
export const VERIFY_OTP__API = (details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/verify-otp',
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

//  CHANGE PASSWORD APIS
export const CHANGE_PASSWORD_API = (details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/change-password',
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

// UPDATE USER INFO
export const UPDATE_USER_INFO_API = (token, detail) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/user',
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
export const GET_EVENTS_API = (details, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/near-me',
                method: 'POST',
                data: details,
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
export const GET_FAVORITES_EVENTS_API = (token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/all-favorites',
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
export const GET_PARTICIPANTS_EVENTS_API = (token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/participant',
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

export const GET_RECOMMENDED_EVENTS_API = (detail, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/recommended',
                method: 'POST',
                data: detail,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": 'application/json',
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

export const ADD_FAVOURITE_EVENTS_API = (event_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/add-to-favorites',
                method: 'POST',
                data: { event_id },
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": 'application/json',
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

export const REMOVE_FAVOURITE_EVENTS_API = (event_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/remove-to-favorites',
                method: 'POST',
                data: { event_id },
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": 'application/json',
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

export const PARTICIPATE_EVENT_API = (event_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/add-participant',
                method: 'POST',
                data: { event_id },
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": 'application/json',
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
export const SEARCH_EVENT_API = ({ text }, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + `api/event/search?text=${text}`,
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": 'application/json',
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

export const GET_EVENTS_BY_LOCATION_API = (token, details) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + 'api/event/location',
                method: 'POST',
                data: details,
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


/// chat Apis
export const FETCH_CHAT_LIST_API = (detail, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + `api/chat/chatlist`,
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": 'application/json',
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

export const FETCH_CHAT_MESSAGES_API = (detail, token) => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: BASE_URL + `api/chat/messages`,
                method: 'POST',
                data: detail,
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": 'application/json',
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
