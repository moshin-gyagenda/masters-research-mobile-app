import React, { useContext,useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function WelcomeHeader() {
    const { userData, setUserData } = useContext(AuthContext);
    const navigation = useNavigation(); // Get the navigation object

    // State to track whether there are new notifications
    const [hasNewNotifications, setHasNewNotifications] = useState(true);

    const handleChartIconPress = () => {
        navigation.navigate('UserListScreen'); // Navigate to your chart screen
    };
    const handleNotificationIconPress = () => {
        navigation.navigate('CreateTitleComponent'); // Navigate to your notification screen
        // Mark notifications as read when the icon is pressed
        setHasNewNotifications(false);
      };
    
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: userData?.picture }}
                    style={styles.userImage}
                />
                <Text style={styles.userName}>Rogers</Text>
            </View>
            <View style={styles.iconsContainer}>
            <TouchableOpacity style={styles.icon} onPress={handleNotificationIconPress}>
          <Icon name="notifications-outline" size={25} color="black" />
          {hasNewNotifications && <View style={styles.notificationDot} />}
        </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={handleChartIconPress}>
                    <Icon name="chatbubbles-outline" size={25} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <Icon name="menu-outline" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
    },
    icon: {
        marginHorizontal: 10,
    },
    notificationDot: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 5,
      },
});
