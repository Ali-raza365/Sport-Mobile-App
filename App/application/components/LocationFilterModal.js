import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal"
import { COLORS, HP, WP } from '../theme/config'
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@react-native-community/slider'

export default function LocationFilterModal({ isVisible, onSave,onRestPress, onBackButtonPress, onBackdropPress }) {


  const [location, setLocation] = useState({
    radius:5
  })

  const onSavePress = () => {
    onSave(location)
    onBackButtonPress()
  }


  return (
      <Modal
        isVisible={isVisible}
        style={Styles._modal}
        onBackButtonPress={onBackButtonPress}
        onBackdropPress={onBackdropPress}
      >

        <View style={Styles._modalMain}>
          <GooglePlacesAutocomplete
           placeholderTextColor={COLORS.darkGrey}
           currentLocation={true}
            styles={{
              container: { alignSelf: 'center', width: '100%', color: "#000" },
              textInput: {
                backgroundColor: "#fff",
                borderWidth: 0.5,
                borderColor: "#ccc"
              },
            }}
            placeholder='Search Location'
            fetchDetails={true}
            onPress={(data, details = null,) => {
              let cordinate = details?.geometry?.location || null
              console.log(cordinate);
              let name = data?.description
              setLocation( {
                ...location,
                name,
                latitude: cordinate?.lat,
                longitude: cordinate?.lng,
              })

            }}
            query={{
              key: 'AIzaSyAQfjOJ3COtWccJr0gBIexmOu-nvNt853Y',
              language: 'en',
            }}
          />
          <View style={{ marginTop: WP(2), width: '100%' }}>
            <Text style={Styles._heading}>Radius: {location?.radius}</Text>
            <Slider
              step={5}
              value={location?.radius || 5}
              minimumValue={1}
              maximumValue={100}
              minimumTrackTintColor={COLORS.primaryColor}
              maximumTrackTintColor="#000000"
              onValueChange={(val) => { setLocation({ ...location, radius: val }) }}

            />
          </View>
          <TouchableOpacity
            style={Styles.panelButton}
            onPress={onSavePress}>
            <Text style={Styles.panelButtonTitle}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.panelButton}
            onPress={onRestPress}>
            <Text style={Styles.panelButtonTitle}>Reset Location</Text>
          </TouchableOpacity>
        </View>
      </Modal>
  )
}

const Styles = StyleSheet.create({
  _modal: {
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
    padding: 0,
    position: "absolute",
    top: 0,
  },
  _modalMain: {
    width: WP(100),
    height: HP(40),
    backgroundColor: "#EEF0F1",
    borderBottomRightRadius: WP(3),
    borderBottomLeftRadius: WP(3),
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: WP(5),
    paddingTop: HP(6),
    paddingBottom: HP(1),
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
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "green"
    // alignItems:"center",
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
    width: "100%",
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


