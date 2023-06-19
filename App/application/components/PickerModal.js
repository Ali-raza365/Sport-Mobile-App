import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal"
import { COLORS, HP, WP } from '../theme/config'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function PickerModal({ isVisible, onCameraPress, onGalleryPress, onBackButtonPress, onBackdropPress }) {


  const _onCameraClick = async () => {
    let key = Math.floor(Math.random() * 9999999999);
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message:
              "Tropi wants camera access so that you can easily capture image",
            buttonNegative: "Cancel",
            buttonPositive: "Allow"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          launchCamera({
            mediaType: 'photo',
            quality: 0.3,
          }, (response) => {
            if (response.didCancel) {
              console.log("User cancel the operation");
            }
            else if (response.errorCode) {
              alert("Camera is not available Please check camera permission");
            }
            else {
              onCameraPress({ ...response.assets[0], key })
              onBackButtonPress()
            }
          });
        }
        else {
          console.log("Camera permission denied");
        }
      }
      catch (err) {
        console.warn(err);
      }
    }
    else {
      launchCamera({
        mediaType: 'photo',
        quality: 0.3,
      }, (response) => {
        if (response.didCancel) {
          console.log("User cancel the operation");
        }
        else if (response.errorCode) {
          alert("Camera is not available Please check camera permission");
        }
        else {
          onCameraPress({ ...response.assets[0], key })
          onBackButtonPress()
        }
      });
    }

  }

  const _onGalleryClick = () => {
    let key = Math.floor(Math.random() * 9999999999);
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.3,
      includeBase64: false,
    }, (response) => {
      if (response.didCancel) {
        console.log("User cancell the operation");
      }
      else if (response.errorCode) {
        alert(response.errorMessage);
      }
      else {
        onGalleryPress({ ...response.assets[0], key })
        // console.log({ ...response.assets[0], key: key })
        onBackButtonPress()
      }
    });
  }


  const renderInner = () => (
    <View style={Styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={Styles.panelTitle}>Upload Photo</Text>
        <Text style={Styles.panelSubtitle}>Choose Your Picture</Text>
      </View>
      <TouchableOpacity style={Styles.panelButton} onPress={_onCameraClick}>
        <Text style={Styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.panelButton} onPress={_onGalleryClick}>
        <Text style={Styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.panelButton}
        onPress={onBackdropPress}>
        <Text style={Styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <Modal
      isVisible={isVisible}
      style={Styles._modal}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
    >
      <View style={Styles._modalMain}>
        {/* {renderHeader()} */}
        {renderInner()}
        {/* {
                    onCameraPress ?
                        <TouchableOpacity
                            onPress={() => _onCameraClick()}
                            activeOpacity={0.8}
                            style={Styles._iconMain}
                        >
                            <EvilIcons
                                name='camera'
                                size={WP(15)}
                                color={COLORS.primaryColor}
                            />
                            <Text style={Styles._lable}>Camera</Text>
                        </TouchableOpacity> : null
                }
                {
                    onGalleryPress ?
                        <TouchableOpacity
                            onPress={() => { _onGalleryClick() }}
                            activeOpacity={0.8}
                            style={Styles._iconMain}
                        >
                            <EvilIcons
                                name='image'
                                size={WP(15)}
                                color={COLORS.primaryColor}
                            />
                            <Text style={Styles._lable}>Gallery</Text>
                        </TouchableOpacity> : null
                } */}
      </View>
    </Modal>
  )
}

const Styles = StyleSheet.create({
  _modal: {
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
    padding: 0
  },
  _modalMain: {
    width: WP(100),
    height: HP(40),
    backgroundColor: COLORS.whiteColor,
    borderTopRightRadius: WP(3),
    borderTopLeftRadius: WP(3),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WP(5),
  },
  _iconMain: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: WP(3)
  },
  _lable: {
    // fontSize:WP(3),
    color: COLORS.primaryColor,
    fontWeight: "bold"
  },

  panel: {
    // padding: 20,
    // backgroundColor: '#FFFFFF',
    // paddingTop: 20,
    width: "100%",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
})


