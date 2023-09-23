import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../componants/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/onboarding/basic.png')}
      resizeMode='cover' // Changed from 'center' to 'cover'
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container}>
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%', // Changed from '120%' to '100%'
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 15,
    width: '100%',
    height: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
