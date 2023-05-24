import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONT, FONT_BOLD, FONT_MEDIUM, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config'
import CircularProgress from 'react-native-circular-progress-indicator';
import { useEffect } from 'react';
import { Button } from '../../components';

const Result = ({ navigation, route }) => {

    const { result } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.whiteColor, alignItems: 'center' }}>
            {/* <CircularProgress
                value={60}
                radius={110}
                progressValueColor={COLORS.blackColor}
                maxValue={200}
                title={'Score'}
                titleColor={COLORS.blackColor}
                titleStyle={{ fontWeight: 'bold' }}
            /> */}
            <CircularProgress
                value={result?.score || 0}
                radius={110}
                maxValue={result?.total || 0}
                title={'Score'}
                // progressValueColor={'#ecf0f1'}
                progressValueColor={COLORS.blackColor}
                activeStrokeColor={COLORS.primaryColor}
                inActiveStrokeColor={COLORS.grey}
                inActiveStrokeOpacity={0.5}
                inActiveStrokeWidth={40}
                activeStrokeWidth={20}
                titleStyle={{ fontFamily: FONT, }}

            />
            <View style={styles._resultView}>

                <View style={styles._boxView} >
                    <Text style={styles._heading}>Score</Text>
                    <Text style={styles._value}>{result?.score || 0}</Text>
                </View>
                <View style={styles._boxView} >
                    <Text style={styles._heading}>Total</Text>
                    <Text style={styles._value}>{result?.total || 0}</Text>
                </View>


            </View>

            <Button
                onPress={() => { navigation.navigate('home') }}
                lable={'Back To Home'} styles={{ width: '50%', marginTop: WP(8) }} />

        </View>
    )
}

export default Result

const styles = StyleSheet.create({
    _resultView: {
        width: '100%',
        // padding:WP(2),
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        marginTop: WP(2),
    },
    _boxView: {
        width: '50%',
        padding: WP(2),
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    _heading: {
        fontFamily: FONT_BOLD,
        fontSize: WP(TEXT_SIZES.info_1)
    },
    _value: {
        fontFamily: FONT_MEDIUM,
    }
})