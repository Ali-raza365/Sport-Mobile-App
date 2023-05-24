import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Login, NewEvent, Signup } from '../../screens';

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
                name='signup'
                component={Signup}
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