//import liraries
import React, { useState } from 'react';
import { FlatList, I18nManager, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppBar from '../../components/AppBar';
import {
    COLORS, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP
} from '../../theme/config';
import EventStore from '../../Store/EventStore';

// create a component
const EventCategory = ({ navigation }) => {

    const [SelectedCountry, setSelectedCountry] = useState('')
    const [search, setsearch] = useState('')
    const [SearchedCountry, setSearchedCountry] = useState([])
    // const countries = useSelector(state => state.customers.countries);

    const [countries, setcountries] = useState([2, 2, 2, 2, 2])

    const { Activites, setActivity } = EventStore();



    const _onCountrySelect = (item) => {
        setSelectedCountry(item)
        setActivity(item)
        navigation.goBack()

    }

    const onSearch = (searchText) => {
        setSearchedCountry([])
        setsearch(searchText)
        const searched = []

        Activites.forEach((item, index) => {
            if (item?.name?.toLowerCase().includes(searchText.trim().toLowerCase()))
                searched.push(item);
        });
        setSearchedCountry(searched)
    }


    // useEffect(() => {
    //      navigation.setOptions({
    //           headerShown: true,
    //           headerTitle: 'Country of address',
    //           headerTitleStyle: {
    //                fontWeight: 'bold',
    //           },
    //           headerBackImage: (props) => <Image source={IMAGE.closeIcon} padding={WP(2)} marginLeft={WP(3)} {...props} />
    //      })
    // }, [])

    return (
        <SafeAreaView style={styles.container}>

            <AppBar type='dark'
                backgroundColor={COLORS.whiteColor}
            />
            <View style={styles.searchContainer}>
                <Icon name='search' style={{ paddingRight: 10 }} size={WP(5)} color={COLORS.lightGrey} />
                <TextInput
                    placeholder='search'
                    width='80%'
                    fontSize={WP(4)}
                    onChangeText={(txt) => onSearch(txt)}
                />
            </View>

            <FlatList
                data={search == '' ? Activites : SearchedCountry}
                keyExtractor={(item, index) => 'search-item' + index.toString()}
                // contentContainerStyle={{flex:1}}
                renderItem={({ item }) => {
                    // console.log(item)
                    return (
                        <TouchableOpacity onPress={() => _onCountrySelect(item)} style={styles._listContainer}>
                            <View style={styles._radioContainer}>
                                <View style={[styles._radioBtn, { backgroundColor: item?.name == SelectedCountry?.name ? COLORS.primaryColor : 'transparent' }]} />
                            </View>
                            <View style={[styles._titleContainer,]}>
                                <Text style={styles._title}>{item?.name || ''}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    searchContainer: {
        marginVertical: WP(SPACING_PERCENT),
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: WP(12),
        backgroundColor: COLORS.whiteColor,
        borderRadius: WP(10),
        alignSelf: 'center',
        shadowColor: COLORS.blackColor,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: WP(RADIUS),
        elevation: 10,

    },
    _listContainer: {
        width: '100%',
        height: WP(15),
        // backgroundColor: COLORS.primary,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        marginTop: 4,
        alignItems: 'center',
    },
    _radioContainer: {
        // backgroundColor: COLORS.primaryOrange,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: WP(4),
    },
    _radioBtn: {
        width: WP(4),
        height: WP(4),
        borderWidth: 1,
        borderColor: COLORS.blackColor,
        borderRadius: WP(5),
    },
    _titleContainer: {
        height: '100%',
        width: '85%',
        borderBottomWidth: 0.8,
        borderColor: COLORS.lightGrey,
        justifyContent: 'center',
    },
    _title: {
        fontSize: WP(TEXT_SIZES.info_1),
        marginLeft: WP(5)


    }
});

//make this component available to the app
export default EventCategory;