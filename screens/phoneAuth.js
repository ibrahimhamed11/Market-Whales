import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, Card, Title, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {getApp,initializeApp,} from 'firebase/app';
import {FirebaseRecaptchaVerifierModal,} from 'expo-firebase-recaptcha';
import {getAuth,PhoneAuthProvider,signInWithCredential,} from 'firebase/auth';
import fbConfig from '../firebase/firebase';
import Background from '../componants/Background';
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import path if needed

try {
  initializeApp(fbConfig);
} catch (error) {
  console.log('Initializing error ', error);
}
const app = getApp();
const auth = getAuth(app);
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, 'يجب ان لا يقل عن 11 رقم')
    .required('يجب ادخال رقم هاتف'),
});

const SignInScreen = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);

  const [verificationId, setVerificationID] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [info, setInfo] = useState('');

  const handleSendVerificationCode = async (phoneNumber) => {
    try {
      console.log(phoneNumber)
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationID(verificationId);
      setInfo('تم ارسال الكود الي هاتفك ');
    } catch (error) {
      setInfo(`Error: ${error.message}`);
    }
  };

  const handleVerifyVerificationCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
      setInfo('Success: Phone authentication successful.');
      navigation.reset({
        index: 0,
        // routes: [{ name: storedToken2 == 'mother' ? 'Profile' : 'SellerProfile' }],
        routes: [{ name: "Home" }],
      });
      alert(
        "تم التسجيل برقم الهاتف بنجاح"
      );
    
    } catch (error) {
      setInfo(`Error: ${error.message}`);
    }
  };

  const handleVerificationCodeChange = (index, text) => {
    const updatedVerificationCode = verificationCode.split('');
    updatedVerificationCode[index] = text;
    setVerificationCode(updatedVerificationCode.join(''));
  };
  const verificationCodeInputsRefs = Array(6).fill(React.createRef());

  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

    <View style={styles.container}>
        <Background>
                  <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app ? app.options : undefined}
        invisible={true}
      />

      <Card style={styles.card}>
        <Card.Content>
<Title style={{ fontSize: 20 ,marginBottom:40,fontFamily:'Droid',alignSelf:'center'}}>التفعيل برقم الهاتف</Title>
          <Formik
            initialValues={{
              phoneNumber: '', 
            }}
            validationSchema={validationSchema}
            onSubmit={(values) =>
              handleSendVerificationCode(`+2${values.phoneNumber}`)
            }
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  label="رقم الهاتف"
                  placeholder="01234567890"
                  onChangeText={handleChange('phoneNumber')}
                  value={values.phoneNumber}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}

                {info && <Text style={styles.infoText}>{info}</Text>}

                {verificationId ? (
                 // Inside the Formik component's render function
<View style={styles.verificationCodeInputs}>
  {[...Array(6)].map((_, index) => (
    <TextInput
      key={index}
      style={styles.verificationCodeInput}
      maxLength={1}
      keyboardType="numeric"
      onChangeText={(text) => {
        handleVerificationCodeChange(index, text);
        if (text && index < 5) {
          // Focus on the next input if a number is entered and it's not the last input
          verificationCodeInputsRefs[index + 1].focus();
        } else if (!text && index > 0) {
          // Focus on the previous input if the number is deleted and it's not the first input
          verificationCodeInputsRefs[index - 1].focus();
        }
      }}
      ref={ref => (verificationCodeInputsRefs[index] = ref)} // Create an array to hold refs
    />
  ))}
</View>

                ) : (


                  <>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    icon={() => <FontAwesome name="send" size={20} color="white" />}
                  >
    <Text style={[{ fontFamily: 'Droid', color: 'white' }]}>ارسال الرمز</Text>

                    
                  </Button>



<Button
    mode="contained"
    onPress={() => navigation.navigate('Login')} // Use the navigation function directly
    style={[styles.buttonBack]}
>
    <Text style={[{ fontFamily: 'Droid', color: 'white' }]}>الرجوع</Text>
</Button>



</>

                )}
                
                {verificationId && (
                  <Button
                    mode="contained"
                    onPress={handleVerifyVerificationCode}
                    style={styles.button}
                    icon={() => <FontAwesome name="check" size={20} color="white" />}
                  >
    <Text style={[{ fontFamily: 'Droid', color: 'white' }]}>تأكيد الرمز</Text>
                  </Button>
                )}
                
              </>
            )}
          </Formik>
        </Card.Content>
      </Card>
      </Background>

    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
  },
  card: {
    elevation: 4,
    margin: 10,
    width:'110%'
  },
  infoText: {
    color: '#555',
    marginVertical: 10,
  },
  button: {

    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  verificationCodeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  verificationCodeText: {
    
    fontSize: 18,
    fontWeight: 'bold',
  },
  verificationCodeInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  verificationCodeInput: {
    width: 43,
    height: 43,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#76005f',
    textAlign: 'center',
    marginRight: 5,
    marginLeft:5,
    
  },
  button: {
    marginTop:30,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Droid',
    color: 'white',
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: '#76005f',
    borderRadius: 8,
    textAlign: 'center',
},

buttonBack: {
  marginTop:30,
  fontWeight: 'bold',
  fontSize: 18,
  fontFamily: 'Droid',
  color: 'white',
  paddingHorizontal: 30,
  paddingVertical: 5,
  backgroundColor: '#3A3A3A',
  borderRadius: 8,
  textAlign: 'center',
},

});



export default SignInScreen;
