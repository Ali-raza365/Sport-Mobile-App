import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _momentDateFormat } from '../utils/TimeFunctions'
import { COLORS, HP, WP } from '../theme/config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';

const CardItem = ({ item, hideFav, onPress, OnHeartPress }) => {
    return (
        <Card style={{marginBottom: 10,}}> 
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={onPress}
                style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item?.image }}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%', borderRadius: 10, }}
                    />
                </View>
                <View style={styles.headingContainer}>
                    <Text style={{ fontSize: 12, color: COLORS.darkGrey, fontWeight: "500" }}>{item?.activity?.name}</Text>
                    {hideFav ? null :
                        <>
                            <TouchableOpacity
                                style={styles.favourite}
                                onPress={OnHeartPress}>
                                {item?.isFavorite ?
                                    <Ionicons
                                        name='heart'
                                        color={COLORS.primaryColor}
                                        size={WP(5)}
                                    />
                                    : <Ionicons
                                        name='heart-outline'
                                        color={COLORS.darkGrey}
                                        size={WP(5)}
                                    />
                                }
                            </TouchableOpacity>

                        </>
                    }
                    <Text style={styles.heading}>
                        {item?.title}
                    </Text>
                    <Text numberOfLines={3} style={styles.description}>
                        {item?.description?.trim?.()}
                    </Text>
                    <Text style={{ color: COLORS.primaryColor, marginTop: 5, fontWeight: '700' }}>
                        {_momentDateFormat(item?.date)}
                    </Text>
                </View>
            </TouchableOpacity>
        </Card>
    )
}

export default CardItem

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: HP(20),
        backgroundColor: COLORS.whiteColor,
        borderBottomWidth: 1,
        padding: WP(3),
        borderColor: COLORS.grey,
        borderRadius: 10,
        
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        width: '42%',
        height: '100%',
        borderRadius: 10,
    },
    headingContainer: { padding: 7, paddingHorizontal: WP(2.5), width: WP('55') },
    heading: { fontSize: WP(4.5), fontWeight: 'bold', color: '#000000', paddingVertical: 5 },
    description: { fontSize: 15, color: '#000000' },
    favourite: { position: 'absolute', top: 5, right: 15 },
})