import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Section Two has been approved' },
    { id: 2, message: 'You have a new chart message' },
    // Add more notifications as needed
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <View style={styles.container}>
        <View style={{height:50}}> 

        </View>

      <Text style={styles.title}>Notifications</Text>
      <ScrollView contentContainerStyle={styles.notificationContainer}>
        {notifications.map(notification => (
          <View key={notification.id} style={styles.notification}>
            <Text style={styles.notificationText}>{notification.message}</Text>
          </View>
        ))}
        {notifications.length === 0 && (
          <Text style={styles.emptyText}>No notifications to show.</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.clearButton} onPress={clearNotifications}>
        <Text style={styles.clearButtonText}>Clear Notifications</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Set background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationContainer: {
    flexGrow: 1,
  },
  notification: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  notificationText: {
    fontSize: 16,
  },
  emptyText: {
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#FF5733',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    width: '80%',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default NotificationScreen;
