import React, { useState } from 'react';
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
import { Button, LabelInput, Loader } from '../../components';
import { COLORS, SPACING_PERCENT, WP } from '../../theme/config';
import UserStore from '../../Store/UserStore';
import { isValidEmail } from '../../utils/Validation';
import { _gotoAuthStack } from '../../navigation/navigationServcies';

const ResetPasswordScreen = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const { email } = route?.params
  // const email = 'mianraza645@gmail.com'
  const { changePassword } = UserStore()

  const onSubmit = () => {
    if (!isValidEmail(email)) {
      alert('Email adress not valid')
      return
    } else if (!newPassword) {
      alert('Password is required')
      return
    }
    else if (newPassword?.length < 6) {
      alert('Password should be 6 characters long')
      return
    }
    else if (newPassword !== ConfirmPassword) {
      alert('Confirm password does not match. Please ensure both passwords are the same.')
      return
    }

    setisLoading(true)
    changePassword({ email, newPassword }).then((res) => {
      if (res?.message) {
        alert(res?.message)
        _gotoAuthStack(navigation)
      }
      setisLoading(false)
    }).catch(() => {
      setisLoading(false)
    })

  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Loader isVisible={isLoading} />
      <KeyboardAwareScrollView behavior="position" style={styles.mainCon}>
        <View style={{ padding: 20 }}>
        </View>
        <View style={{ position: 'relative', bottom: 30 }}>
          <View style={styles.loginIcon}>
            <SvgIcon icon={'reset'} width={300} height={300} />
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Reset{'\n'}Password</Text>
            </View>
            <View style={styles.formCon}>
              <View style={[styles.textBoxCon,]}>
                <LabelInput
                  value={newPassword}
                  secureTextEntry={true}
                  onChangeText={(txt) => { setNewPassword(txt) }}
                  containerStyle={{ flex: 1 }}
                  placeholder={"New Password"}
                />
              </View>
              <View style={[styles.textBoxCon,]}>
                <LabelInput
                  value={ConfirmPassword}
                  onChangeText={(txt) => { setConfirmPassword(txt) }}
                  secureTextEntry={true}
                  containerStyle={{ flex: 1 }}
                  placeholder={"Confirm New Password"}
                />
              </View>
            </View>

            <Button
              onPress={onSubmit}
              lable={'Submit'} styles={{ width: '100%', marginTop: WP(SPACING_PERCENT) }} />

          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  _inputContainer: {
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
    bottom: 20,
  },
  loginLbl: {
    color: '#000',
    fontSize: 40,
  },
  at: {
    alignSelf: 'center',
    width: '10%',
  },
  show: {
    alignSelf: 'center',
    width: '10%',
    position: 'relative',
    right: 20,
    zIndex: 10,
  },
  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "flex-end",
    flex: 1,
    // backgroundColor:"red",

  },
  textCon: {
    width: '90%',
  },
  passCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  forgotAction: {
    paddingVertical: 20,
  },
  registerCon: { flexDirection: 'row', justifyContent: 'center', paddingTop: 10 },
  registerLbl: { color: COLORS.primaryColor, },
  registerNew: {
    color: '#aaa',
  },
  forgotLbl: {
    color: COLORS.primaryColor,
    textAlign: 'right',
  },
  LoginBtn: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 10,
  },
  devider: {
    borderBottomColor: '#aaa',
    marginTop: 20,
  },
  or: {
    color: '#aaa',
    textAlign: 'center',
    backgroundColor: '#fff',
    width: 60,
    alignSelf: 'center',
    position: 'relative',
    bottom: 13,
  },
  deviderCon: {
    paddingVertical: 10,
  },
  googleIconCon: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  googleLbl: {
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});