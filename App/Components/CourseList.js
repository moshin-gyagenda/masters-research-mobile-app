import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '../Shared/Colors';
import { useNavigation } from '@react-navigation/native';

const dummyCourseList = [
  {
    id: 1,
    name: 'Introduction',
    description: 'This is the first section of the Proposal',
    image: 'https://managementpaper.com/blog/wp-content/themes/mptwentytwenty/assets/images/banner-graphics.png',
    Topic: ['Background of the Study', 'Statement Of the Problem', 'Purpose of the Study',
              'Study Objectives','Research Question'],
  },
  {
    id: 2,
    name: 'Literature Review',
    description: 'This is the Second section of the Proposal',
    image: 'https://nmc-mic.ca/wp-content/uploads/2016/09/iStock_14825929_LARGE-magnifying-glass-Medium-1.jpg',
    Topic: ['Theoratical Framework', 'Empirical Literature', 'Conclusion'],
  },
  {
    id: 3,
    name: 'Methodology',
    description: 'This is the Third section of the Proposal',
    image: 'https://www.liezelkorf.co.za/wp-content/uploads/2023/05/research-methodology.jpg',
    Topic: ['Research Design', 'Study Population', 'Sample Methods','Data Collection',
  'Measurement and Variables','Data Quality','Data Processing'],
  },
];

export default function CourseList() {
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
        Stage One: Proposal
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
