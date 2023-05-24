import { StyleSheet, Image, Text, View, Animated, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { COLORS, HP, IMAGES, MOBILE_WIDTH, ON_BOARD_DATA, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import Feather from 'react-native-vector-icons/Feather';
import { _setItem } from '../../utils/async';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from '../../components';

export default function LocationSignup({ navigation }) {

    const _goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={styles._container}>

            {/* back arrow Button */}
            <TouchableOpacity
                onPress={_goBack}
                style={styles.innerCircle} >
                <Feather name="arrow-left" color={COLORS.blackColor} size={WP(6)} />
            </TouchableOpacity>

            <MapView
                style={{ position: 'absolute', width: '100%', height: '70%', top: 0, }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.01421,
                }}
            />

            <View style={styles.box}>

                <View style={styles._cardContainer}>
                    <Image source={IMAGES.location_logo} style={{ width: WP(12), height: WP(12) }} resizeMode='contain' />
                    <View style={{ paddingHorizontal: 10,width:'80%', }}>
                        <Text style={styles._textMain}>Your Location</Text>
                        <Text style={styles._galleryTitleSty}>New York City</Text>
                    </View>
                </View>
                <View style={[styles._cardContainer, { marginVertical: WP(3) }]}>
                <Image source={IMAGES.building_img} style={{ width: WP(12), height: WP(12) }} resizeMode='contain' />
                    <View style={{ paddingHorizontal: 10,width:'80%', }}>
                        <Text style={styles._textMain}>Street/Building/Flat</Text>
                        <Text style={styles._galleryTitleSty}>Washington</Text>
                    </View>
                </View>

                <Button lable={'Confirm'} styles={{ width: '90%' }} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
        justifyContent: 'flex-end',
    },
    image: {
        width: WP(33),
        resizeMode: 'contain',
    },
    box: {
        width: '100%',
        height: '45%',
        backgroundColor: COLORS.secondaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    _textMain: {
        color: COLORS.darkGrey,
        fontSize: WP(TEXT_SIZES.info_2),
        fontWeight: '500',
        letterSpacing: 1,
    },

    innerCircle: {
        position: 'absolute',
        top: WP(10),
        left: WP(6),
        width: WP(10),
        height: WP(10),
        borderRadius: WP(10),
        backgroundColor: COLORS.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 23,
    },

    _cardContainer: {
        width: '90%',
        height: '18%',
        backgroundColor: COLORS.whiteColor,
        borderRadius: WP(4),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    _galleryTitleSty: {
        color: COLORS.secondaryColor,
        fontSize: WP(4),
        fontWeight: '800',
    },
});
