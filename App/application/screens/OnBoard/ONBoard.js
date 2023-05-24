import { StyleSheet, Image, Text, View, Animated, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { COLORS, HP, IMAGES, MOBILE_WIDTH, ON_BOARD_DATA, RADIUS, SPACING_PERCENT, TEXT_SIZES, WP } from '../../theme/config';
import FontAwes from 'react-native-vector-icons/FontAwesome5';
import { _setItem } from '../../utils/async';

export default function ONBoard({ navigation }) {

    const scrollX = useRef(new Animated.Value(0)).current;
    let position = Animated.divide(scrollX, MOBILE_WIDTH + SPACING_PERCENT * 2);
    const flatRef = useRef(0)


    //On Skip Click
    const _onSkipClick = (index) => {
        if (index == 2) {
            _setItem('onboard', '1')
                .then(() => {
                    navigation.navigate('auth');
                })
                .catch((err) => {
                    alert(err);
                })
        } else {
            flatRef.current.scrollToIndex({ index: index + 1 });
        }
    }

    return (
        <View style={styles._container}>
            <View style={styles.imageCover}>
                <Image
                    style={styles.image}
                    source={IMAGES.onboard_img}
                />
                <View style={styles._dotsView}>
                    {
                        ON_BOARD_DATA.map((_, i) => {
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                                outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                                extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
                            });

                            let width = position.interpolate({
                                inputRange: [i - 1, i, i + 1],
                                outputRange: [10, 25, 10],
                                extrapolate: 'clamp'
                            });

                            return (
                                <Animated.View
                                    key={i}
                                    style={{
                                        opacity: opacity,
                                        height: 10,
                                        width: width,
                                        backgroundColor: COLORS.secondaryColor,
                                        margin: WP(SPACING_PERCENT / 2),
                                        marginLeft: WP(1),
                                        borderRadius: WP(RADIUS)
                                    }}
                                />
                            );
                        })
                    }
                </View>
            </View>
            <View style={styles.box}>

                <Animated.FlatList
                    ref={flatRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={true}
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    snapToInterval={WP('100%')}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={styles._scrollContainer}
                    data={ON_BOARD_DATA}
                    keyExtractor={item => item.key}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles._itemContainer}>
                                <Text style={styles.heading} >{item.title}</Text>
                                <Text style={styles.desStyle} >{item.des}</Text>

                                <TouchableOpacity
                                    onPress={() => _onSkipClick(index)}
                                    style={styles.outerCircle} >
                                    <View style={styles.innerCircle} >
                                        <FontAwes name="chevron-right" color={COLORS.whiteColor} size={WP(8)} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                        );
                    }}
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    _container: {
        flex: 1,
        backgroundColor: COLORS.whiteColor,
    },
    imageCover: {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: "center",
        // backgroundColor: 'cyan'
    },
    image: {
        width: WP('100%'),
        // height: WP(40),
        resizeMode: 'contain',
    },
    box: {
        flex: 1.4,
        backgroundColor: COLORS.secondaryColor,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    heading: {
        padding: WP(10),
        paddingBottom: WP(5),
        fontSize: WP(8),
        color: COLORS.whiteColor,
        textAlign: "center",
        fontWeight: "600",
        lineHeight: 40,
        letterSpacing: 3,
    },
    _dotsView: {
        flexDirection: 'row',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
    },
    _scrollContainer: {
    },

    _itemContainer: {
        width: WP('100%'),
    },
    desStyle: {
        color: COLORS.whiteColor,
        paddingHorizontal: WP(10),
        fontSize: WP(4.2),
        textAlign: 'center',
    },

    outerCircle: {
        marginTop: WP(15),
        width: WP(20),
        height: WP(20),
        borderRadius: WP(20),
        backgroundColor: COLORS.secondaryColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.primaryColor,
    },

    innerCircle: {
        width: WP(17),
        height: WP(17),
        borderRadius: WP(17),
        backgroundColor: '#F16059',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.primaryColor,
    },


});
