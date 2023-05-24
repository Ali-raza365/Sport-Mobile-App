import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { COLORS, HP, WP } from "../../theme/config"
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

export default function AccountSettings() {
     return (
          <SafeAreaView style={Styles._mainContainer}>
               <View style={Styles._dpMain}>
                    <Image
                         source={require("../../assets/images/man.png")}
                         style={Styles._dpStyle}
                    />
                    <TouchableOpacity
                         style={Styles._cameraBtn}
                         activeOpacity={0.8}
                    >
                         <Ionicons
                              name='camera-outline'
                              color={COLORS.primaryColor}
                              size={WP(6)}
                         />
                    </TouchableOpacity>
               </View>
               <View style={Styles._infoMain}>
                    <View style={Styles._infoCard}>
                         <View style={Styles._iconMain}>
                              <Ionicons
                                   name='ios-person-outline'
                                   color={COLORS.primaryColor}
                                   size={WP(6)}
                              />
                         </View>
                         <View style={Styles._usernameMain}>
                              <Text style={Styles._nameHeading}>Username</Text>
                              <Text style={Styles._username}>Demo User</Text>
                         </View>
                         <View style={Styles._editMain}>
                              <TouchableOpacity>
                                   <Feather
                                        name='edit-2'
                                        color={COLORS.primaryColor}
                                        size={WP(6)}
                                   />
                              </TouchableOpacity>
                         </View>
                    </View>

                    <View style={Styles._infoCard}>
                         <View style={Styles._iconMain}>
                              <Ionicons
                                   name='mail-outline'
                                   color={COLORS.primaryColor}
                                   size={WP(6)}
                              />
                         </View>
                         <View style={Styles._usernameMain}>
                              <Text style={Styles._nameHeading}>Email</Text>
                              <Text style={Styles._username}>example@gmail.com</Text>
                         </View>
                         <View style={Styles._editMain}>
                              <TouchableOpacity>
                                   <Feather
                                        name='edit-2'
                                        color={COLORS.primaryColor}
                                        size={WP(6)}
                                   />
                              </TouchableOpacity>
                         </View>
                    </View>
               </View>
          </SafeAreaView>
     )
}

const Styles = StyleSheet.create({
     _mainContainer: {
          flex: 1,
          backgroundColor: COLORS.whiteColor
     },
     _dpMain: {
          width: "100%",
          height: HP(25),
          backgroundColor: COLORS.primaryColor,
          justifyContent: "center",
          alignItems: "center",
     },
     _dpStyle: {
          width: WP(40),
          height: WP(40),
          resizeMode: "cover"
     },
     _cameraBtn: {
          width: WP(12),
          height: WP(12),
          backgroundColor: COLORS.whiteColor,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: WP(50),
          position: "absolute",
          bottom: 10,
          right: WP(32)
     },
     _infoMain: {
          width: "100%",
          height: WP(40),
          backgroundColor: COLORS.whiteColor,
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: WP(2),
          marginTop: HP(5)
     },
     _infoCard: {
          width: "100%",
          height: "40%",
          backgroundColor: COLORS.whiteColor,
          flexDirection: "row",
          borderBottomColor: COLORS.grey,
          borderBottomWidth: 0.6,
     },
     _iconMain: {
          height: "100%",
          width: "20%",
          backgroundColor: COLORS.whiteColor,
          justifyContent: "center",
          alignItems: "center",
     },
     _usernameMain: {
          width: "65%",
          height: "100%",
          backgroundColor: COLORS.whiteColor,
          justifyContent: "center",
          // alignItems: "center",
     },
     _editMain: {
          width: "15%",
          height: "100%",
          backgroundColor: COLORS.whiteColor,
          justifyContent: "center",
          alignItems: "center",
     },
     _nameHeading: {
          color: COLORS.primaryColor,
          fontSize: WP(3.5),
     },
     _username: {
          color: COLORS.lightGrey,
          fontSize: WP(4.4)
     },
})