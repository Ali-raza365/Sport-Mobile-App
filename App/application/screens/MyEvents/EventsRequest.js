import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import EventStore from '../../Store/EventStore';
import UserStore from '../../Store/UserStore';
import { Loader } from '../../components';
import RequestCard from '../../components/RequestCard';
import { HP, WP } from '../../theme/config';

const EventRequest = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([])

    const IsFocused = useIsFocused()
    const { fetchParticipantsRequests,  } = EventStore();
    const { user, token } = UserStore();

    const renderItem = ({ item }) => {
        return (
            <RequestCard
                onPress={() => { navigation.navigate("eventdetail", { detail: item }) }}
                item={item}
            />
        )
    }


    useEffect(() => {
        setLoading(true)
        fetchParticipantsRequests(token).then((data) => {
            console.log(data[0]);
            setEvents(data || [])
            setLoading(false)
        }).catch(() => { setLoading(false) })

    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        fetchParticipantsRequests(token).then((data) => {
            setEvents(data || [])
        })
        setRefreshing(false);
    };

    const renderEmptyComponent = () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No items to display</Text>
        </View>
    );

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
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: HP(20), padding: WP(3), }}
                data={events}
                renderItem={renderItem}
            />
        </>
    )
}

export default EventRequest