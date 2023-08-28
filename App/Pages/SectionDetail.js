import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const SectionDetail = () => {
  const [uploads, setUploads] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const route = useRoute();
  const { courseContent } = route.params;

  const handleUpload = async () => {
    if (selectedFile) {
      const newUpload = {
        id: Date.now().toString(),
        uri: selectedFile.uri,
        comment,
        sentBy: 'student', // You can manage authentication to get the current user here
        date: new Date().toISOString(),
      };

      setUploads(prevUploads => [...prevUploads, newUpload]);
      setComment('');
      setSelectedFile(null);
    } else if (comment.trim() !== '') {
      const newUpload = {
        id: Date.now().toString(),
        uri: null,
        comment,
        sentBy: 'student', // You can manage authentication to get the current user here
        date: new Date().toISOString(),
      };

      setUploads(prevUploads => [...prevUploads, newUpload]);
      setComment('');
    }
  };

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
      });

      if (result.type === 'success') {
        setSelectedFile(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{courseContent}</Text>

      <View style={styles.formContainer}>
        <View style={styles.filePickerContainer}>
          <Button title="Select File" onPress={handleFileSelect} color="#4CAF50" />
          {selectedFile && (
            <Text style={styles.selectedFileName}>{selectedFile.name}</Text>
          )}
        </View>

        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment"
          value={comment}
          onChangeText={text => setComment(text)}
          multiline={true}
          numberOfLines={4}
        />

        <Button title="Save" onPress={handleUpload} color="#4CAF50" style={styles.savebtn} />
      </View>

      <FlatList
        style={styles.uploadList}
        data={uploads}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.uploadItem}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.sentByText}>Sent By: {item.sentBy}</Text>
            <Text style={styles.dateText}>Date: {item.date}</Text>
            {item.uri && (
              <View style={styles.downloadButton}>
              <MaterialIcons
                name="insert-drive-file"
                size={30}
                color="#4CAF50"
                onPress={() => console.log("Download:", item.uri)} // Replace with your download logic
              />
            </View>
            )}
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.approveButtonContainer}>
      {/* <Button
        title="Approve"
        onPress={() => {
          // Handle the approve action here
        }}
        color="#4CAF50"
      />
      <MaterialIcons
        name="check-circle"
        size={24}
        color="green"
        style={styles.approveIcon}
      /> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  filePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedFileName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4CAF50',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  uploadList: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  savebtn:{
    width:'20%',
  },
  uploadItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sentByText: {
    fontSize: 14,
    color: '#888',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  approveButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#4CAF50',
    padding: 10,
    // borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start', // To align the button to the left
  },
  approveIcon: {
    marginLeft: 0,
  },
});

export default SectionDetail;
