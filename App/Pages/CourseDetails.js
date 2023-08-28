import { View, Text } from 'react-native';
import React, { useContext,useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import { Image } from 'react-native';
import CourseContent from '../Components/CourseContent';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';

export default function CourseDetails() {
  const param = useRoute().params;
  const [course, setCourse] = useState([]);
  const navigation = useNavigation();
  const [userProgress, setUserProgress] = useState([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    setCourse(param?.courseData);

    // Create dummy userProgress array based on the course's topics
    const dummyUserProgress = param?.courseData.Topic.map((topic, index) => ({
      id: index + 1, // You can use a different unique identifier if needed
      courseId: param.courseData.id,
      courseContentId: topic.id, // Assuming your topic has an id property
    }));

    setUserProgress(dummyUserProgress);
  }, [param.courseContentId]);

  return (
    <View style={{ padding: 20, paddingTop: 10 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{course.name}</Text>
        <Text style={{ color: Colors.gray }}>By Rogers</Text>
        <Image
          source={{ uri: course.image }}
          style={{ height: 150, marginTop: 10, borderRadius: 10 }}
        />
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>
          About Section
        </Text>
        <Text numberOfLines={4} style={{ color: Colors.gray }}>
          {course.description}
        </Text>
      </View>
      <CourseContent
        course={course}
        userProgress={userProgress}
        courseType={param.courseType}
      />
    </View>
  );
}
