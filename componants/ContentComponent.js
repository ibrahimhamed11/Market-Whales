import React, { useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, Switch } from 'react-native';
import { Card, Divider, useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../Redux/Slices/Localization'; // Replace with actual path

function CustomDrawerContent(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(false);
  const { colors } = useTheme();
  const language = useSelector(state => state.Localization.language);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
    dispatch(setLanguage(isArabic ? 'en' : 'ar')); // Assuming 'en' is English and 'ar' is Arabic
  };

  const staticText = {
    en: {
      darkMode: 'Dark Mode',
      arabicLanguage: 'Arabic Language',
      userName: 'User Name',
    },
    ar: {
      darkMode: 'الوضع الليلي',
      arabicLanguage: 'اللغة العربية',
      userName: 'اسم المستخدم',
    },
  };

  const text = staticText[language];

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ margin: 10 }}>
        <Card>
          <Card.Content>
            <Image
              source={require('../assets/log.png')} 
              style={{ width: 40, height: 40, borderRadius: 20, alignSelf: 'center' }}
            />
            <Text style={{ fontFamily: 'Droid', textAlign: 'center' }}>
              {text.userName}
            </Text>
          </Card.Content>
        </Card>
      </View>
      <DrawerItemList {...props} />
      <Divider style={{ marginVertical: 10, marginHorizontal: 10 }} />
      <Card style={{ marginHorizontal: 10, padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ flex: 1, fontFamily: 'Droid' }}>{text.darkMode}</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            color={colors.primary}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 1, fontFamily: 'Droid' }}>{text.arabicLanguage}</Text>
          <Switch
            value={isArabic}
            onValueChange={toggleLanguage}
            color={colors.primary}
          />
        </View>
      </Card>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
