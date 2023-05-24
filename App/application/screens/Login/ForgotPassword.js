import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IonIcons from "react-native-vector-icons/Ionicons"
import { Button, LabelInput } from '../../components'
import { COLORS, FONT, FONT_BOLD, FONT_MEDIUM, FONT_SEMIBOLD, IMAGES, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config'

export default function ForgotPassword({ navigation }) {


     return (
          <SafeAreaView style={Styles._mainContainer}>
               {/* <Loader
                    isVisible={Loading}
               /> */}
               <ScrollView contentContainerStyle={{
                    alignItems: "center",
                    padding: WP(5),
                    // backgroundColor:'cyan'
               }}>
                    <View style={{ width: '100%' }}>
                         <Text style={Styles._textMain}>Please enter your email to reset password</Text>

                         <View style={Styles._inputContainer}>
                              <LabelInput
                                   placeholder={"Email"}
                                   // label={'Email'}
                                   // inputStyle={{ //fontFamily: FONT , paddingTop:0,}}
                              />
                         </View>
                         <Button lable={'Reset password'} styles={{ width: '100%', marginTop: WP(SPACING_PERCENT) }} />
                    </View>
               </ScrollView>
          </SafeAreaView>
     )
}

const Styles = StyleSheet.create({
     _mainContainer: {
          flex: 1,
          backgroundColor: COLORS.whiteColor,
     },
     _textMain: {
          color: COLORS.secondaryColor,
          fontSize: WP(TEXT_SIZES.info_1),
          //fontFamily: FONT_MEDIUM,
     },
     _inputContainer: {
          // marginTop: WP(SPACING_PERCENT * 1.5),
     },
     _forgotText: {
          color: COLORS.primaryColor,
          fontSize: WP(TEXT_SIZES.info_1),
          //fontFamily: FONT_MEDIUM,
          textAlign: 'right',
          padding: WP(SPACING_PERCENT / 2)
     },
     _dontText: {
          color: COLORS.secondaryColor,
          fontSize: WP(TEXT_SIZES.info_1),
          //fontFamily: FONT,
          textAlign: 'center',
          padding: WP(SPACING_PERCENT / 2)
     },
     _button: {
          width: WP(14),
          height: WP(14),
          backgroundColor: COLORS.primaryColor,
          borderRadius: WP(50),
          justifyContent: "center",
          alignItems: "center",
          elevation: 8,
          marginTop: WP(3)
     },
})