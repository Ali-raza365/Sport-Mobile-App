
import React from 'react';
import {
     Pressable,
     StyleSheet,
     Text,
     View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import SvgIcon from '../../assets/SvgIcon';
import { Button, LabelInput } from '../../components';
import { COLORS, SPACING_PERCENT, WP } from '../../theme/config';

const ForgotPasswordScreen = ({ navigation }) => {

     const forgotPassword = () => {
          
          navigation.navigate('OTP')
     }
     return (
          <SafeAreaView style={{ flex: 1 }}>
               <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>
                    <View style={{ padding: 20 }}>
                         <Pressable onPress={() => navigation.goBack()}>
                              <Feather name="arrow-left" color={COLORS.blackColor} size={WP(8)} />
                         </Pressable>
                    </View>
                    <View style={{ position: 'relative', bottom: 30 }}>
                         <View style={styles.loginIcon}>
                              <SvgIcon icon={'forgot'} width={320} height={320} />
                         </View>
                         <View style={styles.container}>
                              <View style={styles.loginLblCon}>
                                   <Text style={styles.loginLbl}>Forgot Password?</Text>
                              </View>
                              <View style={styles.forgotDes}>
                                   <Text style={styles.forgotDesLbl}>
                                        Don't worry! It happens, please enter the address associated
                                        with your account
                                   </Text>
                              </View>
                                        <LabelInput
                                             placeholder={"Enter your Email"}
                                        />

                              <Button
                                   onPress={forgotPassword}
                                   lable={'Submit'} styles={{ width: '100%', marginTop: WP(SPACING_PERCENT) }} />
                         </View>
                    </View>
               </KeyboardAwareScrollView>
          </SafeAreaView>
     );
}
export default ForgotPasswordScreen


const styles = StyleSheet.create({
     mainCon: {
          backgroundColor: '#fff',
          flex: 1,
     },
     loginIcon: {
          alignSelf: 'center',
     },
     formCon: {
          flexDirection: 'column',
          justifyContent: 'space-around',
     },
     container: {
          paddingHorizontal: 20,
     },
     loginLblCon: {
          position: 'relative',
          bottom: 40,
     },
     loginLbl: {
          color: '#000',
          fontSize: 40,
     },
     at: {
          alignSelf: 'center',
          width: '10%',
     },

     textBoxCon: {
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     textCon: {
          width: '90%',
     },

     textInput: {
          borderBottomColor: '#aaa',
          borderWidth: 1,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          color: '#000',
          fontSize: 16,
          height: 40,
     },

     LoginBtn: {
          backgroundColor: '#0057ff',
          borderRadius: 20,
     },
     loginBtnLbl: {
          textAlign: 'center',
          fontSize: 16,
          color: '#fff',
          paddingVertical: 10,
     },

     forgotDes: {
     },
     forgotDesLbl: {
          color: '#000',
     },
});