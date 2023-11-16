import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet,RefreshControl,ScrollView } from 'react-native';

import WebView from 'react-native-webview';

import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../colors/colors';
const CalendarScreen = () => {
  const language = useSelector((state) => state.Localization.language);
  const [eventTitles, setEventTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const extractData = (data) => {
      // Your scraping logic here
      // Example: Extracting titles of events
      const titles = Array.from(data.querySelectorAll('.event-title')).map((title) => title.innerText);
      setEventTitles(titles);
      setLoading(false); // Set loading to false once data is loaded
    };

    return () => {
      // Cleanup if needed
    };
  }, []);

  const injectedJavaScript = `
    // Remove elements with the class 'event-source' and 'event-link'
    var sourceElements = document.querySelectorAll('.event-source');
    sourceElements.forEach(function (element) {
      element.remove();
    });

    // Hide elements with the class 'event-link m-auto py-3'
    var eventLinks = document.querySelectorAll('.event-link.m-auto.py-3');
    eventLinks.forEach(function (link) {
      link.style.display = 'none';
    });

    // Notify the React Native app that the data is loaded
    window.ReactNativeWebView.postMessage('dataLoaded');
  `;

  const onMessage = (event) => {
    // Check if the message indicates that data is loaded
    if (event.nativeEvent.data === 'dataLoaded') {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={COLORS.accent} style={{ transform: [{ scale: 2 }] }} />
    </View>
      )}
      <WebView
        source={{
          uri: `https://widget.myfxbook.com/widget/calendar.html?lang=${language}&impacts=0,2,3&symbols=AUD,CAD,CHF,CNY,EUR,GBP,JPY,NZD,USD`,
        }}
        javaScriptEnabled={true}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
        style={{ opacity: loading ? 0 : 1 }} // Set opacity to 0 if loading, 1 otherwise
      />
      {!loading && (
        <View>
          {eventTitles.map((title, index) => (
            <Text key={index}>{title}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default CalendarScreen;
