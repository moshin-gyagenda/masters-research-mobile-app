import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';


const ChatScreen = ({ route }) => {
  const { userId, userName, userList } = route.params;
  const [messages, setMessages] = useState([
    { text: 'Hello!', sender: 'user' },
    { text: 'Hi there!', sender: 'other' },
    { text: 'How are you?', sender: 'user' },
    { text: "I'm good, thanks!", sender: 'other' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const navigation = useNavigation(); // Get the navigation object
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessages = [...messages, { text: newMessage, sender: 'user' }];
    setMessages(newMessages);
    setNewMessage('');
  };

  const handleNotificationIconPress = () => {
    navigation.navigate('NotificationScreen'); // Navigate to your notification screen
  };

  return (
    <View style={styles.container}>
        <View style={{height:50}}> 

        </View>

        <View style={styles.header}>
        <Image source={userList.find((user) => user.id === userId).profilePic} style={styles.profilePic} />
        <Text style={styles.userName}>{userName}</Text>
        <View style={styles.userInfo}>
          <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.icon}>
              <Icon name="notifications-outline" size={25} color="black"   onPress={handleNotificationIconPress}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icon name="menu-outline" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.otherMessage}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ... styles definition remains the same ...
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 0,
      },
      lastMessage: {
        fontSize: 14,
        color: '#888',
      },
      iconsContainer: {
        flexDirection: 'row',
      },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#DCF8C5',
      padding: 8,
      marginVertical: 4,
      borderRadius: 8,
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#E0E0E0',
      padding: 8,
      marginVertical: 4,
      borderRadius: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 8,
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    sendButton: {
      backgroundColor: '#007BFF',
      padding: 8,
      borderRadius: 8,
      marginLeft: 8,
    },
    sendButtonText: {
      color: 'white',
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 10,
    },
  });
export default ChatScreen;
