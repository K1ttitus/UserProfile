import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import UserProfile from '../screens/UserProfile';
import LocationScreen from '../screens/LocationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* UserProfile is now inside the Tab.Navigator */}
      <Tab.Screen name="Home" component={ProfileScreen} options={{ icon: 'home' }} />
      <Tab.Screen name="Location" component={LocationScreen} options={{ icon: 'map-pin' }} />
      <Tab.Screen name="Profile" component={UserProfile} options={{ icon: 'user' }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ icon: 'message-circle' }} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
