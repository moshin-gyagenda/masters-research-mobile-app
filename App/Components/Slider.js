import { View, Text,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../Shared/GlobalApi';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Slider() {

  const navigation=useNavigation();

    const [slider,setSlider]=useState([])
    useEffect(()=>{
        getSlider();
      },[])
  
      const getSlider=async()=>{
        const result=(await GlobalApi.getSlider()).data;
       
        const resp=result.data.map((item)=>({
            id:item.id,
            name:item.attributes.name,
            image:item.attributes.image.data.attributes.url
        }))
       
        setSlider(resp)
      }
      const onPressResearch=()=>{
        
        navigation.navigate('ProposalTracker')
    }
      
  return (
    <View style={{marginTop:10}}>
      <Text style={{fontSize:20,fontWeight:'bold',marginBottom:3}}>Research Journey Progress</Text>
      <TouchableOpacity style={{marginTop:6}}  onPress={()=>onPressResearch()}>
        <Image source={{uri:'https://images.squarespace-cdn.com/content/v1/521837e4e4b0576a596681c6/1377746359162-NZJ0UGGRZD5CHSLJ7VWJ/research-information-system.jpeg?format=1500w'}} 
            style={{width:Dimensions.get('screen').width*0.94
            ,height:150,borderRadius:10,marginRight:15}}
        />
      </TouchableOpacity>
    </View>
  )
  const styles = StyleSheet.create({})
}