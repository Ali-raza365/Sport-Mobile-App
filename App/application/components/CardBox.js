import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from '../theme/config'
import Ionicons from "react-native-vector-icons/Ionicons"

export default function CardBox({
    imageSource,
    details,
    date,
    isfav,
    OnHeartPress = () => { },
    location,
    onPress = () => { },
}) {



    return (
        <TouchableOpacity style={Styles._mainContainer} activeOpacity={0.7} onPress={onPress}>
            <View style={Styles._imageMain}>
                <Image
                    style={Styles._image}
                    source={{ uri: imageSource }}
                />
            </View>
            <View style={Styles._dataMain}>
                <View style={Styles._sectionOne}>
                    <Text numberOfLines={2} style={Styles._detailText}>{details}</Text>
                    <TouchableOpacity onPress={OnHeartPress}>
                        {isfav ?
                            <Ionicons
                                name='heart'
                                color={COLORS.primaryColor}
                                size={WP(5)}
                            />
                            : <Ionicons
                                name='heart-outline'
                                color={COLORS.primaryColor}
                                size={WP(5)}
                            />
                        }
                    </TouchableOpacity>

                </View>
                <View style={Styles._sectionTwo}>
                    <Text style={Styles._priceText}>{!!date ? new Date(date).toDateString() : ''}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        width: WP(47),
        height: HP(20),
        backgroundColor: COLORS.whiteColor,
        borderRadius: WP(2),
        overflow: "hidden",
        margin: WP(1)
    },
    _imageMain: {
        width: "100%",
        height: "70%",
        backgroundColor: COLORS.whiteColor
    },
    _image: {
        resizeMode: "cover",
        width: "100%",
        height: "100%",
    },
    _dataMain: {
        width: "100%",
        height: "30%",
        backgroundColor: COLORS.whiteColor
    },
    _sectionOne: {
        width: "100%",
        height: "60%",
        backgroundColor: COLORS.whiteColor,
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: WP(1)
    },
    _sectionTwo: {
        width: "100%",
        height: "30%",
        backgroundColor: COLORS.whiteColor,
        paddingLeft: WP(1)
    },
    _sectionThree: {
        width: "100%",
        height: "20%",
        backgroundColor: COLORS.whiteColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: WP(1)
    },
    _detailText: {
        color: COLORS.blackColor,
        width: "80%",
    },
    _priceText: {
        fontWeight: "bold",
        color: COLORS.primaryColor,
        fontSize: WP(3.5),
    },
    _locationText: {
        color: COLORS.primaryColor2,
        fontSize: WP(3)
    },
    _dateText: {
        color: COLORS.primaryColor2,
        fontSize: WP(3)
    },
})