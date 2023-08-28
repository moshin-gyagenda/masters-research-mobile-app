import React from 'react';
import { View, Text, TouchableOpacity, Modal,  Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigation from '../Navigations/HomeNavigation';
import WelcomeHeader from '../Components/WelcomeHeader';
import Dashboard from '../Pages/Dashboard';
import Icon from 'react-native-vector-icons/Ionicons';
import AppointmentComponent from '../Components/AppointmentComponent';
import CreateTitleComponent from '../Components/CreateTitleComponent';


const Tab = createBottomTabNavigator();

const DashboardScreen = () => (
    <Dashboard />
);

const HomeScreen = () => (
  <HomeNavigation/>
);

const AppointmentsScreen = () => (
  <AppointmentComponent />
);

const CreateTitleScreen = () => (
  <CreateTitleComponent />
);

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);
const handleComplaintSubmit = () => {
  // Implement logic to send the complaint
  // You can use an API call or any other method here
  closeComplaintModal();
  // Display a notification that the complaint has been sent
  Alert.alert('Complaint Sent', 'Your complaint has been successfully sent!', [
      { text: 'OK', onPress: () => console.log('Complaint sent notification closed') },
  ]);
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={focused ? 'ios-analytics' : 'ios-analytics-outline'} size={24} color={focused ? '#e32f45' : '#748c94'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ICT-4MRPQ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={focused ? 'ios-home' : 'ios-home-outline'} size={24} color={focused ? '#e32f45' : '#748c94'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={focused ? 'ios-calendar' : 'ios-calendar-outline'} size={24} color={focused ? '#e32f45' : '#748c94'} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    
  );
};

const styles = {
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
          width: 0,
          height: -3, // Adjust the shadow offset to make the tab bar appear at the bottom
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      },
      
};

export default MainTabNavigator;
