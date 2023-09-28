import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook



const CourseItem = ({ course, onPress }) => {
    const navigation = useNavigation();


    const onPressButton = () => {
        // Navigate to another component and send playlist id in route params
        navigation.navigate('VideoListScreen', { playlistId: course.playlistId });
      };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card elevation={3} style={styles.card}>
        <Card.Cover source={require('../../assets/course.png')} style={styles.cover} />
        <Card.Content>
          <Text style={styles.title}>{course.name}</Text>
          <Text>{course.description}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Icon name="tag" size={24}  color="#0B6E6E" />
              <Text style={styles.infoText}>{course.type}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="dollar" size={30} color="#0A7E06" />
              <Text style={styles.pricetext}>{course.price}</Text>
            </View>
          </View>
        </Card.Content>
     
        <View style={styles.btnContainer}>
        <Button
            icon={() => <Icon name="star" size={20} color="#fff" />}
            mode="contained"
            onPress={onPressButton}
            style={styles.button} // Use responsive styles
          >
         Details
          </Button>
          
          <Button
            icon={() => <Icon name="shopping-cart" size={20} color="#fff" />} // Font Awesome cart icon
            mode="contained"
            onPress={onPressButton}
            style={styles.cartButton}
          >
            Add to Cart
          </Button>
          <Button
            icon={() => <Icon name="credit-card" size={20} color="#fff" />} // Font Awesome credit card icon
            mode="contained"
            onPress={onPressButton}
            style={styles.buyNowButton}
          >
            Buy Now
          </Button>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: '45%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  pricetext:{

    marginLeft: 10,
    color: 'green',
    fontSize: 16,

  },

  infoText: {
    marginLeft: 10,
    color: 'red',
    fontSize: 16,
  },
  card: {
    borderRadius: 10,
  },
  cover: {
    height: 150,
  },
  btnContainer: {
    // flexDirection:'row',
    alignItems: 'center',
    marginTop: 20,
    
  },
  button: {
    width: '60%', // Adjust as needed for responsiveness
    backgroundColor: '#DA901B',
    borderRadius: 10,
    marginBottom:5

  },
  cartButton: {
    width: '60%',
    backgroundColor: '#0B6E6E', // Adjust color as needed
    borderRadius: 10,
    marginBottom:5
  },
  buyNowButton: {
    width: '60%',
    backgroundColor: '#0A7E06', // Adjust color as needed
    borderRadius: 10,
    marginBottom:5
  },

});

export default CourseItem;
