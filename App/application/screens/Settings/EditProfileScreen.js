import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useTheme } from 'react-native-paper';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserStore from '../../Store/UserStore';
import { PickerModal } from '../../components';
import { COLORS, HP } from '../../theme/config';
import { isValidNumber, isValidUsername } from '../../utils/Validation';
import { ms, s } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfileScreen = (navigation) => {
    const { user, token, updatePrfiler } = UserStore();
    const [image, setImage] = useState(null);
    const { colors } = useTheme();
    const [userInfo, setUserInfo] = useState({})

    const togglePickerModal = () => {
        if (showPickerModal)
            setShowPickerModal(false)
        else setShowPickerModal(true)
    }
    const [showPickerModal, setShowPickerModal] = useState(false);
    // console.log(user);
    useEffect(() => {
        setUserInfo(user)
    }, [])


    const onChangeHandler = (key, value) => {
        setUserInfo({
            ...userInfo,
            [key]: value
        })
    }

    const onSubmit = () => {
        console.log(image);
        if (userInfo?.username && !isValidUsername(userInfo?.username)) return alert(' Username is invalid. It should be 3 to 16 characters long and may contain letters, digits, and underscores.')
        if (userInfo?.mobile && !isValidNumber(userInfo?.mobile)) return alert('Phone number is invalid. Please enter a 10-digit number.')
        updatePrfiler(token, { ...userInfo, image: image }).then((res) => {

        })
    }


    return (
<KeyboardAwareScrollView>

        <View style={styles.container}>
            <PickerModal
                onBackButtonPress={togglePickerModal}
                onBackdropPress={togglePickerModal}
                isVisible={showPickerModal}
                onCameraPress={(img) => { setImage(img) }}
                onGalleryPress={(img) => { setImage(img) }}
            />
            <View style={{
                margin: 20,
            }}
            >
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={togglePickerModal}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={{
                                    uri: !!image?.uri ? image?.uri : userInfo?.avatar,
                                }}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Icon
                                        name="camera"
                                        size={35}
                                        color="#fff"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {userInfo?.fullname}
                    </Text>
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#666666"
                        onChangeText={(text) => onChangeHandler('fullname', text)}
                        autoCorrect={false}
                        value={userInfo?.fullname}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Username"
                        onChangeText={(text) => onChangeHandler('username', text)}
                        placeholderTextColor="#666666"
                        autoCapitalize='none'
                        value={userInfo?.username}
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="phone" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Phone"
                        placeholderTextColor="#666666"
                        onChangeText={(text) => onChangeHandler('mobile', text)}
                        value={userInfo?.mobile}
                        keyboardType="number-pad"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={colors.text} size={20} />
                    <TextInput
                        placeholder="Email"
                        value={userInfo?.email}
                        placeholderTextColor="#666666"
                        autoCapitalize='none'
                        onChangeText={(text) => onChangeHandler('email', text)}
                        keyboardType="email-address"
                        autoCorrect={false}
                        style={[
                            styles.textInput,
                            {
                                color: colors.text,
                            },
                        ]}
                    />
                </View>
                <TouchableOpacity style={styles.commandButton} onPress={onSubmit}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAwareScrollView>

    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: COLORS.primaryColor,
        alignItems: 'center',
        marginTop: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccc',
        paddingBottom: 5,
        // backgroundColor:"green",
        height:ms(45),
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginLeft: 10,
        height: '100%',
        fontSize: s(12),
        color: '#05375a',
        // backgroundColor:"yellow"
    },
});