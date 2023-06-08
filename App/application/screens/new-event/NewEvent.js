import { Pressable, SafeAreaView, ScrollView, Image, StyleSheet, Text, Switch, View, PermissionsAndroid, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import { Button, DescriptionInput, LabelInput, Loader, PickerModal, SimpleInput } from '../../components';
import Slider from '@react-native-community/slider';
import DatePicker from 'react-native-date-picker'
import UserStore from '../../Store/UserStore';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import EventStore from '../../Store/EventStore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { _gotoHomeNavigator } from '../../navigation/navigationServcies';


const NewEvent = ({ navigation }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [eventDate, setEventDate] = useState(new Date());
    const [eventParti, seteventParti] = useState(1);
    const [eventTitle, seteventTitle] = useState("");
    const [eventDes, seteventDes] = useState("");
    const [showPickerModal, setShowPickerModal] = useState(false);
    const [eventImage, setEventImage] = useState(null);
    const { user, token } = UserStore();

    const { fetchActivites, selectedActivity, createEventFuc, createEvent_loading } = EventStore();


    const togglePickerModal = () => {
        if (showPickerModal)
            setShowPickerModal(false)
        else setShowPickerModal(true)
    }

    const onLocationIconClick = async () => {
        try {
            const permission =
                Platform.OS === 'android'
                    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

            const result = await request(permission);

            if (result === RESULTS.GRANTED) {
                navigation.navigate('eventlocation')
            } else {
                // Permission denied, handle accordingly
                console.log('Permission denied');
            }
        } catch (error) {
            console.log('Error requesting permission: ', error);
        }
    };

    const onCategoryIconClick = () => {
        navigation.navigate('eventcategory')
    }

    useEffect(() => {
        fetchActivites(token)
    }, [])

    const onEventCreate = () => {
        console.log(selectedActivity)
        if (!eventImage) return alert('event image is required!')
        if (!user?.fullname) return alert('organizer name is required!')
        if (!eventTitle) return alert('event title is required!')
        if (!eventDate) return alert('date is required!')
        if (!eventDate) return alert('time is required!')
        // if(!location) return alert('location is required!')
        if (!selectedActivity?.name) return alert('please select sport activity for create event')
        if (!eventParti) return alert('participants is required!')
        if (!eventDes) return alert('please enter description is required')
        let detail = {
            organizer: user?.fullname || '',
            image: eventImage,
            title: eventTitle,
            description: eventDes,
            participants: eventParti,
            date: eventDate,
            time: eventDate,
            activity: { name: selectedActivity?.name, activity_id: selectedActivity?._id },
            location: {
                name: "lahore",
                coordinates: {
                    latitude: 31.582045,
                    longitude: 74.329376
                }
            }
        }
        createEventFuc(detail, token).then(()=>{
            // _gotoHomeNavigator(navigation)
            navigation.navigate('home')
        })
    }





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.whiteColor, }}>
            <View style={styles._container}>
                <Loader isVisible={createEvent_loading} />
                <PickerModal
                    onBackButtonPress={togglePickerModal}
                    onBackdropPress={togglePickerModal}
                    isVisible={showPickerModal}
                    onCameraPress={(img) => { setEventImage(img) }}
                    onGalleryPress={(img) => { setEventImage(img) }}
                />
                <KeyboardAwareScrollView
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
                        value={eventTitle}
                        onChangeText={(val) => seteventTitle(val)}
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
                    <SimpleInput
                        lable={"Activity"}
                        placeholder={"Activity"}
                        value={selectedActivity?.name || ''}
                        editable={false}
                        Icon={(<Octicons onPress={onCategoryIconClick} name="checklist" size={WP(8)} color={COLORS.lightGrey} />)}
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
                        value={eventDes}
                        onChangeText={(val) => seteventDes(val)}
                    />

                    <Button
                        lable={"Create Event"}
                        styles={{ marginTop: WP(2) }}
                        onPress={onEventCreate}
                    />
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
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