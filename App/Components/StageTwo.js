import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '../Shared/Colors';
import { useNavigation } from '@react-navigation/native';

const dummyCourseList = [
  {
    id: 1,
    name: 'Data Collection',
    description: 'This is the first section of the Proposal',
    image: 'https://researchleap.com/wp-content/uploads/2014/11/data-collection.png',
    Topic: ['Data collection'],
  },
  {
    id: 2,
    name: 'Analysis Of Data',
    description: 'This is the Second section of the Proposal',
    image: 'https://mprcenter.org/wp-content/uploads/2021/02/shutterstock_64594294-800x600.jpg',
    Topic: ['Theoratical Framework'],
  },
  {
    id: 3,
    name: 'Discussion',
    description: 'This is the Third section of the Proposal',
    image: 'https://img.freepik.com/free-vector/business-decisions-concept-illustration_114360-4096.jpg',
    Topic: ['Discussion'],
  },
  {
    id: 4,
    name: 'Recommendation',
    description: 'This is the Third section of the Proposal',
    image: 'https://dummyimage.com/180x100/e74c3c/ffffff',
    Topic: ['Recommendation'],
  },
  {
    id: 5,
    name: 'Final Thesis',
    description: 'This is the Third section of the Proposal',
    image: 'https://dummyimage.com/180x100/e74c3c/ffffff',
    Topic: ['Final Thesis'],
  },
  {
    id: 6,
    name: 'Final Viva Voce',
    description: 'This is the Third section of the Proposal',
    image: 'https://dummyimage.com/180x100/e74c3c/ffffff',
    Topic: ['Final Viva Voce'],
  },
];

export default function StageTwo() {
  const [courseList, setCourseList] = useState(dummyCourseList);
  const navigation = useNavigation();

  const onPressCourse = (course) => {
    navigation.navigate('course-detail', {
      courseData: course,
      courseType: 'text',
    });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          marginBottom: 3,
        }}>
        Stage Two: Thesis
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              marginRight: 10,
              borderRadius: 10,
            }}
            onPress={() => onPressCourse(item)}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 180,
                height: 100,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                resizeMode: 'cover',
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {item.name}
              </Text>
              <Text style={{ color: Colors.gray, fontWeight: '300' }}>
                {item.Topic?.length} sub-sections
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
