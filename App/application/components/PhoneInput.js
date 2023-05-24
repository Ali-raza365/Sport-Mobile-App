import React from 'react';
import {
     StyleSheet,
     TextInput,
     View,
     Text
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { COLORS, FONT, TEXT_SIZES, INPUT_HEIGHT, RADIUS, SPACING_PERCENT, HP, WP } from '../theme/config';

const CountryPhoneInput = ({ defaultValue, containerStyle, textContainerStyle, onChangeFormattedText, defaultCode, ref, onChangeText, placeholder, maxLength, isError, errorMess }) => {
     return (
          <View>
               <PhoneInput
                    ref={ref}
                    defaultValue={defaultValue}
                    defaultCode={defaultCode}
                    layout="first"
                    containerStyle={Styles.phoneContainer}
                    textContainerStyle={Styles.textInput}
                    onChangeFormattedText={onChangeFormattedText}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
               />
               {
                    isError ? (
                         <Text style={Styles._errorTxt}>{errorMess}</Text>
                    ) : (
                         null
                    )
               }

          </View>
     );
}

const Styles = StyleSheet.create({
     phoneContainer: {
          width: WP(80),
          height: HP(INPUT_HEIGHT),
          marginBottom: HP(3),
          borderBottomColor: COLORS.primaryColor,
          borderBottomWidth: 1,
     },
     textInput: {
          paddingVertical: 0,
          borderBottomColor: COLORS.primaryColor,
          borderBottomWidth: 0,
          backgroundColor: COLORS.whiteColor,
     },
     _errorTxt: {
          color: COLORS.redColor
     },
});

export default CountryPhoneInput;