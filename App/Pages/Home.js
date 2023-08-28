import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Button } from 'react-native'
import Services from '../Shared/Services'
import { AuthContext } from '../Context/AuthContext'
import WelcomeHeader from '../Components/WelcomeHeader'
import SearchBar from '../Components/SearchBar'
import GlobalApi from '../Shared/GlobalApi'
import Slider from '../Components/Slider'
import VideoCourseList from '../Components/VideoCourseList'
import CourseList from '../Components/CourseList'
import StageTwo from '../Components/StageTwo'
import { ScrollView } from 'react-native'



export default function Home() {
   
   
  return (
    <View style={{ flex: 1 }}>
      <WelcomeHeader />
      <ScrollView style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Slider/>
        <CourseList />
        <StageTwo />
        <View style={{height:50}}>
          
        </View>
      </ScrollView>
    </View>
  )
}