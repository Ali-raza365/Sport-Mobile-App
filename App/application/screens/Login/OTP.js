import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Button, LabelInput, Loader } from '../../components';
import {
    COLORS,
    FONT,
    FONT_MEDIUM,
    FONT_SEMIBOLD,
    HP,
    IMAGES,
    SPACING_PERCENT,
    TEXT_SIZES,
    WP,
} from '../../theme/config';

import FontAwes from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OTPTextView from 'react-native-otp-textinput';



export default function OTP({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const onLoginBtnClick = () => navigation.navigate("signuptype")

    return (
        <SafeAreaView style={Styles._mainContainer}>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    padding: WP(5),
                    // backgroundColor:'cyan'
                }}>
                <Loader isVisible={loading} />
                <Image source={IMAGES.mainLogo} style={Styles._logoMain} />
                <Text style={Styles._textMain}>Please Enter OTP Sent {'\n'}to Your Mobile Number</Text>

                <View style={{ width: '100%', height: '100%', marginTop: HP(10), }}>

                    <OTPTextView
                        handleTextChange={e => { }}
                        containerStyle={Styles.textInputContainer}
                        textInputStyle={Styles.roundedTextInput}
                        tintColor={COLORS.primaryColor}
                        offTintColor={COLORS.borderColor}
                        inputCount={4}
                    />

                    <Button
                        onPress={() => { onLoginBtnClick() }}
                        lable={'Sign Up'}
                        styles={{ width: '100%', marginTop: WP(SPACING_PERCENT / 4) }}
                    />
                    <Text style={[Styles._textMain, { textAlign: 'center', marginTop: WP(SPACING_PERCENT/2), fontWeight: 'bold' }]}>Resend OTP?</Text>
                </View>
            </ScrollView>

            <View style={{
                flexDirection: "row", justifyContent: "space-between",
                position: 'absolute',
                bottom: 5,
                left: 3,
            }}>
                <Text style={Styles._dontText}>
                    Already An Account?
                </Text>
                <Text
                    onPress={() => {
                        navigation.navigate('login');
                    }}
                    style={[Styles._dontText, { bottom: 5, color: COLORS.secondaryColor, fontWeight: '400' }]}>       Sign In
                    {" "} <FontAwes name="caret-right" color={COLORS.secondaryColor} size={WP(5)} />
                </Text>
            </View>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    _logoMain: {
        width: WP(30),
        resizeMode: 'contain',
    },
    _textMain: {
        color: COLORS.darkGrey,
        fontSize: WP(TEXT_SIZES.info_2),
        fontWeight: '500',
        letterSpacing: 1,
    },
    _inputContainer: {
        marginTop: WP(SPACING_PERCENT * 1.5),
    },
    _forgotText: {
        color: COLORS.primaryColor,
        fontSize: WP(TEXT_SIZES.info_1),
        textAlign: 'right',
        padding: WP(SPACING_PERCENT / 2),
    },
    _dontText: {
        color: COLORS.blackColor,
        fontSize: WP(TEXT_SIZES.h3),
        fontWeight: 'bold',
        textAlign: 'center',
        padding: WP(SPACING_PERCENT)
    },
    _button: {
        width: WP(14),
        height: WP(14),
        backgroundColor: COLORS.primaryColor,
        borderRadius: WP(50),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        marginTop: WP(3),
    },
    textInputContainer: {
        marginBottom: 30,
    },
    roundedTextInput: {
        width: WP(18),
        height: WP(18),
        borderRadius: 10,
        borderWidth: 3,
    },
});
