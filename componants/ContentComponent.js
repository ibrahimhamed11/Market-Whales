import React, { useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card, Divider, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../Redux/Slices/Localization"; // Replace with actual path
// import { logout } from '../Redux/Slices/Auth'; // Assuming you have a logout action
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { faTruckPlane } from "@fortawesome/free-solid-svg-icons";

function CustomDrawerContent(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(faTruckPlane);
  const { colors } = useTheme();
  const language = useSelector((state) => state.Localization.language);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
    dispatch(setLanguage(isArabic ? "en" : "ar"));
  };

  const handleLogout = () => {
    // dispatch(logout());
  };

  const handleProfileSettings = () => {
    Alert("go to profile");
  };

  const staticText = {
    en: {
      darkMode: "Dark Mode",
      arabicLanguage: "Arabic Language",
      userName: "Ibrahim Hamed",
      profileSettings: "Profile Settings",
      logout: "Logout",
    },
    ar: {
      darkMode: "الوضع الليلي",
      arabicLanguage: "اللغة العربية",
      userName: "Ibrahim Hamed",
      profileSettings: "الملف الشخصي",
      logout: "تسجيل الخروج",
    },
  };

  const text = staticText[language];

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ margin: 3, padding: 2 }}>
        <Card>
          <Card.Content>
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <Image
                source={require("../assets/log.png")}
                style={{ width: 100, height: 100, borderRadius: 30 }}
              />
              <Text
                style={{
                  fontFamily: "Droid",
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 22,
                }}
              >
                {text.userName}
              </Text>
            </View>

            <View style={{ marginTop: 10, alignSelf: "center" }}>
              <TouchableOpacity onPress={handleProfileSettings}>
                <View
                  style={{
                    flexDirection: language === "ar" ? "row" : "row-reverse",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <FontAwesomeIcon
                    name="cog"
                    size={15}
                    style={{
                      marginRight: language === "ar" ? 10 : 10,
                      marginLeft: 10,
                    }}
                  />
                  <Text style={{ fontFamily: "Droid", fontSize: 14 }}>
                    {text.profileSettings}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <View
                  style={{
                    flexDirection: language === "ar" ? "row" : "row-reverse",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <FontAwesomeIcon
                    name="sign-out"
                    size={20}
                    style={{
                      marginRight: language === "ar" ? 10 : 10,
                      marginLeft: 10,
                    }}
                  />
                  <Text style={{ fontFamily: "Droid", fontSize: 14 }}>
                    {text.logout}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </View>
      <DrawerItemList {...props} />
      <Divider style={{ marginVertical: 60, marginHorizontal: 10 }} />

      <Card style={{ marginHorizontal: 2, padding: 10 }}>
        <View
          style={{
            flexDirection: language === "ar" ? "row-reverse" : "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <FontAwesomeIcon
            name="moon-o"
            size={20}
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
          <Text style={{ flex: 1, fontFamily: "Droid", fontSize: 16 }}>
            {text.darkMode}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            color={colors.primary}
          />
        </View>
        <View
          style={{
            flexDirection: language === "ar" ? "row-reverse" : "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <FontAwesomeIcon
            name="language"
            size={20}
            color={colors.primary}
            style={{ marginRight: 10 }}
          />
          <Text style={{ flex: 1, fontFamily: "Droid", fontSize: 16 }}>
            {text.arabicLanguage}
          </Text>
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
