import React from "react";
import axios from "axios";
import Geolocation from '@react-native-community/geolocation';


import { PermissionsAndroid, Alert, Linking, ToastAndroid } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { PLATFORM } from "../theme/config";


export const getPublicIP = async () => {
    return new Promise((resolve, reject) => {
        try {
            axios({
                url: 'https://api.ipify.org?format=json',
                method: 'GET',
            })
                .then((response) => {
                    resolve(response?.data?.ip || '');
                })
                .catch((error) => {
                    reject(error)
                })
        } catch (error) {
            reject(error);
        }
    })
}

export const getLat_Long = async (isAlertShow) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (PLATFORM == 'ios') {
                Geolocation.getCurrentPosition(
                    //Will give you the current location
                    (position) => {
                        console.log('You are Here');
                        //getting the Longitude from the location json
                        const currentLongitude =
                            JSON.stringify(position.coords.longitude);
                        //getting the Latitude from the location json
                        const currentLatitude =
                            JSON.stringify(position.coords.latitude);
                        //Setting Longitude state
                        console.log({ currentLongitude,currentLatitude });
                        resolve({ longitude: currentLongitude, latitude: currentLatitude })
                    },
                    (error) => {
                        resolve({ longitude: null, latitude: null })
                    }
                )

            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    console.log({granted});
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        // DeviceInfo.isLocationEnabled().then((enabled) => {
                            // console.log("Is location is enable", enabled)
                            // // true or false
                            // if (enabled) {
                                Geolocation.getCurrentPosition(
                                    //Will give you the current location
                                    (position) => {
                                        console.log('You are Here');
                                        //getting the Longitude from the location json
                                        const currentLongitude =
                                            JSON.stringify(position.coords.longitude);
                                        //getting the Latitude from the location json
                                        const currentLatitude =
                                            JSON.stringify(position.coords.latitude);
                                        resolve({ longitude: currentLongitude, latitude: currentLatitude })
                                        //Setting Longitude state
                                        console.log({ currentLongitude });
                                    },
                                    (error) => {
                                        console.log(error);
                                        resolve({ longitude: null, latitude: null })
                                    }
                                )
                            // } else {
                            //     if (isAlertShow) {
                            //         ToastAndroid.show('Please turn on your mobile location', ToastAndroid.SHORT);
                            //         resolve({ longitude: null, latitude: null })
                            //     }
                            //     resolve({ longitude: null, latitude: null })
                            // }
                        // }
                        // );
                    } else {
                        console.log('Permission Denied');
                        resolve({ longitude: null, latitude: null })
                    }
                } catch (err) {
                    console.log('Permission Denied 11');
                    resolve({ longitude: null, latitude: null })
                    console.log(err);
                }
            }
        } catch (error) {
            resolve({ longitude: null, latitude: null })
            console.log(error, "234")
            reject(error);
        }
    })
}