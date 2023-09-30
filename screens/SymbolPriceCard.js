import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import socket from '../socket'; // Import the global socket
import { useNavigation } from '@react-navigation/native';

const SymbolPriceCard = ({ currency, bid, ask }) => {
  const [currentColor, setCurrentColor] = useState('#FAEB17');

  useEffect(() => {
    setCurrentColor((prevColor) => prevColor === '#FAEB17' ? '#C2CECE' : '#FAEB17');
  }, [bid, ask]);

  return (
    <View style={{ 
        marginTop: 5, 
        alignItems: 'center', 
        flexBasis: '24%',
    }}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ backgroundColor: currentColor, padding: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, alignSelf:'center' }}>{currency}</Text>
        </View>
        <View style={{ backgroundColor: '#98FB98', padding: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="arrow-up" size={20} color="#089708" />
          <Text style={{ marginLeft: 5 ,color:'black',fontWeight:'500',fontSize:15}}>{bid}</Text>
        </View>
        <View style={{ backgroundColor: '#FC9898', padding: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="arrow-down" size={20} color="#AC0606" />
          <Text style={{ marginLeft: 5,color:'black',fontWeight:'500' ,fontSize:15}}>{ask}</Text>
        </View>
      </View>
    </View>
  );
};




const PricesScreen = () => {


  const [symbolData, setSymbolData] = useState([]);
  const navigation = useNavigation();



//   const handleDisconnect = () => {
//     socket.disconnect();
//     navigation.navigate('Home');
//   };



useEffect(() => {
    socket.on('Prices', ({ currency, ...rest }) => {
      setSymbolData(prevData => {
        const updatedData = [...prevData];
        const existingIndex = updatedData.findIndex(item => item.currency === currency);
        if (existingIndex >= 0) {
          updatedData[existingIndex] = { currency, ...rest };
        } else {
          updatedData.push({ currency, ...rest });
        }
        return updatedData;
      });
    });
  }, []);
  




  
  return (
    <View>
      {/* <TouchableOpacity onPress={handleDisconnect} style={{ backgroundColor: '#DDDDDD', padding: 10, borderRadius: 5 }}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>Close</Text>
      </TouchableOpacity> */}
      <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {symbolData.map((item) => (
          <SymbolPriceCard
            key={item.currency}
            currency={item.currency}
            bid={item.bid}
            ask={item.ask}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default PricesScreen;
