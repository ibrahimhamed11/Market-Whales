import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity,TouchableWithoutFeedback, Dimensions, Image, Text,Keyboard } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';
import { Font } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management

import COLORS from '../colors/colors';
const JoinUs = () => {
    const animatedScale = useRef(new Animated.Value(1)).current;
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const navigation = useNavigation();
    const language = useSelector((state) => state.Localization.language);


    // Font
    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'Droid': require('../assets/fonts/Droid.ttf'),
            });
            setIsFontLoaded(true);
        };

        loadFont();
    }, []);

    const handleCardPress = (isSeller) => {
        Animated.sequence([
            Animated.timing(animatedScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(animatedScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ])
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>

        <View style={styles.container}>
            <Image source={require('../assets/onboarding/basic.png')} style={styles.backgroundImage} />
            <View style={styles.joinAs}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: COLORS.darkPurple,
                        paddingHorizontal: Dimensions.get('screen').width * 0.05,
                        paddingVertical: Dimensions.get('screen').width * 0.015,
                        borderRadius: 10,
                        marginBottom: '25%',
                    }}>
                    <FontAwesome5 name="arrow-circle-down" style={{ color: 'white', fontSize: 18 }} />
                    <Text style={{
                        fontFamily: 'Droid',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white',
                        marginLeft: 10
                    }}>
                {language === 'ar' ? 'أختر نوع المستخدم' : 'Choose User Type'}
                    </Text>
                </View>

                {/* join as */}
                <View>
                    {/* join us as seller */}
                    

                    
 <View style={styles.cardPairContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('SellerRegister')}
                        style={styles.cardContainer}
                    >
                        <Card style={[styles.card, { backgroundColor: '#A9A9A9' }]}>
                            <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>
                                <Image source={require('../assets/onboarding/learning.png')} style={styles.cardImage} />
                                <Title style={[styles.cardTitle, { fontFamily: 'Droid' }]}> {language === 'ar' ? 'مقدم كورسات' : 'Course Provider'}</Title>
                            </Animated.View>
                        </Card>
                    </TouchableOpacity>




                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('MotherRegister')} style={styles.cardContainer}
                    >
                        <Card style={[styles.card, { backgroundColor: COLORS.darkPurple}]}>
                            <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>


                                <Image source={require('../assets/onboarding/programmer.png')} style={styles.cardImage} />



                                <Title style={[styles.cardTitle, { fontFamily: 'Droid' }]}> {language === 'ar' ? 'مزود توصيات' : 'Signal Provider'}</Title>
                            </Animated.View>
                        </Card>
                    </TouchableOpacity>

                    </View>




                    <View style={styles.cardPairContainer}>
                            {/* join us as mother*/}
                            <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('MotherRegister')} style={styles.cardContainer}
                    >
                        <Card style={[styles.card, { backgroundColor: COLORS.darkPurple}]}>
                            <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>
                                <Image source={require('../assets/onboarding/clients.png')} style={styles.cardImage} />
                                <Title style={[styles.cardTitle, { fontFamily: 'Droid' }]}>
                                {language === 'ar' ? 'عميل' : 'Client'}

                                </Title>
                            </Animated.View>
                        </Card>
                    </TouchableOpacity>
                            {/* join us as mother*/}
                            <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('MotherRegister')} style={styles.cardContainer}
                    >
                        <Card style={[styles.card, { backgroundColor:COLORS.darkPurple }]}>
                            <Animated.View style={[styles.cardContent, { transform: [{ scale: animatedScale }] }]}>
                                <Image source={require('../assets/onboarding/candlestick.png')} style={styles.cardImage} />
                                <Title style={[styles.cardTitle, { fontFamily: 'Droid' }]}>
                                {language === 'ar' ? 'محلل فني' : 'Technical Analyst'}

                                </Title>
                            </Animated.View>
                        </Card>
                    </TouchableOpacity>

                    </View>
                          
                </View>
            </View>
        </View>
        </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'relative',
    },
    joinAs: {
        position: 'absolute',
        top: 0,
        paddingVertical: '24%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContainer: {
        marginBottom: 30,
        width: Dimensions.get('screen').width * 0.43,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 1,
        
    },

    
    card: {
        borderRadius: 10,
        paddingVertical: '2%',
        height: Dimensions.get('screen').height * 0.12,
        paddingHorizontal: 20,
        width: Dimensions.get('screen').width * 0.4,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%'
    },
    cardImage: {
        width: '45%',
        height: '85%',
        resizeMode:'center'
    },
    cardTitle: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        width: '50%',
        textAlign: 'center'
    },
    scrollViewContainer: { flexGrow: 1 }, // Add this style for ScrollView

    cardPairContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
         alignItems: 'center',
         marginBottom: 5,
      },
    //   cardPair: {
    //     flexDirection: 'row',
    //   },
      

});

export default JoinUs;