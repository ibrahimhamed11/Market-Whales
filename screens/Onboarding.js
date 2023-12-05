import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";
import COLORS from "../colors/colors";

const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.75;
const imageHeight = height * 0.35;
const subtitleFontSize = width * 0.04; // Adjust as needed
const titleFontSize = width * 0.06; // Adjust as needed
const slides = [
  {
    id: "1",
    image: require("../assets/onboarding/Onboard1.gif"),
    titleEnglish: "Welcome to Market Whales",
    titleArabic: "مرحبا بك في حيتان التداول",
    subtitleEnglish:
      "Explore the world of trading in fields like stock markets, crypto trading, forex, and more.",
    subtitleArabic:
      "استكشف عالم التداول في مجالات مثل أسواق الأسهم، تداول العملات الرقمية، الفوركس والمزيد.",
  },
  {
    id: "2",
    image: require("../assets/onboarding/Onboard2.gif"),
    titleEnglish: "Your Trading Hub",
    titleArabic: "مركز التداول الخاص بك",
    subtitleEnglish:
      "We offer a comprehensive platform for all your trading needs in fields like stock markets, crypto trading, forex, and more.",
    subtitleArabic: "نقدم منصة شاملة لجميع احتياجاتك في مجالات التداول مثل أسواق الأسهم، تداول العملات الرقمية، الفوركس والمزيد.",
  },
  {
    id: "3",
    image: require("../assets/onboarding/Onboard4.gif"),
    titleEnglish: "Stay Informed",
    titleArabic: "ابق على اطلاع",
    subtitleEnglish:
      "Receive regular updates and insights about trading in various fields, ensuring you're always well-informed.",
    subtitleArabic:
      "احصل على التحديثات والرؤى الدورية حول التداول في مجالات متعددة، مما يضمن أن تكون دائمًا على دراية.",
  },
];


const localizationStrings = {
  en: {
    skip: "Skip",
    next: "Next",
    start: "Get Started",
  },
  ar: {
    skip: "تخطى",
    next: "التالي",
    start: "البدء",
  },
};



const Slide = ({ item, language }) => {
  return (
    <View style={{ width, justifyContent: "center" }}>
      <Image
        source={item?.image}
        style={{
          height: imageHeight,
          width: imageWidth,
          resizeMode: "contain",
          marginTop: height * 0.05,
          justifyContent: "flex-end",
          marginLeft: width * 0.15,
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={[styles.title, { fontSize: titleFontSize }]}>
          {language === "ar" ? item?.titleArabic : item?.titleEnglish}
        </Text>
        <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>
          {language === "ar" ? item?.subtitleArabic : item?.subtitleEnglish}
        </Text>
      </View>
    </View>
  );
};
const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const language = useSelector((state) => state.Localization.language);
  const themeMode = useSelector((state) => state.ThemeSlice.mode);

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index && {
                  backgroundColor: COLORS.darkerPurple,
                  width: 20,
                  height: 6,
                  borderRadius: 4,
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={goToLogin}>
                <View
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      fontFamily: "Droid", // Add fontFamily property
                      color: "white",
                      paddingHorizontal: 60,
                      paddingVertical: 15,
                      backgroundColor: COLORS.darkerPurple,
                      borderRadius: 20,
                      textAlign: "center",
                      width: Dimensions.get("screen").width * 0.75,
                    }}
                  >
                    {localizationStrings[language].start}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 30,
              }}
            >
           <TouchableOpacity activeOpacity={0.8} onPress={skip}>
  <View
    style={{
      borderRadius: 20,
      overflow: "hidden",
      borderColor: COLORS.darkerPurple, 
      borderWidth: 1, 
    }}
  >
    <Text
      style={{
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.darkerPurple,
        fontFamily: "Droid",
        paddingHorizontal: Dimensions.get("screen").width * 0.14,
        paddingVertical: Dimensions.get("screen").width * 0.04,
      }}
    >
      {localizationStrings[language].skip}
    </Text>
  </View>
</TouchableOpacity>

              <View style={{ width: 15 }} />
              <TouchableOpacity activeOpacity={0.8} onPress={goToNextSlide}>
                <View
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      fontFamily: "Droid",
                      color: "white",
                      paddingHorizontal: Dimensions.get("screen").width * 0.14,
                      paddingVertical: Dimensions.get("screen").width * 0.04,
                      backgroundColor: COLORS.darkerPurple,
                    }}
                  >
                    {localizationStrings[language].next}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const [fontsLoaded] = useFonts({
    Droid: require("../assets/fonts/Droid.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={COLORS.white} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.7 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} language={language} />} // Pass language prop
      />
      <View>
        <Footer />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.gray,
    fontSize: subtitleFontSize,
    marginTop: width * 0.06,
    maxWidth: "80%",
    textAlign: "center",
    lineHeight: 23,
    fontFamily: "Droid",
    fontWeight: "bold",
  },
  title: {
    fontSize: titleFontSize,
    color: COLORS.darkerPurple,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Droid",
    marginTop: width * 0.15,
  },
  indicator: {
    height: 6,
    width: 8,
    backgroundColor: COLORS.customColor,
    marginHorizontal: 3,
    borderRadius: 20,
  },

});

export default OnboardingScreen;
