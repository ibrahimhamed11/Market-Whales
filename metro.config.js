const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    extraNodeModules: {
      // Add your Stripe package name here if needed
      'react-native-stripe-sdk': require.resolve('@stripe/stripe-react-native'),
    },
  },
};
