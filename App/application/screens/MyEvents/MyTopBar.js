// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import React from 'react';
// import { COLORS, FONT, RADIUS, TEXT_SIZES, WP } from '../../theme/config';
// import { View } from 'react-native';
// import { CancelBooking, CompleteBooking, UpComingBookings } from '../../screens';

// const Tabs = createMaterialTopTabNavigator();


// function Demo() {
//     return <View></View>;
// }

// const BookingTabs = () => {
//     return (
//         <Tabs.Navigator
//             initialRouteName='upcomingbooking'
//             tabBarStyle={{
//                 shadowColor: COLORS.blackColor,
//                 shadowOffset: { width: 0, height: 3 },
//                 shadowOpacity: 0.2,
//                 shadowRadius: WP(RADIUS),
//             }}
//             screenOptions={{
//                 tabBarActiveTintColor: COLORS.blackColor,
//                 tabBarLabelStyle: { fontSize: WP(3), fontWeight: '500' },
//                 tabBarIndicatorStyle: {
//                     backgroundColor: COLORS.blackColor
//                 },
//                 tabBarStyle: {
//                     shadowColor: COLORS.blackColor,
//                     shadowOffset: { width: 0, height: 3 },
//                     shadowOpacity: 0.2,
//                     shadowRadius: WP(RADIUS),
//                 }
//             }}
//             sceneContainerStyle={{
//                 backgroundColor: COLORS.offWhiteColor
//             }}
//         >
//             <Tabs.Screen
//                 name='upcomingbooking'
//                 component={UpComingBookings}
//                 options={{
//                     tabBarLabel: 'Upcomings',
//                 }}
//             />
//             <Tabs.Screen
//                 name='completebooking'
//                 component={CompleteBooking}
//                 options={{
//                     tabBarLabel: 'Completed',
//                 }}
//             />
//             <Tabs.Screen
//                 name='cancelbooking'
//                 component={CancelBooking}
//                 options={{
//                     tabBarLabel: 'Cancelled'
//                 }}
//             />


//         </Tabs.Navigator>
//     );
// }

// export default BookingTabs;


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YourFavorites from '../Settings/YourFavorites';
import YourParticipants from './YourParticipants';
import { SafeAreaView } from 'react-native'
import { COLORS, RADIUS, WP } from '../../theme/config';
import EventsRequest from './EventsRequest';
import MyEvents from './MyEvents';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.whiteColor }}>
      <Tab.Navigator
        initialRouteName='upcomingbooking'
        tabBarStyle={{
          shadowColor: COLORS.blackColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: WP(RADIUS),
        }}
        screenOptions={{
          tabBarActiveTintColor: COLORS.primaryColor,
          tabBarInactiveTintColor: '#696969',
          tabBarLabelStyle: { fontSize: WP(3), fontWeight: '500' },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primaryColor
          },
          tabBarStyle: {
            shadowColor: COLORS.blackColor,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: WP(RADIUS),
          }
        }}
        sceneContainerStyle={{
          backgroundColor: COLORS.offWhiteColor
        }}
      >

        <Tab.Screen name="myEvents" component={MyEvents} options={{tabBarLabel: 'My Events',}}   />
        <Tab.Screen name="Participants" component={YourParticipants}  options={{tabBarLabel: 'Participants',}}  />
        <Tab.Screen name="requests" component={EventsRequest}  options={{tabBarLabel: 'Requests',}} />
      </Tab.Navigator>
    </SafeAreaView>

  );
}
export default MyTabs;
