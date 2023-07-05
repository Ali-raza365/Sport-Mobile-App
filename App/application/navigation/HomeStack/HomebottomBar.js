import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, HP, RADIUS, WP } from '../../theme/config';
import HomeStack from './HomeStack';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import MatComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { SearchScr } from '../../screens';
import Account from '../../screens/Settings/Account';
import AccountSettings from '../../screens/Settings/AccountSettings';
import EventStack from '../EventStack/EventStack';
import ChatStack from '../ChatStack/ChatStack';
import SettingsStack from '../SettingsStack/SettingsStack';
import MyTabs from '../../screens/MyEvents/MyTopBar';

// import StepIndicator from 'react-native-step-indicator';
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
    const firstIndicatorStyles = {
        stepIndicatorSize: 35,
        currentStepIndicatorSize: 40,
        separatorStrokeWidth: 7,
        currentStepStrokeWidth: 5,
        separatorFinishedColor: COLORS.primaryColor,
        separatorUnFinishedColor: 'rgba(241, 96, 92, 0.5)',
        stepIndicatorFinishedColor: COLORS.primaryColor,
        stepIndicatorUnFinishedColor: 'rgba(241, 96, 92, 0.5)',
        stepIndicatorCurrentColor: COLORS.primaryColor,
        stepStrokeFinishedColor: COLORS.primaryColor,
        stepStrokeCurrentColor: COLORS.primaryColor,
        stepIndicatorLabelFontSize: 15,
        currentStepIndicatorLabelFontSize: 15,
        stepIndicatorLabelCurrentColor: COLORS.whiteColor,
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.6)',
        labelColor: '#000',
        labelSize: 14,
        currentStepLabelColor: COLORS.blackColor,
    };

    const renderLabel = ({ position, label, currentPosition }) => {
        return (
            <Text
                style={
                    position === currentPosition
                        ? styles.stepLabelSelected
                        : styles.stepLabel
                }>
                {label}
            </Text>
        );
    };

    return (
        <View
            style={{
                width: '100%',
                height: HP(11),
                backgroundColor: COLORS.whiteColor,
                justifyContent: 'center',
                borderTopLeftRadius: WP(10),
                borderTopRightRadius: WP(10),
            }}>
            {/* <StepIndicator
                customStyles={firstIndicatorStyles}
                stepCount={3}
                currentPosition={2}
                labels={['Menu', 'Cart', 'Payment']}
                renderLabel={renderLabel} 
            // onPress={onStepPress}
            // />*/}
        </View>
    );
}


function DEmo() {
    return <View></View>;
}

export default function HomebottomBar() {
    return (
        <Tab.Navigator
            // initialRouteName="Home"
            screenOptions={{
                gestureEnabled: false,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                tabBarActiveTintColor: COLORS.primaryColor,
                tabBarShowLabel: false,
                headerShown: false,
                cardStyle: {
                    backgroundColor: COLORS.whiteColor,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            }}>
            <Tab.Screen
                name="homeStack"
                component={HomeStack}
                options={{
                    tabBarLabel: 'My activities',
                    tabBarLabelStyle: {
                        fontWeight: '700',
                        top: -4,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Foundation name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="search"
                component={SearchScr}
                options={{
                    tabBarLabelStyle: {
                        fontWeight: '700',
                        top: -4,
                    },
                    tabBarLabel: 'Search for activities',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="search" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="eventStack"
                component={EventStack}
                options={{
                    tabBarLabel: 'Start new activity',
                    tabBarLabelStyle: {
                        fontWeight: '700',
                        top: -4,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="event" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="MyEvents"
                component={MyTabs}
                options={{
                    tabBarLabelStyle: {
                        fontWeight: '700',
                        top: -4,
                    },
                    tabBarLabel: 'Search for activities',
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="checklist" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="ChatStack"
                component={ChatStack}
                options={{
                    tabBarLabelStyle: {
                        fontWeight: '700',
                        top: -4,
                    },
                    tabBarLabel: 'Search for activities',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="message-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="account"
                component={SettingsStack}
                options={{
                    tabBarLabel: 'My account',
                    tabBarLabelStyle: {
                        fontWeight: '700',
                        top: -4,
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Octicons name="person" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginVertical: 50,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: COLORS.blackColor,
    },
    stepLabelSelected: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        color: COLORS.blackColor,
    },
});
