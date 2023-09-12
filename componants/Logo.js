import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/Logo2.png')} style={styles.image} />
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
      // width: 400,
      // height: 200,
    //  borderRadius: 160,
   marginBottom: '10%',
  },
});
