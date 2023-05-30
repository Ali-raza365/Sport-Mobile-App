import axios from "axios";

const BASE_URL = 'http://localhost:8080/';
// const BASE_URL = 'https://us-central1-tropi-854f6.cloudfunctions.net/';
// export const BASE_URL = 'http://192.168.18.109:8080/';
// export const BASE_URL = 'http://192.168.100.182:8080/';


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
