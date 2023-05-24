import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { EventDetail, Home } from "../../screens";
import { COLORS, FONT, FONT_MEDIUM, WP } from '../../theme/config';
const Stack = createNativeStackNavigator();

export default function HomeStack() {

    const navigation = useNavigation()

    return (
        <Stack.Navigator
            initialRouteName='home'
            screenOptions={{
                headerShown: true,
                cardStyle: {
                    backgroundColor: COLORS.whiteColor,
                },
            }}
        >
            <Stack.Screen
                name='home'
                component={Home}
                options={{
                    headerShown: false,
                    headerTitle: 'Choose Category',
                    headerStyle: { backgroundColor: COLORS.whiteColor, textAlign: "center" },
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <IonIcons
                            onPress={() => { navigation.toggleDrawer() }}
                            name='menu-sharp'
                            color={COLORS.blackColor}
                            size={WP(7)}
                        />),
                }}
            />
            <Stack.Screen
                name='eventdetail'
                component={EventDetail}
                options={{
                    headerShown: false,
                }}
            />

        </Stack.Navigator>
    )
}