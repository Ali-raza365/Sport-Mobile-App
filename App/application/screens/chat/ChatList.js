import React, { useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import ChatStore from '../../Store/ChatStore';
import UserStore from '../../Store/UserStore';
import { COLORS, WP } from '../../theme/config';

const Messages = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        messageTime: '4 mins ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '2',
        userName: 'John Doe',
        userImg: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        messageTime: '2 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '3',
        userName: 'Ken William',
        userImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        messageTime: '1 hours ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '4',
        userName: 'Selina Paul',
        userImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        messageTime: '1 day ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '5',
        userName: 'Christy Alex',
        userImg: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
        messageTime: '2 days ago',
        messageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
];




const MessagesScreen = ({ navigation }) => {

    const { chatList, fetchChatList } = ChatStore()
    const IsFocused = useIsFocused()
    const { token } = UserStore()

    useEffect(() => {
        if (IsFocused) fetchChatList('_', token)

    }, [IsFocused])

    const renderItem = ({ item }) => (
        <Pressable style={styles?.card} onPress={() => navigation.navigate('Chat', { lastMessage: item })}>
            <View style={styles.UserInfo}>
                <View style={styles.UserImgWrapper}>
                    <Image style={styles?.UserImg} source={{ uri: item.image }} />
                </View>
                <View style={styles?.TextSection}>
                    <View style={styles.UserInfoText}>
                        <Text style={styles?.UserName}>{item.title}</Text>
                        <Text style={styles?.PostTime}>{new Date(item.createdAt)?.toDateString()}</Text>
                    </View>
                    <Text style={styles?.MessageText}>{item?.lastMessage?.message}</Text>
                </View>
            </View>
        </Pressable>
    )
    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={chatList}
                keyExtractor={item => item._id}
                renderItem={renderItem}
            />
        </View>
        // </SafeAreaView>
    );
};

export default MessagesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: WP(4),
        backgroundColor: COLORS.whiteColor,
    },
    card: {
        width: "100%"
    },
    UserInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    UserImgWrapper: {
        paddingVertical: WP(3),
    },
    UserImg: {
        width: WP(15),
        height: WP(15),
        borderRadius: WP(20),
        backgroundColor: "#cccccc"
    },
    TextSection: {
        flexDirection: "column",
        justifyContent: "center",
        padding: WP(3),
        paddingLeft: 0,
        marginLeft: WP(2),
        width: WP(78),
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc"
    },
    UserInfoText: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    UserName: {
        fontSize: WP(3.3),
        fontWeight: "bold"
    },

    PostTime: {
        fontSize: WP(3),
        color: '#666',
        fontWeight: '500'
    },
    MessageText: {
        fontSize: WP(3.3),
        color: '#333333',
    }
});