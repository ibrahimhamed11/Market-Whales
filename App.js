import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { LogBox, TouchableHighlight } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View, Dimensions } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import COLORS from "./colors/colors";
import CustomDrawerContent from "./componants/ContentComponent";
import socket from './utils/socket'; // Import the global socket


//Screens
import Login from "./screens/Login";
import Splash from "./componants/Splash";
import Onboarding from "./screens/Onboarding";
import Register from "./screens/Register";
import JoinUs from "./screens/joinUs";
import TabBar from "./componants/TabBar";
import SellerProfile from "./screens/SellerProfile";
import Notfications from "./screens/Notfications";
import PhoneAuth from "./screens/phoneAuth";
import PaymentScreen from "./screens/PaymentScreen";
import TradingViewChart from "./screens/liveChart/TradingView";
import DevelopmentScreen from "./screens/devlopment";
import VideoListScreen from "./screens/courses/VideoListScreen";
import VideoDetailScreen from "./screens/courses/videoDetails";
import CourseItem from "./screens/courses/CourseItem ";
import CoursesListScreen from "./screens/courses/CoursesListScreen ";
import prices from "./screens/marketPrices/prices";
import Signals from "./screens/signals/Signals";
import PaymentFormScreen from "./screens/order/paymentForm";
import EconomicCalendar from "./screens/EconomicCalender";



import { FontAwesome } from "@expo/vector-icons";
import Setings from "./screens/Setings";

LogBox.ignoreAllLogs();
//redux
import { Store } from "./Redux/Store";
// const isAuthenticated = Store.getState().AuthSlice.isAuthenticated;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {


  socket.connect(); // Start the socket connection

  //Font
  const loadFont = async () => {
    await Font.loadAsync({
      Droid: require("./assets/fonts/Droid.ttf"),
    });
    setIsFontLoaded(true);
  };
  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));
  }, []);

  // to show on boarding pages
  useEffect(async () => {
    const appData = await AsyncStorage.getItem("isAppFirstLaunched");
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem("isAppFirstLaunched", "false");
    } else {
      setIsAppFirstLaunched(false);
    }
  }, []);

  //-----------------------------------------------

  function DrawerNavigator() {
    const nav = useNavigation();

    const language = useSelector((state) => state.Localization.language);

    const { notification } = useSelector((state) => state.Notify);

    const drawerPosition = language === "ar" ? "right" : "left";

    return (
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => {
          const isRTL = language === "ar";

          return {
            overlayColor: "transparent",
            drawerStyle: {
              backgroundColor: "#DAD3D3",
              width: "70%",
            },
            drawerPosition: isRTL ? "left" : "right", // Set drawer position based on language



            
            headerLeft: !isRTL
              ? () => (
                  <TouchableHighlight
                    onPress={() => navigation.toggleDrawer()}
                    underlayColor="rgba(0,0,0,0.2)"
                  >
                    <FontAwesome
                      name="bars"
                      size={24}
                      color="#fff"
                      style={{ margin: 10 }}
                    />
                  </TouchableHighlight>
                )
              : () => (
                  <>
                    <TouchableHighlight
                      onPress={() => {
                        navigation.navigate("Notfications");
                      }}
                      underlayColor="rgba(0,0,0,0.2)"
                    >
                      <FontAwesome
                        name="bell"
                        size={23}
                        color="#fff"
                        style={{ margin: 20 }}
                      />
                    </TouchableHighlight>

                    {notification > 0 && (
                      <View
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 15,
                          backgroundColor: "red",
                          borderRadius: 10,
                          width: 12,
                          height: 12,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* <Text style={{ color: "#fff" }}>{notification}</Text> */}
                      </View>
                    )}
                  </>
                ),

            headerRight: !isRTL
              ? () => (
                  <>
                    <TouchableHighlight
                      onPress={() => navigation.navigate("Notfications")}
                      underlayColor="rgba(0,0,0,0.2)"
                    >
                      <FontAwesome
                        name="bell"
                        size={23}
                        color="#fff"
                        style={{ margin: 20 }}
                      />
                    </TouchableHighlight>
                    {notification > 0 && (
                      <View
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 15,
                          backgroundColor: "red",
                          borderRadius: 10,
                          width: 12,
                          height: 12,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {/* <Text style={{ color: "#fff" }}>{notification}</Text> */}
                      </View>
                    )}
                  </>
                )
              : () => (
                  <TouchableHighlight
                    onPress={() => navigation.toggleDrawer()}
                    underlayColor="rgba(0,0,0,0.2)"
                  >
                    <FontAwesome
                      name="bars"
                      size={24}
                      color="#fff"
                      style={{ margin: 10 }}
                    />
                  </TouchableHighlight>
                ),
          };
        }}
      >
        <Drawer.Screen
          name={language === "en" ? "Home" : "الرئيسية"}
          component={TabBar}
          options={{
            headerTitle: () => (
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              ></View>
            ),
            headerStyle: {
              backgroundColor: "#51117f",
              height: Dimensions.get("screen").height * 0.1,
            },
            headerTintColor: "#F1E8E8F3",
            drawerLabelStyle: {
              fontFamily: "Droid",
              fontWeight: "bold",
            },
            drawerActiveBackgroundColor: COLORS.darkerPurple,
            drawerActiveTintColor: "#ffffff",
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
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JoinUs"
              component={JoinUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sellerprofile"
              component={SellerProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PhoneAuth"
              component={PhoneAuth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentScreen"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TradingView"
              component={TradingViewChart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="setings"
              component={Setings}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />
            <Stack.Screen
              name="VideoListScreen"
              component={VideoListScreen}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />

          <Stack.Screen
              name="DevelopmentScreen"
              component={DevelopmentScreen}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />

          <Stack.Screen
              name="videodetails"
              component={VideoDetailScreen}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />

            <Stack.Screen
              name="CourseItem"
              component={CourseItem}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}

            />


            <Stack.Screen
  name="CoursesListScreen"
  component={CoursesListScreen}
  options={{
    headerTitle: "",
    headerShown: true,
    headerStyle: {
      backgroundColor: COLORS.darkerPurple,
    },
    headerBackTitleVisible: false, 
    headerTintColor: '#fff', 
    headerBackTitleStyle: {
      color: '#fff', 
    },
  }}
/>


             <Stack.Screen
              name="prices"
              component={prices}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />
                <Stack.Screen
              name="signals"
              component={Signals}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />
            

            <Stack.Screen
              name="Notfications"
              component={Notfications}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />


<Stack.Screen
              name="paymentform"
              component={PaymentFormScreen}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />
            

            <Stack.Screen
              name="economiccalendar"
              component={EconomicCalendar}
              options={{
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                  backgroundColor: COLORS.darkerPurple,
                },
                headerBackTitleVisible: false, 
                headerTintColor: '#fff', 
                headerBackTitleStyle: {
                  color: '#fff', 
                },
              }}
            />

          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
