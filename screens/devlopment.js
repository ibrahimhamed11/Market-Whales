import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DevelopmentScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="rocket" size={30} color="#900" />
      <Text style={{ fontFamily: 'FontAwesome', fontSize: 24, marginBottom: 20 }}>
        Under Development
      </Text>

    </View>
  );
};

export default DevelopmentScreen;
