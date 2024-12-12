const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Get the default configuration
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

// Add the SVG transformer and Reanimated wrapper
const customConfig = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};

// Combine configurations
const reanimatedConfig = wrapWithReanimatedMetroConfig(defaultConfig);
module.exports = mergeConfig(reanimatedConfig, customConfig);
