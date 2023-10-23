import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const cardWidth = screenWidth * 0.45;
const cardHeight = screenHeight * 0.45; 
const maxCardHeight = 1.4*cardHeight 

console.log(cardWidth)

const CourseItem = ({ course, userCourses, onPress }) => {

  const isCourseOwned = userCourses.includes(course._id);

  const navigation = useNavigation();

  const onPressButton = () => {
    navigation.navigate('VideoListScreen', { playlistId: course.playlistId });
  };



  return (
    <View style={styles.container}>
      <Card elevation={3} style={[styles.card, { width: cardWidth, height: cardHeight, maxHeight: maxCardHeight }]}>
        <Card.Cover
          source={require("../../assets/course.png")}
          style={styles.cover}
        />
        <Card.Content>
          <Text style={styles.title}>{course.name}</Text>

          <Text  style={styles.description}>{course.description}</Text>

          <View style={styles.infoContainer}>
            {isCourseOwned ? null : (
              <View style={styles.infoRow}>
                {course.price === 0 ? (
                  <Text style={[styles.pricetext, styles.freeText]}>Free</Text>
                ) : (
                  <>
                    <Icon name="dollar" size={25} color="#0A7E06" />
                    <Text style={styles.pricetext}>{course.price}</Text>
                  </>
                )}
              </View>
            )}
          </View>
        </Card.Content>
        <View style={styles.btnContainer}>
  {isCourseOwned || course.price === 0 ? (
    <>
      <View style={styles.purchased}>
        {course.price !== 0 && (
          <Text style={styles.purchasedtext}>You have purchased</Text>
        )}
      </View>

      <Button
        icon={() => <Icon name="star" size={cardWidth * 0.12} color="#fff" />}
        mode="contained"
        onPress={onPressButton}
        style={styles.openbutton}
      >
        <Text style={styles.btntext}>Open</Text>
      </Button>
    </>
  ) : (
    <>
      {/* <Button
        icon={() => (
          <Icon name="shopping-cart" size={cardWidth * 0.12} color="#fff" />
        )}
        mode="contained"
        onPress={onPressButton}
        style={styles.cartButton}
      >
        <Text style={styles.btntext}>Add to cart</Text>
      </Button> */}
      <Button
        icon={() => (
          <Icon name="credit-card" size={cardWidth * 0.12} color="#fff" />
        )}
        mode="contained"
        onPress={onPressButton}
        style={styles.buyNowButton}
      >
        <Text style={styles.btntext}>Buy now</Text>
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
    fontSize: cardWidth*0.08,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description:{
    fontSize: cardWidth*0.075,

  },
  infoContainer: {
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
