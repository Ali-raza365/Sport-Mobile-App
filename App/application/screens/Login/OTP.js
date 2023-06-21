import React, { Component, useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgIcon from '../../assets/SvgIcon';
import { Button, Loader } from '../../components';
import { COLORS, SPACING_PERCENT, WP } from '../../theme/config';
import Feather from 'react-native-vector-icons/Feather';
import UserStore from '../../Store/UserStore';
import { isValidEmail } from '../../utils/Validation';


const OTPScreen = ({ navigation, route }) => {
    const [isLoading, setisLoading] = useState(false)
    const [OTP, setOTP] = useState('')
    const { email } = route?.params
    // const email = 'mianraza645@gmail.com'
    const { forgotPassword, verifyOTP } = UserStore()
    const resendOTP = () => {
        if (!isValidEmail(email)) {
            alert('Please enter a valid email adress')
            return
        }
        setisLoading(true)
        forgotPassword(email || '').then((res) => {
            if (res?.message) {
                alert(res?.message)
                navigation.navigate('OTP')
            }
            setisLoading(false)
        }).catch(() => {
            setisLoading(false)
        })

    };
    const onSubmit = () => {
        if (!isValidEmail(email)) {
            alert('email adress not valid')
            return
        }
        if (!OTP) {
            alert('6-Digit OTP Code Required. Please enter the code to proceed.')
            return
        }
        setisLoading(true)
        verifyOTP({ email, otp: OTP }).then((res) => {
            if (res?.message) {
                alert(res?.message)
                navigation.navigate('ResetPassword',{email,OTP})
            }
            setisLoading(false)
        }).catch(() => {
            setisLoading(false)
        })


        
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader isVisible={isLoading} />
            <KeyboardAwareScrollView style={styles.mainCon}>
                <View style={{ padding: 20 }}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left" color={COLORS.blackColor} size={WP(8)} />

                    </Pressable>
                </View>
                <View style={{ position: 'relative', bottom: 30 }}>
                    <View style={styles.loginIcon}>
                        <SvgIcon icon={'enterOtp'} width={280} height={280} />
                    </View>
                    <View style={styles.container}>
                        <View style={styles.loginLblCon}>
                            <Text style={styles.loginLbl}>Enter OTP?</Text>
                        </View>
                        <View style={styles.forgotDes}>
                            <Text style={styles.forgotDesLbl}>
                                An 6 digit code has been sent to
                            </Text>
                            <Text style={styles.forgotDesLbl}>{email || ''}</Text>
                        </View>
                        <View style={styles.formCon}>
                            <OTPTextView
                                handleTextChange={e => { setOTP(e) }}
                                containerStyle={styles.textInputContainer}
                                textInputStyle={styles.roundedTextInput}
                                tintColor={COLORS.primaryColor}
                                offTintColor={COLORS.borderColor}
                                inputCount={6}
                            />

                            <Button
                                onPress={() => { onSubmit() }}
                                lable={'Submit'}
                                styles={{ width: '100%', marginTop: WP(SPACING_PERCENT / 4) }}
                            />
                            <Pressable onPress={resendOTP}>
                                <Text style={styles.registerLbl}>Resend OTP</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default OTPScreen

const styles = StyleSheet.create({
    mainCon: {
        backgroundColor: '#fff',
        flex: 1,
    },
    loginIcon: {
        alignSelf: 'center',
    },
    textInputContainer: {
        marginBottom: 30,
    },
    roundedTextInput: {
        width: WP(12.5),
        height: WP(12.5),
        borderRadius: 10,
        borderWidth: 3,
    },
    container: {
        paddingHorizontal: 20,
        marginTop: 50,
    },
    loginLblCon: {
        position: 'relative',
        bottom: 40,
    },
    loginLbl: {
        color: '#000',
        fontSize: 40,
    },
    forgotDes: {
        position: 'relative',
        bottom: 35,
    },
    forgotDesLbl: {
        color: '#000',
        fontSize: WP(4),
    },
    registerLbl: { color: COLORS.primaryColor, textAlign: "center", fontSize: WP(4), padding: WP(3) },
});