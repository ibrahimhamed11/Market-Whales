import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../componants/Background";
import Motherlogo from "../componants/registerLogo";
import Button from "../componants/Button";
import TextInput from "../componants/TextInput";
import BackButton from "../componants/BackButton";
import { theme } from "../componants/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
  nameValidator,
  addressValidator,
  usernameValidator,
  tradingExperienceYearsValidator,
} from "../componants/helpers/dataValidator";
import COLORS from '../colors/colors'

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import ip from "../ipConfig";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { transformDateForBackend } from "../utils/global";
import { useSelector } from "react-redux"; // Add this import

import { registerUser } from "../utils/api/user";

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

export default function Register({ navigation, route }) {
  const { RoleType } = route.params;

  const language = useSelector((state) => state.Localization.language);

  const labels = {
    name:language === "ar" ? "الاسم" : "Name",
    email:language === "ar" ? "البريد الإلكتروني" : "Email",
    password:language === "ar" ? "كلمة المرور" : "Password",
    phone:language === "ar" ? "رقم الهاتف" : "Phone Number",
    address:language === "ar" ? "العنوان" : "Address",
    username:language === "ar" ? "اسم المستخدم" : "Username",
    tradingExperienceYears:language === "ar" ? "عدد سنوات الخبرة" : "Trading Experience (Years)",
    birthDate:language === "ar" ? "تاريخ الميلاد" : "Birth Date",
    uploadImage:language === "ar" ? "رفع صورة" : "Upload Image",
    selectBirthDate:language === "ar" ? "اختر تاريخ الميلاد" : "Select Birth Date",
    selectImage:language === "ar" ? "حدد الصورة" : "Select Image",
    next:language === "ar" ? "التالي":"Next",
    register:language === "ar" ? "التسجيل":"Register",
    previousStep:language === "ar" ? "الخطوة السابقة":"Previous Step",
    haveAccount:language === "ar" ? "هل لديك حساب":"Already have an account",
    login:language === "ar" ? "تسجيل الدخول":"Login",
  };

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [phone, setPhone] = useState({ value: "", error: "" });
  const [address, setAddress] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });
  const [tradingExperienceYears, settradingExperienceYears] = useState({value: "",error: "",});


  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);




  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (date) {
      setSelectedDate(date);
      setHasError(false);
    }
  };

  const handleSave = () => {
    if (!selectedDate) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.cancelled) {
      setSelectedImage(imageResult.uri);
    }
  };

  const validateStep1 = () => {
    const nameError = nameValidator(name.value, language);
    const phoneError = phoneValidator(phone.value, language);
    const addressError = addressValidator(address.value, language);
    setName({ ...name, error: nameError });
    setPhone({ ...phone, error: phoneError });
    setAddress({ ...address, error: addressError });
    handleSave();
    return !phoneError && !addressError;
  };

  const validateStep2 = () => {
    const emailError = emailValidator(email.value, language);
    const passwordError = passwordValidator(password.value, language);
    const usernameError = usernameValidator(username.value, language);
    const tradingExperienceYearsError = tradingExperienceYearsValidator(
      tradingExperienceYears.value,
      language
    );
    setUsername({ ...username, error: usernameError });
    setEmail({ ...email, error: emailError });
    setPassword({ ...password, error: passwordError });
    settradingExperienceYears({
      ...tradingExperienceYears,
      error: tradingExperienceYearsError,
    });
    return !usernameError && !emailError && !passwordError;
  };

  const onSignUpPressed = () => {
    let validationPassed = false;
    if (step === 1) {
      validationPassed = validateStep1();
    } else if (step === 2) {
      validationPassed = validateStep2();
    }
    if (validationPassed) {
      setStep(step + 1);
    }

    if (step === 3) {
      sendDataToBackend();
    }
  };
  const sendDataToBackend = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("email", email.value);
      formData.append("password", password.value);
      formData.append("phone", phone.value);
      formData.append("address", address.value);
      formData.append("username", username.value);

      if (selectedImage) {
        formData.append("image", {uri: selectedImage,
          type: "image/jpeg",
          name: "product.jpg",
        });
      }

      formData.append("role", RoleType);
      formData.append(
        "tradingExperienceYears",
        tradingExperienceYears.value.toString()
      );
      formData.append("dateOfBirth", transformDateForBackend(selectedDate));

      const response = await axios.post(`${ip}/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Handle the response from the server
      console.log("user add ", response.data); 

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Congrats! your account registered success",
      });

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }, 2500);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const formattedDate = transformDateForBackend(selectedDate);

  const renderProgressBar = () => {
    return (
      <View style={styles.progressBar}>
        <View style={styles.progressStep}>
          <FontAwesome5Icon
            name={step >= 1 ? "check-circle" : "circle"}
            size={30}
            style={[
              styles.progressIcon,
              { color: step >= 1 ? COLORS.darkerPurple : "gray" },
            ]}
          />
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressStep}>
          <FontAwesome5Icon
            name={step >= 2 ? "check-circle" : "circle"}
            size={30}
            style={[
              styles.progressIcon,
              { color: step >= 2 ? theme.colors.primary : "gray" },
            ]}
          />
        </View>
        <View style={styles.progressLine} />
        <View style={styles.progressStep}>
          <FontAwesome5Icon
            name={step >= 3 ? "check-circle" : "circle"}
            size={30}
            style={[
              styles.progressIcon,
              { color: step >= 3 ? theme.colors.primary : "gray" },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <AlertNotificationRoot theme="dark">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Background>
            <BackButton goBack={navigation.goBack} />
            <Motherlogo />
            {renderProgressBar()}
            {step === 1 && (
              <View>
                <TextInput
                  label={labels.name}
                  returnKeyType="next"
                  value={name.value}
                  onChangeText={(text) => setName({ value: text, error: "" })}
                  error={!!name.error}
                  errorText={
                    name.error && (
                      <Text style={{ fontFamily: "Droid", color: "red" }}>
                        {name.error}
                      </Text>
                    )
                  }
                  style={styles.input}
                />
                <TextInput
                  label={labels.phone}
                  returnKeyType="next"
                  value={phone.value}
                  onChangeText={(text) => setPhone({ value: text, error: "" })}
                  error={!!phone.error}
                  errorText={
                    phone.error && (
                      <Text style={{ fontFamily: "Droid", color: "red" }}>
                        {phone.error}
                      </Text>
                    )
                  }
                  keyboardType="phone-pad"
                  style={[styles.input, { fontFamily: "Droid" }]}
                />

                <TextInput
                  label={labels.address}
                  returnKeyType="next"
                  value={address.value}
                  onChangeText={(text) =>
                    setAddress({ value: text, error: "" })
                  }
                  error={!!address.error}
                  errorText={
                    address.error && (
                      <Text style={{ fontFamily: "Droid", color: "red" }}>
                        {address.error}
                      </Text>
                    )
                  }
                  style={[styles.input, { fontFamily: "Droid" }]}
                />

                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon name="calendar" size={20} color="#000" />
                      <Text style={{ marginLeft: 10 ,fontSize: 18 ,fontFamily:'Droid'}}>{labels.birthDate}</Text>
                    </View>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={selectedDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                {hasError && (
                  <View style={{ alignItems: "center", marginTop: 10 ,}}>
                    <Text style={{ color: "red" ,fontSize: 14,fontFamily:'Droid' }}>
                      {labels.selectBirthDate}
                    </Text>
                  </View>
                )}

                {formattedDate && (
                  <View style={{ alignItems: "center", marginTop: 10 }}>
                    <Text style={{ fontSize: 18 }}>{formattedDate}</Text>
                  </View>
                )}
              </View>
            )}


            
            {step === 2 && (
              <View>
                <TextInput
                  label={labels.username}
                  returnKeyType="next"
                  value={username.value}
                  onChangeText={(text) =>
                    setUsername({ value: text, error: "" })
                  }
                  error={!!username.error}
                  errorText={
                    username.error && (
                      <Text style={{ fontFamily: "Droid", color: "red" }}>
                        {username.error}
                      </Text>
                    )
                  }
                  autoCapitalize="none"
                  style={[styles.input, { fontFamily: "Droid" }]}
                />

                <TextInput
                  label={labels.email}
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={(text) => setEmail({ value: text, error: "" })}
                  error={!!email.error}
                  errorText={
                    email.error && (
                      <Text style={{ fontFamily: "Droid", color: "red" }}>
                        {email.error}
                      </Text>
                    )
                  }
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  style={[styles.input, { fontFamily: "Droid" }]}
                />
                <TextInput
                  label={labels.password}
                  returnKeyType="done"
                  value={password.value}
                  onChangeText={(text) =>
                    setPassword({ value: text, error: "" })
                  }
                  error={!!password.error}
                  errorText={
                    password.error && (
                      <Text style={{ fontFamily: "Droid", color: "red" }}>
                        {password.error}
                      </Text>
                    )
                  }
                  secureTextEntry
                  style={styles.input}
                />
                <TextInput
                  label={labels.tradingExperienceYears}
                  returnKeyType="done"
                  value={tradingExperienceYears.value}
                  onChangeText={(text) =>
                    settradingExperienceYears({ value: text, error: "" })
                  }
                  error={!!tradingExperienceYears.error}
                  errorText={
                    tradingExperienceYears.error && (
                      <Text style={{ fontFamily: "Droid", color: "red" }}>
                        {tradingExperienceYears.error}
                      </Text>
                    )
                  }
                  style={styles.input}
                />

              </View>
            )}

            {step === 3 && (
              <View style={styles.imageContainer}>
                {selectedImage && ( 
                  <Image source={{ uri: selectedImage }} style={styles.image} />
                )}
                {!selectedImage && ( 
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={handleImageUpload}
                  >
                    <Text style={styles.uploadButtonText}>
                      {labels.uploadImage}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            <Button
              mode="contained"
              onPress={onSignUpPressed}
              style={{
                marginTop: 24,
                backgroundColor: COLORS.darkerPurple,
                borderRadius: 20,
              }}
            >
              <Text
                style={[styles.link, { fontFamily: "Droid", color: "white" }]}
              >
                {step < 3 ? labels.next : labels.register}
              </Text>
            </Button>

            {step > 1 && (
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                style={{ marginTop: 8 }}
              >
                <Text style={[styles.link, { fontFamily: "Droid" }]}>
                  {labels.previousStep}
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.row}>
              <Text
                style={[
                  styles.link,
                  {
                    fontFamily: "Droid",
                    color: "black",
                    marginRight: 10,
                    marginBottom: 200,
                  },
                ]}
              >
                {labels.haveAccount}
              </Text>
              <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <Text style={[styles.link, { fontFamily: "Droid" }]}>
                  {labels.login}
                </Text>
              </TouchableOpacity>
            </View>
          </Background>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 100
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: COLORS.darkerPurple,
  },

  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 10, 
    fontSize: 50,
  },
  progressStep: {
    alignItems: "center",
  },
  progressIcon: {
    fontSize: 30,
    color: COLORS.darkerPurple,
  },
  stepNumber: {
    fontFamily: "Droid",
    fontSize: 20, 
    marginTop: 8, 
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.darkerPurple,
    alignSelf: "center",
    marginHorizontal: 12, 
  },
  input: {
    width: 300, 
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "lightgray",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, 
  },
  uploadButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "white",
  },
});
