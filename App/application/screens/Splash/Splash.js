import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { _gotoHomeNavigator, _gotoOnBoardScreen } from '../../navigation/navigationServcies';
import { _onJWTTokenSet } from '../../redux/reducers/userActions';
import { COLORS, HP, IMAGES, SPACING_PERCENT, TAB_ICON_SIZE, WP } from "../../theme/config";
import { _getItem } from '../../utils/async';
import Lang from '../../translation'



export default function Splash({ navigation }) {
    // const dispatch = useDispatch()
    const [ref, setref] = useState('')

    // useEffect(() => {
    //     setTimeout(async () => {
    //         try {
    //             await _getItem('token').then((Token) => {
    //                 if (Token) {
    //                     dispatch(_onJWTTokenSet(Token))
    //                     _gotoHomeNavigator(navigation);
    //                 } else {
    //                     navigation.navigate("authstack")
    //                 }
    //             })
    //         } catch (error) {
    //             console.log('splash error', error)
    //         }
    //     }, 2000)
    // }, [])

    useEffect(() => {
        setTimeout(() => {
            // _gotoOnBoardScreen(navigation)
            // navigation.navigate("onboard")
            navigation.navigate('auth');
        
            // navigation.navigate("homenavigator")
        }, 1000);
    }, [])



    const date = new Date()
    const _onSetLanguageToItalian = () => {
        Lang.setLanguage('sp');
        setref(date)
    }


    return (
        <SafeAreaView style={Styles._mainContainer}>
            {/* <Image
                source={IMAGES.mainLogo}
                resizeMode='contain'
                style={{
                    width: WP(50),
                    // backgroundColor:'red'
                }}
            /> */}

            <Text style={{fontSize:WP(8),fontWeight:'700', letterSpacing:0.8}} >Team Mates</Text>

        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
        justifyContent: "center",
        alignItems: "center",
    },
})