import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ChatList } from '../../screens';
import { WP } from '../../theme/config';

const Stack = createNativeStackNavigator();

export default function ChatStack({navigation,route}) {

   

    return (
        <Stack.Navigator
            initialRouteName='ChatList'
        >
            <Stack.Screen
                name='ChatList'
                component={ChatList}
                options={{
                    headerShown: true,
                    headerTitle:"Messages",
                    headerTitleStyle:{
                        fontSize:WP(5),
                        fontWeight:"bold"
                    },
                    headerBackVisible:true,
                }}
            />
            {/* <Stack.Screen
                name='Chat'
                component={Chat}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: true,
                    headerLargeTitleShadowVisible: true,
                    headerTitle:"",
                    headerBackTitleStyle:{
                        fontSize:WP(5),
                        fontWeight:"bold",
                        color:COLORS.blackColor,
                    },
                }}
            /> */}
           
        </Stack.Navigator>
    )
}