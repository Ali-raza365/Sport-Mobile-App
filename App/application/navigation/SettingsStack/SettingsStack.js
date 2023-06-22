import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
     AccountSettings,
     YourFavorites, YourParticipants
} from "../../screens";
import { COLORS } from "../../theme/config";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
     return (
          <Stack.Navigator
               initialRouteName='settings'
               screenOptions={{
                    headerShown: false,
               }}
          >
               <Stack.Screen
                    name='settings'
                    component={AccountSettings}
                    options={{
                         headerShown: false,
                         headerTitle: "Settings",
                         headerTintColor: COLORS.whiteColor,
                         headerStyle: { backgroundColor: COLORS.primaryColor },
                    }}
               />

               <Stack.Screen
                    name='YourFavorites'
                    component={YourFavorites}
                    options={{
                         headerShown: true,
                         headerTitle: "Your Favorites",
                         headerTintColor: COLORS.whiteColor,
                         headerStyle: { backgroundColor: COLORS.primaryColor },
                         headerShadowVisible: false

                    }}
               />
               <Stack.Screen
                    name='YourParticipants'
                    component={YourParticipants}
                    options={{
                         headerShown: true,
                         headerTitle: "Your Participants",
                         headerTintColor: COLORS.whiteColor,
                         headerStyle: { backgroundColor: COLORS.primaryColor },
                         headerShadowVisible: false

                    }}
               />

          </Stack.Navigator>
     )
}