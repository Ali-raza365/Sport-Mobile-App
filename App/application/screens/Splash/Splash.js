import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { _gotoAuthStack, _gotoHomeNavigator, _gotoOnBoardScreen } from '../../navigation/navigationServcies';
import { _onJWTTokenSet } from '../../redux/reducers/userActions';
import { COLORS, HP, IMAGES, SPACING_PERCENT, TAB_ICON_SIZE, WP } from "../../theme/config";
import { _getItem } from '../../utils/async';
import Lang from '../../translation'
import UserStore from '../../Store/UserStore';
import { AppBar } from '../../components';



export default function Splash({ navigation }) {
    // const dispatch = useDispatch()
    const [ref, setref] = useState('');
    const splashSucess = UserStore((state) => state.splashSucess)



    useEffect(() => {
        setTimeout(async () => {
            try {
                await _getItem('token').then((Token) => {
                    splashSucess(Token, navigation)
                })
            } catch (error) {
                console.log('splash error', error)
            }
        }, 1200)
    }, [])




    const date = new Date()
    const _onSetLanguageToItalian = () => {
        Lang.setLanguage('sp');
        setref(date)
    }


    return (
        <SafeAreaView style={Styles._mainContainer}>
            <AppBar hidden={true} />
            <Image
                source={IMAGES.mainLogo}
                resizeMode='contain'
                style={{
                    width: WP(70),
                }}
            />

            {/* <Text style={{ fontSize: WP(8), fontWeight: '700', letterSpacing: 0.8 }} >Team Mates</Text> */}

        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    _mainContainer: {
        flex: 1,
        backgroundColor: "#0D0E13",
        justifyContent: "center",
        alignItems: "center",
    },
})