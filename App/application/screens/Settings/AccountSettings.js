import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
    Avatar,
    Caption,
    Text,
    Title,
    TouchableRipple,
} from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserStore from '../../Store/UserStore';
import { _gotoAuthStack } from '../../navigation/navigationServcies';
import { COLORS } from '../../theme/config';
import { handleAxiosError } from '../../utils/ErrorHandler';
import { _setItem } from '../../utils/async';

// import Share from 'react-native-share';

// import files from '../assets/filesBase64';

const ProfileScreen = ({ navigation }) => {
    const { user, token } = UserStore();
    console.log(user);

    const myCustomShare = async () => {
        // const shareOptions = {
        //     message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
        //     url: files.appLogo,
        //     // urls: [files.image1, files.image2]
        // }

        // try {
        //     const ShareResponse = await Share.open(shareOptions);
        //     console.log(JSON.stringify(ShareResponse));
        // } catch (error) {
        //     console.log('Error => ', error);
        // }
    };

    const onLogout = () => {
        _setItem('token', "")
            .then(async () => {
                setTimeout(() => {
                    _gotoAuthStack(navigation);
                }, 500);
            })
            .catch(error => {
                handleAxiosError(error)
            });
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('editProfile')}>
                    <Icon name="circle-edit-outline" color={'#777777'} size={30} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: user?.avatar || 'https://api.adorable.io/avatars/80/abott@adorable.png',
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{user?.fullname}</Title>
                        <Caption style={styles.caption}>@{user?.username || '__'}</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                {/* <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Kolkata, India</Text>
                </View> */}
                <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{!!user?.mobile ? user?.mobile : "+XX XXX-XXXXXXX"}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>

            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color={COLORS.primaryColor} size={25} />
                        <Text style={styles.menuItemText}>Your Favorites</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color={COLORS.primaryColor} size={25} />
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={myCustomShare}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" color={COLORS.primaryColor} size={25} />
                        <Text style={styles.menuItemText}>Tell Your Friends</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color={COLORS.primaryColor} size={25} />
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Ionicons name="settings-outline" color={COLORS.primaryColor} size={25} />
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={onLogout}>
                    <View style={styles.menuItem}>
                        <Ionicons name="log-out-outline" color={COLORS.primaryColor} size={25} />
                        <Text style={styles.menuItemText}>Logout</Text>
                    </View>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    editIcon: {
        position: "absolute",
        right: 30,
        top: 30,
        zIndex: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 0,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});