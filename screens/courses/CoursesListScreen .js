// CoursesListScreen.js
import React from 'react';
import { View, FlatList } from 'react-native';
import CourseItem from './CourseItem ';


const coursesData = [
  {
    id: 1,
    name: 'Course 1',
    description: 'Description for Course 1',
    type: 'Paid',
    price: 99.99,
    image: '../../assets/course.png',
    playlistId:'PLOwj-wNPlOZmidIYxxDjXtpww4uMk2pQQ'
  },
  {
    id: 2,
    name: 'Course 2',
    description: 'Description for Course 2',
    type: 'Free',
    price: 0,
    image: '../../assets/course.png',
    playlistId:'PLOwj-wNPlOZmidIYxxDjXtpww4uMk2pQQ'

  },
  // Add more courses here
];

const CoursesListScreen = () => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <FlatList
        data={coursesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CourseItem course={item} />}
        numColumns={2}
      />
    </View>
  );
};

export default CoursesListScreen;
