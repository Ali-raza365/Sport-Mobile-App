import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { AppBar, Button } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserStore from '../../Store/UserStore';
import EventStore from '../../Store/EventStore';
import moment from 'moment';
import { _momentDateFormat } from '../../utils/TimeFunctions';

const EventDetail = ({ route, navigation }) => {

    const { detail } = route.params;
    console.log(detail?.isParticipated);
    const [isParticipated, setisParticipated] = useState(detail?.isParticipated || false)
    const onBackPress = () => navigation?.goBack()
    const { Activites, fetchEvents, AddEventToFavorite, RemoveEventFromFavorite, SendParticiateRequest } = EventStore();
    const { user, token } = UserStore();

    const onParticipate = () => {
        SendParticiateRequest({ event_id: detail?._id }, token).then((msg) => {
            !!msg ? alert(msg) : null
            if (msg == "Participant request send successfully!") {
                setisParticipated(true)
                fetchEvents()
            }

        })
    }

    return (
        // <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.whiteColor }}>
        <View style={styles._container}>
            <AppBar hidden={true} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, }}
            >
                <View style={styles._imagesContainer}>
                    <TouchableOpacity
                        onPress={onBackPress}
                        style={styles.innerCircle} >
                        <Feather name="arrow-left" color={COLORS.blackColor} size={WP(6)} />
                    </TouchableOpacity>
                    <Image source={{ uri: detail.image }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={styles._infoContainer}>
                    <Text style={styles._typeText}>{!!detail?.activity ? detail?.activity?.name : ''}</Text>
                    <Text style={styles._heading}>{detail?.name}</Text>
                    <Text style={styles._priceText}>{detail?.total_participants} Participants</Text>

                    <View style={styles._dateLocationContainer}>

                        <View style={styles._row}>
                            <View style={styles.iconContainer}>
                                <AntDesign name="calendar" size={WP(7)} color={COLORS.blackColor} />
                            </View>
                            <Text style={styles._priceText}>{!!detail?.date ? "  " + _momentDateFormat(detail?.date) : ''}</Text>
                        </View>
                        <View style={styles._row}>
                            <View style={styles.iconContainer}>
                                <AntDesign name="clockcircleo" size={WP(7)} color={COLORS.blackColor} />
                            </View>
                            <Text style={styles._priceText}>{!!detail?.date ? "  " + moment(detail?.date).format('LT') : ''}</Text>
                        </View>
                        <View style={styles._row}>
                            <View style={styles.iconContainer}>
                                <Foundation name="marker" size={WP(7)} color={COLORS.blackColor} />
                            </View>
                            <Text numberOfLines={3} style={styles._LocationText}>{!!detail?.location ? detail?.location?.name : ""}</Text>
                        </View>
                    </View>

                    <View style={styles._desContainer}>
                        <Text style={[styles._priceText, { color: COLORS.blackColor, paddingVertical: WP(3) }]}>{detail?.title || ''}</Text>
                        {/* <Text style={[styles._priceText, { color: COLORS.blackColor, paddingVertical: WP(3) }]}>Detail</Text> */}
                        <Text style={[styles.description,]}>{detail?.description || ''}</Text>
                    </View>

                    <Button
                        backgroundColor={isParticipated ? COLORS.darkGrey : COLORS.primaryColor}
                        onPress={onParticipate}
                        lable={isParticipated ? "Already Participated" : "Participate"}
                        disable={isParticipated}
                        styles={{ marginTop: WP(4) }}
                    />
                </View>



            </ScrollView>
        </View>
        // </SafeAreaView>
    )
}

export default EventDetail

const styles = StyleSheet.create({
    _container: {
        // flex: 1,
        // height
        // backgroundColor: COLORS.whiteColor,
    },

    _imagesContainer: {
        width: '100%',
        height: HP(45),
    },
    innerCircle: {
        position: 'absolute',
        top: WP(8),
        left: WP(4),
        width: WP(10),
        height: WP(10),
        borderRadius: WP(10),
        backgroundColor: "rgba(255,255,255,0.5)",
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 23,
    },

    BackArrow: {
        position: "absolute",
        zIndex: 10,
        color: "rgba(255,255,255,0.4)",
        fontSize: WP(8),
        top: HP(3),
        left: WP(5),
    },
    _infoContainer: {
        width: '100%',
        marginTop: -WP(5),
        // height: HP(0),
        backgroundColor: COLORS.whiteColor,
        borderTopLeftRadius: HP(RADIUS),
        borderTopRightRadius: HP(RADIUS),
        padding: WP(SPACING_PERCENT)
    },
    _typeText: {
        fontSize: WP(4),
        color: COLORS.lightGrey
    },
    _heading: {
        fontSize: WP(TEXT_SIZES.h3),
        color: COLORS.blackColor,
        fontWeight: '700',
        paddingTop: WP(1)
    },
    _priceText: {
        fontSize: WP(4.4),
        color: COLORS.lightGrey,
        fontWeight: '700',
        paddingTop: WP(2.5)
    },
    description: {
        fontSize: WP(4.4),
        color: COLORS.lightGrey,
        fontWeight: '500',
    },
    _LocationText: {
        fontSize: WP(4.4),
        color: COLORS.lightGrey,
        fontWeight: '700',
        textAlign: "left",
        width: WP('82%'),
        paddingHorizontal: WP(2),
        paddingTop: WP(2.5)
    },
    _dateLocationContainer: {
        width: '100%',
        borderTopWidth: 0.7,
        borderTopColor: COLORS.borderColor,
        marginTop: WP(3),
        paddingVertical: WP(3)
    },
    _row: {
        width: '100%',
        paddingVertical: WP(2),
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'cyan'
    },
    iconContainer: {
        width: WP(13),
        height: WP(13),
        borderRadius: WP(RADIUS),
        backgroundColor: COLORS.grey,
        alignItems: 'center',
        justifyContent: 'center'
    },
    _desContainer: {
        width: '100%',
    }

})