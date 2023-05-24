import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONT, FONT_BOLD, HP, WP } from '../theme/config'

export default function DescriptionInput({ lable, marginBottom, placeholder, value, onChangeText, inputError, onFocus, containerSty, keyboard }) {
    return (
        <View style={[Styles._mainContainer, containerSty]}>
            <Text style={Styles._text} numberOfLines={1}>{lable}</Text>
            <TextInput
                placeholder={placeholder}
                style={[Styles._input]}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboard}
                onFocus={onFocus}
                multiline
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        width: "100%",
        backgroundColor: COLORS.whiteColor,
        marginTop:WP(2)
    },
    _input: {
        width: "100%",
        minHeight: HP(5.5),
        borderRadius: 4,
        paddingLeft: WP(5),
        paddingTop: WP(3),
        color: COLORS.blackColor,
        borderColor: COLORS.borderColor,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    _text: {
        color: COLORS.lightGrey,
        fontSize: WP(4),
        fontWeight: "700",
        fontFamily: FONT,
        paddingBottom: 5,
    },
    _errorMsgText: {
        width: WP(88),
        color: COLORS.blackColor,
        fontSize: WP(3),
        marginTop: 3,
        textAlign: 'left',
    }
})