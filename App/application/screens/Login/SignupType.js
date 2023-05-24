import { StyleSheet, Image, Text, View, Animated, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { COLORS, HP, IMAGES, MOBILE_WIDTH, ON_BOARD_DATA, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import FontAwes from 'react-native-vector-icons/FontAwesome5';
import { _setItem } from '../../utils/async';

export default function SignupType({ navigation }) {





    return (
        <View style={styles._container}>
            <View style={styles.imageCover}>
                <Image
                    style={styles.image}
                    source={IMAGES.mainLogo}
                />
                <Text style={styles._textMain}>Continue As?</Text>
            </View>
            <View style={styles.box}>
                <TouchableOpacity
                onPress={()=>{navigation.navigate('signupdeliveryinfo')}}
                activeOpacity={0.5} style={styles._circleContainer}>
                    <View style={styles._circleSty}>
                        <Image source={IMAGES.delivery_img} resizeMode='contain'  />
                    </View>
                    <Text style={styles._circleText}>Delivery Boy</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={styles._circleContainer}>
                    <View style={styles._circleSty}>
                    <Image source={IMAGES.user_logo} resizeMode='contain'  />

                    </View>
                    <Text style={styles._circleText}>User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    imageCover: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: WP(SPACING_PERCENT),
        // backgroundColor: 'cyan'
    },
    image: {
        width: WP(33),
        resizeMode: 'contain',
    },
    box: {
        flex: 1,
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
    _circleContainer: {
        marginVertical:WP(SPACING_PERCENT),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.yellowColor,

    },
    _circleSty: {
        width: WP(35),
        height: WP(35),
        borderRadius: WP(35),
        backgroundColor: COLORS.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    _circleText:{
        marginVertical:WP(SPACING_PERCENT),
        color: COLORS.whiteColor,
        fontSize: WP(4),
        fontWeight: '600',
        letterSpacing: 1,
    }

});
