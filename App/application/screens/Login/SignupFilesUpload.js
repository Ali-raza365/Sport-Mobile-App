import { StyleSheet, Image, Text, View, Animated, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { COLORS, HP, IMAGES, MOBILE_WIDTH, ON_BOARD_DATA, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import FontAwes from 'react-native-vector-icons/FontAwesome5';
import { _setItem } from '../../utils/async';
import { Button } from '../../components';

export default function SignupFilesUpload({ navigation, route }) {

    const { fileTitle } = route.params

    // console.log(fileTitle);

    return (
        <View style={styles._container}>
            <View style={styles.imageCover}>
                <Image
                    style={styles.image}
                    source={IMAGES.mainLogo}
                />
                <Text style={styles._textMain}>Authentication Required</Text>

                <TouchableOpacity
                    // onPress={() => { navigation.navigate('signupdeliveryinfo') }}
                    style={styles.GalleryContainer}
                    activeOpacity={0.5}>

                    <Image source={IMAGES.gallery_Img} style={{ width: WP(12), height: WP(12) }} resizeMode='contain' />
                    <View style={{ paddingHorizontal: 10, }}>
                        <Text style={styles._galleryTitleSty}>Select the Document From Gallery</Text>
                        <Text style={styles._textMain}>PNG, PDF, JPEG</Text>

                    </View>
                </TouchableOpacity>

            </View>
            <View style={styles.box}>
                <View style={styles._circleSty}>
                    <Image source={IMAGES.file_upload_img} resizeMode='contain' />
                </View>
                <Text style={styles._circleText}>You need to upload your</Text>
                <Text style={styles._boldText}>{fileTitle == 'lisence' ? 'Driving License' : 'Personal Picture'}</Text>

                <TouchableOpacity
                    style={[styles._cameraBtn]}
                    activeOpacity={0.8}
                >
                    <Image source={IMAGES.camera} style={{ width: WP(8), height: WP(8) }} resizeMode='contain' />
                    <Text style={[styles._lable]}>Use Camera</Text>
                </TouchableOpacity>

                <Button
                    styles={{ width: '50%', backgroundColor: COLORS.whiteColor }}
                    lableSty={{ color: COLORS.blackColor }}
                    lable={'Next'} />
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
        height: '40%',
        justifyContent: 'center',
        alignItems: "center",
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
        marginVertical: WP(SPACING_PERCENT),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.yellowColor,

    },
    _circleSty: {
        width: WP(35),
        height: WP(35),
        alignItems: 'center',
        justifyContent: 'center',
    },

    _circleText: {
        color: COLORS.whiteColor,
        fontSize: WP(4),
        fontWeight: '700',
    },
    _boldText: {
        color: COLORS.whiteColor,
        fontSize: WP(8),
        fontWeight: '700',
    },
    GalleryContainer: {
        width: '87%',
        // backgroundColor: '#546566',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginRight: WP(SPACING_PERCENT),
        marginTop: WP(14),
    },
    _galleryTitleSty: {
        color: COLORS.secondaryColor,
        fontSize: WP(4),
        fontWeight: '800',
    },


    _cameraBtn: {
        width: "50%",
        height: HP(6),
        backgroundColor: COLORS.primaryColor,
        flexDirection:'row',
        borderRadius: WP(3),
        justifyContent: 'space-evenly',
        alignItems: "center",
        elevation: 5,

        marginVertical:WP(SPACING_PERCENT/2),
   },
   _lable: {
        color: COLORS.whiteColor,
        fontSize: WP(5),
        fontWeight: "bold"
   },

});
