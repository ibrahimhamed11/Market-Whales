import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, Button,Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import ip from "../../ipConfig";
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const cardWidth = screenWidth * 0.45;
const cardHeight = screenHeight * 0.68; 
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
  buyNow: "شراء",
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
<Divider style={{ height:1 }} />

          <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
  {course.description.length > 100
    ? course.description.slice(0, 90) + '' // Display first 100 characters followed by ellipsis
    : course.description}
</Text>
</View>



<Divider style={{ height:1 }} />

{isCourseOwned ? null : (

          <View style={styles.infoContainer}>
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
          </View>

)}




        </Card.Content>





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
  onPress={() => {
    navigation.navigate('paymentform', {
      courseId: course._id,
      courseName: course.name,
      coursePrice: course.price,
      description:course.description
    
    });
  
  }}
  style={styles.buyNowButton}
>
  <Text style={styles.btntext}>{t('buyNow')}</Text>
</Button>


              
            </>
          )}
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
        fontFamily: 'Droid',

    marginTop: 10,
    fontSize: 12,
    minHeight: '13%', // Set the minimum height
    numberOfLines: 3, // Set the maximum number of lines
    overflow: 'hidden', // Enable vertical overflow
    alignSelf:'center'
  },
  
  
  descriptionContainer: {
    marginTop:5,
    minHeight: 120, // Fixed minimum height
    maxHeight:120,
    overflow: 'hidden', // Hide any content that overflows the container
    alignSelf:'center',
    numberOfLines: 3, // Set the maximum number of lines
   

  },
  
  
  description: {
    fontFamily: 'Droid',
    fontSize: 10
  },
  
  infoContainer: {
    minHeight: 50,

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
    height:60,

    bottom: 10,

  },

  openbutton: {
    width: "90%",
    
    backgroundColor: "#0A7E06",
    borderRadius: 10,
    marginBottom: 5,
  },
  cartButton: {
    width: "90%",
    backgroundColor: "#0B6E6E",
    borderRadius: 10,
    marginBottom: 5,
  },
  buyNowButton: {
    width: "90%",
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
    fontSize:20,
    marginLeft: 15,
    fontWeight: "600",
  },


  pricetext: {
    marginLeft: 25,
    color: "green",
    fontSize: 15,
    fontWeight: "800",
  },



  purchased: {
  },
  purchasedtext: {
    marginTop: 10,

    fontSize: 15,
    color: "green",
    fontWeight: "800",
    marginBottom: 26,
  },
});

export default CourseItem;
