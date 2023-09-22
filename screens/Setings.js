import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from "../Redux/Slices/Localization";
import { faTruckPlane } from "@fortawesome/free-solid-svg-icons";

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isArabic, setIsArabic] = useState(faTruckPlane);

  const { colors } = useTheme();
  const language = useSelector((state) => state.Localization.language);
  const dispatch = useDispatch();

  const darkModeText = language === "ar" ? "الوضع الداكن" : "Dark Mode";
  const arabicLanguageText = language === "ar" ? "اللغة العربية" : "Arabic Language";

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    dispatch(setLanguage(language === "ar" ? "en" : "ar"));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.settingRow}>
            <FontAwesomeIcon
              name="moon-o"
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.settingText}>
              {darkModeText}
            </Text>
            <Switch value={false} onValueChange={toggleDarkMode} color={colors.primary} />
          </View>

          <View style={styles.settingRow}>
            <FontAwesomeIcon
              name="language"
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={[styles.settingText, {direction: language === 'ar' ? 'rtl' : 'ltr'}]}>
              {arabicLanguageText}
            </Text>
            <Switch value={language === "ar"} onValueChange={toggleLanguage} color={colors.primary} />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  card: {
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
    marginLeft: 15,
  },
  settingText: {
    flex: 1,
    fontFamily: 'Droid',
    fontSize: 13,
    marginLeft: 6,
  },
});

export default SettingsScreen;
