import { View, Text } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CourseContent({ course, userProgress, courseType }) {
  const navigation = useNavigation();

  const checkUserProgress = (contentId) => {
    return userProgress.find((item) => item.courseContentId == contentId);
  };
  const getCompletionIcon = (index) => {
    if (index > 1) {
      return (
        <Ionicons
          name="close-circle" // Use the close icon for index 0 and 1
          size={24}
          color="#FF0000"// Use red color for crossed icon
          style={{ marginRight: 20 }}
        />
      );
    } else {
      return (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={
            index === 0
              ? Colors.green
              : index === 1
              ? "#FFA500"
              : "#FF0000"
          }
          style={{ marginRight: 20 }}
        />
      );
    }
  };

  const onChapterPress = (courseContent, index) => {
    if (index < 2) {
      navigation.navigate('SectionDetail', { courseContent });
     
    }
  };
  

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Course Content</Text>
      <FlatList
        style={{ marginTop: 10 }}
        data={course?.Topic}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onChapterPress(item, index)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: Colors.white,
              marginBottom: 5,
              padding: 13,
              alignItems: 'center',
              borderRadius: 5,
            }}
          >
            {getCompletionIcon(index)}
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: index < 2 ? Colors.gray : "#FF0000",
                marginRight: 20,
              }}
            >
              {index + 1}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item}</Text>
          </TouchableOpacity>
        )}
      />


    </View>
  );
}
