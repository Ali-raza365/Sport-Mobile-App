import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EventCategory, EventLocation, Login, NewEvent, Signup } from '../../screens';

const Stack = createNativeStackNavigator();

export default function EventStack() {
    return (
        <Stack.Navigator
            initialRouteName='login'
        >
            <Stack.Screen
                name='newevent'
                component={NewEvent}
                options={{
                    headerShown: true,
                    headerTitle:'Create Event'
                }}
            />
            <Stack.Screen
                name='eventlocation'
                component={EventLocation}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    headerLargeTitleShadowVisible: false,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
             <Stack.Screen
                name='eventcategory'
                component={EventCategory}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    headerLargeTitleShadowVisible: false,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    )
}