import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, fontFamily} from '../../theme/fonts';
import {colors} from '../../theme/colors';

type Props = {};

const SplashScreen = (props: Props) => {
  return (
    <ImageBackground source={IMAGES.OnboardingBg} style={{flex: 1}}>
      <Image source={IMAGES.Decoration} />
      <Text style={styles.Name}>ChemGuess</Text>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  Name: {
    ...commonFontStyle(fontFamily.poppinsSemiBold, 48, colors.white),
    alignSelf: 'center',
  },
});
