//import liraries
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {commonFontStyle, fontFamily, hp, wp} from '../theme/fonts';
import {colors} from '../theme/colors';

type IconButtonProps = {
  label: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  containerLabelStyle?: TextStyle;
  icon: any;
  containerIconStyle: any;
};

const IconButton = ({
  label,
  onPress,
  containerStyle,
  icon,
  containerLabelStyle,
  containerIconStyle,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Image
        resizeMode="contain"
        style={[styles.addIconStyle, containerIconStyle]}
        source={icon}
      />
      <Text style={[styles.labelTextStyle, containerLabelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    top: -8,
  },
  labelTextStyle: {
    textAlign: 'center',

    ...commonFontStyle(fontFamily.poppinsRegular, 13, colors.black),
  },
  addIconStyle: {
    height: wp(28),
    width: wp(28),
  },
});

export default IconButton;
