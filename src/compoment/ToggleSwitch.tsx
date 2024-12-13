import React, {useState, useRef} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';

const CustomSwitch = ({value, onChange}) => {
  const translateX = useRef(new Animated.Value(value ? 24 : 0)).current;

  const toggleSwitch = () => {
    Animated.timing(translateX, {
      toValue: value ? 0 : 24, // Adjust based on thumb size
      duration: 200,
      useNativeDriver: true,
    }).start();
    onChange(!value);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.track,
        {backgroundColor: value ? colors.toggleGreen : colors.greyE5}, // Customize track color
      ]}
      onPress={toggleSwitch}>
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{translateX}],
            backgroundColor: value ? colors.white : colors.black3d,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50, // Customize track width
    height: 24, // Customize track height
    borderRadius: 12,
    padding: 2,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  thumb: {
    width: 18, // Customize thumb size
    height: 18,
    borderRadius: 10,
    // Customize thumb color
  },
});

export default CustomSwitch;
