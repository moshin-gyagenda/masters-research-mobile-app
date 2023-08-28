import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import Colors from '../Shared/Colors'
import { Ionicons } from '@expo/vector-icons'; 
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';
import { useNavigation } from '@react-navigation/native';



export default function Login() {

    WebBrowser.maybeCompleteAuthSession();
    const [accessToken,setAccessToken]=useState();
    const [userInfo,setUserInfo]=useState();
    const {userData,setUserData}=useContext(AuthContext)
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '55959786226-e9frfu2d60hu3lt653blch82e4rhjsnp.apps.googleusercontent.com',
        expoClientId:'55959786226-llk648p590tvtaoklnv4o89mtjtenecr.apps.googleusercontent.com'
       
      });

      useEffect(()=>{
        if(response?.type=='success')
        {
            setAccessToken(response.authentication.accessToken);
           
            getUserData();
        }
      },[response]);

      const getUserData=async()=>{
        try {
            const resp = await fetch(
              "https://www.googleapis.com/userinfo/v2/me",
              {
                headers: { Authorization: `Bearer ${response.authentication.accessToken}` },
              }
            );
      
            const user = await resp.json();
            console.log("user Details",user) 
            setUserInfo(user); 
            setUserData(user);
            await Services.setUserAuth(user);
          } catch (error) {
            // Add your own error handler here
          }
      }
  return (
    <View>
      
      <View style={styles.container}>
      <Image source={require('./../Assets/Images/ict4mp.jpg')}  style={{ width: 200, height: 220, margin:30,marginLeft:80}}/>
        {/* Email Input */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCompleteType="email"
        />
        {/* Password Input */}
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={() =>
            setUserData({
              name: 'Makubuya Rogers',
              picture:
                'https://cdn3d.iconscout.com/3d/premium/thumb/male-customer-call-service-portrait-6760890-5600697.png?f=webp',
              email: 'makubuyarogers@gmail.com',
              id: 1,
            })
          } style={styles.button}>
          <Text style={{ color: Colors.white }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgot}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginTop:40,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height:900,
    paddingHorizontal: 20, // Added for horizontal padding
  },
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20, // Added marginBottom
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    margin: 30,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  
  forgot: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});