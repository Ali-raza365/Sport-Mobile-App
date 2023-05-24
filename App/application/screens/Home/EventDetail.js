import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { Button } from '../../components';

const EventDetail = ({ route, navigation }) => {

    const { detail } = route.params;
    console.log(detail.image);

    return (
        <View style={styles._container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles._imagesContainer}>
                    <Image source={{ uri: detail.image }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={styles._infoContainer}>
                    <Text style={styles._typeText}>Badminton</Text>
                    <Text style={styles._heading}>{detail?.name}</Text>
                    <Text style={styles._priceText}>Rs {detail?.price} /Person</Text>

                    <View style={styles._dateLocationContainer}>
                        <View style={styles._row}>
                            <View style={styles.iconContainer}>
                                <AntDesign name="calendar" size={WP(7)} color={COLORS.blackColor} />
                            </View>
                            <Text style={styles._priceText}>  {detail?.date}</Text>
                        </View>
                        <View style={styles._row}>
                            <View style={styles.iconContainer}>
                                <Foundation name="marker" size={WP(7)} color={COLORS.blackColor} />
                            </View>
                            <Text style={styles._priceText}>  {detail?.location}</Text>
                        </View>
                    </View>

                    <View style={styles._desContainer}>
                        <Text style={[styles._priceText, { color: COLORS.blackColor, paddingVertical: WP(3) }]}>Event Detail</Text>
                        <Text>Be amazed by the speed and skill of the world's top swimmers as they compete for the championship title in the state-of-the-art Aquatics Centre in London.</Text>
                    </View>

                    <Button
                        lable={"participate"}
                        styles={{marginTop:WP(4)}}
                    />
                </View>



            </ScrollView>
        </View>
    )
}

export default EventDetail

const styles = StyleSheet.create({
    _container: {
        flex: 1,
    },
    _imagesContainer: {
        width: '100%',
        height: HP(40),
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