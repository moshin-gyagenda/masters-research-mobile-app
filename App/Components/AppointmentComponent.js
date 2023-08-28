import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import RNPickerSelect from 'react-native-picker-select';
import { Provider as PaperProvider, Button, FAB, Portal, Dialog, Paragraph, TextInput, RadioButton, List, IconButton } from 'react-native-paper';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AppointmentComponent = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentDialogVisible, setAppointmentDialogVisible] = useState(false);
  const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] = useState([]);
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [reason, setReason] = useState('');
  const [appointmentType, setAppointmentType] = useState('Online'); // 'Online' or 'Physical'
  const [requests, setRequests] = useState([]);

  const handleDateSelect = date => {
    setSelectedDate(date.dateString);
    setAppointmentsForSelectedDate([
      { time: '10:00 AM', description: 'Meeting with client' },
      { time: '02:30 PM', description: 'Team brainstorming session' },
    ]);
    setAppointmentDialogVisible(true);
  };

  const hideAppointmentDialog = () => {
    setAppointmentDialogVisible(false);
    setAppointmentsForSelectedDate([]);
  };

  const handleRequestAppointment = () => {
    setRequestModalVisible(true);
  };

  const handleSaveRequest = () => {
    const newRequest = { reason, appointmentType, status: 'Pending' };
    setRequests([...requests, newRequest]);
    setRequestModalVisible(false);
    setReason('');
    setAppointmentType('Online');
  };

  const handleApproveRequest = index => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = 'Approved';
    setRequests(updatedRequests);
  };

  const handleDeclineRequest = index => {
    const updatedRequests = [...requests];
    updatedRequests[index].status = 'Declined';
    setRequests(updatedRequests);
  };

  return (
    <PaperProvider>
      <Portal.Host>
        <View style={styles.container}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{ [selectedDate]: { selected: true, marked: true, dotColor: '#3498db' } }}
              style={styles.calendar}
              theme={{
                selectedDayBackgroundColor: '#3498db',
                todayTextColor: '#3498db',
                arrowColor: '#3498db',
              }}
              current={selectedDate}
              minDate={'2023-01-01'}
              hideArrows={false}
              hideExtraDays={false}
              enableSwipeMonths={true}
              renderHeader={(date) => (
                <Text style={styles.headerText}>{monthNames[date.getMonth()]} {date.getFullYear()}</Text>
              )}
            />
          </View>
          <Button mode="contained" onPress={handleRequestAppointment} style={styles.requestButton}>
            Request Appointment
          </Button>
          <List.Section title="Requests">
            {requests.map((request, index) => (
              <List.Item
                key={index}
                title={`Reason: ${request.reason}`}
                description={`Type: ${request.appointmentType} - Status: ${request.status}`}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={request.status === 'Pending' ? 'clock' : request.status === 'Approved' ? 'check' : 'close'}
                  />
                )}
                right={props => (
                  <View style={styles.requestActions}>
                    {request.status === 'Pending' && (
                      <>
                        <IconButton
                          icon="check"
                          color="green"
                          onPress={() => handleApproveRequest(index)}
                        />
                        <IconButton
                          icon="close"
                          color="red"
                          onPress={() => handleDeclineRequest(index)}
                        />
                      </>
                    )}
                  </View>
                )}
              />
            ))}
          </List.Section>
          <Dialog visible={appointmentDialogVisible} onDismiss={hideAppointmentDialog}>
            {/* ... (rest of the code remains the same) */}
          </Dialog>
          <Dialog visible={requestModalVisible} onDismiss={() => setRequestModalVisible(false)}>
            <Dialog.Title>Request Appointment</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Reason"
                value={reason}
                onChangeText={text => setReason(text)}
              />
              <RadioButton.Group
                onValueChange={value => setAppointmentType(value)}
                value={appointmentType}
              >
                <RadioButton.Item label="Online" value="Online" />
                <RadioButton.Item label="Physical" value="Physical" />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleSaveRequest}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </View>
      </Portal.Host>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  calendarContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    marginBottom: 20,
    width: '100%', // Cover 90% of screen width
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#3498db',
  },
  requestButton: {
    marginBottom: 20,
    width:'80%',
    marginLeft: 30,
    alignItems: 'center',
  },
  requestActions: {
    flexDirection: 'row',
  },
});

export default AppointmentComponent;
