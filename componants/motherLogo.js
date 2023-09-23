import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source={require('../assets/Register.png')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 320,
        borderRadius: 100,
        // marginTop: '30%',
        // marginBottom: -40,
    },
})
