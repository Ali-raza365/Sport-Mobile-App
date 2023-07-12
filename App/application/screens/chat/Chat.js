import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { io } from 'socket.io-client';
import ChatStore from '../../Store/ChatStore';
import UserStore from '../../Store/UserStore';
import { BASE_URL } from '../../api/apis';
import { COLORS, WP } from '../../theme/config';
import { SafeAreaView } from 'react-native-safe-area-context';



var socket = null;


const ChatScreen = ({ route, navigation }) => {

    const { lastMessage } = route?.params
    const { user, token } = UserStore()
    const { chatMessage, fetchChatMessages } = ChatStore()
    const [messages, setMessages] = useState([]);

    let userId = user?._id;
    let roomId = lastMessage?._id
    console.log({ roomId, userId });
    // console.log({ lastMessage });
    const connectToChat = (userId, roomId) => {

        socket = io(`${BASE_URL}?userId=${userId}`, { transports: ['websocket'] });
        socket.connect();
        socket.on('connect', () => {
            console.log('connection established');
        })
        socket.emit('joinChatRoom', roomId);
        socket.on('joinChatRoom', (join) => { console.log(join); });

        socket.on('chatMessage', (data) => {
            console.log('chatMessage', data);
            if (userId !== data?.user?._id) {
                setMessages((previousMessages) => GiftedChat.append(previousMessages, data));
            }
            console.log(userId + ' userId Received chat message:' + roomId, { user: data?.user?._id });
        });

        // Handle chat errors
        socket.on('chatError', (error) => {
            // Handle the chat error
            console.log('Chat error:', error);
        });

        // Clean up the connection when the component unmounts
        // return () => {
        //     socket.disconnect();
        // };
    };




    useEffect(() => {
        connectToChat(userId, roomId)
        fetchChatMessages({ event_id: roomId }, token).then((data) => {
            // console.log('from api', data[0]);
            setMessages(data?.map((message) => {
                return (
                    {
                        // ...message,
                        _id: message?._id,
                        text: message?.message,
                        createdAt: new Date(message?.createdAt),
                        user: {
                            _id: message?.user._id,
                            name: message?.user.fullname,
                            avatar: message?.user.avatar,
                        }
                    }

                )
            }))
        })
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Pressable onPress={() => { navigation.goBack() }}>
                        <Feather name="arrow-left" color={COLORS.blackColor} size={WP(6)} />
                    </Pressable>
                    <Pressable style={{}} onPress={() => { navigation.navigate('invhistorystack') }}>
                        <Image source={{ uri: lastMessage?.image }}
                            style={{ width: WP(7), height: WP(7), borderRadius: WP(30), marginHorizontal: 10, }}
                            resizeMode='cover'
                        />
                    </Pressable>
                    <Text style={{ color: COLORS.blackColor, fontSize: WP(4.4), fontWeight: "500" }}>{lastMessage?.title}</Text>
                </View>

            )
        })
        return () => {
            socket.disconnect();
        };
    }, []);


    const onSend = useCallback((messages = []) => {
        console.log({ useCallbackmessages: messages[0] });
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
        console.log("onSend", user);
        let userobj = {
            _id: user?._id,
            avatar: user?.avatar,
            name: user?.fullname,
            mobile: user?.mobile
        }
        socket.emit('chatMessage', { eventId: roomId, messageData: { ...messages?.[0], message: messages?.[0]?.text, user: userobj } })
    }, []);




    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color={COLORS.primaryColor}
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#ffff',
                    },
                    right: {
                        backgroundColor: COLORS.primaryColor,
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <MaterialCommunityIcons name='chevron-double-down' size={22} color='#333' />
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, }}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                isLoadingEarlier={true}
                showAvatarForEveryMessage
                renderUsernameOnMessage
                user={{
                    ...user,
                    _id: userId,
                }}
                listViewProps={{
                    maintainVisibleContentPosition: {
                        minIndexForVisible: 0,
                        autoscrollToTopThreshold: 30,
                    }
                }}
                renderBubble={renderBubble}
                scrollToBottom
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottomComponent={scrollToBottomComponent}
            // renderInputToolbar={renderInputToolbar}
            />
        </SafeAreaView>

    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputToolbarContainer: {
        backgroundColor: '#f0f0f0',
        borderTopWidth: 1,
        borderTopColor: '#d0d0d0',
    },
    inputToolbarPrimary: {
        backgroundColor: 'white',
    },
});