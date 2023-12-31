import React, { useEffect, useState,View } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../colors/colors'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

import * as Font from 'expo-font';

import Sellerprofile from '../screens/SellerProfile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../screens/Home';

const CustomTabBarIcon = ({ iconName, iconSize, isFocused, activeColor, inactiveColor }) => {
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    if (isFocused) {
      translateY.value = withSpring(-10, { damping: 15, stiffness: 60 }); // Adjust damping and stiffness as needed
      rotate.value = withRepeat(withSpring(360, { damping: 15, stiffness: 60 }), -1); // Adjust damping and stiffness as needed
    }
  }, [isFocused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Icon name={iconName} size={iconSize} color={isFocused ? activeColor : inactiveColor} />
    </Animated.View>
  );
};





const TabBar = () => {
  const data = useSelector((state) => state.ProductSlice);
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [role, setRole] = useState(null); // Initialize role with null

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Droid: require('../assets/fonts/Droid.ttf'),
      });
      setFontLoaded(true);
    };
    loadFonts();

    getRole();
  }, []);



  const styles = StyleSheet.create({
    customText: {
      fontFamily: 'Droid',
    },
  });




  const getRole = async () => {
    try {
      const storedRole = await AsyncStorage.getItem('userRole');
      console.log('The role: ', storedRole);
      setRole(storedRole); 

    } catch (error) {
      console.log('Error retrieving role:', error);
    }
  };

  if (!fontLoaded) {
    return null; 
  }




  if (role == "user") {



    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === 'الرئيسيه') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'المجتمع') {
              iconName = focused ? 'newspaper-o' : 'newspaper-o';
            } else if (route.name === 'المتجر') {
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
            } else if (route.name === 'السله') {
              iconName = focused ? 'shopping-basket' : 'shopping-basket';
            } else if (route.name === 'التوصيات') {
              iconName = focused ? 'user' : 'user';
            }
          
            const iconSize = focused ? size * 1.8 : size; 
          
          
          return (
            <CustomTabBarIcon
            iconName={iconName}
            iconSize={iconSize}
            isFocused={focused}
            activeColor={COLORS.accent}
            inactiveColor={COLORS.inactive}
          />
          )
          },
          
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: COLORS.inactive,
          
          tabBarStyle: {
            borderTopWidth: 1,
            height: 80, 
            position: 'absolute',
            bottom: 20, 
            left: 8,
            right: 8,
            borderRadius: 40, 
            paddingBottom: 5,
            shadowColor: '#0b0323',
            shadowOffset: {
              width: 10,
              height: 10
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
          },
          tabBarLabelStyle: [styles.customText, { fontSize: 11 }],
          tabBarIconStyle: {
         
            zIndex: 2, 
          },
          tabBarActiveBackgroundColor: {}
        })}
      >  
        <Tab.Screen name='التوصيات' component={role === 'user' ? Sellerprofile : Sellerprofile} options={{ headerShown: false }}/>
        <Tab.Screen name='المجتمع' component={Sellerprofile} options={{ headerShown: false }} />
        <Tab.Screen 
  name='الرئيسيه' 
  component={Home} 
  options={{ 
    headerShown: false,
  
  }} 
/>

        <Tab.Screen name='المتجر' component={Sellerprofile} options={{ headerShown: false }} />
        <Tab.Screen name='السله' component={Sellerprofile} options={{ tabBarBadge: data.cart.length > 0 ? data.cart.length : null, headerShown: false }} />
      </Tab.Navigator>
    );
        }    




  else {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name === 'المتجر') {
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
            } else if (route.name === 'الملف الشخصي') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'منتجاتي') {
              iconName = focused ? 'shopping-basket' : 'shopping-basket';
            }
         return (
  <Icon name={iconName} color={color} size={size * 0.8} />
);

          },

          
          tabBarActiveTintColor: '#761700',
          tabBarInactiveTintColor: '#292726c2',

          tabBarStyle: {
            borderTopWidth: 1,
            height: 60,
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            borderRadius: 25,
            paddingBottom: 5,
            shadowColor: '#0b0323',
            shadowOffset: {
              width: 10,
              height: 10
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
          },

          tabBarLabelStyle: [styles.customText, { fontSize: 11 }],
          tabBarIconStyle: {
            marginTop: 5, 
          },
          tabBarActiveBackgroundColor: {}
        })}
        tabBarOptions={{

        }}
      >





      <Tab.Screen name='الرئيسيه' component={Sellerprofile} options={{ headerShown: false }} /> 
      <Tab.Screen name='المدونات' component={Sellerprofile} options={{ headerShown: false }} />
        {/* <Tab.Screen
          name='الملف الشخصي'
          component={role === 'mother' ? ProfileScreen : Sellerprofile}
          options={{ headerShown: false }}
        /> */}
      <Tab.Screen name='المتجر' component={Sellerprofile} options={{ headerShown: false }} />
      <Tab.Screen name='منتجاتي' component={Sellerprofile} options={{ headerShown: false }} />
      <Tab.Screen name='السله' component={Sellerprofile} options={{ tabBarBadge: data.cart.length > 0 ? data.cart.length : null, headerShown: false }} /> 


      </Tab.Navigator>
    );
  }
};

export default TabBar;
