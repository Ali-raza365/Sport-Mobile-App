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
    IMAGES,
    SPACING_PERCENT,
    TEXT_SIZES,
    WP,
} from '../../theme/config';

import FontAwes from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



export default function SignupDeliveryInfo({ navigation }) {
    // const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [showPass, setShowPass] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmShowPass, setConfirmShowPass] = useState(false)

    const onSignUpBtnClick = async () => {
        navigation.navigate('locationsignup')
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
                <Image source={IMAGES.mainLogo} style={Styles._logoMain} />
                <Text style={Styles._textMain}>Sign Up</Text>

                <View style={{ width: '100%', height: '100%' }}>
                    <View style={Styles._inputContainer}>
                        <LabelInput
                            label={'Upload Lisence'}
                            value={email}
                            keyboard='email-address'
                            onChangeText={val => setEmail(val)}
                            Icon={<MaterialComIcons style={[Styles._icon]} size={WP(8)} bold color={COLORS.primaryColor} name={"cloud-upload-outline"} />}
                            IconShow={true}
                            edit={false}
                            onIconPress={() => { navigation.navigate('signupfilesupload', { fileTitle: 'lisence' }) }}


                        />
                        <LabelInput
                            containerStyle={Styles._Labelinput}
                            label={'Upload Personal Photo'}
                            value={email}
                            keyboard='phone-pad'
                            onChangeText={val => setEmail(val)}
                            Icon={<MaterialComIcons style={[Styles._icon]} size={WP(8)} bold color={COLORS.primaryColor} name={"cloud-upload-outline"} />}
                            IconShow={true}
                            edit={false}
                            onIconPress={() => { navigation.navigate('signupfilesupload', { fileTitle: 'personl' }) }}

                        />
                        <LabelInput
                            label={'Password'}
                            onIconPress={() => { setShowPass(!showPass) }}
                            containerStyle={Styles._Labelinput}
                            secureTextEntry={!showPass}
                            Icon={<Ionicons style={[Styles._icon]} size={20} bold color={COLORS.gray500} name={!showPass ? "ios-eye-off" : 'ios-eye'} />}
                            IconShow={true}
                            value={password}
                            onChangeText={val => setpassword(val)}
                        />

                        <LabelInput
                            label={'Confirm Password'}
                            onIconPress={() => { setConfirmShowPass(!confirmShowPass) }}
                            containerStyle={Styles._Labelinput}
                            secureTextEntry={!confirmShowPass}
                            Icon={<Ionicons style={[Styles._icon]} size={20} bold color={COLORS.gray500} name={!showPass ? "ios-eye-off" : 'ios-eye'} />}
                            IconShow={true}
                            value={confirmPassword}
                            onChangeText={val => setConfirmPassword(val)}
                        />

                    </View>
                    <Button
                        onPress={() => { onSignUpBtnClick() }}
                        lable={'Conitnue'}
                        styles={{ width: '100%', marginTop: WP(SPACING_PERCENT * 2) }}
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
