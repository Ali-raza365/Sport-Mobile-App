import React, { useState } from 'react';
import {
    Image, Pressable, SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button, LabelInput, Loader } from '../../components';
import {
    COLORS, IMAGES,
    SPACING_PERCENT,
    TEXT_SIZES,
    WP
} from '../../theme/config';

import FontAwes from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { _gotoHomeNavigator } from '../../navigation/navigationServcies';
import { handleAxiosError } from '../../utils/ErrorHandler';
import { LOGIN_API } from '../../api/apis';
import { isValidEmail } from '../../utils/Validation';
import { _setItem } from '../../utils/async';



export default function Login({ navigation }) {
    // const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [showPass, setShowPass] = useState(false)

    // const onLoginBtnClick = () => _gotoHomeNavigator(navigation);

    const onLoginBtnClick = async () => {
        if (email == '') alert('Email is required');
        else if (!isValidEmail(email)) alert('Email is invalid');
        else if (password == '') alert('Password is required');
        else if (password.length <= 5)
            alert('Password should be at least 6 characters long');
        else {
            setLoading(true);
            let details = {
                email: email.trim().toLowerCase(),
                password: password,
            };
            await LOGIN_API(details)
                .then(resp => {
                    _setItem('token', resp?.data?.accesstoken || undefined)
                        .then(async () => {
                             setLoading(false)
                            //  dispatch(_onProfileChange(resp.data?.accesstoken ,resp.data?.user ));
                            setTimeout(() => {
                                _gotoHomeNavigator(navigation);
                            }, 500);
                        })
                        .catch(error => {
                            setLoading(false);
                            handleAxiosError(error)
                        });
                    // console.log(resp.data)∏
                })
                .catch(error => {
                    setLoading(false);
                  handleAxiosError(error)
                });
        }
    };

    return (
        <SafeAreaView style={Styles._mainContainer}>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    padding: WP(5),
                    // backgroundColor:'cyan'
                }}>
                <Loader isVisible={loading} />
                {/* <Image source={IMAGES.mainLogo} style={Styles._logoMain} /> */}
                <Text style={{ fontSize: WP(8), fontWeight: '700', letterSpacing: 0.8, marginTop:WP(4) }} >Team Mates</Text>

                <Text style={Styles._textMain}>Sign In</Text>

                <View style={{ width: '100%', height: '100%' }}>
                    <View style={Styles._inputContainer}>
                        <LabelInput
                            placeholder={'Enter your Email'}
                            label={'Email'}
                            value={email}
                            Icon={<MaterialIcons style={[Styles._icon]} size={20} bold color={COLORS.primaryColor} name="done" />}
                            IconShow={true}
                            onChangeText={val => setEmail(val)}
                        />
                        <LabelInput
                            placeholder={'Enter your password'}
                            label={'Password'}
                            onIconPress={() => { setShowPass(!showPass) }}
                            containerStyle={{ marginTop: WP(SPACING_PERCENT / 2) }}
                            secureTextEntry={!showPass}
                            Icon={<Ionicons style={[Styles._icon]} size={20} bold color={COLORS.gray500} name={!showPass ? "ios-eye-off" : 'ios-eye'} />}
                            IconShow={true}
                            value={password}
                            onChangeText={val => setpassword(val)}
                        />

                        <Text
                            onPress={() => {
                                navigation.navigate('forgotpassword');
                            }}
                            style={Styles._forgotText}>
                            Forgot password
                        </Text>
                    </View>
                    <Button
                        onPress={() => { onLoginBtnClick() }}
                        lable={'Login'}
                        styles={{ width: '100%', marginTop: WP(SPACING_PERCENT / 4) }}
                    />
                </View>
            </ScrollView>
            <Pressable
                onPress={() => navigation.navigate("signup")}
                style={{
                    flexDirection: "row", justifyContent: "space-between",
                    position: 'absolute',
                    bottom: 5,
                    left: 3,
                    // backgroundColor:'cyan'
                }}>
                <Text style={Styles._dontText}>
                    Don't have an account?
                    <Text
                        onPress={() => navigation.navigate("signup")}
                        style={[Styles._dontText, { color: COLORS.secondaryColor, fontWeight: '400' }]}>        Sign Up
                        {" "} <FontAwes name="caret-right" color={COLORS.secondaryColor} size={WP(5)} />
                    </Text>
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    _logoMain: {
        width: WP(40),
        height: WP(20),
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
        padding: WP(SPACING_PERCENT),
        zIndex: 999,

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
});
