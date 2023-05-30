import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Button, LabelInput, Loader } from '../../components';
import {
    COLORS,
    SPACING_PERCENT,
    TEXT_SIZES,
    WP
} from '../../theme/config';

import FontAwes from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SIGN_UP_API } from '../../api/apis';
import { handleAxiosError } from '../../utils/ErrorHandler';
import { isValidEmail } from '../../utils/Validation';
import { _gotoHomeNavigator } from '../../navigation/navigationServcies';
import UserStore from '../../Store/UserStore';
import { _setItem } from '../../utils/async';


const signupSucess = UserStore((state) => state.signupSucess);


export default function Signup({ navigation }) {
    // const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setpassword] = useState('');
    const [showPass, setShowPass] = useState(false)

    const onSignUpBtnClick = async () => {
        if (email == '') alert('Email is required');
        else if (!isValidEmail(email)) alert('Email is invalid');
        if (name == '') alert('Name is required');
        else if (password == '') alert('Password is required');
        else if (password.length <= 5)
            alert('Password should be at least 6 characters long');
        else {
            setLoading(true);
            let details = {
                email: email.trim().toLowerCase(),
                fullname: name,
                password: password,
            };
            await SIGN_UP_API(details)
                .then(resp => {
                    setLoading(false);
                    console.log(resp.data)

                    _setItem('token', resp?.data?.access_token || null)
                        .then(async () => {
                            setLoading(false)
                            signupSucess(resp?.data)
                            setTimeout(() => {
                                _gotoHomeNavigator(navigation);
                                setLoading(false)
                            }, 500);
                        })
                        .catch(error => {
                            setLoading(false);
                            alert(error.msg);
                        });
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
                <Text style={{ fontSize: WP(8), fontWeight: '700', letterSpacing: 0.8, marginTop: WP(4) }} >Team Mates</Text>

                <Text style={Styles._textMain}>Sign Up</Text>

                <View style={{ width: '100%', height: '100%' }}>
                    <View style={Styles._inputContainer}>
                        <LabelInput
                            placeholder={'Enter Your Email Address'}
                            label={'Email Address'}
                            value={email}
                            keyboard='email-address'
                            onChangeText={val => setEmail(val)}
                        />

                        <LabelInput
                            containerStyle={Styles._Labelinput}
                            placeholder={'Enter Your Name'}
                            label={'Name'}
                            value={name}
                            keyboard='email-address'
                            onChangeText={val => setName(val)}
                        />

                        {/* <LabelInput
                            containerStyle={Styles._Labelinput}
                            placeholder={'Enter Your Phone Number'}
                            label={'Phone Number'}
                            value={email}
                            keyboard='phone-pad'
                            onChangeText={val => setEmail(val)}
                        /> */}
                        {/* <LabelInput
                            containerStyle={Styles._Labelinput}
                            placeholder={'Enter Your Date Of Birth'}
                            label={'Date Of Birth'}
                            value={email}
                            onIconPress={()=>alert('select date of birth')}
                            Icon={<SimpleLineIcons style={[Styles._icon]} size={17} bold color={COLORS.primaryColor} name={"calendar"} />}
                            IconShow={true}
                            keyboard='phone-pad'
                            onChangeText={val => setEmail(val)}
                        /> */}

                        <LabelInput
                            placeholder={'Enter Your Password'}
                            label={'Password'}
                            onIconPress={() => { setShowPass(!showPass) }}
                            containerStyle={Styles._Labelinput}
                            secureTextEntry={!showPass}
                            Icon={<Ionicons style={[Styles._icon]} size={20} bold color={COLORS.gray500} name={!showPass ? "ios-eye-off" : 'ios-eye'} />}
                            IconShow={true}
                            value={password}
                            onChangeText={val => setpassword(val)}
                        />

                    </View>
                    <Button
                        onPress={() => { onSignUpBtnClick() }}
                        lable={'Continue'}
                        styles={{ width: '100%', marginTop: WP(SPACING_PERCENT) }}
                    />
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
    _Labelinput: {
        marginTop: WP(SPACING_PERCENT),
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
