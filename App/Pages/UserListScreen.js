import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ChatHeader from '../Components/ChatHeader';

const userList = [
  { id: 1, name: 'Viola Awor', profilePic: require('../../assets/profile_pic.jpg'), lastMessage: 'Hello there!' },
  { id: 2, name: 'Ben Ogot', profilePic: require('../../assets/profile_pic.jpg'), lastMessage: 'Sure thing!' },
  { id: 3, name: 'Moshin', profilePic: require('../../assets/profile_pic.jpg'), lastMessage: 'How are you' },
  { id: 4, name: 'Simon Peter', profilePic: require('../../assets/profile_pic.jpg'), lastMessage: 'Hey Rogers' },
  // Add more users here
];

const UserListScreen = ({ navigation }) => {
  const handleUserPress = (user) => {
    navigation.navigate('ChatScreen', { userId: user.id, userName: user.name, userList: userList, });
  };

  return (
    <View style={styles.container}>
        <View style={{height:50}}> 

        </View>
        <ChatHeader/>
      <FlatList
        data={userList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
            <Image source={item.profilePic} style={styles.profilePic} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#888',
  },
});

export default UserListScreen;
