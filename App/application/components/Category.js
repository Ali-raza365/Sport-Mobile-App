import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from '../theme/config'
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Category({ color, lable, icon, size, margin, onPress }) {
    return (
        <TouchableOpacity style={[Styles._mainConatiner, { }]} activeOpacity={0.7} onPress={onPress}>
            <View style={[Styles._circle, { backgroundColor: COLORS.primaryColor, width: size, height: size, }]}>
                <Ionicons
                    name={icon}
                    color={COLORS.whiteColor}
                    size={HP(3.5)}
                />
            </View>
            <Text style={Styles._text} numberOfLines={2}>{lable}</Text>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    _mainConatiner: {
        width: WP(19),
        justifyContent: "center",
        alignItems: "center",
    },
    _circle: {
        borderRadius: HP(10),
        justifyContent: "center",
        alignItems: "center",

    },
    _text: {
        color: COLORS.blackColor,
        fontWeight: "600",
        marginTop: HP(1.5),
        width: WP(18),
        textAlign: "center",
        // height: HP(5),
    },
})