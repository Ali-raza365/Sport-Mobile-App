import { Pressable, StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'
import { COLORS, WP } from '../theme/config'
import { Button, Divider } from 'react-native-paper'

const RequestCard = ({ item, onPress, onAccept, onDecline }) => {
    return (
        <>
            <Pressable style={styles?.card} onPress={onPress}>
                <View style={styles.UserInfo}>
                    <View style={styles.UserImgWrapper}>
                        <Image style={styles?.UserImg} source={{ uri: item.avatar }} />
                    </View>
                    <View style={styles?.TextSection}>
                        <View style={styles.UserInfoText}>
                            <Text >
                                <Text style={styles?.Name} >{item.fullname} </Text>
                                wants to participate
                                <Text style={styles?.Name}> {item?.eventTitle}</Text>
                            </Text>

                            {/* <Text style={styles?.UserName}>@{item?.username}</Text> */}
                        </View>

                    </View>
                    <View style={styles.buttonContainer}>
                        <Button textColor={COLORS.primaryColor} style={{ width: 100, height: 40, borderRadius: 10, borderColor: COLORS.primaryColor }} contentStyle={styles.button} mode="outlined" onPress={onAccept}>Accept</Button>
                        <Button textColor={COLORS.darkgray} style={{ width: 100, borderRadius: 10 }} contentStyle={styles.button} mode="text" onPress={onDecline}>Decline</Button>
                    </View>
                </View>
                <Divider />
            </Pressable>
        </>
    )
}

export default RequestCard

const styles = StyleSheet.create({
    card: {
        width: "100%"
    },
    UserInfo: {
        flex: 1,
        flexDirection: "row",
    },
    UserImgWrapper: {
        flex: 0.2,
        paddingVertical: WP(3),
    },
    UserImg: {
        width: WP(15),
        height: WP(15),
        borderRadius: WP(20),
        backgroundColor: "#cccccc"
    },
    TextSection: {
        flex: 0.53,
        flexDirection: "row",
        padding: WP(3),
        paddingLeft: 0,
        marginLeft: WP(2),
        width: WP(78),

    },
    UserInfoText: {
        flexDirection: "column",
        marginBottom: 5,
    },
    Name: {
        fontSize: WP(3.3),
        fontWeight: "bold"
    },
    UserName: {
        fontSize: WP(3),
        fontWeight: "bold",
        color: COLORS.darkGrey,
    },

    PostTime: {
        fontSize: WP(3),
        color: '#666',
        fontWeight: '500'
    },
    buttonContainer: {
        flex: 0.2,
        paddingVertical: WP(3)
    },
    button: { width: 100, height: 40, }
})