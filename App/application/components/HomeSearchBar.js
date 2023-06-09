import React from 'react';
import { StyleSheet, TextInput, Text, View, I18nManager, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    COLORS,
    FONT,
    HP,
    INPUT_HEIGHT,
    RADIUS,
    SPACING_PERCENT,
    TEXT_SIZES,
    WP,
} from '../theme/config';

const HomeSearchBar = ({
    label,
    Icon,
    IconShow,
    placeholder,
    value,
    onChangeText,
    editable,
    stric,
    edit,
    width,
    secureTextEntry,
    inputStyle,
    containerStyle,
    keyboard,
    maxLength,
    onIconPress,
}) => {
    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: COLORS.borderColor,
                borderRadius: WP(RADIUS),
                flexDirection: 'row',
                width: WP(80),
                height: HP(4.5),
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',

            }}>
            <Ionicons
            style={{paddingLeft:WP(1.5), }}
                name='ios-search-outline'
                size={WP(7)}
                color={COLORS.darkGrey}
            />

            <TextInput
                selectionColor={COLORS.secondaryColor}
                editable={editable || edit}
                placeholder={placeholder}
                placeholderTextColor={COLORS.darkGrey}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                style={[
                    Styles._inputStyle,
                    {
                        backgroundColor:
                            editable == false ? COLORS.grey : 'transparent',
                        color: editable == false ? 'transparent' : COLORS.blackColor,
                    },
                    inputStyle,
                ]}
            />

            <TouchableOpacity
                style={Styles.iconContainer}>
                <Ionicons name='ios-location-outline' size={WP(5)} color={COLORS.whiteColor} />
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    _inputStyle: {
        height: HP(4.5),
        flex: 1,
        fontSize: WP(TEXT_SIZES.info_1),
        backgroundColor: 'red',
        paddingHorizontal: WP(SPACING_PERCENT / 2),
        paddingRight:0,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    _label: {
        fontSize: WP(TEXT_SIZES.info_1),
        color: COLORS.blackColor,
        marginBottom: WP(SPACING_PERCENT / 5),
        textAlign: 'left',
    },
    iconContainer: {
        width: '12%',
        height: '100%',
        backgroundColor: COLORS.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    _icon: {
        fontSize: 20,
    },
});

export default HomeSearchBar;
