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
import {  Alert, Dimensions } from 'react-native';

import MenuItem from "./MenuItem ";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "../ipConfig";
import {getUserById} from '../utils/api/user'
import { logout } from '../Redux/Slices/authSlice';

function CustomDrawerContent(props) {

  const navigation = useNavigation();

  const dispatch = useDispatch();


const language = useSelector((state) => state.Localization.language);
const [username, setUsername] = useState(""); // New state for message
const [profileImg, setprofileImg] = useState(); // New state for message

const retrieveUserData = async () => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");

    return { userId, token };
  } catch (error) {
    console.log("Error retrieving data:", error);
    throw error;
  }
};

const getUserData = async () => {
  try {
    const { userId, token } = await retrieveUserData();
    const userData = await getUserById(userId, token);
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Example of using getUserData
getUserData()
  .then(userData => {
setUsername(userData.data.name)
setprofileImg(userData.data.image)
  })
  .catch(error => {
    console.error("Error:", error);
  });


  
  const staticText = {
    en: {
      darkMode: "Dark Mode",
      arabicLanguage: "Arabic Language",
      userName: username,
      profileSettings: "Your Profile",
      logout: "Logout",
      setings:"Setings"
    },
    ar: {
      darkMode: "الوضع الليلي",
      arabicLanguage: "اللغة العربية",
      userName: username,
      profileSettings: "ملفك الشخصي",
      logout: "تسجيل الخروج",
      setings:"الاعدادات"

    },
  };

  const text = staticText[language];

  const handleProfileSettings = () => {
    navigation.navigate('DevelopmentScreen'); 
  };

  const handleSignals = () => {
    navigation.navigate('DevelopmentScreen'); 
  };

  const handleContactUs = () => {
    navigation.navigate('DevelopmentScreen'); 
  };

  const handleBlogs = () => {
    navigation.navigate('DevelopmentScreen'); 
  };

  const handleCalendar = () => {
    navigation.navigate('courses'); 
  };

  const handleMarketPrice = () => {
    navigation.navigate('prices'); 
  };

  const handleChart = () => {
    navigation.navigate('TradingView'); 
  };

  const handleCourses = () => {
    navigation.navigate('CoursesListScreen'); 
  };

  const handleSettings = () => {
    navigation.navigate('setings'); 
  };

  const handleLogout = () => {
  
    const strings = {
      en: {
        logoutTitle: 'Logout',
        logoutMessage: 'Are you sure you want to logout?',
        cancel: 'Cancel',
        logout: 'Logout'
      },
      ar: {
        logoutTitle: 'تسجيل الخروج',
        logoutMessage: 'هل أنت متأكد أنك ترغب في تسجيل الخروج؟',
        cancel: 'إلغاء',
        logout: 'تسجيل الخروج'
      }
    };
  
    Alert.alert(
      strings[language].logoutTitle,
      strings[language].logoutMessage,
      [
        {
          text: strings[language].cancel,
          style: 'cancel',
        },
        {
          text: strings[language].logout,
          onPress: async () => {
            try {
               dispatch(logout());

              await AsyncStorage.clear();
              console.log('local storage cleared');
            } catch (error) {
              console.log('failed to clear local storage', error);
            }
            navigation.navigate('Login');
          },
        },
      ],
    );
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


  const ProfileImage = ( ip, profileImg ) => {
    let source;
    if (profileImg !== './uploads/user.webp') {
      source = { uri: `${ip}/${profileImg}` };
    } else {
      source = require('../assets/user.png'); 
    }

    return source;
  };
  const source = ProfileImage(ip, profileImg);
  
  



    
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
  <View style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row', alignItems: 'center', margin:20, padding: 2 }}>
  <Image
        source={source}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30, 
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


<View style={{ marginTop: 30,marginBottom:30 }}>
      {menuItems.map((item, index) => (
        <MenuItem

          key={index}
          names={item.names}
          iconName={item.iconName}
          onPress={item.onPress}
          language={language}
          spacing={index === menuItems.length - 1 ? 5 : 28} 
        />
      ))}
    </View>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
