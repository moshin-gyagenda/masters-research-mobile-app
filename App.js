import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Modal,TextInput,Button,Alert , } from 'react-native';
import Login from './App/Pages/Login';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import Home from './App/Pages/Home';
import Services from './App/Shared/Services';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigation from './App/Navigations/HomeNavigation';
import MainTabNavigator from './App/Components/MainTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import CreateTitleComponent from './App/Components/CreateTitleComponent';


export default function App() {

  const [userData,setUserData]=useState();
  const [complaintModalVisible, setComplaintModalVisible] = useState(false);
  const [complaintText, setComplaintText] = useState('');

  const openComplaintModal = () => {
    console.log('Complaint works');
    setComplaintModalVisible(true);
  };

  const closeComplaintModal = () => {
    setComplaintModalVisible(false);
    setComplaintText('');
  };

  const handleComplaintSubmit = () => {
    // Implement logic to send the complaint
    // You can use an API call or any other method here
    closeComplaintModal();
    // Display a notification that the complaint has been sent
    Alert.alert('Complaint Sent', 'Your complaint has been successfully sent!', [
        { text: 'OK', onPress: () => console.log('Complaint sent notification closed') },
    ]);
  };
  useEffect(()=>{
    Services.getUserAuth().then(resp=>{
      console.log(resp); 
      if(resp)
      {
        setUserData(resp)
      }
      else{
        setUserData(null)
      }
    })
  },[]) 
  return (
    <View style={styles.container}>
      <AuthContext.Provider 
      value={{userData,setUserData}}>
      {userData?
      <NavigationContainer>
          {/* <CreateTitleComponent /> */}
          <MainTabNavigator/>
          {/* Touchable Complaint Icon */}
        <TouchableOpacity
          style={styles.complaintIcon}
          onPress={openComplaintModal}
        >
          <Text style={styles.complaintIconText}>?</Text>
        </TouchableOpacity>
      </NavigationContainer>
      :<Login/>}
      
      </AuthContext.Provider>
      <Modal
          animationType="slide"
          transparent={true}
          visible={complaintModalVisible}
          onRequestClose={closeComplaintModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Send Complaint</Text>
              <TextInput
                style={styles.complaintInput}
                multiline
                placeholder="Enter your complaint..."
                value={complaintText}
                onChangeText={setComplaintText}
              />
              <Button title="Send" onPress={handleComplaintSubmit} />
            </View>
          </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F6F8FC',
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  complaintInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  // Styles for the Complaint Icon
  complaintIcon: {
    position: 'absolute',
    bottom: 60,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  complaintIconText: {
    fontSize: 24,
    color: 'white',
  },
});
