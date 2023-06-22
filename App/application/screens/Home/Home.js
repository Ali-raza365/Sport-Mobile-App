import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EventStore from '../../Store/EventStore';
import UserStore from '../../Store/UserStore';
import { AppBar, CardBox, Category, Loader } from '../../components';
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import { ActivityIndicator } from 'react-native-paper';
import { getLat_Long } from '../../utils/GetIPAddress';
import { useIsFocused } from '@react-navigation/native';
import RecommmendedCard from '../../components/RecommmendedCard';

const Home = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([])
    const [recEvents, setRecEvents] = useState([])

    const keyExtractor = (item, index) => `${item._id}${index}`
    const { Events, Recommandedevents, setActivityEvents, Activites, fetchEvents,
        fetchRecommendedEvents, fetchActivites, AddEventToFavorite, RemoveEventFromFavorite } = EventStore();
    const { user, token } = UserStore();

    const IsFocused = useIsFocused()


    let array = [
        {
            "name": "Basketball Championship",
            "image": "https://example.com/basketball.jpg",
            "price": 50.99,
            "sport_type": "Basketball",
            "date": "2023-06-15",
            "location": "Madison Square Garden, New York",
            "isfav": false
        },
        {
            "name": "Football Match",
            "image": "https://example.com/football.jpg",
            "price": 25.99,
            "sport_type": "Football",
            "date": "2023-07-03",
            "location": "Wembley Stadium, London",
            "isfav": true
        },
        {
            "name": "Tennis Open",
            "image": "https://example.com/tennis.jpg",
            "price": 35.99,
            "sport_type": "Tennis",
            "date": "2023-08-12",
            "location": "Arthur Ashe Stadium, New York",
            "isfav": false
        },
        {
            "name": "Golf Tournament",
            "image": "https://example.com/golf.jpg",
            "price": 60.99,
            "sport_type": "Golf",
            "date": "2023-09-05",
            "location": "Augusta National Golf Club, Georgia",
            "isfav": true
        },
        {
            "name": "Marathon Race",
            "image": "https://example.com/marathon.jpg",
            "price": 20.99,
            "sport_type": "Running",
            "date": "2023-10-22",
            "location": "Chicago, Illinois",
            "isfav": false
        },
        {
            "name": "Swimming Championship",
            "image": "https://example.com/swimming.jpg",
            "price": 30.99,
            "sport_type": "Swimming",
            "date": "2023-11-14",
            "location": "Tokyo Aquatics Centre, Japan",
            "isfav": false
        },
        {
            "name": "Soccer Match",
            "image": "https://example.com/soccer.jpg",
            "price": 22.99,
            "sport_type": "Soccer",
            "date": "2023-12-01",
            "location": "Camp Nou Stadium, Barcelona",
            "isfav": true
        },
        {
            "name": "MMA Fight Night",
            "image": "https://example.com/mma.jpg",
            "price": 45.99,
            "sport_type": "Mixed Martial Arts",
            "date": "2024-01-18",
            "location": "T-Mobile Arena, Las Vegas",
            "isfav": false
        },
        {
            "name": "Cycling Tour",
            "image": "https://example.com/cycling.jpg",
            "price": 40.99,
            "sport_type": "Cycling",
            "date": "2024-02-11",
            "location": "Paris, France",
            "isfav": false
        },
        {
            "name": "Volleyball Championship",
            "image": "https://example.com/volleyball.jpg",
            "price": 28.99,
            "sport_type": "Volleyball",
            "date": "2024-03-08",
            "location": "Olympic Stadium, Berlin",
            "isfav": false
        },
        {
            "name": "Tennis Open",
            "image": "https://example.com/tennis.jpg",
            "price": 35.99,
            "sport_type": "Tennis",
            "date": "2023-08-12",
            "location": "Arthur Ashe Stadium, New York",
            "isfav": false
        },
        {
            "name": "Golf Tournament",
            "image": "https://example.com/golf.jpg",
            "price": 60.99,
            "sport_type": "Golf",
            "date": "2023-09-05",
            "location": "Augusta National Golf Club, Georgia",
            "isfav": true
        },
        {
            "name": "Marathon Race",
            "image": "https://example.com/marathon.jpg",
            "price": 20.99,
            "sport_type": "Running",
            "date": "2023-10-22",
            "location": "Chicago, Illinois",
            "isfav": false
        },
        {
            "name": "Swimming Championship",
            "image": "https://example.com/swimming.jpg",
            "price": 30.99,
            "sport_type": "Swimming",
            "date": "2023-11-14",
            "location": "Tokyo Aquatics Centre, Japan",
            "isfav": false
        },
        {
            "name": "Soccer Match",
            "image": "https://example.com/soccer.jpg",
            "price": 22.99,
            "sport_type": "Soccer",
            "date": "2023-12-01",
            "location": "Camp Nou Stadium, Barcelona",
            "isfav": true
        },
    ]

    var location = {
        radius: 10,
        // longitude: 30.443902,
        // latitude: -84.27327,
    }

    useEffect(() => { fetchActivites(token) }, [])
    
    useEffect(() => {
        if (IsFocused) {
            getLat_Long().then((res) => {
                location = { ...location, ...res };
                console.log({ location });
                if (location?.longitude) {
                    fetchEvents(location, token).then((ev) => {
                        setLoading(false)
                        setEvents(ev || Events || [])
                    })
                    fetchRecommendedEvents(location, token).then((ev) => {
                        setLoading(false)
                        setRecEvents(ev || Recommandedevents || [])
                    })
                } else {
                    alert(`Location Services Disabled \nPlease enable location services for this app in Settings.`)
                    setLoading(false)
                }

            })
        }



    }, [IsFocused])

    const renderItem = ({ item, index }) => {
        return (
            <CardBox
                onPress={() => { navigation.navigate("eventdetail", { detail: item }) }}
                showsHorizontalScrollIndicator={false}
                imageSource={item.image}
                details={item.title}
                OnHeartPress={() => OnHeartPress(item?._id)}
                date={item.date}
                location={!!item?.location ? item?.location?.name : ''}
                time={item.date}
                isfav={item.isFavorite}
            />
        )
    }

    const renderRecommmendedCardItem = ({ item, index }) => {
        return (
            <RecommmendedCard
                onPress={() => { navigation.navigate("eventdetail", { detail: item }) }}
                showsHorizontalScrollIndicator={false}
                imageSource={item.image}
                details={item.title}
                OnHeartPress={() => OnHeartPress(item?._id)}
                date={item.date}
                location={!!item?.location ? item?.location?.name : ''}
                time={item.date}
                isfav={item.isFavorite}
            />
        )
    }


    const OnHeartPress = (event_id) => {
        const updatedArray = [...events];
        console.log(event_id);
        const eventIndex = updatedArray.findIndex(event => event._id === event_id);
        if (eventIndex !== -1) {
            console.log(updatedArray[eventIndex]?.isFavorite);
            if (!updatedArray[eventIndex]?.isFavorite) {
                AddEventToFavorite(event_id, token)
            } else {
                RemoveEventFromFavorite(event_id, token)

            }
            updatedArray[eventIndex] = {
                ...updatedArray[eventIndex],
                isFavorite: !updatedArray[eventIndex]?.isFavorite,
            };
            setEvents(updatedArray)

        }
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        getLat_Long().then((res) => {
            location = { ...location, ...res };
            console.log({ location });
            if (location?.longitude) {
                fetchEvents(location, token).then((ev) => {
                    setEvents(ev || Events || [])
                })
                fetchRecommendedEvents(location, token).then((ev) => {
                    setRecEvents(ev || Recommandedevents || [])
                })
            } else {
                alert(`Location Services Disabled \nPlease enable location services for this app in Settings.`)
                setLoading(false)
            }

        })
        setRefreshing(false);
    };




    return (
        <SafeAreaView style={styles.container}>
            <AppBar type={'dark'} />
            <Loader isVisible={loading} />
            <View style={styles._headerContainer}>
                <IonIcon style={{ paddingLeft: WP(2) }} name='home' size={WP(8)} color={COLORS.primaryColor} />
                <Text style={{ fontSize: WP(8), fontWeight: '700', letterSpacing: 0.8, }} >Team Mates</Text>
                <IonIcon style={{ paddingLeft: WP(2) }} name='ios-notifications-outline' size={WP(8)} color={COLORS.primaryColor} />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primaryColor} />
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={[styles._sectionThree, { paddingBottom: 0 }]}>
                        <Text style={{ fontSize: WP(4), fontWeight: '600', paddingVertical: WP(3), padding: WP(2) }}>Recommended Activities  </Text>
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={recEvents}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderRecommmendedCardItem}
                        />
                    </View>

                    <View style={styles._sectionThree}>
                        <Text style={{ fontSize: WP(4), fontWeight: '600', paddingVertical: WP(3), padding: WP(2) }}>Activities in my area  </Text>
                        <FlatList
                            data={events}
                            keyExtractor={keyExtractor}
                            scrollEnabled={false}
                            numColumns={2}
                            renderItem={renderItem}
                        />
                    </View>
                </ScrollView>)
            }
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },

    _headerContainer: {
        width: '100%',
        height: HP(10),
        flexDirection: 'row',
        padding: WP(SPACING_PERCENT),
        paddingVertical: WP(SPACING_PERCENT / 2),
        // paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 1,
        backgroundColor: COLORS.whiteColor,
        marginTop: WP(4),

    },
    _textMain: {
        color: COLORS.darkGrey,
        fontSize: WP(TEXT_SIZES.info_2),
        fontWeight: '500',
        letterSpacing: 1,
    },
    _galleryTitleSty: {
        color: COLORS.blackColor,
        fontSize: WP(TEXT_SIZES.h1),
        fontWeight: '700',
    },


    tabContainer: {
        width: WP(43),
        height: WP(43),
        backgroundColor: COLORS.whiteColor,
        margin: WP(2),
        marginTop: HP(5),
        borderRadius: WP(RADIUS),
        alignItems: 'center',
        // justifyContent: 'center',

        // shadow 
        elevation: 5,
        shadowColor: COLORS.blackColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: WP(1),
        zIndex: 10,
    },

    tabInfoContainer: {
        padding: WP(SPACING_PERCENT / 2),
        // backgroundColor: 'cyan'
    },
    tabText: {
        fontSize: WP(TEXT_SIZES.info_1),
        textAlign: "center",
        // paddingTop: WP(SPACING_PERCENT),
        color: COLORS.lightGrey
    },
    tabCircle: {
        width: WP(14),
        height: WP(14),
        borderRadius: WP(10),
        backgroundColor: COLORS.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartIconSty: {
        position: 'absolute',
        right: 5,
        top: 5,
    },
    _ChipContainer: {
        width: WP(30),
        height: WP(11),
        backgroundColor: 'rgba(241, 96, 90, 0.9)',
        marginLeft: WP(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: WP(3),
    },
    _chipText: {
        fontSize: WP(3.5),
        fontWeight: '500',
        color: COLORS.whiteColor
    },

    _listHeaderSty: {
        // backgroundColor:'cyan',
        width: WP(95),
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: WP(2)
    },
    _listHeaderTitle: {
        fontSize: WP(4.5),
        fontWeight: '800',
        color: COLORS.secondaryColor
    },
    _listHeaderText: {
        fontSize: WP(4),
        fontWeight: '500',
        color: COLORS.darkGrey
    },


    _categoryMain: {
        backgroundColor: COLORS.whiteColor,
        padding: WP(3),
    },
    _sectionThree: {
        width: "100%",
        padding: WP(2),
        paddingBottom: WP(5)
    },
})