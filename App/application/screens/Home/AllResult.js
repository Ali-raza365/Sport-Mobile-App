import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { useSelector } from 'react-redux';
import { FETCH_ALL_RESULT_API } from '../../api/apis';
import { Loader } from '../../components';
import { COLORS, FONT, FONT_LIGHT, FONT_MEDIUM, HP, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';

const AllResult = () => {

    const token = useSelector(state => state.user.token);

    const [loading, setLoading] = useState(false);
    const [allResults, setallResults] = useState([])

    const _onfetchAllResults = async () => {
        setLoading(true);
        await FETCH_ALL_RESULT_API(token)
            .then(resp => {
                setLoading(false);
                setallResults(resp?.data?.results || [])
                console.log(resp?.data?.results || [])
            })
            .catch(error => {
                setLoading(false);
                // alert('Someting went wrong...');
                console.log(error);
            });
    };

    useEffect(() => {
        _onfetchAllResults()
    }, [])

    const data = [
        {
            "_id": "63d2b409bcf6e700161ba1ac",
            "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFEkKiaE16xIRll9SyEvOn_M4bOqVHuiWC6Q&usqp=CAU",
            "participated": 6,
            "flawless": 1,
            "title": "test",
            "description": "testing",
            "name": "Admin",
            "email": "admin@gmail.com",
            "userId": "63d03d17b617400016abffbd",
            "quizId": "63d01a0c927ef900166c02ac",
            "score": 5,
            "total": 10,
            "createdAt": "2023-01-26T17:10:33.929Z",
            "updatedAt": "2023-01-26T17:10:33.929Z",
            "__v": 0,
            "userData": [
                {
                    "_id": "63d03d17b617400016abffbd",
                    "name": "Admin",
                    "email": "admin@gmail.com"
                }
            ]
        }
    ]


    const renderResultList = ({ item, index }) => {

        const percentFun = ~~((item?.score / item?.total) * 100);

        return (
            <View style={styles.listContainer}>
                <View style={styles.tabCircle}>
                    <Image source={{ uri: item.icon }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.tabText}>{item?.title || ''}</Text>
                    <Text style={styles.dateSty}>{new Date(item?.createdAt).toDateString()}</Text>

                    <View style={{ flexDirection: 'row', paddingVertical: WP(1) }}>
                        <View style={{ padding: WP(1), backgroundColor: '#42a5f5', borderRadius: WP(2.5) }}>
                            <Text style={styles.infoTitle} > Total: {item?.total} </Text>
                            {/* <Text style={styles.infoVal} ></Text> */}
                        </View>
                        <View style={{ padding: WP(1), marginLeft: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#66bb6a', borderRadius: WP(2.5) }}>
                            <Text style={styles.infoTitle} > Correct: {item?.score} </Text>
                            {/* <Text style={styles.infoVal} >{item?.score}</Text> */}
                        </View>
                        <View style={{ padding: WP(1), marginLeft: 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ef5350', borderRadius: WP(2.5) }}>
                            <Text style={styles.infoTitle} > wrong: {item?.total - item?.score} </Text>
                        </View>
                    </View>

                </View>

                <CircularProgress
                    value={percentFun}
                    radius={WP(7.5)}
                    inActiveStrokeColor={'#2ecc71'}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={'#000'}
                    progressValueFontSize={WP(3)}
                    valueSuffix={'%'}

                // onAnimationComplete={() => { alert('callback') }}
                />
            </View>
        )
    }

    return (
        <View style={styles._container}>
            <Loader isVisible={loading} />
            <FlatList
                data={allResults ? allResults.reverse() : []}
                keyExtractor={(_, i) => `item${i}`}
                renderItem={renderResultList}
                ListEmptyComponent={(
                    <View style={{ width: WP(100), height: HP(70), alignItems: 'center', justifyContent: 'center' }}>
                        <Text>No Record Found!</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default AllResult

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    listContainer: {
        width: '90%',
        height: HP(14),
        backgroundColor: COLORS.whiteColor,
        margin: WP(SPACING_PERCENT),
        marginVertical: WP(SPACING_PERCENT / 2),
        borderRadius: WP(RADIUS),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

        elevation: 5,
        shadowColor: COLORS.blackColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: WP(1),
    },
    titleContainer: {
        width: '55%',
        height: '70%',
        // backgroundColor: COLORS.borderColor,
    },
    tabText: {
        fontSize: WP(TEXT_SIZES.info_1),
        fontFamily: FONT_MEDIUM,
    },
    dateSty: {
        fontSize: WP(3),
        color: COLORS.lightGrey
    },
    tabCircle: {
        width: WP(13),
        height: WP(13),
        borderRadius: WP(10),
        backgroundColor: COLORS.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoTitle: {
        fontSize: WP(2.9),
        color: COLORS.whiteColor
    },
})