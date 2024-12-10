//import liraries
import React from 'react';
import {
  ActivityIndicator,
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
  label?: string;
  onPress?: () => any;
  containerStyle?: ViewStyle;
  containerLabelStyle?: TextStyle;
  disabled?: any;
  isLoader?: boolean;
};

const PrimaryButton = ({
  label,
  onPress,
  containerStyle,
  containerLabelStyle,
  disabled,
  isLoader,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, containerStyle]}>
      {isLoader ? (
        <ActivityIndicator color={colors.white} size={25} />
      ) : (
        <Text style={[styles.labelTextStyle, containerLabelStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: 143,
    borderRadius: 27,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonPrimaryColor,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    // shadowRadius: 5,
  },
  labelTextStyle: {
    ...commonFontStyle(fontFamily.poppinsRegular, 18, colors.white),
  },
});

export default PrimaryButton;
