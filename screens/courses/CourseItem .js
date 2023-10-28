import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import ip from "../../ipConfig";
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const cardWidth = screenWidth * 0.45;
const cardHeight = screenHeight * 0.60; 
const maxCardHeight = 1.4*cardHeight 

const enTranslations = {
  
  free: "Free",
  youHavePurchased: "You have purchased",
  open: "Open",
  buyNow: "Buy Now",
};

const arTranslations = {
  free: "مجاناً",
  youHavePurchased: "لقد قمت بالشراء",
  open: "فتح",
  buyNow: "اشترِ الآن",
};

const CourseItem = ({ course, userCourses, onPress }) => {
  const language = useSelector((state) => state.Localization.language);

  const t = (key) => {
    const translations = language === 'ar' ? arTranslations : enTranslations;
    return translations[key] || key;
  };

  const isCourseOwned = userCourses.includes(course._id);
  const navigation = useNavigation();

  const onPressButton = () => {
    navigation.navigate('VideoListScreen', { playlistId: course.playlistId });
  };

  return (
    <View style={styles.container}>
      <Card elevation={3} style={[styles.card, { width: cardWidth, height: cardHeight, maxHeight: maxCardHeight }]}>
        <Card.Cover source={{ uri: `${ip}/uploads/${course.image}` }} style={styles.cover} />

        <Card.Content>
          <Text style={styles.title}>{course.name}</Text>

          <View style={styles.descriptionContainer}>
  <Text style={styles.description}>{course.description}</Text>
</View>



          <View style={styles.infoContainer}>
            {isCourseOwned ? null : (
              <View style={styles.infoRow}>
                {course.price === 0 ? (
                  <Text style={[styles.pricetext, styles.freeText]}>{t('free')}</Text>
                ) : (
                  <>
                    <Icon name="dollar" size={25} color="#0A7E06" />
                    <Text style={styles.pricetext}>{course.price}</Text>
                  </>
                )}
              </View>
            )}
          </View>

          
        <View style={styles.btnContainer}>
          {isCourseOwned || course.price === 0 ? (
            <>
              <View style={styles.purchased}>
                {course.price !== 0 && (
                  <Text style={styles.purchasedtext}>{t('youHavePurchased')}</Text>
                )}
              </View>
              <Button
                icon={() => <Icon name="star" size={cardWidth * 0.12} color="#fff" />}
                mode="contained"
                onPress={onPressButton}
                style={styles.openbutton}
              >
                <Text style={styles.btntext}>{t('open')}</Text>
              </Button>
            </>
          ) : (
            <>


              <Button
                icon={() => <Icon name="credit-card" size={cardWidth * 0.12} color="#fff" />}
                mode="contained"
                onPress={onPressButton}
                style={styles.buyNowButton}
              >
                <Text style={styles.btntext}>{t('buyNow')}</Text>
              </Button>

              
            </>
          )}
        </View>
        </Card.Content>

        
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontFamily:'Droid',
    marginTop:5,
    fontSize: cardWidth*0.09,
    marginBottom: 5,
  },
  descriptionContainer: {
    minHeight: 90, // Fixed minimum height
    maxHeight: 120, // Adjust this value as needed for the maximum height
    overflow: 'hidden', // Hide any content that overflows the container
  },
  
  
  description: {
    fontFamily: 'Droid',
    fontSize: cardWidth * 0.070,
  },
  
  infoContainer: {
    minHeight: 30, // Fixed minimum height

    marginTop: 10,
  },
  infoRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    alignSelf: 'center',
  },
  infoText: {
    fontFamily:'Droid',

    marginLeft: 10,
    color: "red",
    fontSize: cardWidth*0.075,
  },
  card: {
    borderRadius: 10,
  },
  cover: {
    marginBottom:5,
    height: cardHeight*0.4,
  },
  btnContainer: {
    alignItems: "center",
    marginTop: 20,

    bottom: 0,

  },
  openbutton: {
    width: "80%",
    backgroundColor: "#0A7E06",
    borderRadius: 10,
    marginBottom: 5,
  },
  cartButton: {
    width: "80%",
    backgroundColor: "#0B6E6E",
    borderRadius: 10,
    marginBottom: 5,
  },
  buyNowButton: {
    width: "80%",
    backgroundColor: "#DA901B", // Adjust color as needed
    borderRadius: 10,
    marginBottom: 5,
  },
  btntext: {
    fontFamily:'Droid',

    fontSize: cardWidth*0.058,
  },
  freeText: {
    color: "red",
    fontSize:cardWidth*0.1,
    marginLeft: 10,
    fontWeight: "600",
  },
  pricetext: {
    marginLeft: 10,
    color: "green",
    fontSize: cardWidth*0.1,
    fontWeight: "600",
  },
  purchased: {
    marginBottom: 20,
  },
  purchasedtext: {
    fontSize: cardWidth*0.070,
    color: "green",
    fontWeight: "700",
  },
});

export default CourseItem;
