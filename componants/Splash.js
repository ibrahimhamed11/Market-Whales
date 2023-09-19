import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkSavedPassword = async (navigation) => {
  const savedPassword = await AsyncStorage.getItem('token');
  if (savedPassword) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  } else {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  }
};

const Splash = ({ navigation }) => {
  useEffect(() => {

    setTimeout(() => {
      //   navigation.navigate('StartScreen');
      checkSavedPassword(navigation);
    }, 3000);

  }, []);

  return (
    <View style={styles.con}>
      <Image style={{ width: 600, height: 1000 }} source={require('../assets/loader.gif')} />
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
