import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, RefreshControl, Text } from 'react-native';
import CourseItem from './CourseItem ';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAll } from '../../utils/api/courses'
import { getUserById } from '../../utils/api/user'
import jwt_decode from "jwt-decode";
import Background from '../../componants/Background'
import COLORS from '../../colors/colors';
import { ActivityIndicator, Colors } from 'react-native-paper';

const CoursesListScreen = () => {


  const [coursesList, setCoursesList] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log("Error fetching courses list:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={COLORS.accent} style={{ transform: [{ scale: 2 }] }} />
    </View>
    
    
    );
  }

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
      {coursesList.length > 0 ? (
        coursesList.map(item => (
          <CourseItem key={item._id} course={item} userCourses={userCourses} />
        ))
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '50%' }}>
          <Text style={{ color: 'red', fontSize: 30 }}>No courses found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default CoursesListScreen;
