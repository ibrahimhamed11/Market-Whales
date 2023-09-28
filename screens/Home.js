import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Keyboard, TouchableWithoutFeedback, Image, Dimensions, FlatList } from 'react-native';
import { Card, Title, Headline, Caption } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Background from '../componants/Background';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

console.log(height)
const cardWidth = (width - 40) / 2;
const cardHeight = width/1.75;

const titlefontsize=width * 0.03


export default function StartScreen({ navigation }) {




  const cardsData = [
    { 
      id: 1, 
      title: { en: 'Trading Companies', ar: 'شركات التداول' },
      caption: { 
        en: 'Explore information about trading companies, and find based on licenses ', 
        ar: ' اطلع على معلومات وتقييمات عن شركات التداول وافضل الشركات  '
          },
      icon: require('../assets/home/companies.png'), 
      onPress: () => navigation.navigate('DevelopmentScreen')

    },
    { 
      id: 2, 
      title: { en: 'Saudi Market', ar: 'السوق السعودي' },
      caption: { 
        en: 'Follow the Saudi stock market and learn how to invest in it', 
        ar: 'قم بمتابعة بورصة الأسهم السعودية وكيفية الاستثمار في السوق السعودي' 
      },
      icon: require('../assets/home/suadi.png'), 
      onPress: () => navigation.navigate('DevelopmentScreen')
    },
    { 
      id: 3, 
      title: { en: 'Signals', ar: 'التوصيات' },
      caption: { 
        en: 'Follow a selection of technical analysts and enter strong market opportunities', 
        ar: 'يمكنك متابعة نخبة من المحللين الفنيين ودخول فرص قوية مع السوق' 
      },
      icon: require('../assets/home/signals.png'), 
      onPress: () => navigation.navigate('DevelopmentScreen')
    },
    { 
      id: 4, 
      title: { en: 'Courses', ar: 'الدورات التعليمية' },
      caption: { 
        en: 'Benefit from educational material provided by a group of trading experts', 
        ar: 'يمكنك الاستفادة من المواد التعليمية التي يقدمها مجموعة من خبراء التداول' 
      },
      icon: require('../assets/home/course.png'), 
      onPress: () =>  navigation.navigate('CoursesListScreen')
    },
    { 
      id: 5, 
      title: { en: 'Trading Tools', ar: 'أدوات التداول' },
      caption: { 
        en: 'Make use of our trading tools, including indicators, expert advisors, and scripts', 
        ar: 'يمكنك الاستفادة من أدوات التداول المتاحة لدينا من مؤشرات وخبراء  ' 
      },
      icon: require('../assets/home/tools.png'), 
      onPress: () => navigation.navigate('DevelopmentScreen') 
    },
    { 
      id: 6, 
      title: { en: 'Cashback', ar: 'الكاش باك' },
      caption: { 
        en: 'Benefit from a return on your trading volume if you are registered under our agency', 
        ar: 'يمكنك الاستفادة من عائد على حجم التداول لك إذا كنت مسجل تحت وكالتنا' 
      },
      icon: require('../assets/home/cashback.png'), 
      onPress: () =>  navigation.navigate('DevelopmentScreen')
    },
  ];
  




  
  const language = useSelector((state) => state.Localization.language);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          {/* <Title style={styles.title}>
            {language === 'en' ? 'Home Page' : 'الصفحة الرئيسية'}
          </Title> */}
        </View>
        <FlatList
          data={cardsData}
          numColumns={2}
          contentContainerStyle={styles.row}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={item.onPress}
            >
         <Card style={styles.card}>
  <Card.Content style={styles.cardContent}>
    <View style={styles.imageContainer}>
      <Image source={item.icon} style={styles.cardImage} />
    </View>
    <Title style={styles.cardTitle}>
      {item.title[language]}
    </Title>

    <Caption numberOfLines={5} style={styles.cardCaption}>
      {item.caption[language]}
    </Caption>
  </Card.Content>
</Card>

            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingTop: 10,
    paddingBottom:10,
    marginBottom: 0.120 * height,
  },
  titleContainer: {
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Droid',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardContainer: {
    margin: 6,
    width: cardWidth, // Set a fixed width
    height: cardHeight, // Set a fixed height
  },
  card: {
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#E6E6E6',
    width: '100%', // Make sure the card takes 100% width of the container
    height: '100%', // Make sure the card takes 100% height of the container
  },
  cardContent: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 70,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  cardImage: {
    flex: 1,
    width: '70%',
    height: '70%',
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: titlefontsize,
    textAlign: 'center',
    color: '#282534',
    fontFamily: 'Droid',
  },
  cardCaption: {
    fontSize: titlefontsize * 0.8,
    textAlign: 'center',
    color: '#51117f',
    fontFamily: 'Droid',
    lineHeight: 18, // Adjust as needed
  },
  
});