import React, { useState } from "react";
import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  Image,
  ImageBackground 
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import MenuItem from "./MenuItem ";
import { useNavigation } from '@react-navigation/native';

function CustomDrawerContent(props) {

const language = useSelector((state) => state.Localization.language);




  const staticText = {
    en: {
      darkMode: "Dark Mode",
      arabicLanguage: "Arabic Language",
      userName: "Ibrahim Hamed",
      profileSettings: "Your Profile",
      logout: "Logout",
      setings:"Setings"
    },
    ar: {
      darkMode: "الوضع الليلي",
      arabicLanguage: "اللغة العربية",
      userName: "Ibrahim Hamed",
      profileSettings: "ملفك الشخصي",
      logout: "تسجيل الخروج",
      setings:"الاعدادات"

    },
  };

  const text = staticText[language];
  const navigation = useNavigation(); // Get the navigation object

  const handleProfileSettings = () => {
    navigation.navigate('JoinUs'); 
  };

  const handleSignals = () => {
    // Function for handling signals
  };

  const handleContactUs = () => {
    // Function for handling contact us
  };

  const handleBlogs = () => {
    // Function for handling blogs
  };

  const handleCalendar = () => {
    // Function for handling calendar
  };

  const handleMarketPrice = () => {
    // Function for handling market price
  };

  const handleChart = () => {
    // Function for handling chart
  };

  const handleCourses = () => {
    // Function for handling courses
  };

  const handleSettings = () => {
    navigation.navigate('setings'); 
  };

  const handleLogout = () => {
    // Function for handling logout
  };



  const menuItems = [
    { names: ['ملفك الشخصي', 'Your Profile'], iconName: 'user', onPress: handleProfileSettings },
    { names: ['التوصيات', 'Signals'], iconName: 'line-chart', onPress: handleSignals },
    { names: ['تواصل معنا', 'Contact Us'], iconName: 'envelope', onPress: handleContactUs },
    { names: ['المقالات', 'Blogs'], iconName: 'newspaper-o', onPress: handleBlogs },
    { names: ['التقويم', 'Calendar'], iconName: 'calendar', onPress: handleCalendar },
    { names: ['اسعار السوق', 'Market Price'], iconName: 'money', onPress: handleMarketPrice },
    { names: ['الشارت', 'Chart'], iconName: 'line-chart', onPress: handleChart },
    { names: ['الكورسات', 'Courses'], iconName: 'graduation-cap', onPress: handleCourses },
    { names: ['الإعدادات', 'Settings'], iconName: 'cogs', onPress: handleSettings },
    { names: ['تسجيل الخروج', 'Logout'], iconName: 'sign-out', onPress: handleLogout },
  ];


  return (
    <DrawerContentScrollView {...props}>
<ImageBackground 
  source={require('../assets/user2.png')} 
  style={{ 
    flex: 1,
    height:150,
    width:'100%',
    overflow: 'hidden'  ,
    borderRadiusButtom: 70, 

  }}
>
  <View style={{ flexDirection: language === 'en' ? 'row-reverse' : 'row', alignItems: 'center', margin:20, padding: 2 }}>
    <Image
      source={require("../assets/userimage.png")}
      style={{
        width: 60,
        height: 60,
        borderRadius: 52, 
     
      }}
    />
 <Text
  style={{
    fontFamily: "Droid",
    textAlign: language === 'ar' ? 'right' : 'left',
    marginTop: 10,
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    fontWeight: 'bold', 
    color: '#51117f' 
  }}
>
      {text.userName}
    </Text>
  </View>
</ImageBackground>


<View style={{ marginTop: 30 }}>
      {menuItems.map((item, index) => (
        <MenuItem

          key={index}
          names={item.names}
          iconName={item.iconName}
          onPress={item.onPress}
          language={language}
          spacing={index === menuItems.length - 1 ? 5 : 30} 
        />
      ))}
    </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
