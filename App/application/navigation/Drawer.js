import * as React from 'react';
import { Button, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, Text, Alert } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { DrawerActions, NavigationContainer, useRoute } from '@react-navigation/native';
import HomeStcak from './HomeStack/HomeStack';
import SettingsStack from './SettingsStack/SettingsStack';
import { COLORS, HP, WP } from '../theme/config';
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from "react-native-vector-icons/Octicons"
import { useNavigation, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { _setItem } from '../utils/async';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_USER_ACCOUNT } from '../api/apis';
import { _onJWTTokenSet } from '../redux/reducers/userActions';

const CustomDrawer = (props) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);
    const [loading, setLoading] = React.useState(false);
    const token = useSelector(state => state.user.token);
    console.log(token);


    const _onLogotClick = () => {
        _setItem('token', '').then(() => {
            dispatch(_onJWTTokenSet(null))

            navigation.navigate('authstack')
        }).catch((error) => {
            alert(error.msg)
        })
    }

    const _onDeleteAccAlert = () => {
        Alert.alert(
            "Delete Account?",
            "Once you delete your account, there\'s no getting it back. Make sure you want to do this.",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                { text: "Yes, delete it", onPress: () => _onDeleteAcc() }
            ]
        );

        Alert.alert
        "If you delete your account, all data and settings associated with it will be permanently deleted. Do you really want to delete your account?"
    }

    const _onDeleteAcc = async () => {
        setLoading(true);
        await DELETE_USER_ACCOUNT(token)
            .then(resp => {
                setLoading(false);
                _onLogotClick()
            })
            .catch(error => {
                setLoading(false);
                alert(error.msg);
                console.log(error);
            });
    };

    return (
        <View style={Styles._main}>
            <View style={Styles._imageMain}>
                <View style={Styles._closeButton}>
                    <TouchableOpacity onPress={() => { navigation.dispatch(DrawerActions.closeDrawer()) }}>
                        <AntDesign
                            name='close'
                            color={COLORS.whiteColor}
                            size={WP(6.5)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={Styles._imageContent}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate("settingstack")}
                        activeOpacity={0.8}
                        style={{
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={require("../assets/images/man.png")}
                            style={Styles._avtar}
                        />
                        <Text style={Styles._userName}>{token ? profile?.name || '' : 'Guest User'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DrawerContentScrollView
                // style={{ marginTop: WP('16%') }}
                {...props}
            >
                <View style={Styles._row}>
                    <TouchableOpacity style={Styles._item}
                        onPress={() => navigation.navigate("homestack")}
                    >
                        <AntDesign
                            name='home'
                            color={COLORS.whiteColor}
                            size={WP(6)}
                        />
                        <Text style={Styles._itemText}>Home</Text>
                    </TouchableOpacity>
                </View>

                {/* <View style={Styles._row}>
                    <TouchableOpacity
                        style={Styles._item}
                        onPress={() => navigation.navigate("settingstack")}
                    >
                        <AntDesign
                            name='setting'
                            color={COLORS.whiteColor}
                            size={WP(6)}
                        />
                        <Text style={Styles._itemText}>Settings</Text>
                    </TouchableOpacity>
                </View> */}
                {
                    token ? <>

                        <View style={Styles._row}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('allresult')}
                                style={Styles._item}>
                                <Octicons
                                    name='checklist'
                                    color={COLORS.whiteColor}
                                    size={WP(6)}
                                />
                                <Text style={Styles._itemText}>Results</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles._row}>
                            <TouchableOpacity
                                onPress={() => _onDeleteAccAlert()}
                                style={Styles._item}>
                                <AntDesign
                                    name='delete'
                                    color={COLORS.whiteColor}
                                    size={WP(6)}
                                />
                                <Text style={Styles._itemText}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles._row}>
                            <TouchableOpacity
                                onPress={() => _onLogotClick()}
                                style={Styles._item}>
                                <AntDesign
                                    name='logout'
                                    color={COLORS.whiteColor}
                                    size={WP(6)}
                                />
                                <Text style={Styles._itemText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                        :
                        <View style={Styles._row}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('authstack')}
                                style={Styles._item}>
                                <AntDesign
                                    name='login'
                                    color={COLORS.whiteColor}
                                    size={WP(6)}
                                />
                                <Text style={Styles._itemText}>Login</Text>
                            </TouchableOpacity>
                        </View>

                }
            </DrawerContentScrollView>
        </View>
    )
}

const DrawerNav = createDrawerNavigator();

export default function Drawer({ navigation, route }) {

    const [isVisible, setisVisible] = React.useState(true)
    const screen = useRoute()

    // React.useLayoutEffect(() => {
    //      const routeName = getFocusedRouteNameFromRoute(route)
    //      console.log(screen.name)
    //      if (routeName === "homestack") {
    //           setisVisible(false)
    //      }
    // })

    return (
        <DrawerNav.Navigator
            initialRouteName="homestack"
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{}}
        >
            <DrawerNav.Screen
                name="homestack"
                component={HomeStcak}
                options={() => ({
                    headerShown: false,
                    headerTitle: "Home",
                    headerTintColor: COLORS.whiteColor,
                    headerStyle: {
                        backgroundColor: COLORS.primaryColor
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                style={{
                                    marginRight: WP(4)
                                }}>
                                <AntDesign
                                    name='search1'
                                    color={COLORS.whiteColor}
                                    size={WP(6)}
                                />
                            </TouchableOpacity>
                        )
                    }
                })}
            // options={{
            //      headerTitle: "Home",
            //      headerTintColor: COLORS.whiteColor,
            //      headerStyle: {
            //           backgroundColor: COLORS.primaryColor
            //      },
            //      headerRight: () => {
            //           return (
            //                <TouchableOpacity
            //                     onPress={() => navigation.getParam('increaseCount')}
            //                     style={{
            //                          marginRight: WP(4)
            //                     }}>
            //                     <AntDesign
            //                          name='search1'
            //                          color={COLORS.whiteColor}
            //                          size={WP(6)}
            //                     />
            //                </TouchableOpacity>
            //           )
            //      }
            // }}
            />
            <DrawerNav.Screen
                name="settingstack"
                component={SettingsStack}
                options={{
                    headerShown: false,
                    headerTitle: "Settings",
                    headerTintColor: COLORS.whiteColor,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: COLORS.primaryColor
                    }
                }}
            />
        </DrawerNav.Navigator>
    );
}

const Styles = StyleSheet.create({
    _main: {
        flex: 1,
        backgroundColor: COLORS.primaryColor
    },
    _imageMain: {
        width: "100%",
        height: HP(22),
        backgroundColor: COLORS.primaryColor,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: WP(5),
    },
    _row: {
        width: "90%",
        height: HP(7),
        // backgroundColor: COLORS.yellowColor,
        borderBottomColor: COLORS.whiteColor,
        borderBottomWidth: 0.5,
        marginVertical: WP(1)
    },
    _item: {
        height: "100%",
        width: "100%",
        // backgroundColor: "pink",
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center",
        paddingLeft: WP(5)
    },
    _itemText: {
        color: COLORS.whiteColor,
        fontSize: WP(4),
        paddingHorizontal: WP(3),
        textAlign: "center"
    },
    _closeButton: {
        width: "100%",
        height: "20%",
        // backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: WP(3)
    },
    _imageContent: {
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    _avtar: {
        width: WP(25),
        height: WP(25),
        resizeMode: "cover",
    },
    _userName: {
        color: COLORS.whiteColor,
        fontWeight: "bold",
        fontSize: WP(4),
        marginTop: WP(2)
    },
})