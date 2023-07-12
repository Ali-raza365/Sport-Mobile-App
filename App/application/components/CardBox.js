import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from '../theme/config'
import Ionicons from "react-native-vector-icons/Ionicons"
import { _momentDateFormat } from '../utils/TimeFunctions'
import { Card } from 'react-native-paper';
import { s, vs, ms, mvs } from 'react-native-size-matters';

export default function CardBox({
    imageSource,
    details,
    date,
    isfav,
    OnHeartPress = () => { },
    location,
    onPress = () => { },
    hideFavorite,
    contentContainerStyle,
}) {



    return (
        <Card style={{
            marginVertical: mvs(7),
            marginHorizontal: ms(4),
        }}>
            <TouchableOpacity style={[Styles._mainContainer, contentContainerStyle]} activeOpacity={0.7} onPress={onPress}>
                <View style={Styles._imageMain}>
                    <Image
                        style={Styles._image}
                        source={{ uri: imageSource }}
                    />
                </View>
                <View style={Styles._dataMain}>
                    <View style={Styles._sectionOne}>
                        <Text numberOfLines={2} style={Styles._detailText}>{details}</Text>
                        {!hideFavorite ?
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
                            : <Text />}

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
        width: WP("46%"),
        height: ms(150),
        backgroundColor: COLORS.whiteColor,
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
        height: "30%",
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
        maxHeight: "30%",
        backgroundColor: COLORS.whiteColor,
        paddingLeft: WP(1),
        marginBottom: WP(2)
    },
    _sectionThree: {
        width: "100%",
        height: "20%",
        backgroundColor: COLORS.whiteColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: ms(2)
    },
    _detailText: {
        color: COLORS.blackColor,
        width: "80%",
        fontWeight: "600",
        fontSize: s(14),
    },
    _priceText: {
        fontWeight: "bold",
        color: COLORS.primaryColor,
        fontSize: s(8),
    },
})