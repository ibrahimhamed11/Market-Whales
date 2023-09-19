import React, { useState, useEffect } from "react";
import {
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../componants/Background";
import Logo from "../componants/Logo";
import Header from "../componants/Header";
import Button from "../componants/Button";
import TextInput from "../componants/TextInput";
import BackButton from "../componants/BackButton";
import { theme } from "../componants/theme";
import COLORS from "../colors/colors";



 import { loginUser } from '../utils/api/Auth'
import { useSelector } from 'react-redux'; // Add this import

// Validation Functions
const emailValidator = (email, language) => {
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email) {
    return language === 'ar' ? 'البريد الإلكتروني مطلوب.' : 'Email is required.';
  }

  if (!emailRegex.test(email)) {
    return language === 'ar' ? 'البريد الإلكتروني غير صالح.' : 'Invalid email.';
  }

  return '';
};

const passwordValidator = (password, language) => {
  if (!password) {
    return language === 'ar' ? 'كلمة المرور مطلوبة.' : 'Password is required.';
  }

  if (password.length < 6) {
    return language === 'ar' ? 'يجب أن تكون كلمة المرور على الأقل 6 أحرف.' : 'Password must be at least 6 characters.';
  }

  return '';
};

export default function LoginScreen({ navigation }) {
  //Font
  const loadFont = async () => {
    await Font.loadAsync({
      'Droid': require('../assets/fonts/Droid.ttf'),
    });
    setIsFontLoaded(true);
  };
  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));
  }, []);


  

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const language = useSelector(state => state.Localization.language);

  const onLoginPressed = async () => {
    try {
      // Validate email and password
      const emailError = emailValidator(email.value, language);
      const passwordError = passwordValidator(password.value, language);
  
      if (emailError || passwordError) {
        // Set error states
        setEmail(prevEmail => ({ ...prevEmail, error: emailError }));
        setPassword(prevPassword => ({ ...prevPassword, error: passwordError }));
        return;
      }
  
      // Attempt login
      const { token, user, error } = await loginUser(email.value, password.value);
  
      if (error) {
        // Handle login error
        Alert.alert("Login Error", error);
      } else {
        // Reset navigation to Home screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
  
        // Notify user of successful login
        alert("تم تسجيل الدخول بنجاح.");
      }
    } catch (error) {
      console.error(error); // Log unexpected errors
    }
  };
  


  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const buttonWidth = Dimensions.get("window").width * 0.4;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header
            style={[styles.arabicText, { fontFamily: "Droid", fontSize: 20 }]}
          >
            {language === 'ar' ? 'مرحبا بك مجدداً.' : 'Welcome back.'}
          </Header>
          <TextInput
            label={language === 'ar' ? "البريد الإلكتروني" : "Email"}
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={
              <Text style={{ fontFamily: "Droid", color: "red" }}>
                {email.error}
              </Text>
            }
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            style={{ fontFamily: "Droid" }}
          />

          <TextInput
            label={language === 'ar' ? "كلمة المرور" : "Password"}
            returnKeyType="done"
            value={password.value}
            mode='outlined'
            onChangeText={(text) => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={
              <Text style={{ fontFamily: "Droid", color: "red" }}>
                {password.error}
              </Text>
            }
            direction ='rtl'
            secureTextEntry
            style={{ fontFamily: "Droid"}}
          />

          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.navigate("joinus")}>
              <Text style={[styles.arabicText, { fontFamily: "Droid" }]}>
                {language === 'ar' ? "هل نسيت كلمة المرور؟" : "Forgot your password?"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonConatiner]}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("PhoneAuth")}
              style={[styles.button, { width: 1.1 * buttonWidth }]}
            >
              <Text style={[{ fontFamily: "Droid", color: "white" ,fontWeight: "bold"}]}>
                {language === 'ar' ? "دخول بالهاتف" : "Login with Phone"}
              </Text>
            </Button>

            <Button
              mode="contained"
              onPress={onLoginPressed}
              style={[styles.LoginButton, { width: 1.1 * buttonWidth }]}
            >
              <Text style={[{ fontFamily: "Droid", color: "white" ,fontWeight: "bold"}]}>
                {language === 'ar' ? "تسجيل الدخول" : "Login"}
              </Text>
            </Button>
          </View>

          <View style={[styles.row, styles.arabicText]}>
            <Text style={{ fontFamily: "Droid", }}>
              {language === 'ar' ? "ليس لديك حساب؟" : "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("JoinUs")}>
              <Text style={[styles.link, { fontWeight: "bold" }]}>
                {language === 'ar' ? "التسجيل" : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    fontFamily: "Droid",
  },
  row: {
    flexDirection: "row",
    marginTop: 0,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    fontFamily: "Droid",
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
    marginLeft:'8%',
    alignContent:'center',
    textAlign:'center',
    fontFamily: "Droid",

  },
  arabicText: {
    fontFamily: "Droid",
    textAlign: "right",
  },
  button: {
    marginTop:'4%',
    fontWeight: "bold",
    fontSize: 13,
    fontFamily: "Droid",
    color: "white",
    paddingVertical: 5,
    backgroundColor: COLORS.darkerPurple,
    borderRadius: 20,
    textAlign: "center",
  },
  LoginButton: {

    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Droid",
    color: "white",
    paddingVertical: 5,
    backgroundColor:COLORS.darkerMagenta,
    borderRadius: 20,
    textAlign: "center",
    marginLeft: 8,
  },
  buttonConatiner: {
    marginTop:'10%',
marginBottom:'10%',
    flexDirection: "row",
    alignItems: "center",
  },
});
