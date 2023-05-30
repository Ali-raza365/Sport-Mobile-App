import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from '../../theme/config'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Linking } from 'react-native'

export default function Settings({ navigation }) {
    return (
        <SafeAreaView style={Styles._mainContainer}>
            <TouchableOpacity
                style={Styles._accSetMain}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("accountsettings")}
            >
                <View style={Styles._avtarMain}>
                    <Image
                        source={require("../../assets/images/man.png")}
                        style={Styles._avtar}
                    />
                </View>
                <View style={Styles._infoMain}>
                    <Text style={Styles._nameHeading}>Demo User</Text>
                    <Text style={Styles._username}>example@gmail.com</Text>
                </View>
                <View style={Styles._iconMain}>
                    <Ionicons
                        name='chevron-forward'
                        color={COLORS.primaryColor}
                        size={WP(8)}
                    />
                </View>
            </TouchableOpacity>
            {/*                
               <TouchableOpacity
                    style={Styles._cardMain}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("account")}
               >
                    <View style={Styles._cardIconMain}>
                         <Ionicons
                              name='key-outline'
                              color={COLORS.primaryColor}
                              size={WP(7)}
                         />
                    </View>
                    <View style={Styles._cardInfoMain}>
                         <Text style={[Styles._username, { color: COLORS.primaryColor, fontSize: WP(4.3), fontWeight: "500" }]}>Account</Text>
                         <Text style={[Styles._nameHeading, { color: COLORS.grey, fontSize: WP(3) }]}>Change Number, Delete Account</Text>
                    </View>
               </TouchableOpacity>

               <TouchableOpacity
                    style={Styles._cardMain}
                    activeOpacity={0.8}
               >
                    <View style={Styles._cardIconMain}>
                         <Ionicons
                              name='people-outline'
                              color={COLORS.primaryColor}
                              size={WP(7)}
                         />
                    </View>
                    <View style={Styles._cardInfoMain}>
                         <Text style={[Styles._username, { color: COLORS.primaryColor, fontSize: WP(4.3), fontWeight: "500" }]}>Invite</Text>
                         <Text style={[Styles._nameHeading, { color: COLORS.grey, fontSize: WP(3) }]}>Invite Your Friends on Connection</Text>
                    </View>
               </TouchableOpacity> */}

            <TouchableOpacity
                style={Styles._cardMain}
                activeOpacity={0.8}
                onPress={() => Linking.openURL("https://www.google.com/search?q=help")}
            >
                <View style={Styles._cardIconMain}>
                    <Ionicons
                        name='help-circle-outline'
                        color={COLORS.primaryColor}
                        size={WP(7)}
                    />
                </View>
                <View style={Styles._cardInfoMain}>
                    <Text style={[Styles._username, { color: COLORS.primaryColor, fontSize: WP(4.3), fontWeight: "500" }]}>Help</Text>
                    <Text style={[Styles._nameHeading, { color: COLORS.grey, fontSize: WP(3) }]}>Get Help, Contact us, Privacy Policy</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    _accSetMain: {
        width: "100%",
        height: HP(10),
        // backgroundColor: COLORS.redColor,
        flexDirection: "row",
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.6,
        marginBottom: WP(5)
    },
    _avtarMain: {
        width: "20%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: COLORS.greenColor
    },
    _avtar: {
        width: WP(16),
        height: WP(16),
        resizeMode: "contain"
    },
    _infoMain: {
        width: "70%",
        height: "100%",
        justifyContent: "center",
        paddingLeft: WP(4)
    },
    _nameHeading: {
        color: COLORS.primaryColor,
        fontSize: WP(4),
    },
    _username: {
        color: COLORS.lightGrey,
        fontSize: WP(4)
    },
    _iconMain: {
        width: "10%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    _cardMain: {
        width: "100%",
        height: HP(8),
        backgroundColor: COLORS.primaryColor,
        flexDirection: "row",
    },
    _cardIconMain: {
        width: "20%",
        height: "100%",
        backgroundColor: COLORS.whiteColor,
        justifyContent: "center",
        alignItems: "center",
    },
    _cardInfoMain: {
        width: "80%",
        height: "100%",
        backgroundColor: COLORS.whiteColor,
        justifyContent: "center",
        // alignItems: "center",
    },
})