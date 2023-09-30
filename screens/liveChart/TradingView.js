import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const TradingViewChart = ({ navigation }) => {
  const closeWebView = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity onPress={closeWebView} style={styles.closeButton}>
        <Text>Close</Text>
      </TouchableOpacity>

      {/* TradingView Widget */}
      <WebView
        source={{
          html: `
          <!-- TradingView Widget BEGIN -->
          <div class="tradingview-widget-container">
            <div id="tradingview_88b24"></div>
            <div class="tradingview-widget-copyright">
            
            </div>
            <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
            <script type="text/javascript">
              new TradingView.widget({
                "autosize": true,
                "symbol": "TVC:GOLD",
                "interval": "240",
                "timezone": "Africa/Cairo",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "hide_volume": true,
                "container_id": "tradingview_88b24"
              });
            </script>
          </div>
          <!-- TradingView Widget END -->
          `, 
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    padding: 50,
    alignSelf: 'flex-end',
  },
  chart: {
    flex: 2, // Adjust the flex value to make the chart larger
  },
});

export default TradingViewChart;
