import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, FONT, FONT_BOLD, FONT_MEDIUM, MOBILE_WIDTH, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config'
import { AppBar, Button, Loader } from '../../components'
import { FETCH_ALL_QUIZES_API, SUBMIT_QUIZES_API } from '../../api/apis'
import { useSelector } from 'react-redux'

const QuizDetail = ({ route, navigation }) => {

    const { data } = route.params;

    const token = useSelector(state => state.user.token);

    const flatRef = useRef(0)
    const [loading, setLoading] = useState(false);
    const [selectedAnswer, setselectedAnswer] = useState('');
    const [showResult, setshowResult] = useState(false);
    const [quizAnswer, setquizAnswer] = useState(null);
    const [isNextBtnClick, setIsNextBtnClick] = useState(false);
    const [resultArray, setresultArray] = useState([]);



    const Data = [
        {
            "question": "What is the scientific name of a butterfly?",
            "answers": [
                "Apis",
                "Coleoptera",
                "Formicidae",
                "Rhopalocera"
            ],
            "correctIndex": 3
        },
        {
            "question": "How hot is the surface of the sun?",
            "answers": [
                "1,233 K",
                "5,778 K",
                "12,130 K",
                "101,300 K"
            ],
            "correctIndex": 1
        },
        {
            "question": "Who are the actors in The Internship?",
            "answers": [
                "Ben Stiller, Jonah Hill",
                "Courteney Cox, Matt LeBlanc",
                "Kaley Cuoco, Jim Parsons",
                "Vince Vaughn, Owen Wilson"
            ],
            "correctIndex": 3
        },
        {
            "question": "What is the capital of Spain?",
            "answers": [
                "Berlin",
                "Buenos Aires",
                "Madrid",
                "San Juan"
            ],
            "correctIndex": 2
        },
        {
            "question": "What are the school colors of the University of Texas at Austin?",
            "answers": [
                "Black, Red",
                "Blue, Orange",
                "White, Burnt Orange",
                "White, Old gold, Gold"
            ],
            "correctIndex": 2
        },
        {
            "question": "What is 70 degrees Fahrenheit in Celsius?",
            "answers": [
                "18.8889",
                "20",
                "21.1111",
                "158"
            ],
            "correctIndex": 2
        },
        {
            "question": "When was Mahatma Gandhi born?",
            "answers": [
                "October 2, 1869",
                "December 15, 1872",
                "July 18, 1918",
                "January 15, 1929"
            ],
            "correctIndex": 0
        },
        {
            "question": "How far is the moon from Earth?",
            "answers": [
                "7,918 miles (12,742 km)",
                "86,881 miles (139,822 km)",
                "238,400 miles (384,400 km)",
                "35,980,000 miles (57,910,000 km)"
            ],
            "correctIndex": 2
        },
        {
            "question": "What is 65 times 52?",
            "answers": [
                "117",
                "3120",
                "3380",
                "3520"
            ],
            "correctIndex": 2
        },
        {
            "question": "How tall is Mount Everest?",
            "answers": [
                "6,683 ft (2,037 m)",
                "7,918 ft (2,413 m)",
                "19,341 ft (5,895 m)",
                "29,029 ft (8,847 m)"
            ],
            "correctIndex": 3
        },
        {
            "question": "When did The Avengers come out?",
            "answers": [
                "May 2, 2008",
                "May 4, 2012",
                "May 3, 2013",
                "April 4, 2014"
            ],
            "correctIndex": 1
        },
        {
            "question": "What is 48,879 in hexidecimal?",
            "answers": [
                "0x18C1",
                "0xBEEF",
                "0xDEAD",
                "0x12D591"
            ],
            "correctIndex": 1
        }
    ]

    console.log({ resultArray })

    const onNextBtnClick = (index) => {
        // setIsNextBtnClick(true)
        // console.log({index,length:data?.questions?.length  },!showResult && data?.questions?.length != index + 1 && selectedAnswer != '')

        if (!showResult && selectedAnswer != '') {
            setshowResult(true)
            console.log('running onNextBtnClick')
            setTimeout(() => {
                const a = [...resultArray]
                a.push(Number(selectedAnswer?.id || 0))
                setresultArray(a)
                setselectedAnswer('')
                setshowResult(false)
                if (data?.questions?.length != index + 1) {
                    flatRef?.current?.scrollToIndex({ index: index + 1 });
                } else {
                    _onSubmitQuizs(a)
                }
            }, 700);
        } else {
        }
    }

    const _onSubmitQuizs = async (results) => {
        setLoading(true);

        let detail = {
            token: token,
            quiz_id: data?._id,
            answers: results,
            action: token ? 'user' : 'guest',
        }
        console.log({ detail });

        await SUBMIT_QUIZES_API(detail)
            .then(resp => {
                console.log(resp.data)
                setLoading(false);
                navigation.replace('result', { result: resp?.data?.result })
            })
            .catch(error => {
                setLoading(false);
                alert(error.msg);
                console.log(error);
            });
    };

    useEffect(() => {
        navigation.setOptions({
            headerTitle: data?.title || ''
        })
    }, [])

    const checkColor = (item, answer) => {
        return showResult ? selectedAnswer?.id == item?.id ? item?.id == answer ? COLORS.greenColor : COLORS.territoryColor2 : item?.id == answer ? COLORS.greenColor : COLORS.whiteColor : COLORS.whiteColor
    }


    return (
        <SafeAreaView style={styles.container}>
            <AppBar type={'dark'} />
            <Loader isVisible={loading} />
            <FlatList
                ref={flatRef}
                scrollEnabled={false}
                data={data?.questions || []}
                keyExtractor={(_, i) => `quiz${i}`}
                horizontal
                contentContainerStyle={{}}
                renderItem={({ item, index }) => {
                    console.log(item, 'renderItem')
                    setquizAnswer(item?.answer || null);

                    return (
                        <View style={{ width: MOBILE_WIDTH, }}>
                            <View style={styles.questionContainer}>
                                <Text style={styles.questionText}>{item?.question || ''}</Text>
                            </View>

                            <View style={styles._QuestionInfo}>
                                <Text style={styles._QuestionInfoText}>Question: {index + 1 + ' / ' + data?.questions?.length || 0}</Text>
                            </View>
                            <View style={styles.answersContainer}>
                                {
                                    item?.options.map((answer, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={!showResult ? () => setselectedAnswer(answer) : null}
                                                style={[styles.answerView, { backgroundColor: checkColor(answer, item?.answer) }]}>
                                                <Text style={styles.answerText}>{answer?.value || ''}</Text>
                                                <View style={[styles.boxView, { backgroundColor: selectedAnswer == answer ? COLORS.primaryColor : COLORS.whiteColor, borderColor: selectedAnswer == answer ? COLORS.whiteColor : COLORS.darkGrey }]} />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            <Button onPress={() => { onNextBtnClick(index) }} lable={'Next'} styles={{ alignSelf: 'center', }} />
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default QuizDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    questionContainer: {
        width: '90%',
        padding: WP(SPACING_PERCENT),
        marginVertical: WP(SPACING_PERCENT),
        backgroundColor: COLORS.whiteColor,
        alignSelf: 'center',
        borderRadius: WP(RADIUS),

        elevation: 5,
        shadowColor: COLORS.blackColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: WP(1),
    },
    questionText: {
        fontFamily: FONT_MEDIUM,
        fontSize: WP(TEXT_SIZES.info_1),
        width: '100%',
    },

    answersContainer: {
        width: '100%',
        // backgroundColor: 'cyan',
        marginVertical: WP(SPACING_PERCENT)
    },
    answerView: {
        width: '90%',
        padding: WP(SPACING_PERCENT / 1.5),
        marginVertical: WP(SPACING_PERCENT / 2),
        backgroundColor: COLORS.whiteColor,
        alignSelf: 'center',
        borderRadius: WP(RADIUS),
        flexDirection: 'row',
        justifyContent: 'space-between',

        elevation: 5,
        shadowColor: COLORS.blackColor,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: WP(1),
    },
    answerText: {
        fontFamily: FONT,
        fontSize: WP(TEXT_SIZES.info_1),
        width: '85%',
    },

    boxView: {
        width: WP(5),
        height: WP(5),
        borderRadius: WP(5),
        borderWidth: 1,
        borderColor: COLORS.darkGrey,
    },
    _QuestionInfo: {
        paddingHorizontal: WP(SPACING_PERCENT),
        alignItems: 'center',
    },
    _QuestionInfoText: {
        fontFamily: FONT_BOLD,
        fontSize: WP(TEXT_SIZES.info_1),
    }
})