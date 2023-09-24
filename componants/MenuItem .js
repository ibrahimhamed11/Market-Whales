import React from 'react';
import { View, TouchableOpacity, Text, } from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import { Divider } from 'react-native-paper';

const MenuItem = ({ names, iconName, onPress, language, spacing }) => {
  const displayName = language === 'ar' ? names[0] : names[1];

  return (
    <> 
     <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: language === 'ar' ? 'row' : 'row-reverse',
          alignItems: 'center',
          marginBottom: spacing,
          marginRight: language === 'ar' ? 0 : 20,
          marginLeft: 20,
        }}
      >
        <FontAwesomeIcon
          name={iconName}
          size={25}
          style={{
            marginRight: language === 'ar' ? 15 : 15,
            marginLeft: 15,
            color:'blue',
            color: iconName === 'sign-out' ? '#BE1313' : '#51117f',
          }}
        />
        <Text style={{ fontFamily: 'Droid', fontSize: 18, color: iconName === 'sign-out' ? '#BE1313' : '#51117f' }}>
          {displayName}
        </Text>
      </View>
   

    </TouchableOpacity>

{/* <Divider style={{ marginHorizontal: 10 }} /> */}
</>
  
  );
};

export default MenuItem;
