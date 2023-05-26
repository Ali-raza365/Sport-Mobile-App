import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from '../../theme/config'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

export default function Account() {
    return (
        <SafeAreaView style={Styles._mainContainer}>
            <View style={{
                backgroundColor: COLORS.primaryColor
            }}>
                <TouchableOpacity
                    style={Styles._card}
                    activeOpacity={0.8}
                >
                    <MaterialIcons
                        name='send-to-mobile'
                        color={COLORS.primaryColor}
                        size={WP(6.5)}
                    />
                    <Text style={Styles._cardText}>Change Your Number</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                backgroundColor: COLORS.primaryColor
            }}>
                <TouchableOpacity
                    style={Styles._card}
                    activeOpacity={0.8}
                >
                    <MaterialIcons
                        name='delete-outline'
                        color={COLORS.primaryColor}
                        size={WP(6.5)}
                    />
                    <Text style={Styles._cardText}>Delete Your Account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
        paddingTop: WP(5)
    },
    _card: {
        width: WP(100),
        height: HP(5.5),
        backgroundColor: COLORS.whiteColor,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: WP(3)
    },
    _cardText: {
        color: COLORS.primaryColor,
        paddingHorizontal: WP(3),
        fontSize: WP(4)
    },
})