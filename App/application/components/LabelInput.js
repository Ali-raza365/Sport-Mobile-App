import React from 'react';
import { StyleSheet, TouchableOpacity,TextInput, Text, View, I18nManager } from 'react-native';
import {
  COLORS,
  FONT,
  HP,
  INPUT_HEIGHT,
  RADIUS,
  SPACING_PERCENT,
  TEXT_SIZES,
  WP,
} from '../theme/config';

const LabelInput = ({
  label,
  Icon,
  IconShow,
  placeholder,
  value,
  onChangeText,
  editable,
  stric,
  edit,
  width,
  secureTextEntry,
  inputStyle,
  containerStyle,
  keyboard,
  maxLength,
  onIconPress,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <Text
        style={[
          Styles._label,
          { color: edit == false ? COLORS.blackColor : COLORS.blackColor },
        ]}>
        {label} {stric ? '*' : ''}
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: COLORS.borderColor,
          borderRadius: WP(RADIUS),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          {...props}
          selectionColor={COLORS.secondaryColor}
          editable={editable || edit}
          placeholder={placeholder}
          placeholderTextColor={COLORS.darkGrey}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          value={value}
          keyboardType={
            keyboard == 'default' || keyboard == null || keyboard == undefined
              ? 'default'
              : keyboard
                ? keyboard
                : 'number-pad'
          }
          onChangeText={onChangeText}
          style={[
            Styles._inputStyle,
            {
              backgroundColor:
                editable == false ? COLORS.grey : COLORS.whiteColor,
              color: editable == false ? COLORS.whiteColor : COLORS.blackColor,
            },
            inputStyle,
          ]}
        />
        {IconShow && Icon ? (
          <>
            <TouchableOpacity
              disabled={onIconPress ? false : true}
              onPress={onIconPress ? onIconPress : null}
              style={Styles.iconContainer}>
              {Icon}
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  _inputStyle: {
    height: HP(INPUT_HEIGHT),
    //    fontFamily: FONT,
    flex: 1,
    fontSize: WP(TEXT_SIZES.info_1),
    backgroundColor: 'red',

    paddingHorizontal: WP(SPACING_PERCENT / 2),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  _label: {
    //    fontFamily: FONT,
    fontSize: WP(TEXT_SIZES.info_1),
    color: COLORS.blackColor,
    marginBottom: WP(SPACING_PERCENT / 5),
    textAlign: 'left',
  },
  iconContainer: {
    right: 10,
  },
  _icon: {
    fontSize: 20,
  },
});

export default LabelInput;
