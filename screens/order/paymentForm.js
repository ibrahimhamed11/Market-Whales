import React, { useState ,useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Clipboard } from 'react-native';
import COLORS from '../../colors/colors';
import {getUserById} from '../../utils/api/user'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../componants/Header";

const PaymentFormScreen = ({ route }) => {
  const { courseId, courseName, coursePrice } = route.params;

  const [items, setItems] = useState([
    {
      label: 'USDT - TRC20',
      value: 'TMCvKpVjT7w9YXQnhVQKRZE9rftUQ97Wv7',
      icon: () => <Image source={require('../../assets/usdt.jpg')} style={styles.icon} />,
    },
    {
      label: 'Vodafone Cash',
      value: '01068505696',
      icon: () => <Image source={require('../../assets/vodafon.png')} style={styles.icon} />,
    },
    {
      label: 'Skrill',
      value: 'ibrahim.hamed112@gmail.com',
      icon: () => <Image source={require('../../assets/skrill.jpeg')} style={styles.icon} />,
      dataText: 'Skrill Data Text',
    },
  ]);


  const [screenshotUri, setScreenshotUri] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [userData, setuserData] = useState(null);
  const [selectedPaymentError, setSelectedPaymentError] = useState('');





  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    const imageResult = await ImagePicker.launchImageLibraryAsync();
    if (!imageResult.cancelled) {
      setScreenshotUri(imageResult.uri);
    }
  };


  const retrieveUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
  
      return { userId, token };
    } catch (error) {
      console.log("Error retrieving data:", error);
      throw error;
    }
  };
  
  const getUserData = async () => {
    try {
      const { userId, token } = await retrieveUserData();
      const userData = await getUserById(userId, token);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserData(); // Fetch user data
        setuserData(user.data); // Set user data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); 
  }, []); 


    


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <ScrollView contentContainerStyle={styles.scrollContainer}>


    <View style={styles.circleContainer}>
            <Image source={require('../../assets/wallet.png')} style={styles.circleImage} />
          </View>

    <View style={styles.container}>


    <Text style={styles.errorText}>{selectedPaymentError}</Text>




      <Formik
        initialValues={{
          Name: '',
          phoneNumber: '',
        }}
   



        onSubmit={( { resetForm }) => {

       
          if (!selectedItemData) {
            setSelectedPaymentError('Please select a payment method'); // Set error message
            return;
          }

     
 

            console.log('Form Submitted:', {
                selectedItemData,
                userId: userData._id,
                userName: userData.name, 
                userEmail: userData.email,
                userPhone: userData.phone,
                userRole:userData.role,

                courseId:courseId,
                coursePrice:coursePrice,
                courseName:courseName

              });
                        resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>

<DropDownPicker
  items={items}
  value={value}
  setOpen={setOpen}
  setValue={(value) => {
    setValue(value);
    setSelectedItemData(value);
    setSelectedPaymentError('');
    

  }}
  open={open}
  containerStyle={styles.pickerContainer}
  style={styles.picker}
  itemStyle={styles.pickerItem}
  dropDownStyle={styles.pickerDropDown}
  placeholder="Select Payment Method"

/>





       
{selectedItemData && (
  <Card style={styles.dataCard}>
    <Card.Content>
      <Text>{selectedItemData}</Text>
    </Card.Content>
    <Card.Actions>
      <TouchableOpacity onPress={() => Clipboard.setString(selectedItemData)}>
        <FontAwesome name="copy" size={20} color="blue" />
      </TouchableOpacity>
    </Card.Actions>
  </Card>
  
)}




            {/* <TextInput
              label="Name"
              value={values.Name}
              onChangeText={handleChange('Name')}
              onBlur={handleBlur('Name')}
              style={styles.input}
              mode="outlined" // Add this prop

            />

            
            {touched.Name && errors.Name && <Text style={styles.errorText}>{errors.Name}</Text>}

            <TextInput
              label="Phone Number"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              style={styles.input}
              mode="outlined" // Add this prop

            />
            {touched.phoneNumber && errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

 */}



<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
    <Text style={styles.uploadButtonText}>Upload Screenshot</Text>
  </TouchableOpacity>

  <Button mode="contained" onPress={handleSubmit} style={styles.button}>
    Confirm
  </Button>
</View>

            {screenshotUri && (
              <View style={styles.imageContainer}>
                <Text>Uploaded Screenshot:</Text>
                <Image source={{ uri: screenshotUri }} style={styles.image} />
              </View>
            )}

 
          </>
        )}
      </Formik>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>


  );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor:'#fcfcfd'
      },
      circleContainer: {
        marginTop:'20%',
        alignItems: 'center',
        marginBottom:'-20%',
      },
      circleImage: {
        width: 150,
        height: 150, 
        // borderRadius: 75, 
      },
      
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  uploadButton: {

    margin:30,
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius:15,
    height:50,
    width:'40%',
    justifyContent:'center'

  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
height:50,
width:'40%',
justifyContent:'center',
borderRadius:15,


    
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  pickerContainer: {
    height: 40,
    marginBottom: 10,
    zIndex:1000


  },
  picker: {
    
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex:1000

  },
  pickerItem: {
    justifyContent: 'flex-start',
    zIndex:1000
  },
  pickerDropDown: {
    backgroundColor: '#fafafa',
  },
  dataCard: {
    marginVertical: 10,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    alignSelf: 'center', // Center the error text
    fontSize:20

  },

});

export default PaymentFormScreen;
