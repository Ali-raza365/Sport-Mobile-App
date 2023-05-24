import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Modal from "react-native-modal";
import { COLORS, WP } from '../theme/config';
import AntIcon from 'react-native-vector-icons/AntDesign';


export default function Loader({ isVisible }) {
    return (
        <Modal
            backdropOpacity={0.7}
            isVisible={isVisible}
            coverScreen
        >
            <View style={Styles._mainContainer}>
                <ActivityIndicator size={'small'} />
                <AntIcon name='mail'/>
            </View>
        </Modal>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        // width: WP(30),
        // height: WP(30),
        // backgroundColor: COLORS.whiteColor,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: WP(2),
        overflow: "hidden"
    },
    _animation: {
        width: WP(40),
        height: WP(40),
        // backgroundColor: COLORS.whiteColor,
    },
    _title: {
        color: COLORS.primaryColor,
        fontSize: WP(4),
        position: "absolute",
        bottom: 0,
        fontWeight: "bold",
    },
})