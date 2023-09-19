import React, { useEffect, useState } from 'react';
import {

    StyleSheet,

    ScrollView,


} from "react-native";



export default function StartScreen({ navigation }) {



    return (
        // <Background>
        <ScrollView style={styles.con}>

         
        </ScrollView>
        // </Background>
    );
}

const styles = StyleSheet.create({
    con: {
        marginBottom: 50
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        position: 'absolute'
    },
   

});