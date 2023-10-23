import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native'; // Added RefreshControl
import CourseItem from './CourseItem ';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAll } from '../../utils/api/courses'
import { getUserById } from '../../utils/api/user'
import jwt_decode from "jwt-decode";
import Background from '../../componants/Background'
import COLORS from '../../colors/colors';
const CoursesListScreen = () => {
  const [coursesList, setCoursesList] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Added refreshing state

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;

      const userData = { token };

      const coursesList = await getAll(userData.token);
      setCoursesList(coursesList);

      const userCoursesResponse = await getUserById(userId, token);
      setUserCourses(userCoursesResponse.data.boughtCourses);
    } catch (error) {
      console.log("Error fetching courses list:", error);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        const userData = { token };

        const coursesList = await getAll(userData.token);
        setCoursesList(coursesList);

        const userCoursesResponse = await getUserById(userId, token);
        setUserCourses(userCoursesResponse.data.boughtCourses);

      } catch (error) {
        console.log("Error fetching courses list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {coursesList.map(item => (
        <CourseItem key={item._id} course={item} userCourses={userCourses} />
      ))}
    </ScrollView>
  );
};

export default CoursesListScreen;
