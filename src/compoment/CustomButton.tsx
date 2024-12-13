import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../theme/colors';
import {fontFamily} from '../theme/fonts';

interface FixedGradientButtonProps {
  title: string; // Button text
  onPress: (event: GestureResponderEvent) => void; // Button click handler
  style?: ViewStyle; // Custom styles for width and height
}

const FixedGradientButton: React.FC<FixedGradientButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
      <LinearGradient
        colors={['#5642CC', '#7C6BE1']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 12, // Fixed padding for height consistency
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    color: colors.white, // White text color
    fontWeight: fontFamily.poppinsSemiBold,
  },
});

export default FixedGradientButton;
