import React, { useEffect } from 'react';
import {
    Animated, Dimensions, Image, Platform, StatusBar, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, WP } from '../../theme/config';

import Ionicons from 'react-native-vector-icons/Ionicons'


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = ({ navigation }) => {


    const initialMapState = {
        markers: [
            {
                coordinate: {
                    latitude: 22.6293867,
                    longitude: 88.4354486,
                },
                title: "609 S State ST. - Lot ",
                description: "This is the best food place",
                // image: require('../asserts/location-pin.png'),
                rating: 4,
                reviews: 99,
            },
            {
                coordinate: {
                    latitude: 22.6345648,
                    longitude: 88.4377279,
                },
                title: "101 S Halsted - Lot",
                description: "This is the second best food place",
                // image: require('../asserts/location-pin.png'),
                rating: 5,
                reviews: 102,
                currentLocation: true
            },
            {
                coordinate: {
                    latitude: 22.6281662,
                    longitude: 88.4410113,
                },
                title: "Third Amazing Food Place",
                description: "This is the third best food place",
                // image: require('../asserts/location-pin.png'),
                rating: 3,
                reviews: 220,
            },
            {
                coordinate: {
                    latitude: 22.6341137,
                    longitude: 88.4497463,
                },
                title: "Fourth Amazing Food Place",
                description: "This is the fourth best food place",
                // image: require('../asserts/location-pin.png'),
                rating: 4,
                reviews: 48,
            },
            {
                coordinate: {
                    latitude: 22.6292757,
                    longitude: 88.444781,
                },
                title: "Fifth Amazing Food Place",
                description: "This is the fifth best food place",
                // image: require('../asserts/location-pin.png'),
                rating: 4,
                reviews: 178,
            },
        ],

        region: {
            latitude: 22.62938671242907,
            longitude: 88.4354486029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
        currentLocation: {

            latitude: 22.6422837,
            longitude: 88.444781,

        }
    };
    const [state, setState] = React.useState(initialMapState);
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= state.markers.length) {
                index = state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(regionTimeout);
            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;
                    const { coordinate } = state.markers[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: state.region.latitudeDelta,
                            longitudeDelta: state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = state.markers.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET;
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    const renderMarkers = () => {
        return state.markers.map((marker, index) => {
            const scaleStyle = {
                transform: [
                    {
                        scale: interpolations[index].scale,
                    },
                ],
            };
            return (
                <View>
                    <Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
                        <Animated.View style={[styles.markerWrap]}>
                            <Animated.Image
                                source={{ uri: 'https://images.unsplash.com/photo-1659523826599-2176e7b0434d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhc2tldGJhbGwlMjB0b3VybmFtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60' }}
                                style={[styles.marker, scaleStyle]}
                            // resizeMode="cover" 
                            />
                        </Animated.View>
                    </Marker>
                </View>
            );
        })
    }

    const MarkerCard = ({ detail }) => {
        return (
            <TouchableOpacity style={styles.card}
                onPress={() => navigation.navigate('SpotDetail')}
            >

                <View style={styles.textContent}>
                    <View style={styles.cardHeaderContainer}>
                        <Text numberOfLines={1} style={styles.cardtitle}>{detail?.title}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', padding: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <Image source={require('../asserts/walk.png')} style={{ width: 20, height: 20 }} /> */}
                                <Text> 436 feet</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingLeft: 10, }}>
                                {/* <Image source={require('../asserts/star.png')} style={{ width: 20, height: 20 }} /> */}
                                <Text> 4.5 (41)</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'flex-start', alignItems: 'flex-end', width: '20%',
                        height: 70,
                    }}>
                        <Text style={{ fontSize: 18, }}>$18</Text>
                        <Text style={{ fontSize: 15, color: 'gray' }}>Subtotal</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 8, }}>

                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('bookSpot')}
                        style={[styles.signIn, {
                            borderRadius: 10,
                            backgroundColor: COLORS.primaryColor,
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#ffff'
                        }]}>Book Spot</Text>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <MapView
                    ref={_map}
                    initialRegion={state.region}
                    style={styles.container}
                    provider={PROVIDER_GOOGLE}
                >
                    {renderMarkers()}
                </MapView>
                <View style={styles.header}>
                    <StatusBar backgroundColor="#000" />
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Ionicons
                            onPress={() => {
                                navigation.goBack();
                            }}
                            name="arrow-back-outline"
                            size={30}
                            color="white"
                            type="ionicon"
                        />
                        <View>
                            <Text style={styles.headerTitle}>Nearby</Text>
                            <Text style={[styles.headerTitle, { fontSize: WP(3.1), marginTop: 2, }]}>Activities Near by you</Text>
                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('ListScr') }}
                    >
                        <Text style={{ padding: 5, color: 'white', fontSize: 18, }}>LIST</Text>
                    </TouchableOpacity>
                </View>

                <Animated.ScrollView
                    ref={_scrollView}
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH + 20}
                    snapToAlignment="center"
                    style={styles.scrollView}
                    contentInset={{
                        top: 0,
                        left: SPACING_FOR_CARD_INSET,
                        bottom: 0,
                        right: SPACING_FOR_CARD_INSET
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                    }}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation,
                                    }
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                >
                    {state.markers.map((item, index) => (
                        <MarkerCard detail={item} />
                    ))}
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        position: 'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        width: '100%',
        padding: 8,
        height: 80,
        flexDirection: 'row',
        // padding: 10,
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    },
    cardtitle: {
        fontSize: 15,
        // color: 'white'
        // marginTop: 5,
        // fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: WP(20),
        height: WP(20),
        borderRadius: WP(30),
    },
    marker: {
        width: WP(10),
        height: WP(10),
        borderRadius: WP(30),
    },
    button: {

        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '90%',
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 7,
        position: 'absolute',
        top: 0,
        backgroundColor: COLORS.primaryColor,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    headerTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: "600",
        paddingLeft: 20,
    },
    cardHeaderContainer: {
        width: '80%',
        height: 70,

    }
});