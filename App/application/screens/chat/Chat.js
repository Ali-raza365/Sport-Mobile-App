import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../theme/config';
import { TextInput } from 'react-native-gesture-handler';
import { io } from 'socket.io-client';
import UserStore from '../../Store/UserStore';
import ChatStore from '../../Store/ChatStore';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BASE_URL } from '../../api/apis';


var socket = null;


const ChatScreen = ({ route, navigation }) => {

    const connectToChat = (userId, roomId) => {

        socket = io(`${BASE_URL}?userId=${userId}`);

        socket.emit('joinChatRoom', roomId);

        socket.on('chatMessage', (data) => {

            if (userId !== data?.user?._id) {
                // setMessages((previousMessages) => GiftedChat.append(previousMessages, data));
            }
            console.log(userId + 'userId Received chat message:' + roomId, data);
        });

        // Handle chat errors
        socket.on('chatError', (error) => {
            // Handle the chat error
            console.log('Chat error:', error);
        });

        // Clean up the connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    };

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route)
        console.log(routeName, 'route name')
        if (routeName === "Chat") {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    })
    const { lastMessage } = route?.params
    const { user, token } = UserStore()
    const { chatMessage, fetchChatMessages } = ChatStore()
    const [messages, setMessages] = useState([]);

    let userId = user?._id;
    let roomId = lastMessage?._id

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
    }, []);


    const onSend = useCallback((messages = []) => {
        // console.log(messages);
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
        socket.emit('chatMessage', { eventId: roomId, messageData: { ...messages?.[0], message: messages?.[0]?.text } })
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
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            isLoadingEarlier={true}
            user={{
                _id: userId,
            }}
            listViewProps={{
                maintainVisibleContentPosition: {
                    minIndexForVisible: 0,
                    autoscrollToTopThreshold: 30,
                }
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottomComponent={scrollToBottomComponent}
        // renderInputToolbar={renderInputToolbar}
        />
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});