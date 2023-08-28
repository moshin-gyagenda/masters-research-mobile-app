import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import CourseDetails from '../Pages/CourseDetails';
import CourseChapter from '../Pages/CourseChapter';
import PlayVideo from '../Pages/PlayVideo';
import ChartScreen from '../Pages/ChartScreen'; // Import your ChartScreen component
import ChatScreen from '../Pages/ChatScreen';
import UserListScreen from '../Pages/UserListScreen';
import NotificationScreen from '../Pages/NotificationScreen';
import SectionDetail from '../Pages/SectionDetail';
import ProposalTracker from '../Pages/ProposalTracker';
import MainTabNavigator from '../Components/MainTabNavigator';
import CreateTitleComponent from '../Components/CreateTitleComponent';
import SelectResearchAreaComponent from '../Components/SelectResearchAreaComponent';
import CreateResearchTitleComponent from '../Components/CreateResearchTitleComponent';
import ManageTitle from '../Pages/ManageTitle';


const Stack = createNativeStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home} ></Stack.Screen>
        <Stack.Screen name="course-detail" component={CourseDetails} ></Stack.Screen>
        <Stack.Screen name="course-chapter"
        component={CourseChapter}/>
         <Stack.Screen name="play-video"
        component={PlayVideo}/>
        <Stack.Screen name="ChartScreen" component={ChartScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="UserListScreen" component={UserListScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="SectionDetail" component={SectionDetail} />
        <Stack.Screen name="ProposalTracker" component={ProposalTracker} />
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
        <Stack.Screen name="CreateTitleComponent" component={CreateTitleComponent} />
        <Stack.Screen name="SelectResearchArea" component={SelectResearchAreaComponent} />
        <Stack.Screen name="CreateResearchTitle" component={CreateResearchTitleComponent} />
        <Stack.Screen name="ManageTitle" component={ManageTitle} />
    </Stack.Navigator>
  )
}