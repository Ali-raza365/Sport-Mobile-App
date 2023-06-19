import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ONBoard from '../screens/OnBoard/ONBoard';
import Splash from '../screens/Splash/Splash';
// import { Splash } from "../../application/screens";
// import ONBoard from '../screens/OnBoard/ONBoard';
import AuthStack from './AuthSatck/AuthStack';
import HomebottomBar from './HomeStack/HomebottomBar';
import { EditProfileScreen } from '../screens';
// import HomebottomBar from './HomeStack/HomebottomBar';


export default function Root() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='splash'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='splash'
                component={Splash}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='onboard'
                component={ONBoard}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='auth'
                component={AuthStack}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name='homenavigator'
                component={HomebottomBar}
                options={{
                    headerShown: false
                }}
            />
             <Stack.Screen
                name='editProfile'
                component={EditProfileScreen}
                options={{
                    headerShown: true,
                    headerTitle:'Edit Your Prfile',
                }}
            />

        </Stack.Navigator>
    )
}