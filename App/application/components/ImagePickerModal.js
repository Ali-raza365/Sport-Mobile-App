import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Modal from "react-native-modal"
import Ionicons from "react-native-vector-icons/Ionicons"
import { COLORS, HP, WP } from '../theme/config'

export default function ImagePickerModal({ onBackButtonPress, onBackdropPress, isVisible, onCameraClick, onGalleryCliack }) {
     return (
          <Modal
               style={{
                    justifyContent: "flex-end",
                    margin: 0,
                    padding: 0
               }}
               onBackButtonPress={onBackButtonPress}
               onBackdropPress={onBackdropPress}
               backdropOpacity={0.3}
               isVisible={isVisible}
               animationIn={"slideInUp"}
               animationOut={"slideOutDown"}
               animationOutTiming={500}
               animationInTiming={500}
          >
               <View style={Styles._modalMain}>
                    <TouchableOpacity
                         onPress={onCameraClick}
                         style={Styles._modalOptionMain}
                    >
                         <Ionicons
                              name='camera-outline'
                              color={COLORS.primaryColor}
                              size={WP(10)}
                         />
                         <Text style={Styles._cameraText}>Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                         style={Styles._modalOptionMain}
                         onPress={onGalleryCliack}
                    >
                         <Ionicons
                              name='image-outline'
                              color={COLORS.primaryColor}
                              size={WP(10)}
                         />
                         <Text style={Styles._cameraText}>Gallery</Text>
                    </TouchableOpacity>
               </View>
          </Modal>
     )
}
const Styles = StyleSheet.create({
     _modalMain: {
          width: "100%",
          height: HP(15),
          backgroundColor: COLORS.whiteColor,
          // alignSelf: "baseline",
          // justifyContent: "center",
          alignItems: "center",
          borderRadius: WP(4),
          flexDirection: "row",
          paddingHorizontal: WP(3)
     },
     _modalOptionMain: {
          // width: WP(20),
          // height: WP(20),
          padding: WP(3),
          backgroundColor: COLORS.whiteColor,
          justifyContent: "center",
          alignItems: "center",
          marginRight: WP(3)
     },
     _cameraText: {
          color: COLORS.primaryColor,
          fontWeight: "bold"
     },
})