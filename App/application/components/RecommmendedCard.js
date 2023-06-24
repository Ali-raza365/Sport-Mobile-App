import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from '../theme/config'
import Ionicons from "react-native-vector-icons/Ionicons"
import { _momentDateFormat } from '../utils/TimeFunctions'
import { Card } from 'react-native-paper'

export default function RecommmendedCard({
    imageSource,
    details,
    date,
    onPress = () => { },
    contentContainerStyle,
    imageStyle,
}) {



    return (
        <Card style={{margin: WP(1.5),}}>
        <TouchableOpacity style={[Styles._mainContainer, contentContainerStyle]} activeOpacity={0.7} onPress={onPress}>
            <View style={[Styles._imageMain,imageStyle]}>
                <Image
                    style={Styles._image}
                    source={{ uri: imageSource }}
                />
            </View>
            <View style={Styles._dataMain}>
                <View style={Styles._sectionOne}>
                    <Text numberOfLines={2} style={Styles._detailText}>{details}</Text>
                </View>
                <View style={Styles._sectionTwo}>
                    <Text style={Styles._priceText}>{!!date ? _momentDateFormat(date) : ''}</Text>
                </View>

            </View>
        </TouchableOpacity>
        </Card>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        width: WP(80),
        height: HP(30),
        borderRadius: WP(2),
        overflow: "hidden",
    
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
        height:"30%",
        backgroundColor: COLORS.whiteColor
    },
    _sectionOne: {
        width: "100%",
        maxHeight: "60%",
        paddingHorizontal: WP(1),
        backgroundColor: COLORS.whiteColor,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: WP(1)
    },
    _sectionTwo: {
        width: "100%",
        backgroundColor: COLORS.whiteColor,
        paddingLeft: WP(1),
        // marginBottom: WP(2)
    },
    _sectionThree: {
        width: "100%",
        height: "20%",
        backgroundColor: COLORS.redColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: WP(1)
    },
    _detailText: {
        color: COLORS.blackColor,
        fontWeight: "600",
        fontSize: WP(4),
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