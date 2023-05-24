import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONT, HP, WP } from '../theme/config'

export default function SimpleInput({ lable, style, Icon,editable, placeholder, secureTextEntry, discription, value, onChangeText, inputError }) {
    return (
        <View style={[Styles._mainContainer, style]}>
            {lable && <Text style={Styles._lableText}>{lable}</Text>}
            {discription && <Text style={Styles._discription}>{discription}</Text>}
            <View style={Styles._inputContainer}>
                <TextInput
                    style={[Styles._input,]}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    editable={editable}
                />
                {Icon ? Icon : null}
            </View>
        </View>
    )
}
const Styles = StyleSheet.create({
    _mainContainer: {
        width: "100%",
        backgroundColor: COLORS.whiteColor,
        paddingLeft: WP(0),
        marginTop: WP(2),
    },
    _lableText: {
        color: COLORS.lightGrey,
        fontSize: WP(4),
        fontWeight: "700",
        paddingBottom: 5,
    },
    _inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        borderColor: COLORS.borderColor,
        paddingRight:WP(1),
        borderWidth: 1.5,
        height: HP(5.6),
        borderRadius: 4,
        paddingLeft: WP(5),
        // color: COLORS.primaryColor,
    },
    _input: {
        // borderColor: COLORS.borderColor,
        // borderWidth: 1.5,
        // width: WP(70),
        height: HP(5.6),
        // borderRadius: 4,
        // paddingLeft: WP(5),
        // // color: COLORS.primaryColor,
    },
    _discription: {
        color: COLORS.blackColor,
        fontSize: WP(4)
    },
    _errorMsgText: {
        color: COLORS.redColor,
        fontFamily: FONT,
        fontSize: WP(3),
        // marginTop:3,
    }
})