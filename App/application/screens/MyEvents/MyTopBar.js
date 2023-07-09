
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
        lazy={true}
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
