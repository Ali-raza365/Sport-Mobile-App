import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, MessageBubble, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../theme/config';
import { TextInput } from 'react-native-gesture-handler';
import { io } from 'socket.io-client';
import UserStore from '../../Store/UserStore';
import ChatStore from '../../Store/ChatStore';


// const eventId ='6482285e33666f48db41370a'
const connectToChat = (userId, roomId) => {

    const socket = io(`http://localhost:8080?userId=${userId}`);

    socket.emit('joinChatRoom', roomId);

    // Handle incoming chat messages
    socket.on('chatMessage', (data) => {
        // Handle the received chat message
        console.log('Received chat message:', data);
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

const ChatScreen = ({ route }) => {
    const { lastMessage } = route?.params
    const { user, token } = UserStore()
    const { chatMessage, fetchChatMessages } = ChatStore()
    const [messages, setMessages] = useState([]);

    let userId = user?._id;
    let roomId = lastMessage?._id

    useEffect(() => {
        connectToChat(userId, roomId)
        fetchChatMessages({ event_id: roomId }, token).then((data) => {
            setMessages(data)
        })
        // setMessages([
        //     {
        //         _id: 1,
        //         text: 'Hello developer',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 2,
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        //     {
        //         _id: 2,
        //         text: 'Hello world',
        //         createdAt: new Date(),
        //         user: {
        //             _id: 1,
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any',
        //         },
        //     },
        // ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderMessage = (messageProps) => {
        const { currentMessage } = messageProps;

        // Rename keys
        const renamed_Message = {
            messageId: currentMessage._id,
            text: currentMessage.message,
            createdAt: currentMessage.createdAt,
            user: {
                userId: currentMessage.user._id,
                name: currentMessage.user.name,
                avatar: currentMessage.user.image,
            },
        };

        return <MessageBubble message={renamedMessage} />;
    };

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
    const renderInputToolbar = (props) => {
        return (
            <View style={styles.inputToolbar}>
                <TextInput
                    style={styles.inputField}
                    placeholder="Type a message..."
                //   onChangeText={(text) => console.log(text)}
                />
            </View>
        );
    };


    return (
        <GiftedChat
            messages={messages}
            renderMessage={renderMessage}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: userId,
            }}
            renderBubble={renderBubble}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
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