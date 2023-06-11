import Geolocation from '@react-native-community/geolocation';
import { default as React, useEffect, useRef, useState } from 'react';
import { Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import { SIGN_UP_INFO_API } from '../../api/apis';
import { Button, Loader } from '../../components';
import { _gotoDeliveryNavigator } from '../../navigation/navigationServcies';
import { userStore } from '../../Store';
import { COLORS, HP, IMAGES, TEXT_SIZES, WP } from '../../theme/config';
import { handleAxiosError } from '../../utils/ErrorHandler';
import { _setItem } from '../../utils/async';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';


export default function EventLocation({ navigation }) {

    const mapRef = useRef();
    const [Loading, setLoading] = useState(false)
    const [LocationStatus, setLocationStatus] = useState("");
    const [UserId, setUserId] = useState("")
    const [Longitude, setLongitude] = useState(null);
    const [Lattitude, setLattitude] = useState(null);
    const [country, setCountry] = useState('');
    const [address, setaddress] = useState('')

    // const lisenceFile = userStore((state) => state.lisenceFile);
    // const profileImg = userStore((state) => state.profileImg);
    // const userId = userStore((state) => state.userId);
    // const setUserDetail = userStore((state) => state.setUserDetail);

    Geocoder.init("AIzaSyAH8N_ig4vp8M1vSSph99yritgOUrWceK0");

    const _goBack = () => {
        navigation.goBack()
    }

    const requestLocationPermission = async () => {
        try {
            const permission =
                Platform.OS === 'android'
                    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

            const result = await request(permission);

            if (result === RESULTS.GRANTED) {
                getOneTimeLocation()
            } else {
                // Permission denied, handle accordingly
                console.log('Permission denied');
            }
        } catch (error) {
            console.log('Error requesting permission: ', error);
        }
    };



    useEffect(() => {
        requestLocationPermission();
    }, [])

    const getOneTimeLocation = () => {
        console.log('Getting Location ...');
        // setLoading(true)
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                console.log('You are Here');
                setLoading(false)

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);


                _getAddressFromLatLog(currentLatitude, currentLongitude)
                console.log({ currentLatitude });
                console.log({ currentLongitude });

                const region = {
                    currentLatitude,
                    currentLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };

                mapRef.current.animateToRegion(region, 1000);

            },
            (error) => {
                console.log(error)
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    const _getAddressFromLatLog = (lat, log) => {
        setLattitude(lat)
        setLongitude(log)
        Geocoder.from({
            latitude: lat,
            longitude: log
        }).then(async (json) => {
            var location = json.results[0].address_components[0];
            var country = json.results[0].formatted_address;
            setaddress(location?.long_name)
            setCountry(country)
            console.log({ location, country });
        })
            .catch(error => console.log({ error }));
    }

    const onConfirmClick = async () => {
        // () => navigation.navigate('homenavigator')
        // console.log(userId, profileImg, lisenceFile)
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('location', country);
            formData.append('latitude', Lattitude);
            formData.append('longitude', Longitude);
            formData.append('profileFile', {
                uri: profileImg?.uri || '',
                name: profileImg?.fileName || '',
                type: profileImg?.type || ''
            });
            formData.append('lisenceFile', {
                uri: lisenceFile?.uri || '',
                name: lisenceFile?.fileName || '',
                type: lisenceFile?.type || ''
            });

            await SIGN_UP_INFO_API(formData)
                .then(resp => {
                    console.log(resp?.data)
                    _setItem('logout', '0')
                        .then(async () => {
                            _setItem('email', resp?.data?.data?.email)
                                .then(async () => {
                                    _setItem('password', resp?.data?.data?.password)
                                        .then(async () => {
                                            setLoading(false)
                                            setUserDetail(resp?.data?.data)
                                            _gotoDeliveryNavigator(navigation)
                                        }).catch(error => {
                                            setLoading(false);
                                            handleAxiosError(error)
                                        });
                                }).catch(error => {
                                    setLoading(false);
                                    handleAxiosError(error)
                                });
                        })
                        .catch(error => {
                            setLoading(false);
                            handleAxiosError(error)
                        });
                })
                .catch(error => {
                    setLoading(false);
                    handleAxiosError(error)
                });
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <View style={styles._container}>

            {/* back arrow Button */}
            <TouchableOpacity
                onPress={_goBack}
                style={styles.innerCircle} >
                <Feather name="arrow-left" color={COLORS.blackColor} size={WP(6)} />
            </TouchableOpacity>

            <Loader isVisible={Loading} />

            {/* <GooglePlacesAutocomplete
                styles={{ container: { position: 'absolute', zIndex: 999, top: HP(5), alignSelf: 'center', width: '80%' } }}
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyAH8N_ig4vp8M1vSSph99yritgOUrWceK0',
                    language: 'en',
                }}
            /> */}

            <MapView
                ref={mapRef}
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, }}
                showsUserLocation={true}
                followsUserLocation={true}
                mapType="standard"
                initialRegion={{
                    latitude: Number(Lattitude),
                    longitude: Number(Longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}

            >
                {
                    // true != null ? (
                    Lattitude ? (
                        <Marker
                            // style={{position:"absolute"}}
                            coordinate={{
                                longitude: Number(Longitude),
                                latitude: Number(Lattitude),
                            }}

                            draggable
                            onDragEnd={e => _getAddressFromLatLog(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
                        />
                    ) : (
                        null
                    )
                }
            </MapView>

            {/* <View style={styles.box}>

                <View style={styles._cardContainer}>
                    <Image source={IMAGES.location_logo} style={{ width: WP(12), height: WP(12) }} resizeMode='contain' />
                    <View style={{ paddingHorizontal: 10, width: '80%', }}>
                        <Text style={styles._textMain}>Your Location</Text>
                        <Text style={styles._galleryTitleSty}>{country}</Text>
                    </View>
                </View>
                <View style={[styles._cardContainer, { marginVertical: WP(3) }]}>
                    <Image source={IMAGES.building_img} style={{ width: WP(12), height: WP(12) }} resizeMode='contain' />
                    <View style={{ paddingHorizontal: 10, width: '80%', }}>
                        <Text style={styles._textMain}>Street/Building/Flat</Text>
                        <Text style={styles._galleryTitleSty}>{address}</Text>
                    </View>
                </View>

                <Button
                    onPress={() => onConfirmClick()}
                    lable={'Confirm'} styles={{ width: '90%' }} />

            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
        justifyContent: 'flex-end',
    },
    image: {
        width: WP(33),
        resizeMode: 'contain',
    },
    box: {
        width: '100%',
        height: '45%',
        backgroundColor: COLORS.secondaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    _textMain: {
        color: COLORS.darkGrey,
        fontSize: WP(TEXT_SIZES.info_2),
        fontWeight: '500',
        letterSpacing: 1,
    },

    innerCircle: {
        position: 'absolute',
        top: WP(10),
        left: WP(6),
        width: WP(10),
        height: WP(10),
        borderRadius: WP(10),
        backgroundColor: COLORS.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 23,
    },

    _cardContainer: {
        width: '90%',
        height: '18%',
        backgroundColor: COLORS.whiteColor,
        borderRadius: WP(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    _galleryTitleSty: {
        color: COLORS.secondaryColor,
        fontSize: WP(4),
        fontWeight: '800',
    },
});