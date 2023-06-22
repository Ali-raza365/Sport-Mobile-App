import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardItem from '../../components/CardItem';
import UserStore from '../../Store/UserStore';
import EventStore from '../../Store/EventStore';
import { HP, WP } from '../../theme/config';
import { getLat_Long } from '../../utils/GetIPAddress';
import { useIsFocused } from '@react-navigation/native';
import { Loader } from '../../components';

const YourFavorites = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([])

    const IsFocused = useIsFocused()
    const { Events, fetchEvents, AddEventToFavorite, RemoveEventFromFavorite, } = EventStore();
    const { user, token } = UserStore();

    const renderItem = ({ item }) => {
        return (
            <CardItem
                OnHeartPress={() => OnHeartPress(item?._id)}
                onPress={() => { navigation.navigate("eventdetail", { detail: item }) }}
                item={item}
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

    useEffect(() => {
        // fetchEvents(location, token).then((ev) => {
        setEvents(Events || [])
        // })
    }, [IsFocused])

    const onRefresh = () => {
        setRefreshing(true);
        // fetchEvents(location, token).then((ev) => {
        setEvents(ev || Events || [])
        // })
        setRefreshing(false);
    };

    return (
        <>
            <Loader isVisible={loading} />
            <FlatList
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                keyExtractor={(_, i) => `item${i}`}
                showsVerticalScrollIndicator={false}
                disableVirtualization={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: HP(20), padding: WP(3), }}
                data={events}
                renderItem={renderItem}
            />
        </>
    )
}

export default YourFavorites