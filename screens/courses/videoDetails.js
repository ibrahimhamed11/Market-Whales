import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { usePreventScreenCapture } from 'expo-screen-capture';

const WebviewComponent = ({ route, navigation }) => {
  const { videoId } = route.params; // Extract the video ID from the route params
  const webViewRef = useRef(null);

  const injectJS = `
    setTimeout(() => {
      const element = document.querySelector('.ytp-title');
      const element2 = document.querySelector('.ytp-show-cards-title');
      const element3 = document.querySelector('.ytp-youtube-button');
      
      if (element) {
        element.style.display = 'none';
      }

      if (element2) {
        element2.style.display = 'none';
      }
      if (element3) {
        element3.style.display = 'none';
      }
    }, 20);
  `;

  const handleOnLoad = () => {
    webViewRef.current.injectJavaScript(injectJS);
  };


  usePreventScreenCapture()
  return (
    <View style={styles.container}>
      
      <WebView
        ref={webViewRef}
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
        onLoad={handleOnLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default WebviewComponent;
