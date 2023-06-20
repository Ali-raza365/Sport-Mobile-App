import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ForgotPassword, Login, OTP, ResetPassword, Signup } from '../../screens';
// import {
//     ForgotPassword, LocationSignup, Login, OTP, Signup, SignupDeliveryInfo, SignupFilesUpload, SignupType
// } from "../../screens";s

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName='forgotpassword'
        >
            <Stack.Screen
                name='login'
                component={Login}
                options={{
                    headerShown: false
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
            <Stack.Screen
                name='OTP'
                component={OTP}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    headerLargeTitleShadowVisible: false,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
             <Stack.Screen
                name='ResetPassword'
                component={ResetPassword}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                    headerLargeTitleShadowVisible: false,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
            {/* <Stack.Screen
                name='signuptype'
                component={SignupType}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='signupdeliveryinfo'
                component={SignupDeliveryInfo}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name='signupfilesupload'
                component={SignupFilesUpload}
                options={{
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                }}
            />
            <Stack.Screen
                name='locationsignup'
                component={LocationSignup}
                options={{
                    headerShown: false,
                }}
            /> */}

            <Stack.Screen
        name='forgotpassword'
        component={ForgotPassword}
        options={{
          headerShown: false,
          headerTitle: 'Forgot Password',
          headerBackTitleVisible:false,
          headerShadowVisible:false,
          headerTitleStyle:{
            //    fontFamily:FONT_MEDIUM,
          },
        }}
      />
        </Stack.Navigator>
    )
}