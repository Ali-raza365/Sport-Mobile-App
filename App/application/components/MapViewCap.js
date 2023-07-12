import { Linking, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { WP } from '../theme/config';
import { ms, mvs } from 'react-native-size-matters';


const openMaps = (latitude, longitude) => {
    const daddr = `${latitude},${longitude}`;
    const company = Platform.OS === "ios" ? "apple" : "google";
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
}

const MapViewCap = ({ Region }) => {

    let cordinate = {
        latitude: Region?.coordinates?.[1] || null,
        longitude: Region?.coordinates?.[0] || null,
    }
    var location = {
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
        ...cordinate
    }
    console.log(cordinate, { location });

    return (
        <TouchableOpacity onPress={() => { openMaps(cordinate?.latitude, cordinate?.longitude) }} style={styles.container}>
            <MapView
                scrollEnabled={false}
                // mapPadding={10}
                initialRegion={location}
                style={styles.container}
                provider={PROVIDER_GOOGLE}>
                <Marker coordinate={cordinate} />
            </MapView>
        </TouchableOpacity>
    );
};

export default MapViewCap;

const styles = StyleSheet.create({
    container: {
        // borderRadius:ms(10),
        alignSelf: "center",
        marginVertical: mvs(10),
        width: WP(91),
        height: ms(130),
        overflow: "hidden",
    },


});
