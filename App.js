import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View, TextInput, FlatList, Image, Button, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { Card } from 'react-native-paper'; // Import the Card component

import CustomDrawerContent from './componants/ContentComponent';




//Screens
import Login from './screens/Login';
import Splash from './componants/Splash';
import Onboarding from './screens/Onboarding';
import sellerRegister from './screens/SellerRegister'
import motherRegister from './screens/MotherRegister'
import JoinUs from './screens/joinUs'
import TabBar from './componants/TabBar';
import SellerProfile from './screens/SellerProfile'
import Notfications from './screens/Notfications'
import PhoneAuth from './screens/phoneAuth'
import PaymentScreen from './screens/PaymentScreen';
import TradingViewChart from './screens/TradingView';
import { FontAwesome } from '@expo/vector-icons';


LogBox.ignoreAllLogs()
//redux
import { Store } from './Redux/Store';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {



  // get role
  const [role, setRole] = useState(null); // Initialize role with null
  // const [HeaderColor, setHeaderColor] = useState(''); // Initialize role with null
  const getRole = async () => {
    try {
      const storedRole = await AsyncStorage.getItem('role');
      // console.log('The role: ', storedRole);
      // console.log('The role before: ', storedRole);
      setRole(storedRole); // Set the retrieved role  in the state
      // console.log('The role aFRTEE: ', storedRole);
    } catch (error) {
      console.log('Error retrieving role:', error);
    }
  };

  //Font
  const loadFont = async () => {
    await Font.loadAsync({
      'Droid': require('./assets/fonts/Droid.ttf'),
    });
    setIsFontLoaded(true);
  };
  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));
  }, []);


  // to show on boarding pages
  useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    } else {
      setIsAppFirstLaunched(false);
    }
    getRole()
  }, []);

  //-----------------------------------------------
  function DrawerNavigator() {


    const nav = useNavigation()

    const NotificationIcon = ({ notification }) => (
      <View style={{ marginRight: 30 }}>
        <TouchableOpacity onPress={() => nav.navigate("الاشعارات")}>
          <FontAwesome name="bell" size={20} color="#58564CF3" />
          {notification > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -8,
                right: 10,
                backgroundColor: 'red',
                borderRadius: 10,
                width: 20,
                height: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 15 }}>{notification}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );

    const language = useSelector(state => state.Localization.language);

    const { notification } = useSelector((state) => state.Notify)
    const drawerPosition = language === 'ar' ? 'right' : 'left'; // Adjust as per your logic

    return (
      <Drawer.Navigator

      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerPosition:drawerPosition,
        headerRight: () => <NotificationIcon notification={notification} />
      }}
    >
<Drawer.Screen
  name={language === 'en' ? 'Home' : 'الرئيسية'}
  component={TabBar}
  options={{
   
    headerShown: true,
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
      </View>
    ),
    headerStyle: {
      backgroundColor: '#ffffff',
      height: Dimensions.get('screen').height * 0.1,
    },
    headerTintColor: '#000000',
    drawerLabelStyle: {
      fontFamily: 'Droid',
      fontWeight: 'bold',
    },
    drawerActiveBackgroundColor: '#76005e50',
    drawerActiveTintColor: '#ffffff',
  }}
/>





      <Drawer.Screen
        name={language === 'en' ? 'Contact Us' : 'تواصل معنا'}
        component={Notfications}
        options={{
       
          drawerLabel: ({ focused }) => (
            <Text style={{ fontFamily: 'Droid', fontWeight: focused ? 'bold' : 'normal' }}>
              {language === 'en' ? 'Contact Us' : 'تواصل معنا'}
            </Text>
          ),
          drawerActiveBackgroundColor: '#76005e50',
          drawerActiveTintColor: '#ffffff',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#76005f',
          },
          headerTintColor: 'white',
        }}
      />
      <Drawer.Screen
        name={language === 'en' ? 'Notifications' : 'الاشعارات'}
        component={Notfications}
        options={{
      
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#76005f',
          },
          headerTintColor: 'white',
          drawerLabel: ({ focused }) => (
            <Text style={{ fontFamily: 'Droid', fontWeight: focused ? 'bold' : 'normal' }}>
              {language === 'en' ? 'Notifications' : 'الاشعارات'}
            </Text>
          ),
          drawerActiveBackgroundColor: '#76005e50',
          drawerActiveTintColor: '#ffffff',
        }}
      />
    </Drawer.Navigator>
  );
}





  return (
    <Provider store={Store}>
      <StripeProvider publishableKey="pk_test_51NlDn6KCaMzRmiy87aSzhXE9uCesxTDdlgPtlPBkxRlg2lzrkxL1qGN43HeheXPiprSwXbuUwo8vNW6H1vhmxtap00qpLbt3xB">
      <NavigationContainer>
        <Stack.Navigator>


          <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name='Onboarding' component={Onboarding} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='JoinUs' component={JoinUs} options={{ headerShown: false }} />
          <Stack.Screen name='SellerRegister' component={sellerRegister} options={{ headerShown: false }} />
          <Stack.Screen name='MotherRegister' component={motherRegister} options={{ headerShown: false }} />
          <Stack.Screen name='Sellerprofile' component={SellerProfile} options={{ headerShown: false }} />
          <Stack.Screen name='PhoneAuth' component={PhoneAuth} options={{ headerShown: false }} />
          <Stack.Screen name='PaymentScreen' component={PaymentScreen} options={{ headerShown: false }} /> 
          <Stack.Screen name='TradingView' component={TradingViewChart} options={{ headerShown: false }} />

        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
