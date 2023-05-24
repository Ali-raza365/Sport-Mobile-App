import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, Switch, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { Button, DescriptionInput, LabelInput, SimpleInput } from '../../components';
import Slider from '@react-native-community/slider';


const NewEvent = () => {

    const [OrgName, setOrgName] = useState('Demo User')


    return (
        <View style={styles._container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, }}
            >
                <Pressable style={styles._imagesContainer}>
                    <Feather name="camera" size={WP(12)} color={COLORS.lightGrey} />
                    <Text style={{ fontSize: WP(4), color: COLORS.lightGrey }}>Add Image</Text>
                </Pressable>
                <SimpleInput
                    lable={"Organizer"}
                    placeholder={"Name"}
                    value={OrgName}
                />
                <SimpleInput
                    lable={"Event Title"}
                    placeholder={"Title"}
                />
                <SimpleInput
                    lable={" Date & Time"}
                    placeholder={"Time"}
                    editable={false}
                    Icon={(<AntDesign name="calendar" size={WP(8)} color={COLORS.lightGrey} />)}
                />
                <SimpleInput
                    lable={"Location"}
                    placeholder={"Location"}
                    editable={false}
                    Icon={(<Foundation name="marker" size={WP(8)} color={COLORS.lightGrey} />)}
                />
                <View style={{ marginTop: WP(2) }}>
                    <Text style={styles._heading}>Participants</Text>
                    <Slider
                        // style={{ height: 40 }}
                        step={1}
                        minimumValue={1}
                        // minimumValue={0}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"

                    />
                </View>


                <DescriptionInput
                    lable={"Event Description"}
                    placeholder={"Description..."}
                />

                <Button
                    lable={"Create Event"}
                    styles={{ marginTop: WP(2) }}
                />
            </ScrollView>
        </View>
    )
}

export default NewEvent

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        padding: WP(SPACING_PERCENT),
        backgroundColor: COLORS.whiteColor,
    },
    _imagesContainer: {
        width: '100%',
        height: HP(20),
        backgroundColor: COLORS.grey,
        // backgroundColor: '#F3F3F3',
        elevation: 4,
        borderRadius: WP(RADIUS),
        alignItems: 'center',
        justifyContent: 'center'
    },
    _heading: {
        color: COLORS.lightGrey,
        fontSize: WP(4),
        fontWeight: "700",
        paddingBottom: 5,
    },
})