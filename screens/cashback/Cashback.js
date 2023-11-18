import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
  Text,
  Keyboard,
} from "react-native";
import { Card, Title } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Font } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management

import COLORS from "../../colors/colors";
const Cashback = () => {
  const animatedScale = useRef(new Animated.Value(1)).current;
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const navigation = useNavigation();
  const language = useSelector((state) => state.Localization.language);

  // Font
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Droid: require("../../assets/fonts/Droid.ttf"),
      });
      setIsFontLoaded(true);
    };

    loadFont();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/onboarding/basic.png")}
            style={styles.backgroundImage}
          />
          <View style={styles.joinAs}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.darkPurple,
                paddingHorizontal: Dimensions.get("screen").width * 0.05,
                paddingVertical: Dimensions.get("screen").width * 0.015,
                borderRadius: 10,
                marginBottom: "25%",
              }}
            >
              <FontAwesome5
                name="arrow-circle-down"
                style={{ color: "white", fontSize: 18 }}
              />
              <Text
                style={{
                  fontFamily: "Droid",
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: 10,
                }}
              >
                {language === "ar"
                  ? "استفيد من عمولة علي تدولاتك"
                  : "Benefit from commission on your trades"}
              </Text>
            </View>

            <View>
              <View style={styles.cardPairContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("withdrwall", {
                    });
                  }}
                  style={styles.cardContainer}
                >
                  <Card
                    style={[
                      styles.card,
                      {
                        backgroundColor: "#333a49",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.cardContent,
                        { transform: [{ scale: animatedScale }] },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Droid",
                              fontSize: 35,
                              color: "#DE9B09",
                              fontWeight: "bold",
                              margin: 3,
                            }}
                          >
                            $
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Droid",
                              fontSize: 35,
                              color: "#DE9B09",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            100
                          </Text>
                        </View>

                        <Title
                          style={[styles.cardTitle, { textAlign: "center" }]}
                        >
                          {language === "ar"
                            ? "يمكنك طلب سحب"
                            : "You can withdrawall"}
                        </Title>
                      </View>
                    </Animated.View>
                  </Card>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    // navigation.navigate('Register', { RoleType:'signalsprovider' });
                  }}
                  style={styles.cardContainer}
                >
                  <Card
                    style={[
                      styles.card,
                      {
                        backgroundColor: "#333a49",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.cardContent,
                        { transform: [{ scale: animatedScale }] },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Droid",
                              fontSize: 35,
                              color: "#0AB80A",
                              fontWeight: "bold",
                              margin: 3,
                            }}
                          >
                            $
                          </Text>
                          <Text
                            style={{
                              fontFamily: "Droid",
                              fontSize: 35,
                              color: "#0AB80A",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            25466
                          </Text>
                        </View>

                        <Title
                          style={[styles.cardTitle, { textAlign: "center" }]}
                        >
                          {language === "ar"
                            ? "سحوبات تمت بنجاح"
                            : "Withdrwalls Done"}
                        </Title>
                      </View>
                    </Animated.View>
                  </Card>
                </TouchableOpacity>
              </View>



              <View style={styles.cardPairContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("payments");
                  }}
                  style={styles.cardContainer}
                >
                  <Card
                    style={[
                      styles.card,
                      {
                        backgroundColor: "#333a49",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.cardContent,
                        { transform: [{ scale: animatedScale }] },
                      ]}
                    >
                      <Title style={[styles.cardTitle, { fontSize: 20 }]}>
                        {language === "ar" ? "المدفوعات" : "Payments"}
                      </Title>
                    </Animated.View>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate("tradingaccounts");
                  }}
                  style={styles.cardContainer}
                >
                  <Card
                    style={[
                      styles.card,
                      {
                        backgroundColor: "#333a49",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.cardContent,
                        { transform: [{ scale: animatedScale }] },
                      ]}
                    >
                      <Title style={[styles.cardTitle, { fontSize: 20 }]}>
                        {language === "ar" ? "حساباتك" : "Your Accounts"}
                      </Title>
                    </Animated.View>
                  </Card>
                </TouchableOpacity>
              </View>


            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    position: "relative",
  },
  joinAs: {
    position: "absolute",
    top: 0,
    paddingVertical: "24%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContainer: {
    marginBottom: 30,
    width: Dimensions.get("screen").width * 0.43,
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 1,
  },

  card: {
    borderRadius: 10,
    paddingVertical: "2%",
    height: Dimensions.get("screen").height * 0.12,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width * 0.4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  cardImage: {
    width: "45%",
    height: "85%",
    resizeMode: "center",
  },
  cardTitle: {
    fontSize: 14,
    color: COLORS.white,
    width: "100%",
    marginTop: "10%",
    textAlign: "center",
    fontWeight: 850,
    fontFamily: "Droid",
  },

  scrollViewContainer: { flexGrow: 1 },

  cardPairContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  //   cardPair: {
  //     flexDirection: 'row',
  //   },
});

export default Cashback;
