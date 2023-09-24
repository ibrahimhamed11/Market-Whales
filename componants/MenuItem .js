import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
            marginRight: language === 'ar' ? 0 : SCREEN_WIDTH * 0.05,
            marginLeft: SCREEN_WIDTH * 0.05,
          }}
        >
          <FontAwesomeIcon
            name={iconName}
            size={SCREEN_WIDTH * 0.07}
            style={{
              marginRight: language === 'ar' ? SCREEN_WIDTH * 0.02 : SCREEN_WIDTH * 0.02,
              marginLeft: SCREEN_WIDTH * 0.02,
              color: iconName === 'sign-out' ? '#BE1313' : '#51117f',
            }}
          />
          <Text style={{ fontFamily: 'Droid', fontSize: SCREEN_WIDTH * 0.04, color: iconName === 'sign-out' ? '#BE1313' : '#51117f' }}>
            {displayName}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default MenuItem;
