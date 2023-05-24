import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
     Account, AccountSettings, Settings
} from "../../screens"
import { COLORS } from "../../theme/config"

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
                    component={Settings}
                    options={{
                         headerShown: true,
                         headerTitle: "Settings",
                         headerTintColor: COLORS.whiteColor,
                         headerStyle: { backgroundColor: COLORS.primaryColor },
                         // headerShadowVisible: false,
                         // headerBackVisible:true,
                         // headerBackTitleVisible:false,

                    }}
               />
               <Stack.Screen
                    name='accountsettings'
                    component={AccountSettings}
                    options={{
                         headerShown: true,
                         headerTitle: "Profile",
                         headerTintColor: COLORS.whiteColor,
                         headerStyle: { backgroundColor: COLORS.primaryColor },
                         headerShadowVisible: false

                    }}
               />
               <Stack.Screen
                    name='account'
                    component={Account}
                    options={{
                         headerShown: true,
                         headerTitle: "Account",
                         headerTintColor: COLORS.whiteColor,
                         headerStyle: { backgroundColor: COLORS.primaryColor },
                         headerShadowVisible: false

                    }}
               />
          </Stack.Navigator>
     )
}