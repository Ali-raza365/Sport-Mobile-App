import { Pressable, SafeAreaView, ScrollView, Image, StyleSheet, Text, Switch, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { Button, DescriptionInput, LabelInput, PickerModal, SimpleInput } from '../../components';
import Slider from '@react-native-community/slider';
import DatePicker from 'react-native-date-picker'
import UserStore from '../../Store/UserStore';

const NewEvent = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [eventDate, setEventDate] = useState(new Date());
    const [eventParti, seteventParti] = useState(1);
    const [showPickerModal, setShowPickerModal] = useState(false);
    const [eventImage, setEventImage] = useState(null);
    const { user, token } = UserStore();


    const togglePickerModal = () => {
        if (showPickerModal)
            setShowPickerModal(false)
        else setShowPickerModal(true)
    }

    const onLocationIconClick = () => {

    }




    return (
        <View style={styles._container}>
            <PickerModal
                onBackButtonPress={togglePickerModal}
                onBackdropPress={togglePickerModal}
                isVisible={showPickerModal}
                onCameraPress={(img) => { setEventImage(img) }}
                onGalleryPress={(img) => { setEventImage(img) }}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100, }}
            >

                <DatePicker
                    modal
                    mode={'date'}
                    open={showDatePicker}
                    minimumDate={new Date()}
                    date={eventDate}
                    onConfirm={(date) => {
                        setShowDatePicker(false)
                        console.log(date.toLocaleDateString())
                        setEventDate(date)
                    }}
                    onCancel={() => {
                        setShowDatePicker(false)
                    }}
                />
                {
                    eventImage ?
                        <View style={styles._imagesContainer}>
                            <AntDesign
                                name="close" size={WP(6)}
                                onPress={() => setEventImage(null)}
                                style={{ position: 'absolute', top: 8, right: 8, zIndex: 20, padding: 5, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.5)' }}
                                color={COLORS.redColor} />
                            <Image source={{ uri: eventImage?.uri }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                        </View>
                        :
                        <Pressable onPress={togglePickerModal} style={styles._imagesContainer}>
                            <Feather name="camera" size={WP(12)} color={COLORS.lightGrey} />
                            <Text style={{ fontSize: WP(4), color: COLORS.lightGrey }}>Add Image</Text>
                        </Pressable>

                }

                <SimpleInput
                    lable={"Organizer"}
                    placeholder={"Name"}
                    value={user?.fullname || ""}
                />
                <SimpleInput
                    lable={"Event Title"}
                    placeholder={"Title"}
                />
                <SimpleInput
                    lable={" Date & Time"}
                    placeholder={"Time"}
                    editable={false}
                    value={eventDate?.toLocaleDateString() || ''}
                    // onIconPress={() => setShowDatePicker(true)}
                    Icon={(<AntDesign onPress={() => setShowDatePicker(true)} name="calendar" size={WP(8)} color={COLORS.lightGrey} />)}
                />
                <SimpleInput
                    lable={"Location"}
                    placeholder={"Location"}
                    editable={false}
                    Icon={(<Foundation onPress={onLocationIconClick} name="marker" size={WP(8)} color={COLORS.lightGrey} />)}
                />
                <View style={{ marginTop: WP(2) }}>
                    <Text style={styles._heading}>Participants {eventParti}</Text>
                    <Slider
                        step={1}
                        minimumValue={1}
                        maximumValue={100}
                        minimumTrackTintColor={COLORS.primaryColor}
                        maximumTrackTintColor="#000000"
                        onValueChange={(val) => { seteventParti(val) }}

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